class List {
    constructor () {
        Object.defineProperty(this, "length", {iterable: false, value: 1, writable: true});
    };

    add (value) {
        value.number = this.length;
        this[this.length++] = value;
    };

    delete (prop) {
        delete this[prop];
        for (var i = prop; i < this.length-1; i++) {
            this[i] = this[i+1];
            this[i].number = i;
        };
        delete this[this.length-1];
        this.length--;
    };
};