//options = {
//  description: description
//}

class Commodity extends Entity{
    constructor (options) {
        super(options.name);
        this.description = options.description;
    };
}