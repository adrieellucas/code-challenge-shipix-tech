import { ItemType } from "../enums/item-type.enum";
import { OrderType } from "../enums/order-type.enum";

export class CreateUpdateCustomerDto {
    constructor(
        public type: OrderType,
        public weight: number | null,
        public pickup: {
            address: string;
            contactName: string;
            contactPhone: string;
        },
        public destination: {
            address: string;
            contactName: string;
            contactPhone: string;
        },
        public items: {
            type: ItemType;
            length: number;
            width: number;
            height: number;
            weight: number;
        }[],
    ) { }
}
