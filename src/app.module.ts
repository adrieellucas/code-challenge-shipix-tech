import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.CONNECTION_STRING || 'mongodb://mongoadriel:euhru334@localhost:1500/admin'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
