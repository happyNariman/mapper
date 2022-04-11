import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    MongooseOptionsFactory,
    MongooseModuleOptions,
} from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
    private readonly logger = new Logger(DatabaseService.name);
    private readonly host: string;
    private readonly port: string;
    private readonly database: string;
    private readonly user: string;
    private readonly password: string;
    private readonly srv: boolean;
    private readonly admin: boolean;
    private readonly ssl: boolean;
    private readonly debug: boolean;
    private readonly options: string;
    private readonly env: string;

    constructor(private readonly configService: ConfigService) {
        this.env = this.configService.get<string>('APP_ENV');
        this.host = this.configService.get<string>('DATABASE_HOST');
        this.port = this.configService.get<string>('DATABASE_PORT');
        this.database = this.configService.get<string>('DATABASE_NAME');
        this.user = this.configService.get<string>('DATABASE_USER');
        this.password = this.configService.get<string>('DATABASE_PASSWORD');
        this.srv = this.configService.get<boolean>('database.srv');
        this.admin = this.configService.get<boolean>('DATABASE_ADMIN');
        this.ssl = this.configService.get<boolean>('database.ssl');
        this.debug = this.configService.get<boolean>('database.debug');
        this.options = this.configService.get<string>('database.options')
            ? `?${this.configService.get<string>('database.options')}`
            : '';
        const aa = this.configService.get<string>('NODE_ENV');
    }

    createMongooseOptions(): MongooseModuleOptions {
        const uri = `mongodb${this.srv ? '+srv' : ''}://${this.host}:${this.port}/${this.database
            }${this.options}`;

        if (this.env !== 'production') {
            mongoose.set('debug', this.debug);
        }

        const mongooseOptions: MongooseModuleOptions = {
            uri,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useMongoClient: true
        };

        if (this.admin) {
            mongooseOptions.authSource = 'admin';
        }

        if (this.user && this.password) {
            mongooseOptions.auth = {
                username: this.user,
                password: this.password,
            };
        }

        if (this.ssl) {
            mongooseOptions.ssl = true;
        }

        //this.logger.log(mongooseOptions);

        return mongooseOptions;
    }
}
