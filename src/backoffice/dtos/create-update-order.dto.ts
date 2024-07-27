import { ApiProperty } from '@nestjs/swagger';
import { OrderType } from "../enums/order-type.enum";
import { ContactDto } from "./contact.dto";
import { ItemDto } from "./item.dto";

export class CreateUpdateCustomerDto {
    @ApiProperty({ description: 'The type of the order', enum: OrderType })
    type: OrderType;

    @ApiProperty({ description: 'The weight of the order, in kilograms', nullable: true })
    weight: number | null;

    @ApiProperty({ description: 'Pickup details', type: () => ContactDto })
    pickup: ContactDto;

    @ApiProperty({ description: 'Destination details', type: () => ContactDto })
    destination: ContactDto;

    @ApiProperty({ description: 'List of items in the order', type: [ItemDto] })
    items: ItemDto[];

    constructor(
        type: OrderType,
        weight: number | null,
        pickup: ContactDto,
        destination: ContactDto,
        items: ItemDto[],
    ) {
        this.type = type;
        this.weight = weight;
        this.pickup = pickup;
        this.destination = destination;
        this.items = items;
    }
}