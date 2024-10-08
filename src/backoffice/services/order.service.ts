import { InjectModel } from "@nestjs/mongoose";
import { HttpService } from "@nestjs/axios";
import { Model } from "mongoose";
import { Order } from "../models/order/order.model";
import { lastValueFrom } from "rxjs";
import { CreateUpdateCustomerDto } from "../dtos/create-update-order.dto";

export class OrderService {
    constructor(
        @InjectModel('Order') private readonly model: Model<Order>,
        private readonly httpService: HttpService,
    ) { }

    //just save in database
    async loadFromIntegration(): Promise<Order[]> {
        const response = await lastValueFrom(this.httpService.get<Order[]>(process.env.LOAD_ORDERS));
        const data = response.data;

        return await this.model.insertMany(data);
    }

    //save if not exists or update (can be use from job, bullmq, etc...)
    async taskForLoadFromIntegration() {
        const response = await lastValueFrom(this.httpService.get<Order[]>(process.env.LOAD_ORDERS));
        const data = response.data;

        const bulkOps = data.map(order => ({
            updateOne: {
                filter: { id: order.id },
                update: order,
                upsert: true,
            },
        }));

        return await this.model.bulkWrite(bulkOps);
    }

    async create(data: CreateUpdateCustomerDto): Promise<Order> {
        const order = new this.model(data);
        return await order.save();
    }

    async update(id: string, data: CreateUpdateCustomerDto): Promise<Order> {
        return await this.model.findOneAndUpdate({ id }, data);
    }

    async get(id: string): Promise<Order> {
        return await this.model.findOne({ id })
            .exec();
    }

    async getAll(): Promise<Order[]> {
        return await this.model.find({}, '')
            .sort('type')
            .exec();
    }
}