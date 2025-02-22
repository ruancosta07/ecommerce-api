import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../services/prisma";
import Stripe from "stripe";

@Injectable()
export class StripeService {
    private readonly stripe: Stripe
    constructor(private readonly configService: ConfigService, private readonly prisma: PrismaService) {
        this.stripe = new Stripe(this.configService.get<string>("STRIPE_SECRET_KEY"))
    }
    get() {
        return this.stripe
    }
    async handleCheckoutSessionComplete(event: { data: { object: Stripe.Checkout.Session } }) {
        const userId = event.data.object.client_reference_id
        const checkoutStatus = event.data.object.status
        const userEmail = event.data.object.customer_email
        if (checkoutStatus !== "complete") {
            return
        }
        const foundUser = await this.prisma.users.findFirst({
            where: {
                email: userEmail
            }
        })
        if(!foundUser){
            throw new UnauthorizedException()
        }
        await this.prisma.orders.updateMany({
            where: {
                userId:foundUser.id
            },
            data: {
                status: "approved"
            }
        })
    }
}