import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserRole } from './user.enum';

@Schema({ timestamps: true, versionKey: false })
export class UserEntity {

    @AutoMap()
    _id: string;

    @Prop({
        required: true,
        enum: UserRole
    })
    @AutoMap()
    role: UserRole;

    @Prop({
        required: true,
        index: true,
        trim: true,
    })
    @AutoMap()
    firstName: string;

    @Prop({
        required: false,
        index: true,
        trim: true,
    })
    @AutoMap()
    lastName?: string;

    @Prop({
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true,
    })
    @AutoMap()
    email: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop()
    @AutoMap()
    token?: string;

    @Prop()
    @AutoMap()
    avatar?: string;

    @Prop({
        required: true
    })
    createdAt: Date;

    @Prop()
    removedAt?: Date;

    @Prop({
        type: Types.ObjectId,
        ref: UserEntity.name
    })
    @AutoMap(() => UserEntity)
    parent?: Types.ObjectId | UserEntity;

    @Prop({
        type: Types.ObjectId,
        ref: UserEntity.name
    })
    @AutoMap(() => UserEntity)
    trainer?: Types.ObjectId | UserEntity;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
