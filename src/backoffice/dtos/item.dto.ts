import { ApiProperty } from "@nestjs/swagger";
import { ItemType } from "../enums/item-type.enum";

export class ItemDto {
    @ApiProperty({ description: 'Type of the item', enum: ItemType })
    type: ItemType;

    @ApiProperty({ description: 'Length of the item, in centimeters' })
    length: number;

    @ApiProperty({ description: 'Width of the item, in centimeters' })
    width: number;

    @ApiProperty({ description: 'Height of the item, in centimeters' })
    height: number;

    @ApiProperty({ description: 'Weight of the item, in kilograms' })
    weight: number;

    constructor(
        type: ItemType,
        length: number,
        width: number,
        height: number,
        weight: number
    ) {
        this.type = type;
        this.length = length;
        this.width = width;
        this.height = height;
        this.weight = weight;
    }
}
