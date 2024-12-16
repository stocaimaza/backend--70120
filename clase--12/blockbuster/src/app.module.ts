import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//Importamos MongooseModule: 
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

//MiMiddleware: 
import MiMiddleware from './middleware/miMiddleware';
//Importamos el NestModule, MiddlewareConsumer

//Variables de entorno: 
//Instalamos: npm install @nestjs/config
//Importamos ConfigModule, ConfigService

import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async(config:ConfigService) => ({
      uri: config.get<string>("MONGO_URL")
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiMiddleware).forRoutes({path: "*", method: RequestMethod.ALL})
  }
}
