import { OrderType } from "src/backoffice/enums/order-type.enum";
import { Contact } from "./contact.model";
import { Item } from "./item.model";

export class Order {
    constructor(
        public id: string,
        public type: OrderType,
        public weight: number | null,
        public pickup: Contact,
        public destination: Contact,
        public items: Item[],
    ) { }
}
