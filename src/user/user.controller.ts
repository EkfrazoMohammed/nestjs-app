import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @UseGuards(JwtGuard)  // Protect routes using the custom JWT guard
  @Post('protected')
  getProtectedRoute() {
    return { message: 'This is a protected route' };
  }
}
