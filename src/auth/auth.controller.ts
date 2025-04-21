import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { UserDto } from '../users/users.dto';
import { AuthDto } from './auth.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

interface GoogleRequest extends Omit<Request, "user"> {
  user: {
    id:string;
    email:string;
    provider:string;
    name:string;
    avatar:string;
    jwtToken:string
  }
}

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
  login(@Body("email") email:string, @Body("password") password:string, @Body("twoStepsAuthCode") twoStepsAuthCode:string):Promise<{user:UserDto} & AuthDto | {twoStepsAuth:boolean}>{
    return this.authService.login(email,password, twoStepsAuthCode)
  }
  @Post("verify")
  verify(@Req() req:Request){
    return this.authService.verifyUser(req)
  }
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async authGoogle(){

  }
  @Get("google/redirect")
  @UseGuards(AuthGuard("google"))
  async googleRedirect(@Req()req:GoogleRequest, @Res() res:Response){
    const {jwtToken} = req.user 
    return res.redirect(`http://localhost:5173/login?token=${jwtToken}`)
  }

  @Get("github")
  @UseGuards(AuthGuard("github"))
  async authGithub(){

  }

  @Get("github/redirect")
  @UseGuards(AuthGuard("github"))
  async githubRedirect(@Req()req:GoogleRequest, @Res() res:Response){
    const {jwtToken} = req.user 
    return res.redirect(`http://localhost:5173/login?token=${jwtToken}`)
  }
}
