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

        for (var shop in this.list) {
            var elem = this.listItem(this.list[shop])
            panel.append(elem);
            this.list[shop].elem = elem;
        };

        this.elem.append(panel);
    };

    setEvents () {
        $(".shop-list a").on("click", (event) => {
            var panel = $($(event.target).data("panel"));

            var table = panel.find(".commodity-table");
            if (table.length) {
                table.toggle("hidden");
            } else {
                panel.append(this.commodityTable(this.list[panel.attr("id")].commodities));
            };
        })
    };

    listItem (shop) {
        return `<div class="panel panel-primary">
                    <div class="panel-heading" data-target="#panel-${shop.number}" data-toggle="collapse" data-parent="#shop-list">
                        <h3 class="panel-title">
                            ${shop.number}. ${shop.name}
                        </h3>
                    </div>
                    <div class="panel-collapse collapse" id="panel-${shop.number}">
                        <div class="panel-body" id="${shop.number}">
                            <h3>${shop.name}</h3>
                            <p>Адрес: ${shop.address}</p>
                            <p>Мы работаем: ${shop.hours}</p>
                            <a class="show-commodities" href="#" data-panel="#${shop.number}">Показать товары</a>
                        </div>
                    </div>
                </div>`;
    };

    commodityTable (commodities) {
        var tmpl = _.template(`<table class="table commodity-table">
            <thead>
                <tr>
                    <td>
                        <h4>Товар</h4>
                    </td>
                    <td>
                        <h4>Описание</h4>
                    </td>
                </tr>
            </thead>
            <% for (var commodity of commodities) {%>
                <tr>
                    <td>
                        <%=commodity.name%>
                    </td>
                    <td>
                        <%=commodity.description%>
                    </td>
                </tr>
            <%}%>
        </table>`);

        return tmpl({commodities});
    }
};