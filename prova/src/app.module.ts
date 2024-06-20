import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guards';
import { RequestLogSchema } from './log/request-log.schema';
import { RequestLogService } from './log/request-log.service';
import { LoggerMiddleware } from './log/logger.middleware';
import { CharacterModule } from './characters/character.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost/nest'),
             MongooseModule.forFeature([{ name: 'RequestLog', schema: RequestLogSchema }]),
             UserModule, CharacterModule, AuthModule, LogModule],
  providers: [ { provide: APP_GUARD, useClass: JwtAuthGuard}, RequestLogService]

})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}