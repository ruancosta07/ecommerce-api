import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Request } from 'express';
import { ProductsDto } from './products.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }
  @Get()
  get(): Promise<ProductsDto[]> {
    return this.productsService.getAllProducts()
  }
  @Get("categorias")
  search(@Query("categoria") categoria:string, @Query("pagina") pagina:string, @Query("limite") limite:string, @Query("max") max:string, @Query("min") min:string,  @Query("order") order: "desc" | "asc" | "undefined") {
    return this.productsService.getProductByQuery(categoria,pagina,limite, max, min, order)
  }
  @Get("search")
  searchProductByName(@Query("produto") produto:string, @Query("pagina") pagina:string, @Query("limite") limite:string, @Query("max") max:string, @Query("min") min:string,  @Query("order") order: "desc" | "asc" | "undefined") {
    return this.productsService.getProductByQuery(produto,pagina,limite, max, min, order)
  }

  @Get("search")
  searchProduct(@Query("busca") busca:string){
    return this.productsService.searchProductByTerm(busca)
  }

  @Get(":id")
  getProduct(@Param("id") id: string): Promise<ProductsDto> {
    return this.productsService.getProductById(id)
  }


  

  // @UseGuards(AuthGuard)
  // @Post("create")
  // @UseInterceptors(FilesInterceptor("file", 5, { storage: memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }))
  // create(@Req() req: Request, @Body() product: ProductsDto, @UploadedFiles() file: Express.Multer.File[]) {
  //   return this.productsService.createProduct(req, product, file)
  // }

  // @UseGuards(AuthGuard)
  // @Put("edit/:id")
  // edit(@Req() req: Request, @Body() product: ProductsDto, @Param("id") id: string) {
  //   return this.productsService.editProduct(req, product, id)
  // }
  
  // @UseGuards(AuthGuard)
  // @Delete("delete/:id")
  // delete(@Req() req: Request, @Param("id") id: string) {
  //   return this.productsService.deleteProduct(req, id)
  // }
}
