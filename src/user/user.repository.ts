import { Model, Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './user.schema';

@Injectable()
export class UserRepository {
    constructor(
        //@InjectModel(UserEntity.name) private userModel: Model<UserEntity>
    ) { }

    private data = [
        {
            "_id": "6234b750de0583e1ecc61c61",
            "role": "parent",
            "firstName": "Alsu",
            "lastName": "Test",
            "email": "momo@mail.co",
            "token": "45454"
        },
        {
            "_id": "6234b7f6de0583e1ecc61c66",
            "role": "trainer",
            "firstName": "Виктор",
            "lastName": "Петров",
            "email": "vp@mail.co",
            "token": "3532"
        },
        {
            "_id": "6234b986de0583e1ecc61c6b",
            "role": "student",
            "firstName": "Артем",
            "lastName": "Мызров",
            "email": "miz@mail.co",
            "token": "3532",
            "parent": {
                "_id": "6234b750de0583e1ecc61c61",
                "role": "parent",
                "firstName": "Alsu",
                "lastName": "Test",
                "email": "momo@mail.co",
                "token": "3532"
            },
            "trainer": {
                "_id": "6234b7f6de0583e1ecc61c66",
                "role": "trainer",
                "firstName": "Виктор",
                "lastName": "Петров",
                "email": "vp@mail.co",
                "token": "3532"
            }
        },
        {
            "_id": "6241a79425dc8239ebe56457",
            "role": "student",
            "firstName": "Татьяна",
            "lastName": "Иванова",
            "email": "momo_2@gmail.com",
            "token": "4346",
            "parent": {
                "_id": "6234b750de0583e1ecc61c61",
                "role": "parent",
                "firstName": "Alsu",
                "lastName": "Test",
                "email": "momo@mail.co",
                "token": "3532"
            },
            "trainer": {
                "_id": "6234b7f6de0583e1ecc61c66",
                "role": "trainer",
                "firstName": "Виктор",
                "lastName": "Петров",
                "email": "vp@mail.co",
                "token": "3532"
            }
        },
        {
            "_id": "6241df20bf8558b2a78c2d3d",
            "role": "student",
            "firstName": "Коля",
            "lastName": "Петров",
            "email": "aaa@mail.co",
            "token": null,
            "parent": {
                "_id": "6234b750de0583e1ecc61c61",
                "role": "parent",
                "firstName": "Alsu",
                "lastName": "Test",
                "email": "momo@mail.co",
                "token": "3532"
            },
            "trainer": {
                "_id": "6234b7f6de0583e1ecc61c66",
                "role": "trainer",
                "firstName": "Виктор",
                "lastName": "Петров",
                "email": "vp@mail.co",
                "token": "3532"
            }
        }
    ] as any;

    async find(find?: Record<string, any>): Promise<UserEntity[]> {
        return this.data;
        // return this.userModel
        //     .find(find)
        //     .populate({
        //         path: 'parent',
        //         model: UserEntity.name,
        //     })
        //     .populate({
        //         path: 'trainer',
        //         model: UserEntity.name,
        //     })
        //     .lean();
    }

    async findOne(find?: Record<string, any>): Promise<UserEntity> {
        return null;
        // return this.userModel
        //     .findOne(find)
        //     .populate({
        //         path: 'parent',
        //         model: UserEntity.name,
        //     })
        //     .populate({
        //         path: 'trainer',
        //         model: UserEntity.name,
        //     })
        //     .lean();
    }

    async get(userId: string): Promise<UserEntity> {
        return null;
        // return this.userModel
        //     .findById(userId)
        //     .populate({
        //         path: 'parent',
        //         model: UserEntity.name,
        //     })
        //     .populate({
        //         path: 'trainer',
        //         model: UserEntity.name,
        //     })
        //     .lean();
    }

    async delete(userId: string) {
        // const existingUser = await this.userModel
        //     .findByIdAndUpdate(
        //         { _id: userId },
        //         {
        //             removedAt: new Date(new Date().toUTCString())
        //         },
        //     )
        //     .exec();

        // if (!existingUser)
        //     throw new NotFoundException(`User #${userId} not found`);
    }

}
