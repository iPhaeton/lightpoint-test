import Entity from "./entity.js";
import List from "../list.js";

//options = {
//  description: description
//}

export default class Commodity extends Entity{
    constructor (options) {
        super(options.name);
        this.description = options.description;
    };
}