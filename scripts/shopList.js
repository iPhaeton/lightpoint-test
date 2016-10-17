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

        $("#add-button").on("click", () => {

            var shop = new Shop ({
                name: "Shop",
                address: "",
                hours: ""
            });
            this.list.add(shop);
            var newItem = $(this.listItem(shop));
            $(".shop-list").append(newItem);
            this.setEvents();
        });
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
            var target = $(event.target);

            if(target.hasClass("title-button")) return;

            var panel = $(target.data("panel"));

            var table = panel.find(".commodity-table");
            if (table.length) {
                table.toggle("hidden");
            } else {
                panel.append(this.commodityTable(this.list[panel.attr("id")].commodities));
            };
        })

        $(".edit-button").on("click", (event) => {
            var panel = $($(event.target).data("panel"));
            if (!panel.parent().hasClass("in")) return;

            var shop = this.list[panel.attr("id")];
            panel.html(this.editItem(shop));

            $(".shop-edit").on("submit", (event) => {
                event.preventDefault();

                var form = $(event.target);
                var item = $(form.data("item"));

                shop.name = $("#name-input").val();
                shop.address = $("#address-input").val();
                shop.hours = $("#hours-input").val();
                var newItem = $(this.listItem(shop));

                item.after(newItem);
                item.remove();
            });
        });

        $(".remove-button").on("click", () => {
            var button = $(event.target);
            var item = $(button.data("item"));
            delete this.list[item.data("shop")];
            item.remove();
        });
    };

    listItem (shop) {
        return `<div class="panel panel-primary" id="item-${shop.number}" data-shop="${shop.number}">
                    <div class="panel-heading">
                        <h3 class="panel-title" data-target="#panel-${shop.number}" data-toggle="collapse" data-parent="#shop-list">
                            ${shop.number}. ${shop.name}
                        </h3>
                        <div class="navbar list-menu">
                            <ul class="nav navbar-nav">
                                <li>
                                    <a role="presentation" href="#" data-panel="#${shop.number}" class="title-button edit-button">
                                        Редактировать
                                    </a>
                                </li>
                                <li>
                                    <a role="presentation" href="#" data-item="#item-${shop.number}" class="title-button remove-button">
                                        Удалить
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="clearfix"></div>
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
    };

    editItem (shop) {
        return `<form class="shop-edit" data-item="#item-${shop.number}" data-shop="${shop.number}">
            <div class="form-group input-group">
                <label for="name-input">Название</label>
                <input id="name-input" type="text" class="form-control" name="name-input" value="${shop.name}">
            </div>
            <div class="form-group input-group">
                <label for="address-input">Адрес</label>
                <input id="address-input" type="text" class="form-control" name="address-input" value="${shop.address}">
            </div>
            <div class="form-group input-group">
                <label for="hours-input">Время работы</label>
                <input id="hours-input" type="text" class="form-control" name="hours-input" value="${shop.hours}">
            </div>
            <a class="show-commodities" href="#" data-panel="#${shop.number}">Показать товары</a>
            <button type="submit" class="btn btn-default">Сохранить</button>
        </form>`
    };
};