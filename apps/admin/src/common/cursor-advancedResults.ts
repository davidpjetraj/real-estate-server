import { extractFilters } from '../utils';
import { CursorPaginationArgs } from './GetAll';
import { createEdge } from './pagination';

export default async function advancedResults(
  model: any,
  query: CursorPaginationArgs,
) {
  const take = query.limit || 20;

  const decodedCursor = query?.cursor
    ? Buffer.from(query.cursor, 'base64').toString('utf-8')
    : null;

  const allQuery: any = {
    where: extractFilters({}, query.filters, []),
    select: {
      id: true,
      createdAt: true,
    },
    take: take + 1,
    orderBy: { created_at: 'desc' },
  };

  if (query.cursor) {
    allQuery.cursor = { id: decodedCursor };
    allQuery.skip = 1;
  }

  if (query?.sort?.length > 0) {
    allQuery.orderBy = query.sort.reduce((acc: any, sort: any) => {
      acc.push({ [sort.id]: sort.value });
      return acc;
    }, []);
  } else {
    allQuery.orderBy = { created_at: 'desc' };
  }

  const dataQuery = await model.findMany(allQuery);

  const hasNextPage = dataQuery.length > take;

  if (hasNextPage) {
    dataQuery.pop(); // Remove the extra item if there is a next page
  }

  const nodes = dataQuery;

  const edges = await Promise.all(
    nodes.map((node: any) => createEdge(node, node.id)),
  );

  const hasPreviousPage = !!decodedCursor;

  return {
    edges,
    pageInfo: {
      startCursor: edges[0]?.cursor || null,
      endCursor: edges[edges.length - 1]?.cursor || null,
      hasNextPage,
      hasPreviousPage,
    },
  };
}
