import { Module } from '@nestjs/common';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
