import { Injectable } from "@nestjs/common";
import { Flunt } from "src/util/flunt";
import { Contract } from "../contract";
import { Order } from "src/backoffice/models/order/order.model";
import { OrderType } from "src/backoffice/enums/order-type.enum";
import { ItemType } from "src/backoffice/enums/item-type.enum";

@Injectable()
export class CreateUpdateOrderContract implements Contract {
    errors: string[] = [];

    validate(model: Order): boolean {
        const flunt = new Flunt();

        flunt.isRequired(model.pickup, 'Pickup is required')
        flunt.isRequired(model.destination, 'Destination is required')
        flunt.isRequired(model.items, 'Items are required')
        flunt.isRequired(model.type, 'Type is required')
        flunt.isValidType(model.type, OrderType, 'Invalid order type');

        this.validatePickup(model.pickup, flunt);
        this.validateDestination(model.destination, flunt);
        this.validateItems(model.items, flunt);

        this.errors = flunt.errors;
        return flunt.isValid();
    }

    private validatePickup(pickup: any, flunt: Flunt) {
        flunt.isRequired(pickup, 'Pickup information is required');
        flunt.isRequired(pickup.address, 'Pickup address is required');
        flunt.isRequired(pickup.contactName, 'Pickup contact name is required');
        flunt.isRequired(pickup.contactPhone, 'Pickup contact phone is required');
    }

    private validateDestination(destination: any, flunt: Flunt) {
        flunt.isRequired(destination, 'Destination information is required');
        flunt.isRequired(destination.address, 'Destination address is required');
        flunt.isRequired(destination.contactName, 'Destination contact name is required');
        flunt.isRequired(destination.contactPhone, 'Destination contact phone is required');
    }

    private validateItems(items: any[], flunt: Flunt) {
        flunt.isArrayNotEmpty(items, 'Items must be a non-empty array');

        items.forEach((item, index) => {
            flunt.isRequired(item.type, `Item type at index ${index} is required`);
            flunt.isRequired(item.length, `Item length at index ${index} is required`);
            flunt.isRequired(item.width, `Item width at index ${index} is required`);
            flunt.isRequired(item.height, `Item height at index ${index} is required`);
            flunt.isRequired(item.weight, `Item weight at index ${index} is required`);
            flunt.isValidType(item.type, ItemType, `Item type at index ${index} is invalid`);
        });
    }
}
