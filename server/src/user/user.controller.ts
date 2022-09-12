import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateUserDTO } from './dto/create.dto';
import { UserRoles } from './entities/role.entity';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/get/roles')
  async getUserRoles(): Promise<UserRoles[]> {
    return await this.userService.getUserRoles()
  }

  @Get('/getAll')
  async getAll(@Query('cursor') cursor?: string): Promise<{ users: User[], count: number }> {
    return await this.userService.getAll(cursor)
  }

  @Get('/find')
  async findUsers(@Query('name') name: string): Promise<User[]> {
    return await this.userService.findUsers(name)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(
    @Request() req
  ): Promise<User> {
    return await this.userService.getProfile(req.user)
  }

  @Post('/create')
  async createNewUser(
    @Body() user: CreateUserDTO
  ): Promise<User> {
    return await this.userService.createUser(user)
  }

}
