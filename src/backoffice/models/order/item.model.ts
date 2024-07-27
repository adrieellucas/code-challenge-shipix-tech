import { ItemType } from "src/backoffice/enums/item-type.enum";

export class Item {
    constructor(
        public type: ItemType,
        public length: number,
        public width: number,
        public height: number,
        public weight: number,
    ) { }
}
