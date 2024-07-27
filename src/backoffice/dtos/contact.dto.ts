import { ApiProperty } from "@nestjs/swagger";

export class ContactDto {
    @ApiProperty({ description: 'Destination address' })
    address: string;

    @ApiProperty({ description: 'Name of the contact person for the destination' })
    contactName: string;

    @ApiProperty({ description: 'Phone number of the contact person for the destination' })
    contactPhone: string;

    constructor(
        address: string,
        contactName: string,
        contactPhone: string
    ) {
        this.address = address;
        this.contactName = contactName;
        this.contactPhone = contactPhone;
    }
}