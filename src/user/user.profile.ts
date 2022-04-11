import { Injectable } from '@nestjs/common';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile } from '@automapper/core';
import { UserEntity } from 'user/user.schema';
import { UserBaseDto, UserDto } from 'user/user.dto';


@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, UserEntity, UserBaseDto,
                forMember(d => d.id, mapFrom(s => s._id)),
                forMember(d => d.isConfirmedEmail, mapFrom(s => !!s.token))
            );

            createMap(mapper, UserBaseDto, UserEntity,
                forMember(d => d._id, mapFrom(s => s.id))
            );

            createMap(mapper, UserEntity, UserDto,
                forMember(d => d.id, mapFrom(s => s._id)),
                forMember(d => d.isConfirmedEmail, mapFrom(s => !!s.token))
            );
        };
    }
}
