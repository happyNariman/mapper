import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

import { LoggerMiddleware } from './middlewares';
import { DatabaseService } from './user/database.service';
import { UserModule } from 'user/user.module';
import { UserController } from 'user/User.controller';
import { UserService } from 'user/user.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: false,
            isGlobal: true,
            cache: true,
            envFilePath: ['.env'],
        }),
        // MongooseModule.forRootAsync({
        //     inject: [DatabaseService],
        //     imports: [UserModule],
        //     useFactory: (databaseService: DatabaseService) =>
        //         databaseService.createMongooseOptions(),
        // }),
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
            namingConventions: new CamelCaseNamingConvention(),
        }),
        UserModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
