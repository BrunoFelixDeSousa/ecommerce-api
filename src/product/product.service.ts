import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProduct: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prisma.product.create({
      data: createProduct,
    });
  }

  async findAllWitLimit(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      take: 8,
    });
  }

  async findAllWithPagination(page: string = '1', pageSize: string = '16') {
    const skip = (parseInt(page, 10) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          sku: true,
          categoryId: true,
          description: true,
          largeDescription: true,
          price: true,
          discountPrice: true,
          discountPercent: true,
          isNew: true,
          imageLink: true,
          otherImagesLink: true,
        },
        skip,
        take,
      }),
      this.prisma.product.count(),
    ]);

    const totalPage = Math.ceil(total / parseInt(pageSize));

    return { total, products, totalPage };
  }

  // async findAll(): Promise<Product[]> {
  //   return await this.prisma.product.findMany({
  //     take: 16,
  //   });
  // }

  async findOne(id: string): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateProduct: Prisma.ProductUpdateInput) {
    const existingProduct = this.findOne(id);

    if (!existingProduct) {
      throw new NotFoundException(`Product com o id '${id}' não encontrado.`);
    }

    return await this.prisma.product.update({
      where: {
        id,
      },
      data: updateProduct,
    });
  }

  async remove(id: string) {
    const existingProduct = await this.findOne(id);

    if (!existingProduct) {
      throw new NotFoundException(`Product com o id '${id}' não encontrado.`);
    }

    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
