import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "./user.enum";

export class UserBaseDto {

    public constructor(init?: Partial<UserBaseDto | UserDto>) {
        Object.assign(this, init);
    }

    @ApiProperty({
        required: false,
        readOnly: true
    })
    @AutoMap()
    id: string;

    @ApiProperty({
        enum: UserRole,
        example: UserRole.Student,
    })
    @IsEnum(UserRole)
    @AutoMap()
    role: UserRole;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @AutoMap()
    firstName: string;

    @ApiProperty({ required: false })
    @IsString()
    @MinLength(3)
    @AutoMap()
    lastName?: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    @AutoMap()
    email: string;

    @ApiProperty()
    @IsBoolean()
    @AutoMap()
    isConfirmedEmail: boolean;

    @ApiProperty({ 
        required: false,
        readOnly: true
    })
    @IsString()
    @IsOptional()
    @AutoMap()
    avatar?: string;

    get fullName() { return `${this.firstName??''} ${this.lastName??''}` }
}

export class UserDto extends UserBaseDto {
    @ApiProperty({
        type: UserBaseDto,
        required: false,
        readOnly: true
    })
    //@AutoMap(() => UserBaseDto)
    parent: UserBaseDto;

    @ApiProperty({
        type: UserBaseDto,
        required: false,
        readOnly: true
    })
    @AutoMap(() => UserBaseDto)
    trainer: UserBaseDto;

}

