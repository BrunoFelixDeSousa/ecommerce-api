import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
