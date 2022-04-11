import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Types } from 'mongoose';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.schema';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private readonly userRepository: UserRepository
    ) { }

    async get(id: string): Promise<UserDto> {
        const entity = await this.userRepository.get(id);
        const dto = this.mapper.map(entity, UserEntity, UserDto);
        return dto;
    }

    async find(find?: Record<string, any>): Promise<UserDto[]> {
        const entities = await this.userRepository.find(find);
        const dtos = this.mapper.mapArray(entities, UserEntity, UserDto);
        return dtos;
    }

    delete(userId: string): Promise<void> {
        return this.userRepository.delete(userId);
    }

}
