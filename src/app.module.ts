import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, AuthModule, UsersModule, ThreadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
