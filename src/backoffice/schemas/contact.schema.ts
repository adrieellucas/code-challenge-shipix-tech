import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: String,
        required: true,
    },
});