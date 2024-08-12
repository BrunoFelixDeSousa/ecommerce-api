import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProduct: Prisma.ProductCreateInput) {
    return this.productService.create(createProduct);
  }

  @Get('/limited')
  findAllWitLimit() {
    return this.productService.findAllWitLimit();
  }

  @Get()
  findAllWithPagination(
    @Query('page') skip: string,
    @Query('pageSize') take: string,
    @Query('sortBy') sortBy: string,
  ) {
    return this.productService.findAllWithPagination(skip, take, sortBy);
  }

  // @Get()
  // findAll() {
  //   return this.productService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProduct: Prisma.ProductUpdateInput,
  ) {
    return this.productService.update(id, updateProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
