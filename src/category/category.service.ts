import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAllWitLimit(): Promise<Category[]> {
    return await this.prisma.category.findMany({
      take: 3, // Limita os resultados a três
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    const existingCategory = await this.findOne(id);

    if (!existingCategory) {
      throw new NotFoundException(`Categoria com o id '${id}' não encontrada.`);
    }

    return this.prisma.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
