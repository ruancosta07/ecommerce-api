import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../services/prisma';
import { OrderDto } from './orders.dto';
import { Request } from "express"
import { StripeService } from '../utils/stripe';
import { ProductsDto } from '../products/products.dto';
import Stripe from 'stripe';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly configService: ConfigService, private readonly stripe: StripeService) { }

    async getOrders(req: Request, id: string): Promise<OrderDto[] | string> {
        const { foundUser } = await this.extractUserFromHeader(req)
        if (foundUser.id !== id) {
            return "Rota dos produtos"
        }
        const orders = await this.prisma.orders.findMany({
            where: {
                userId: foundUser.id
            },
            include: {
                product: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return orders
    }

    async getSingleOrder(req: Request, id: string): Promise<OrderDto> {
        const { foundUser } = await this.extractUserFromHeader(req)
        if (foundUser.id !== id) {
            // throw new UnauthorizedException()
        }
        return foundUser.orders.find((o) => o.id === id)
    }

    async checkout() {
        const session = await this.stripe.get().checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card", "boleto"],
            success_url: "https://ruancosta-urbnx.vercel.app/complete?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "https://ruancosta-urbnx.vercel.app/",
            line_items: [
                {
                    price_data: {
                        currency: "brl",
                        product: "prod_Rl0wzfBOZJUwBt",
                        unit_amount: 47 * 100
                    },
                    quantity: 1
                }
            ]
        })
        return session
    }

    async getSuccessfullOrder(id: string) {
        const alo = await this.stripe.get().checkout.sessions.retrieve(id, { expand: ["line_items"] })
        const total = alo.amount_total
        const orderProdcts = alo.line_items.data
        const products = []
        for (const p of orderProdcts) {
            const foundProduct = await this.stripe.get().products.retrieve(p.price.product as string)
            products.push({ ...foundProduct, price: p.amount_total / 100, quantity:p.quantity })
        }
        return { total, products, expiresAt: alo.expires_at }
    }


    async createOrder(req: Request, order: OrderDto[], cart: ProductsDto[], coupon: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const foundProducts = [] as Stripe.Product[]
        let foundCoupon:Stripe.Response<Stripe.ApiList<Stripe.PromotionCode>>;
        if(coupon){
           foundCoupon = await this.stripe.get().promotionCodes.list({ code: coupon })
        }
        for (const product of cart) {
            const stripeProduct = await this.stripe.get().products.retrieve(product.stripeProductId, { expand: ["default_price"] })
            if (stripeProduct) {
                foundProducts.push(stripeProduct)
            }
        }
        const session = await this.stripe.get().checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card", "boleto"],
            success_url: "https://ruancosta-urbnx.vercel.app/complete?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "https://ruancosta-urbnx.vercel.app/",
            discounts: foundCoupon ? [{ coupon: foundCoupon.data[0].coupon.id }] : [],
            line_items: foundProducts.map((p) => {
                const price = p.default_price as Stripe.Price
                return {
                    quantity: 1,
                    price_data: {
                        product: p.id,
                        currency: "brl",
                        unit_amount: 100 * Number(price.unit_amount / 100),
                    }
                }
            }),
            customer_email: foundUser.email,
            locale: "pt-BR",

        })


        const formatedOrder: OrderDto[] = order.map((o,i) => {
            const price = foundProducts[i].default_price as Stripe.Price
            const priceWithDiscount = price.unit_amount * (foundCoupon?.data[0].coupon.percent_off / 100)
            return ({
                ...o,
                price: foundCoupon ? (price.unit_amount - priceWithDiscount ) / 100: price.unit_amount / 100,
                productId: o.productId,
                estimatedDeliveryDate: o.estimatedDeliveryDate,
                expireDate: o.expireDate,
                userId: foundUser.id,
                status: "pending",
                stripeSessionId: session.id as string,
                checkoutUrl: session.url,
                checkoutUrlExpiresAt: session.expires_at,
            })
        })
        const [newOrder, userCart] = await Promise.all([this.prisma.orders.createMany({
            data: formatedOrder,
        }),
        this.prisma.users.update({
            where: {
                id: foundUser.id
            },
            data: {
                cart: []
            }
        })
        ])
        return { cart: userCart.cart, url: session.url }
    }

    async confirmOrder(req: Request, id: string) {
        await this.prisma.orders.update({
            where: {
                id
            },
            data: {
                status: "approved"
            }
        })
        throw new HttpException("Pedido confirmado com sucesso", 202)
    }

    async cancelOrder(req: Request, id: string) {
        await this.prisma.orders.update({
            where: {
                id
            },
            data: {
                status: "canceled"
            }
        })
        throw new HttpException("Pedido cancelado com sucesso", HttpStatus.ACCEPTED)

    }

    private async extractUserFromHeader(req: Request) {
        const [, token] = req.headers.authorization.split(" ")
        const decodedToken = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get("JWT_SECRET")
        }) as {
            id: string;
        }
        const foundUser = await this.prisma.users.findUnique({
            where: {
                id: decodedToken.id
            },
            include: {
                orders: true
            }
        })
        return { foundUser }
    }

    async verifyCoupon(coupon: string) {
        try {
            const coupons = await this.stripe.get().promotionCodes.list({
                code: coupon,
                limit: 1
            })
            return { couponIsValid: true, percentOff: coupons.data[0].coupon.percent_off }
        } catch {

            throw new HttpException("Cupon invalído", HttpStatus.BAD_REQUEST)

        }
    }

}
