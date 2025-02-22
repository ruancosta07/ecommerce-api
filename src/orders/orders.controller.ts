import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Request } from 'express';
import { OrderDto } from './orders.dto';
import { ProductsDto } from '../products/products.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get("order/:id")
  getOrder(@Req() req:Request, @Param("id") id:string){
    return this.ordersService.getSingleOrder(req,id)
  }
  @Get("orders/:id")
  getOrders(@Req() req:Request, @Param("id") id:string):Promise<OrderDto[] | string>{
    return this.ordersService.getOrders(req,id)
  }
  
  @Get("complete")
  getOrderasd(@Query("session_id") session_id?:string){
    return this.ordersService.getSuccessfullOrder(session_id)
  }

  @Post("create")
  create(@Req()req:Request, @Body("order") order:OrderDto[], @Body("cart") cart:ProductsDto[], @Body("coupon") coupon:string){
    return this.ordersService.createOrder(req,order, cart, coupon)
  }

  @Post("verify-coupon")
  verify(@Body("coupon") coupon:string){
    return this.ordersService.verifyCoupon(coupon)
  }

  @Get("successfull/:id")
  getSuccessFullOrder(@Param("id") id:string){
    return this.ordersService.getSuccessfullOrder(id)
  }

  @Patch("cancel/:id")
  cancel(@Req() req:Request, @Param("id") id:string){
    return this.ordersService.cancelOrder(req,id)
  }
  @Patch("confirm/:id")
  confirm(@Req() req:Request, @Param("id") id:string){
    return this.ordersService.confirmOrder(req,id)
  }
  @Post("checkout")
  checkout(){
    return this.ordersService.checkout()
  }
  
}
