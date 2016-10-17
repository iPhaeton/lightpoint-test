//options = {
//  address: address
//  hours: working hours
//  number: position in a list
//}

class Shop extends Entity{
    constructor (options) {
        super(options.name);
        this.address = options.address;
        this.hours = options.hours;
        this.number = options.number;
    };

    addCommodity (commodity) {
        if (!this.commodities) this.commodities = new Set();
        else this.commodities.add(commodity);
    };
};