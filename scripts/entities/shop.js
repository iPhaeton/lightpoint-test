//options = {
//  address: address
//  hours: working hours
//  number: position in a list
//}

class Shop extends Entity{
    constructor (options) {
        super(options.name, options.number);
        this.address = options.address;
        this.hours = options.hours;
    };

    addCommodity (commodity) {
        if (!this.commodities) this.commodities = new List();
        this.commodities.add(commodity);
    };
};