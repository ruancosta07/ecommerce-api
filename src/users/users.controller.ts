import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
  @Post("create")
  create(@Body("email") email: string, @Body("password") password: string, @Body("name") name: string) {
    return this.usersService.createUser(email, password, name)
  }
  @ApiBearerAuth()
  @ApiParam({name: "id", example: "67a105f11571493542798228"})
  @UseGuards(AuthGuard)
  @Get(":id")
  getInfo(@Req() req: Request, @Param("id") id: string): Promise<UserDto> {
    return this.usersService.getUserInfo(req, id)
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  editUser(@Req() req: Request,@Body("user") user: UserDto, @Param("id") id: string) {
    return this.usersService.editUser(req, user, id)
  }

  @UseGuards(AuthGuard)
  @Patch("avatar/:id")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }))
  changeAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Param("id") id: string) {
    return this.usersService.changeAvatar(req, file, id)
  }

  @UseGuards(AuthGuard)
  @Patch("password/:id")
  editPassword(@Req() req: Request, @Body("password") password: string, @Param("id") id: string) {
    return this.usersService.changePassword(req, password, id)
  }

  @Delete("delete/:id")
  delete(@Req() req: Request, @Param("id") id: string,) {
    return this.usersService.deleteUser(req, id)
  }

  @Post("cart/add")
  add(@Req() req:Request, @Body("id") id:string){
    return this.usersService.addItemToCart(req, id)
  }
  @Patch("cart/decrease/:id")
  decrease(@Req() req:Request, @Param("id") id:string){
    return this.usersService.decreaseQuantityItemCart(req,id)
  }
  @Patch("cart/remove/:id")
  remove(@Req() req:Request, @Param("id") id:string){
    return this.usersService.removeItemFromCart(req,id)
  }

  @Patch("cart/add/:id")
  increase(@Req() req:Request, @Param("id") id:string){
    return this.usersService.increaseQuantityItemCart(req,id)
  }
  @Patch("favorites/add/:id")
  addItemToFavorites(@Req() req:Request, @Param("id") id:string){
    return this.usersService.addItemToFavorites(req,id)
  }
  @Patch("favorites/remove/:id")
  removeFromFavorites(@Req() req:Request, @Param("id") id:string){
    return this.usersService.removeItemFromFavorites(req,id)
  }

  @Post("/favorites/move-item")
  move(@Req() req:Request, @Body("id") id:string){
    return this.usersService.moveItemToCart(req,id)
  }

  @Post("send-email")
  sendMailToUser(){
    
  }
}
