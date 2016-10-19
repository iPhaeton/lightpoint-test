import Entity from "./entity.js";
import List from "../list.js";

export default class Shop extends Entity{
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