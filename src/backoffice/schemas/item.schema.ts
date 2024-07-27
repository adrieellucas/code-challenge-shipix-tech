import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
});