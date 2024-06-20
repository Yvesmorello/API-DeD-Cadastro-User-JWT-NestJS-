import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategies';
import { CharacterModule } from '../characters/character.module';

@Module({
  imports: [
    UserModule, CharacterModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
