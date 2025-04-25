import { GetAllArgs } from './GetAll';

export default async function advancedResults(
  model: any,
  query: GetAllArgs,
  userID?: string,
) {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const startIndex = (page - 1) * limit;

  const allQuery: any = {
    where: {},
    select: {}, //Add select interface
    skip: startIndex,
    take: limit + 1,
    orderBy: { created_at: 'desc' },
  };

  if (userID) {
    allQuery.where.userID = userID;
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
  const total = await model.count({
    where: allQuery.where,
  });

  let hasNextPage = false;

  if (dataQuery.length > limit) {
    hasNextPage = true;
    dataQuery.pop();
  }

  return {
    data: dataQuery,
    hasNextPage: hasNextPage,
    totalCount: total,
  };
}
