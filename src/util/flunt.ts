export class Flunt {
    constructor(
        public errors: any[] = []
    ) { }

    isRequired(value, message) {
        if (!value || value.length <= 0) {
            this.errors.push(message);
        }
    }

    hasMinLen = (value, min, message) => {
        if (!value || value.length < min) {
            this.errors.push(message);
        }
    }

    hasMaxLen = (value, max, message) => {
        if (!value || value.length > max) {
            this.errors.push(message);
        }
    }

    isFixedLen = (value, len, message) => {
        if (value.length !== len) {
            this.errors.push(message);
        }
    }

    isEmail = (value, message) => {
        const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(value)) {
            this.errors.push(message);
        }
    }

    isNotNull = (value, message) => {
        if (!value.length) {
            this.errors.push(message);
        }
    }

    isGreaterThan = (valuea, valueb, message) => {
        if (valuea > valueb) {
            this.errors.push(message);
        }
    }

    clear() {
        this.errors = [];
    }

    isValidType(value: any, type: object, message: string) {
        const validValues = Object.values(type);
        if (!validValues.includes(value)) {
            this.errors.push(message);
        }
    }

    areValidTypes(values: any[], type: object, message: string) {
        console.log(values);
        console.log(type);
        const validValues = Object.values(type);
        values.forEach(value => {
            if (!validValues.includes(value)) {
                this.errors.push(message);
            }
        });
    }

    isArray(value: any, message: string) {
        if (!Array.isArray(value)) {
            this.errors.push(message);
        }
    }

    isArrayNotEmpty(value: any, message: string) {
        if (!Array.isArray(value) || value.length === 0) {
            this.errors.push(message);
        }
    }

    isValid() {
        return this.errors.length === 0;
    }
}