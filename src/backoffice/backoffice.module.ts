import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { OrderSchema } from './schemas/order.schema';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            {
                name: 'Order',
                schema: OrderSchema,
            },
        ])
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class BackofficeModule { }
