export class OrderDto {
    id: string;
    userId: string;
    status: 'pending' | 'approved' | 'expired' | "canceled";
    productId: string;
    estimatedDeliveryDate: Date;
    price:number
    expireDate:Date
    stripePaymentId?:string
    stripeSessionId:string
    checkoutUrl:string
    checkoutUrlExpiresAt:number
    quantity:number
  }
  