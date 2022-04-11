import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { UserController } from './User.controller';
import { UserProfile } from './user.profile';
import { UserRepository } from './user.repository';
import { UserEntity, UserSchema } from './user.schema';
import { UserService } from './User.service';

@Module({
    imports: [
        // MongooseModule.forFeature([
        //     { collection: 'users', name: UserEntity.name, schema: UserSchema },
        // ])
    ],
    controllers: [
        //UserController
    ],
    providers: [
        UserProfile,
        //UserService,
        UserRepository,

        DatabaseService
    ],
    exports: [
        DatabaseService,
        //UserService,
        UserRepository
    ]
})
export class UserModule { }