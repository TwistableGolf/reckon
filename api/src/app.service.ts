import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const prisma = new PrismaClient();
    const result = await prisma.user.findMany();
    console.log(result);
    prisma.$disconnect();
    
    return 'Hello Worldwwde!';
  }
}
