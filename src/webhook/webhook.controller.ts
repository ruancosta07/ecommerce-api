import { Controller, Headers, Post, RawBodyRequest, Req } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { StripeService } from '../utils/stripe';
import { Request } from 'express';

@Controller('webhook')
export class WebhookController {
    constructor (private readonly webhookService:WebhookService, private readonly stripe:StripeService){

    }
    @Post()
    async handleWebhook(@Req( ) req:RawBodyRequest<Request>, @Headers("stripe-signature") signature:string){
        return this.webhookService.handleWebhook(req, signature)
    }
}
