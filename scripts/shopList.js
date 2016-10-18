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

        $("#add-button").on("click", this.add.bind(this));
    };

    render () {
        this.elem.html("");

        var panel = $("<div class='panel-group shop-list' id='shop-list'></div>");

        for (var shop in this.list) {
            var elem = this.listItem(this.list[shop])
            panel.append(elem);
            this.list[shop].elem = elem;
        };

        this.elem.append(panel);

        this.mover = new Mover(".panel-heading", ".shop-list-item", this);

        this.setEvents();
    };

    setEvents () {
		this.unsetEvents();
		
        $(".shop-list a").on("click", this.showCommodities.bind(this));
        $(".edit-button").on("click", this.edit.bind(this));
        $(".remove-button").on("click", this.remove.bind(this));
    };
	
	unsetEvents () {
		$(".shop-list a").off("click");
		$(".edit-button").off("click");
		$(".remove-button").off("click");
	};
	
//Event listeners------------------------------------------------------------------------------------------------------------------------------------	
	showCommodities (event) {
		var target = $(event.target);

        if(target.hasClass("title-button")) return;

        var panel = $(target.data("panel"));

        var table = panel.find(".commodity-table");
        if (table.length) {
            table.toggle("hidden");
        } else {
            panel.append(this.commodityTable(this.list[panel.attr("id")].commodities, panel.attr("id")));
        };

		$(".edit-com").off("click")
		$(".edit-com").on("click", this.editCommodity.bind(this));
		$(".remove-com").off("click");
		$(".remove-com").on("click", this.removeCommodity.bind(this));
		$(".add-com").off("click");
		$(".add-com").on("click", this.addCommodity.bind(this));
	};
	
	add () {
		var shop = new Shop ({
                name: "Shop",
                address: "",
                hours: ""
            });
        this.list.add(shop);
        var newItem = $(this.listItem(shop));
		//newItem.find(".edit-button").click();
        $(".shop-list").append(newItem);
        this.setEvents();
        this.render();
	};
	
	remove (event) {
		var button = $(event.target);
        var item = $(button.data("item"));
        this.list.delete(item.data("shop"));
        item.remove();
        this.render();
	};
	
	edit (event) {
		var panel = $($(event.target).data("panel"));
        //if (!panel.parent().hasClass("in")) return;
		panel.parent().collapse("show");

        var shop = this.list[panel.attr("id")];
        panel.html(this.editItem(shop));

		$(".shop-edit").off("submit");
        $(".shop-edit").on("submit", {shop: shop}, this.shopSubmit.bind(this));
	};
	
	shopSubmit (event) {
		event.preventDefault();
		
		var shop = event.data.shop;

        var form = $(event.target);
        var item = $(form.data("item"));

        shop.name = $("#name-input").val();
        shop.address = $("#address-input").val();
        shop.hours = $("#hours-input").val();
        var newItem = $(this.listItem(shop));

        item.after(newItem);
        item.remove();
		this.setEvents();
        this.render();
	};
	
	editCommodity (event) {
		var target = $(event.target);
		var shop = target.data("shop");
		var commodity = target.data("com");
		
		var row = target.closest("tr");
		row.html(this.editTable(this.list[shop].commodities[commodity], shop));
		
		$(".save-com").off("click");
		$(".save-com").on("click", this.saveCommodity.bind(this));
	};
	
	saveCommodity (event) {
		var target = $(event.target);
		var row = target.closest("tr");
		var tds = row.find("td");
		
		var shop = target.data("shop");
		var commodity = target.data("com");
		commodity = this.list[shop].commodities[commodity];
		
		tds.each((i, td) => {
			var input = $(td).find("input");
			if (!input.length) return;
			commodity[input.attr("id")] = input.val();
		});
		
		row.html(this.commodityLine(commodity, shop));
		$(".edit-com").off("click");
		$(".edit-com").on("click", this.editCommodity.bind(this));
		$(".remove-com").off("click");
		$(".remove-com").on("click", this.removeCommodity.bind(this));
		$(".add-com").off("click");
		$(".add-com").on("click", this.addCommodity.bind(this));
	};
	
	removeCommodity (event) {
		var target = $(event.target);
		var row = target.closest("tr");
		var shop = target.data("shop");
		var commodity = target.data("com");
		delete this.list[shop].commodities[commodity];
		row.remove();
	};
	
	addCommodity (event) {
		var target = $(event.target);
		var nextRow = $(target.closest("tr"));
		var shop = target.data("shop");
		var commodity = new Commodity({name: "", description: ""});
		this.list[shop].commodities.add(commodity);
		
		var row = $("<tr></tr>");
		row.append(this.editTable(commodity, shop));
		nextRow.before(row);
		
		$(".save-com").off("click");
		$(".save-com").on("click", this.saveCommodity.bind(this));
	}

//Templates-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    listItem (shop) {
        return `<div class="panel panel-primary shop-list-item" id="item-${shop.number}" data-shop="${shop.number}">
                    <div class="panel-heading">
                        <h3 class="panel-title" data-target="#panel-${shop.number}" data-toggle="collapse" data-parent="#shop-list">
                            ${shop.number}. ${shop.name}
                        </h3>
                        <div class="navbar list-menu">
                            <ul class="nav navbar-nav">
                                <li>
                                    <a href="#" data-panel="#${shop.number}" class="title-button edit-button">
                                        Редактировать
                                    </a>
                                </li>
                                <li>
                                    <a href="#" data-item="#item-${shop.number}" class="title-button remove-button">
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

    commodityTable (commodities, shopNum) {
        var tmpl = _.template(`<table class="table commodity-table" id="table-${shopNum}">
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
			<tbody>
				<% for (var commodity in commodities) {%>
					<tr>
						<%=self.commodityLine(commodities[commodity], ${shopNum})%>
					</tr>
				<%}%>
				<tr>
					<td></td>
					<td></td>
					<td>
						<a class="add-com" data-shop="${shopNum}" data-table="#table-${shopNum}">Добавить товар</a>
					</td>
				</tr>
			</tbody>
        </table>`);

        return tmpl({commodities: commodities, self: this});
    };
	
	commodityLine (commodity, shopNum) {
		var tmpl = _.template(`<td>
                        <%=commodity.name%>
                    </td>
                    <td>
                        <%=commodity.description%>
                    </td>
					<td>
						<a class="edit-com" data-shop="${shopNum}" data-com="<%=commodity.number%>" data-table="#table-${shopNum}">Редактировать</a>
						<a class="remove-com" data-shop="${shopNum}" data-com="<%=commodity.number%>" data-table="#table-${shopNum}">Удалить</a>
					</td>`);
		return tmpl({commodity: commodity});
	}

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
	
	editTable (commodity, shopNum) {
		return `<td>
                    <input id="name" value="${commodity.name}">
                </td>
                <td>
					<input id="description" value="${commodity.description}">
                </td>
				<td>
					<a class="save-com" data-com="${commodity.number}" data-shop="${shopNum}">Сохранить</a>
				</td>`
	};
};