import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { database, Prisma } from '@prisma/client';

@Injectable()
export class DatabaseService {
  constructor(private prisma: PrismaService) {}

  async databases(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.databaseWhereUniqueInput;
    where?: Prisma.databaseWhereInput;
    orderBy?: Prisma.databaseOrderByWithRelationInput;
  }): Promise<database[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.database.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
