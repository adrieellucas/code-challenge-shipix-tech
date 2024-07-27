import * as mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import { ItemSchema } from './item.schema';
import { ContactSchema } from './contact.schema';

export const OrderSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: false,
    },
    pickup: {
        type: ContactSchema,
        required: true,
    },
    destination: {
        type: ContactSchema,
        required: true,
    },
    items: {
        type: [ItemSchema],
        required: true
    },
});
