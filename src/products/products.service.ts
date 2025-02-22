import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../services/prisma';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProductsDto } from './products.dto';
import { SupabaseService } from '../services/supabase';
import { SharpFile } from '../utils/sharp';


@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly configService: ConfigService, private readonly supabase: SupabaseService, private readonly sharp: SharpFile) { }

    async getAllProducts(): Promise<ProductsDto[]> {
        const products = await this.prisma.products.findMany({
            include: {
                reviews: true,

            }
        });
        return products.map(product => new ProductsDto(product))
    }


    async getProductById(id: string): Promise<ProductsDto> {
        const foundProduct = await this.prisma.products.findUnique({
            where: { id },
            include: {
                reviews: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                avatar: true,
                                email: true,

                            }
                        }
                    },
                },
            }
        })
        return new ProductsDto(foundProduct)
    }

    async getProductByQuery(categoria:string,pagina:string, limite:string, max:string, min:string, order: "desc" | "asc" | "undefined") {
        const pageNumber = parseInt(pagina, 10) || 1;
        const pageSize = parseInt(limite, 10) || 20;
        const skip = (pageNumber - 1) * pageSize
        const queryParamsProducts = await this.prisma.products.findMany({
            where:{
                tags:{
                    has:categoria
                },
                price: {
                    gte: Number(min) || 0,
                    lte: Number(max) || 9e9
                }
            },
            skip,
            take:pageSize,
            include:{
                reviews:true
            },
            orderBy: order !== "undefined" ? {price: order} : {}

        })
        const clearProducts = await this.prisma.products.findMany({
            where: {
                tags: {
                    has:categoria
                }
            },
            include: {
                reviews:true
            }
        })
        const total = await this.prisma.products.count({where: {tags: {has:categoria}},})
        const totalPages = Math.ceil(total / pageSize)
        return {products:queryParamsProducts, clearProducts, total, totalPages}
    }   

    async searchProductByTerm(searchTerm:string){
        const products = await this.prisma.products.findMany({
            where: {
                OR: [
                    {name: {
                        contains: searchTerm,
                        mode: "insensitive"
                    }},{
                        tags: {
                            has: searchTerm
                        }
                    }
                ]
            }
        })
        return products
    }

    // async createProduct(req: Request, product: ProductsDto, files: Express.Multer.File[]): Promise<ProductsDto> {
    //     const { foundUser } = await this.extractUserFromHeader(req);
    //     if (foundUser.role !== "seller") {
    //         throw new UnauthorizedException();
    //     }
    //     const filesUploaded = []

    //     for (const file of files) {
    //         const fileBuffer = await this.sharp.sharpImageToWebp(file.buffer)
    //         const uniqueFileName = `${foundUser.id}-${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}.webp`.replace(/ /g, "-");
    //         const { error } = await this.supabase.getClient().storage.from("utilsBucket").upload(uniqueFileName, fileBuffer, {
    //             contentType: "image/webp",
    //             upsert: false
    //         })
    //         if (error) {
    //             throw new HttpException("Error uploading the file", 500)
    //         }
    //         const { publicUrl } = this.supabase.getClient().storage.from("utilsBucket").getPublicUrl(uniqueFileName).data
    //         filesUploaded.push(publicUrl)
    //     }

    //     const productData = {
    //         name: product.name,
    //         price: +product.price.toFixed(2),
    //         description: product.description,
    //         images: filesUploaded,
    //         tags: product.tags,
    //         userId: foundUser.id
    //     };


    //     const newProduct = await this.prisma.products.create({
    //         data: productData,
    //     });

    //     return new ProductsDto(newProduct);
    // }


    // async editProduct(req: Request, product: ProductsDto, id: string,) {
    //     const { foundUser } = await this.extractUserFromHeader(req)
    //     const foundProduct = await this.prisma.products.findUnique({
    //         where: {
    //             id
    //         }
    //     })
    //     // if (!foundUser || foundProduct.userId !== foundUser.id) {
    //     //     throw new UnauthorizedException()
    //     // }
    // }

    // async deleteProduct(req: Request, id: string) {
    //     const { foundUser } = await this.extractUserFromHeader(req)
    //     const foundProduct = await this.prisma.products.findUnique({
    //         where: {
    //             id
    //         }
    //     })
    //     // if (foundProduct.userId !== foundUser.id) {
    //     //     throw new UnauthorizedException()
    //     // }
    //     const imageSplit = String(`${this.configService.get("SUPABASE_URL")}/storage/v1/object/public/utilsBucket/`)
    //     const imagePaths = foundProduct.images.map((imageUrl) => {
    //         return imageUrl.split(imageSplit)[imageUrl.split(imageSplit).length - 1];
    //     });
    //     await Promise.all(
    //         [
    //             this.supabase.getClient().storage.from("utilsBucket").remove(imagePaths),
    //             this.prisma.products.delete({
    //                 where: {
    //                     id
    //                 }
    //             }),
    //         ])

    //     throw new HttpException("Produto excluído com sucesso", HttpStatus.ACCEPTED)
    // }



    private async extractUserFromHeader(req: Request) {
        const [, token] = req.headers.authorization.split(" ")
        const decodedToken = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get("JWT_SECRET")
        }) as {
            sub: string;
        }
        const foundUser = await this.prisma.users.findUnique({
            where: {
                id: decodedToken.sub
            }
        })
        return { foundUser }
    }
}
