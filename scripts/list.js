class List {
    constructor () {
        Object.defineProperty(this, "length", {iterable: false, value: 1, writable: true});
    };

    add (value) {
        value.number = this.length;
        this[this.length++] = value;
    }
};