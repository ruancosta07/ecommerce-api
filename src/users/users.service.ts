import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { Request } from 'express';
import { PrismaService } from '../services/prisma';
import { UserDto } from './users.dto';
import { SupabaseService } from '../services/supabase';
import { SharpFile } from '../utils/sharp';

@Injectable()
export class UsersService {
    private expiresIn: number;
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly configService: ConfigService, private readonly supabase: SupabaseService, private readonly sharp: SharpFile) {
        this.expiresIn = +this.configService.get<number>("JWT_EXPIRATION_TIME") * 12
    }

    async createUser(email: string, password: string, name: string) {
        const userExists = await this.prisma.users.findFirst({
            where: {
                email
            },
            select: { email: true }
        })
        if (userExists) {
            throw new BadRequestException()
        }
        const newUser = await this.prisma.users.create({
            data: {
                email,
                password: await hash(password, 12),
                name
            },
            omit: {
                password: true,
                twoStepsAuth: true,
                twoStepsAuthCode: true
            }
        })
        const payload = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name
        }
        const token = await this.jwtService.signAsync(payload)
        return { user: newUser, token, expiresIn: this.expiresIn }
    }

    async getUserInfo(req: Request, id: string): Promise<UserDto> {
        const [, token] = req.headers.authorization.split(" ")
        const decodedToken = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get("JWT_SECRET")
        }) as {
            sub: string;
            name: string;
            email: string
        }
        const [tokenUser, foundUser] = await Promise.all([

            this.prisma.users.findUnique({
                where: {
                    id: decodedToken.sub
                }
            }),
            this.prisma.users.findUnique({
                where: { id }, omit: { password: true, twoStepsAuthCode: true }
            })
        ])

        if (!foundUser || foundUser.id !== tokenUser.id) {
            throw new UnauthorizedException()
        }
        return new UserDto(foundUser)
    }

    async deleteUser(req: Request, id: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        if (foundUser.id !== id || foundUser.id === "67a105f11571493542798228") {
            throw new UnauthorizedException()
        }
        const userProduct = await this.prisma.products.findMany({
            where: {
                id: foundUser.id
            }
        })
        const imageSplit = `${this.configService.get("SUPABASE_URL")}/storage/v1/object/public/utilsBucket/`
        const images = userProduct.flatMap((u) => u.images.map(i => i.split(imageSplit)[i.split(imageSplit).length - 1]))
        // await Promise.all(
        //     [
        //         this.supabase.getClient().storage.from("utilsBucket").remove(images),
        //         this.prisma.$transaction([
        //             this.prisma.products.deleteMany({
        //                 where: {
        //                     userId: foundUser.id
        //                 }
        //             }),
        //             this.prisma.users.delete({
        //                 where: {
        //                     id: foundUser.id
        //                 }
        //             })
        //         ])
        //     ],
        // )

        throw new HttpException("Usuário excluído com sucesso", 202)
    }

    async editUser(req: Request, user: UserDto, id: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const urlUser = await this.prisma.users.findUnique({ where: { id } })
        if (foundUser.id !== urlUser.id) {
            throw new UnauthorizedException()
        }
        const updatedUser = await this.prisma.users.update({
            where: {
                id
            },
            data: {
                adress: user.adress ? { ...user.adress, zipCode: +user.adress.zipCode } : { ...foundUser.adress },
                name: user.name ? user.name : foundUser.name,
                email: user.email ? user.email : foundUser.email,
                avatar: user.avatar ? user.avatar : foundUser.avatar,
                twoStepsAuth: typeof user.twoStepsAuth !== "undefined" ? user.twoStepsAuth : foundUser.twoStepsAuth,
            },
            omit: {
                password: true,
            }
        })
        return { ...updatedUser }
    }

    async changePassword(req: Request, password: string, id: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const dbUser = await this.prisma.users.findUnique({ where: { id } })
        if (foundUser.id !== dbUser.id) {
            throw new UnauthorizedException()
        }
        const hashedPassword = await hash(password, 12)
        await this.prisma.users.update({
            where: {
                id
            },
            data: {
                password: hashedPassword
            }
        })
        throw new HttpException("Senha atualizada com sucesso", 202)
    }

    async changeAvatar(req: Request, file: Express.Multer.File, id: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const dbUser = await this.prisma.users.findUnique({ where: { id } })
        if (foundUser.id !== dbUser.id) {
            throw new UnauthorizedException()
        }
        const fileBuffer = await this.sharp.sharpImageToWebp(file.buffer)
        const uniqueFileName = `${foundUser.id}-${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}.webp`.replace(/ /g, "-");
        const { error } = await this.supabase.getClient().storage.from("utilsBucket").upload(uniqueFileName, fileBuffer, {
            contentType: "image/webp",
            upsert: false
        })
        if (error) {
            throw new HttpException("Erro interno do servidor", 500)
        }
        const { publicUrl } = this.supabase.getClient().storage.from("utilsBucket").getPublicUrl(uniqueFileName).data
        const imageSplit = `${this.configService.get("SUPABASE_URL")}/storage/v1/object/public/utilsBucket/`
        if (foundUser.avatar) {
            await this.supabase.getClient().storage.from("utilsBucket").remove([foundUser.avatar.split(imageSplit)[foundUser.avatar.split(imageSplit).length - 1][1]])
        }
        const { avatar } = await this.prisma.users.update({
            where: {
                id
            },
            data: {
                avatar: publicUrl
            },
            select: {
                avatar: true
            }
        })
        return { avatar }
    }

    async addItemToCart(req: Request, id: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const foundProduct = await this.prisma.products.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                price: true,
                images: true,
                name: true,
                stripeProductId: true
            }
        })
        if (foundUser.cart.some((p) => p.id === foundProduct.id)) {
            const userCart = foundUser.cart
            const updatedCart = userCart.map((c) => ({ ...c, quantity: c.quantity + 1, stripeProductId: foundProduct.stripeProductId }))
            const { cart } = await this.prisma.users.update({
                where: {
                    id: foundUser.id
                },
                data: {
                    cart: updatedCart
                },
                select: {
                    cart: true,
                }
            })
            return cart
        }
        const userCart = await this.prisma.users.update({
            where: {
                id: foundUser.id
            },
            data: {
                cart: {
                    push: foundProduct
                }
            }
        })

        return userCart.cart
    }
    async removeItemFromCart(req: Request, id: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const foundProduct = await this.prisma.products.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                price: true,
                images: true,
                name: true,
                stripeProductId: true
            }
        })
        if (!foundUser.cart.some((p) => p.id === foundProduct.id)) {
           throw new BadRequestException()
        }
        const {cart} = await this.prisma.users.update({
            where: {
                id: foundUser.id
            },
            data: {
                cart: {
                    deleteMany: {
                        where: {
                            id
                        }
                    }
                }
            },
            select: {
                cart: true,
            }
        })
        return cart

    }

    async decreaseQuantityItemCart(req: Request, id: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const productExistsInUserCart = foundUser.cart.find((p) => p.id === id)
        if (!productExistsInUserCart || productExistsInUserCart.quantity === 1) {
            const { cart } = await this.prisma.users.update({
                where: {
                    id: foundUser.id
                },
                data: {
                    cart: {
                        deleteMany: {
                            where: {
                                id,
                            }
                        }
                    }
                },
                select: {
                    cart: true,
                }
            })
            return cart
        }
        else {
            const updatedCart = foundUser.cart.map((c) => c.id === id ? ({ ...c, quantity: c.quantity - 1 }) : ({ ...c }))
            const { cart } = await this.prisma.users.update({
                where: {
                    id: foundUser.id
                }, data: {
                    cart: updatedCart
                }
            })
            return cart
        }

    }
    async increaseQuantityItemCart(req: Request, id: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const productExistsInUserCart = foundUser.cart.find((p) => p.id === id)
        if (productExistsInUserCart && productExistsInUserCart.quantity >= 1) {
            const updatedCart = foundUser.cart.map((c) => c.id === id ? ({ ...c, quantity: c.quantity + 1 }) : ({ ...c }))
            const { cart } = await this.prisma.users.update({
                where: {
                    id: foundUser.id
                }, data: {
                    cart: updatedCart
                }
            })
            return cart
        }

    }
    async addItemToFavorites(req: Request, id: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const productExists = foundUser.favorites.find((p) => p.id === id)
        const foundProduct = await this.prisma.products.findUnique({
            where: {
                id
            }
        })
        if (!productExists) {
            const { favorites } = await this.prisma.users.update({
                where: {
                    id: foundUser.id
                }, data: {
                    favorites: {
                        push: {
                            id: foundProduct.id,
                            name: foundProduct.name,
                            price: foundProduct.price,
                            images: foundProduct.images
                        }
                    },

                },
                select: {
                    favorites: true
                }
            })
            return favorites
        }
        else {
            const { favorites } = await this.prisma.users.update({
                where: {
                    id: foundUser.id
                }, data: {
                    favorites: {
                        deleteMany: {
                            where: { id: foundProduct.id },

                        }
                    },

                },
                select: {
                    favorites: true
                }
            })
            return favorites
        }

    }

    async moveItemToCart(req: Request, id: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const foundProduct = await this.prisma.products.findUnique({ where: { id } })
        if (!foundProduct) {
            throw new BadRequestException()
        }
        let updatedUser:UserDto;
        if (!foundUser.cart.some((p) => p.id === id)) {
           updatedUser = await this.prisma.users.update({
                where: {
                    id: foundUser.id
                }, data: {
                    favorites: {
                        deleteMany: {
                            where: {
                                id
                            }
                        }
                    },
                    cart: {
                        push: {
                            id: foundProduct.id,
                            name: foundProduct.name,
                            price: foundProduct.price,
                            images: foundProduct.images,
                            stripeProductId: foundProduct.stripeProductId
                        }
                    }
                }
            })
        }
        else {
           updatedUser = await this.prisma.users.update({
                where: {
                    id: foundUser.id
                }, data: {
                    favorites: {
                        deleteMany: {
                            where: {
                                id
                            }
                        }
                    },
                    cart: {
                        updateMany: {
                            where: {
                                id
                            },
                            data: {
                                quantity: { increment: 1 }
                            }
                        }
                    }
                }
            })
        }
        return updatedUser
    }

    private async extractUserFromHeader(req: Request) {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = await this.jwtService.verify(token, {
            secret: this.configService.get("JWT_SECRET")
        }) as {
            sub: string;
            email: string;
            name: string
        }
        const foundUser = await this.prisma.users.findUnique({
            where: {
                id: decodedToken.sub
            }
        })
        if (!foundUser) {
            throw new UnauthorizedException()
        }
        return { foundUser }
    }
}
