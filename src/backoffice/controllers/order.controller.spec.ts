import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { CreateUpdateCustomerDto } from '../dtos/create-update-order.dto';
import { Result } from '../models/result.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { OrderType } from '../enums/order-type.enum';
import { OrderService } from '../services/order.service';

describe('OrderController', () => {
    let controller: OrderController;
    let service: OrderService;

    const mockOrderService = {
        loadFromIntegration: jest.fn().mockResolvedValue('mocked response'),
        create: jest.fn().mockResolvedValue('mocked order'),
        update: jest.fn().mockResolvedValue(null),
        get: jest.fn().mockResolvedValue('mocked order'),
        getAll: jest.fn().mockResolvedValue(['mocked order']),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [
                {
                    provide: OrderService,
                    useValue: mockOrderService,
                },
            ],
        }).compile();

        controller = module.get<OrderController>(OrderController);
        service = module.get<OrderService>(OrderService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('POST /v1/orders/loadFromIntegration', () => {
        it('should return a Result with mocked response', async () => {
            const result = await controller.loadFromIntegration();
            expect(result).toEqual(new Result(null, true, 'mocked response', null));
        });

        it('should throw an HttpException if an error occurs', async () => {
            jest.spyOn(service, 'loadFromIntegration').mockRejectedValueOnce(new Error('error'));
            await expect(controller.loadFromIntegration()).rejects.toThrow(
                new HttpException(new Result(null, false, null, new Error('error')), HttpStatus.BAD_REQUEST),
            );
        });
    });

    describe('POST /v1/orders', () => {
        it('should create an order and return a Result', async () => {
            const dto = new CreateUpdateCustomerDto(
                OrderType.Dryfood,
                10,
                { address: 'address', contactName: 'name', contactPhone: 'phone' },
                { address: 'address', contactName: 'name', contactPhone: 'phone' },
                []
            );
            const result = await controller.create(dto);
            expect(result).toEqual(new Result(null, true, 'mocked order', null));
        });

        it('should throw an HttpException if an error occurs', async () => {
            jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('error'));
            const dto = new CreateUpdateCustomerDto(
                OrderType.Dryfood,
                10,
                { address: 'address', contactName: 'name', contactPhone: 'phone' },
                { address: 'address', contactName: 'name', contactPhone: 'phone' },
                []
            );
            await expect(controller.create(dto)).rejects.toThrow(
                new HttpException(new Result(null, false, null, new Error('error')), HttpStatus.BAD_REQUEST),
            );
        });
    });

    describe('PUT /v1/orders/:id', () => {
        it('should update an order and return a Result', async () => {
            const dto = new CreateUpdateCustomerDto(
                OrderType.Dryfood,
                10,
                { address: 'address', contactName: 'name', contactPhone: 'phone' },
                { address: 'address', contactName: 'name', contactPhone: 'phone' },
                []
            );
            const result = await controller.update('1', dto);
            expect(result).toEqual(new Result(null, true, dto, null));
        });

        it('should throw an HttpException if an error occurs', async () => {
            jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('error'));
            const dto = new CreateUpdateCustomerDto(
                OrderType.Dryfood,
                10,
                { address: 'address', contactName: 'name', contactPhone: 'phone' },
                { address: 'address', contactName: 'name', contactPhone: 'phone' },
                []
            );
            await expect(controller.update('1', dto)).rejects.toThrow(
                new HttpException(new Result(null, false, null, new Error('error')), HttpStatus.BAD_REQUEST),
            );
        });
    });

    describe('GET /v1/orders/:id', () => {
        it('should return an order by ID', async () => {
            const result = await controller.get('1');
            expect(result).toEqual(new Result(null, true, 'mocked order', null));
        });

        it('should throw an HttpException if an error occurs', async () => {
            jest.spyOn(service, 'get').mockRejectedValueOnce(new Error('error'));
            await expect(controller.get('1')).rejects.toThrow(
                new HttpException(new Result(null, false, null, new Error('error')), HttpStatus.BAD_REQUEST),
            );
        });
    });

    describe('GET /v1/orders', () => {
        it('should return all orders', async () => {
            const result = await controller.getAll();
            expect(result).toEqual(new Result(null, true, ['mocked order'], null));
        });

        it('should throw an HttpException if an error occurs', async () => {
            jest.spyOn(service, 'getAll').mockRejectedValueOnce(new Error('error'));
            await expect(controller.getAll()).rejects.toThrow(
                new HttpException(new Result(null, false, null, new Error('error')), HttpStatus.BAD_REQUEST),
            );
        });
    });
});
