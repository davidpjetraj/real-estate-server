import { Injectable } from "@nestjs/common";
import { PrismaService } from "libs/common/src/prisma";
import { CreateTeamInput } from "./input";
import { TeamModel } from "./model";
import { teamSelect } from "./select";
import { AdminStatus, Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { createEdge } from "apps/admin/src/common/pagination/cursor-pagination/create-edge";
import { GetAllTeamsInput } from "./input/get-all.input";
import { extractFilters } from "../utils";
@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) { }

  async createTeam(input: CreateTeamInput): Promise<TeamModel> {
    const team = await this.prisma.admin.create({
      data: {
        ...input,
        name: `${input.first_name} ${input.last_name}`,
      },
      select: teamSelect,
    });

    return team;
  }

  async findAll(query: GetAllTeamsInput) {
    try {
      const take = query?.limit || 20;

      const decodedCursor = query?.cursor
        ? Buffer.from(query.cursor, 'base64').toString('utf-8')
        : null;

      const defaultQuery: Prisma.AdminWhereInput = {
      };

      const allQuery: Prisma.AdminFindManyArgs = {
        where: extractFilters(defaultQuery, query.filters, []),
        select: teamSelect,
        take: take + 1,
        orderBy: { created_at: 'desc' },
      };

      if (query?.cursor) {
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

      const dataQuery = await this.prisma.admin.findMany(allQuery);

      const hasNextPage = dataQuery.length > take;

      if (hasNextPage) {
        dataQuery.pop();
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
    } catch (error) {
      throw new GraphQLError('Diqka shkoi gabim!');
    }
  }
}

