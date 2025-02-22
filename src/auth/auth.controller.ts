import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { UserDto } from '../users/users.dto';
import { AuthDto } from './auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @ApiBody({required:true, schema: {
    example: {
      email: "user@user.com",
      password: "User1234"
    }
  }})
  @Post("login")
  login(@Body("email") email:string, @Body("password") password:string):Promise<{user:UserDto} & AuthDto>{
    return this.authService.login(email,password)
  }
  @Post("verify")
  verify(@Req() req:Request){
    return this.authService.verifyUser(req)
  }
}
