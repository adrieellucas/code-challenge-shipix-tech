import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.CONNECTION_STRING || 'mongodb://unccst:PAunSSccWOstRD@localhost:1500/admin'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
