import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { DatabaseService } from '../database.service';
import { EbscoController } from './ebsco.controller';
import { EbscoService } from './ebsco.service';

describe('EbscoController', () => {
  let controller: EbscoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EbscoController],
      providers: [
        JwtService,
        EbscoService,
        DatabaseService,
        PrismaService,
        HttpService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(() => ({})),
          },
        },
      ],
    }).compile();

    controller = module.get<EbscoController>(EbscoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
