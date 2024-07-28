import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { OrderService } from "../services/order.service";
import { Result } from "../models/result.model";
import { CreateUpdateCustomerDto } from "../dtos/create-update-order.dto";
import { CreateUpdateOrderContract } from "../contracts/order/create-update-order.contract";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { ApiOperation } from "@nestjs/swagger";

@Controller('v1/orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    @Post('loadFromIntegration')
    @ApiOperation({ summary: 'Just save', description: 'This endpoint will always save the data' })
    async loadFromIntegration() {
        try {
            const respose = await this.orderService.loadFromIntegration();
            return new Result(null, true, respose, null);
        } catch (error) {
            throw new HttpException(new Result(null, false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('taskForLoadFromIntegration')
    @ApiOperation({ summary: 'Save if not exists or update', description: 'This endpoint save the data if not exists the id or update if exists the id' })
    async taskForLoadFromIntegration() {
        try {
            const respose = await this.orderService.taskForLoadFromIntegration();
            return new Result(null, true, respose, null);
        } catch (error) {
            throw new HttpException(new Result(null, false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateUpdateOrderContract()))
    async create(@Body() model: CreateUpdateCustomerDto) {
        try {
            const order = new CreateUpdateCustomerDto(model.type, model.weight, model.pickup, model.destination, model.items);
            const respose = await this.orderService.create(order);
            return new Result(null, true, respose, null);
        } catch (error) {
            throw new HttpException(new Result(null, false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @UseInterceptors(new ValidatorInterceptor(new CreateUpdateOrderContract()))
    async update(@Param('id') id: string, @Body() model: CreateUpdateCustomerDto) {
        try {
            const respose = await this.orderService.update(id, model);
            return new Result(null, true, respose, null);
        } catch (error) {
            throw new HttpException(new Result(null, false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        try {
            const respose = await this.orderService.get(id);
            return new Result(null, true, respose, null);
        } catch (error) {
            throw new HttpException(new Result(null, false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getAll() {
        try {
            const respose = await this.orderService.getAll();
            return new Result(null, true, respose, null);
        } catch (error) {
            throw new HttpException(new Result(null, false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}