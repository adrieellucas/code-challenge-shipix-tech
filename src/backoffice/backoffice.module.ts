import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { OrderSchema } from './schemas/order.schema';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.servce';
import { ContactSchema } from './schemas/contact.schema';
import { ItemSchema } from './schemas/item.schema';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            {
                name: 'Order',
                schema: OrderSchema,
            },
            {
                name: 'Contact',
                schema: ContactSchema,
            },
            {
                name: 'Item',
                schema: ItemSchema,
            },
        ])
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class BackofficeModule { }
