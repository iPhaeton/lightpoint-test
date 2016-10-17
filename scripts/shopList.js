//elem is implied to be a div and to be appended to a page

class ShopList {
    constructor (elem, list) {
        if (!elem) {
            this.elem = $("div");
            $(document.body).append(this.elem);
        } else if (!elem.is("div")){
            throw new Error ("Unacceptable element type")
        } else {
            this.elem = elem;
        };

        this.list = list;
    };

};