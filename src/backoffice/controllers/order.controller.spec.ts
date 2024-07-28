import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { CreateUpdateCustomerDto } from '../dtos/create-update-order.dto';
import { Result } from '../models/result.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { OrderType } from '../enums/order-type.enum';
import { OrderService } from '../services/order.service';
import { ContactDto } from '../dtos/contact.dto';
import { ItemDto } from '../dtos/item.dto';
import { ItemType } from '../enums/item-type.enum';

describe('OrderController', () => {
    let controller: OrderController;
    let service: OrderService;

    const mockOrderService = {
        taskForLoadFromIntegration: jest.fn(),
        loadFromIntegration: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        get: jest.fn(),
        getAll: jest.fn(),
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

    describe('POST /loadFromIntegration', () => {
        it('should return a Result with mocked response', async () => {
            const mockResponse = { data: 'mocked data' };
            mockOrderService.loadFromIntegration.mockResolvedValue(mockResponse);

            const result = await controller.loadFromIntegration();
            expect(result).toMatchObject(new Result(null, true, mockResponse, null));
            expect(mockOrderService.loadFromIntegration).toHaveBeenCalledTimes(1);
        });

        it('should throw an HttpException if an error occurs', async () => {
            mockOrderService.loadFromIntegration.mockRejectedValueOnce(new Error('error'));

            await expect(controller.loadFromIntegration()).rejects.toThrow(
                new HttpException(new Result(null, false, null, 'error'), HttpStatus.BAD_REQUEST),
            );
        });
    });

    describe('POST /taskForLoadFromIntegration', () => {
        it('should return a Result with mocked response', async () => {
            const mockResponse = { data: 'mocked data' };
            mockOrderService.taskForLoadFromIntegration.mockResolvedValue(mockResponse);

            const result = await controller.taskForLoadFromIntegration();
            expect(result).toMatchObject(new Result(null, true, mockResponse, null));
            expect(mockOrderService.taskForLoadFromIntegration).toHaveBeenCalledTimes(1);
        });

        it('should throw an HttpException if an error occurs', async () => {
            mockOrderService.taskForLoadFromIntegration.mockRejectedValueOnce(new Error('error'));

            await expect(controller.taskForLoadFromIntegration()).rejects.toThrow(
                new HttpException(new Result(null, false, null, 'error'), HttpStatus.BAD_REQUEST),
            );
        });
    });

    describe('POST /', () => {
        it('should create an order and return a Result', async () => {
            const dto = new CreateUpdateCustomerDto(
                OrderType.Dryfood,
                10,
                new ContactDto('address', 'name', 'phone'),
                new ContactDto('address', 'name', 'phone'),
                [new ItemDto(ItemType.Pallet, 10, 20, 30, 1)]
            );
            const mockResponse = { id: '1', ...dto };
            mockOrderService.create.mockResolvedValue(mockResponse);

            const result = await controller.create(dto);
            expect(result).toMatchObject(new Result(null, true, mockResponse, null));
            expect(mockOrderService.create).toHaveBeenCalledWith(dto);
        });

        it('should throw an HttpException if an error occurs', async () => {
            mockOrderService.create.mockRejectedValueOnce(new Error('error'));
            const dto = new CreateUpdateCustomerDto(
                OrderType.Dryfood,
                10,
                new ContactDto('address', 'name', 'phone'),
                new ContactDto('address', 'name', 'phone'),
                [new ItemDto(ItemType.Pallet, 10, 20, 30, 1)]
            );

            await expect(controller.create(dto)).rejects.toThrow(
                new HttpException(new Result(null, false, null, 'error'), HttpStatus.BAD_REQUEST),
            );
        });
    });

    describe('PUT /:id', () => {
        it('should update an order and return a Result', async () => {
            const dto = new CreateUpdateCustomerDto(
                OrderType.Dryfood,
                10,
                new ContactDto('address', 'name', 'phone'),
                new ContactDto('address', 'name', 'phone'),
                [new ItemDto(ItemType.Pallet, 10, 20, 30, 1)]
            );
            const mockResponse = { id: '1', ...dto };
            mockOrderService.update.mockResolvedValue(mockResponse);

            const result = await controller.update('1', dto);
            expect(result).toMatchObject(new Result(null, true, mockResponse, null));
            expect(mockOrderService.update).toHaveBeenCalledWith('1', dto);
        });

        it('should throw an HttpException if an error occurs', async () => {
            mockOrderService.update.mockRejectedValueOnce(new Error('error'));
            const dto = new CreateUpdateCustomerDto(
                OrderType.Dryfood,
                10,
                new ContactDto('address', 'name', 'phone'),
                new ContactDto('address', 'name', 'phone'),
                [new ItemDto(ItemType.Pallet, 10, 20, 30, 1)]
            );

            await expect(controller.update('1', dto)).rejects.toThrow(
                new HttpException(new Result(null, false, null, 'error'), HttpStatus.BAD_REQUEST),
            );
        });
    });

    describe('GET /:id', () => {
        it('should return an order by id', async () => {
            const mockOrder = {
                id: '1',
                type: OrderType.Dryfood,
                weight: 10,
                pickup: new ContactDto('address1', 'name1', 'phone1'),
                destination: new ContactDto('address2', 'name2', 'phone2'),
                items: [new ItemDto(ItemType.Parcel, 10, 20, 30, 1)],
            };
            mockOrderService.get.mockResolvedValue(mockOrder);

            const result = await controller.get('1');
            expect(result).toMatchObject(new Result(null, true, mockOrder, null));
            expect(mockOrderService.get).toHaveBeenCalledWith('1');
        });

        it('should throw an HttpException if an error occurs', async () => {
            mockOrderService.get.mockRejectedValueOnce(new Error('error'));

            await expect(controller.get('1')).rejects.toThrow(
                new HttpException(new Result(null, false, null, 'error'), HttpStatus.BAD_REQUEST),
            );
        });
    });

    describe('GET /', () => {
        it('should return all orders', async () => {
            const mockOrders = [
                {
                    id: '1',
                    type: OrderType.Dryfood,
                    weight: 10,
                    pickup: new ContactDto('address1', 'name1', 'phone1'),
                    destination: new ContactDto('address2', 'name2', 'phone2'),
                    items: [new ItemDto(ItemType.Parcel, 10, 20, 30, 1)],
                },
                {
                    id: '2',
                    type: OrderType.Eletronics,
                    weight: 5,
                    pickup: new ContactDto('address3', 'name3', 'phone3'),
                    destination: new ContactDto('address4', 'name4', 'phone4'),
                    items: [new ItemDto(ItemType.Pallet, 15, 25, 35, 2)],
                },
            ];
            mockOrderService.getAll.mockResolvedValue(mockOrders);

            const expectedResult = new Result(null, true, mockOrders, null);

            const result = await controller.getAll();
            expect(result).toMatchObject(expectedResult);
            expect(mockOrderService.getAll).toHaveBeenCalledTimes(1);
        });

        it('should throw an HttpException if an error occurs', async () => {
            mockOrderService.getAll.mockRejectedValueOnce(new Error('error'));

            await expect(controller.getAll()).rejects.toThrow(
                new HttpException(new Result(null, false, null, 'error'), HttpStatus.BAD_REQUEST),
            );
        });
    });
});
