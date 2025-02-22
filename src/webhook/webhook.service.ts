import { Injectable, RawBodyRequest } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from '../services/prisma';
import { successPurchase } from '../utils/emails';
import { NodemailerService } from '../utils/nodemailer';
import { StripeService } from '../utils/stripe';
import Stripe from 'stripe';

@Injectable()
export class WebhookService {
    constructor(private readonly stripe: StripeService, private readonly configService: ConfigService, private readonly nodemailer: NodemailerService, private readonly prisma: PrismaService) {

    }
    async handleWebhook(req: RawBodyRequest<Request>, signature: string) {
        const endPoint = this.configService.get<string>("STRIPE_WEBHOOK_PROD_SECRET")
        let event: Stripe.Event
        try {
            event = this.stripe.get().webhooks.constructEvent(req.rawBody, signature, endPoint)
        } catch (err) {
            console.log(err)
        }


        switch (event.type) {
            case "checkout.session.completed":
                const sessionCompleted = event.data.object as Stripe.Checkout.Session
                const foundUser = await this.prisma.users.findFirst({ where: { email: sessionCompleted.customer_email } })
                if (!foundUser) {
                    return
                }
                if (sessionCompleted.payment_intent) {
                    await this.prisma.orders.updateMany({
                        where: {
                            AND: [
                                {
                                    userId: foundUser.id
                                },
                                {
                                    stripeSessionId: sessionCompleted.id as string
                                }
                            ]

                        },
                        data: {
                            status: "approved",
                            stripePaymentId: sessionCompleted.payment_intent as string
                        }
                    })
                }
                const lineItems = await this.stripe.get().checkout.sessions.listLineItems(sessionCompleted.id)
                const products = []
                for(const w of lineItems.data){
                    const foundProductS = await this.stripe.get().products.retrieve(w.price.product.toString())
                    products.push({...foundProductS, price:w.price.unit_amount / 100})
                }
                await this.nodemailer.sendMailToUser(sessionCompleted.customer_email, "Compra aprovada", successPurchase({total:sessionCompleted.amount_total / 100, products}))
                break
            case "checkout.session.expired":
                const sessionExpired = event.data.object as Stripe.Checkout.Session
                if (!foundUser) {
                    return
                }
                await this.prisma.orders.updateMany({
                    where: {
                        AND: [
                            {
                                stripeSessionId: sessionExpired.id
                            }
                        ]
                    }, data: {
                        status: "canceled"
                    }
                })
                break
            case "payout.canceled": 
                console.log("Recusou né fdp")
            break
            case "payment_intent.succeeded":
                const payment_intent = event.data.object as Stripe.PaymentIntent
                console.log("O pagamento foi feito com sucesso!" + payment_intent.amount)
                break
            case "payment_intent.payment_failed":
                const payment_intent2 = event.data.object as Stripe.PaymentIntent
                console.log("O pagamento foi recusado!" + payment_intent2.amount)
                break
            case "product.created":
                const product = event.data.object
                const price = await this.stripe.get().prices.list({
                    product: product.id,
                    active: true
                })
                console.log(product)
                await this.prisma.products.create({
                    data: {
                        description: product.description || "",
                        price: price.data[0].unit_amount / 100,
                        images: product.images,
                        name: product.name,
                        stripeProductId: product.id,
                        tags: product.metadata.tags ? product.metadata.tags.split(",").map((t) => t.trim().replace(/ /g, "-")) : []
                    }
                })
                break
            case "product.updated":
                const productUpdated = event.data.object
                const foundProductUpdated = await this.stripe.get().products.retrieve(productUpdated.id)
                const foundProductDatabase = await this.prisma.products.findFirst({ where: { stripeProductId: foundProductUpdated.id } })
                const imagesTags = [productUpdated.images[0]]
                if (productUpdated.metadata.images) {
                    imagesTags.push(...productUpdated.metadata.images.split(",").map(i => i.trim().replace(/ /g, "-")))
                }
                const foundPrice = await this.stripe.get().prices.list({
                    product: productUpdated.id,
                    active: true
                })
                if (!foundProductDatabase) {
                    return
                }

                    await this.prisma.products.update({
                        where: {
                            id: foundProductDatabase.id
                        }, data: {
                            name: foundProductUpdated.name,
                            description: foundProductUpdated.description || "",
                            images: imagesTags || [],
                            price: foundPrice.data[0].unit_amount / 100,
                            tags: foundProductUpdated.metadata.tags ? foundProductUpdated.metadata.tags.split(",").map((t) => t.trim().replace(/ /g, "-")) : []
                        }
                    })
                
                break
        }
    }
}
