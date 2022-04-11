import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiOperation({ tags: ['user'], summary: 'Get/Search/All users' })
    get(): Promise<UserDto[]> {
        return this.userService.find();
    }

}
