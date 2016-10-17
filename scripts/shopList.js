//elem is implied to be a div and to be appended to a page

class ShopList {
    constructor (elem, list) {
        if (!elem) {
            this.elem = $("<div></div>");
            $(document.body).append(this.elem);
        } else if (!elem.is("div")){
            throw new Error ("Unacceptable element type")
        } else {
            this.elem = elem;
        };

        this.list = list;
    };

    render () {
        var panel = $("<div class='panel-group shop-list' id='shop-list'></div>");

        for (var shop of this.list) {
            var elem = this.listItem(shop)
            panel.append(elem);
            shop.elem = elem;
        };

        this.elem.append(panel);
    };

    listItem (data) {
        return `<div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title" data-target="#panel-${data.number}" data-toggle="collapse" data-parent="#shop-list">
                            ${data.number}. ${data.name}
                        </h3>
                    </div>
                    <div class="panel-collapse collapse" id="panel-${data.number}">
                        <div class="panel-body">
                            <h3>${data.name}</h3>
                            <p>Адрес: ${data.address}</p>
                            <p>Мы работаем: ${data.hours}</p>
                        </div>
                    </div>
                </div>`;
    };
};