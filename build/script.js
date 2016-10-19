/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _shop = __webpack_require__(2);
	
	var _shop2 = _interopRequireDefault(_shop);
	
	var _commodity = __webpack_require__(5);
	
	var _commodity2 = _interopRequireDefault(_commodity);
	
	var _shopList = __webpack_require__(1);
	
	var _shopList2 = _interopRequireDefault(_shopList);
	
	var _list = __webpack_require__(4);
	
	var _list2 = _interopRequireDefault(_list);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	    //Create a sample list
	    var list = new _list2.default();
	
	    for (var i = 0; i < 10; i++) {
	        var shop = new _shop2.default({
	            name: "Shop" + (i + 1),
	            address: "Street: " + (i + 1) + ", house: 1",
	            hours: "9.00 - 21.00"
	        });
	
	        for (var j = 0; j < 10; j++) {
	            var commodity = new _commodity2.default({
	                name: "Commodity" + (j + 1),
	                description: "Commodity" + (j + 1) + " from Shop" + (i + 1)
	            });
	            shop.addCommodity(commodity);
	        };
	
	        list.add(shop);
	    };
	
	    var shopList = new _shopList2.default($("#initial-div-list"), list);
	    shopList.render();
	    shopList.setEvents();
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _shop = __webpack_require__(2);
	
	var _shop2 = _interopRequireDefault(_shop);
	
	var _commodity = __webpack_require__(5);
	
	var _commodity2 = _interopRequireDefault(_commodity);
	
	var _list = __webpack_require__(4);
	
	var _list2 = _interopRequireDefault(_list);
	
	var _mover = __webpack_require__(6);
	
	var _mover2 = _interopRequireDefault(_mover);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//elem is implied to be a div and to be appended to a page
	
	var ShopList = function () {
	    function ShopList(elem, list) {
	        _classCallCheck(this, ShopList);
	
	        if (!elem) {
	            this.elem = $("<div></div>");
	            $(document.body).append(this.elem);
	        } else if (!elem.is("div")) {
	            throw new Error("Unacceptable element type");
	        } else {
	            this.elem = elem;
	        };
	
	        this.list = list;
	
	        $("#add-button").on("click", this.add.bind(this));
	    }
	
	    _createClass(ShopList, [{
	        key: "render",
	        value: function render() {
	            this.elem.html("");
	
	            var panel = $("<div class='panel-group shop-list' id='shop-list'></div>");
	
	            for (var shop in this.list) {
	                var elem = this.listItem(this.list[shop]);
	                panel.append(elem);
	                this.list[shop].elem = elem;
	            };
	
	            this.elem.append(panel);
	
	            this.mover = new _mover2.default(".panel-heading", ".shop-list-item", this);
	
	            this.setEvents();
	        }
	    }, {
	        key: "setEvents",
	        value: function setEvents() {
	            this.unsetEvents();
	
	            $(".shop-list a").on("click", this.showCommodities.bind(this));
	            $(".edit-button").on("click", this.edit.bind(this));
	            $(".remove-button").on("click", this.remove.bind(this));
	        }
	    }, {
	        key: "unsetEvents",
	        value: function unsetEvents() {
	            $(".shop-list a").off("click");
	            $(".edit-button").off("click");
	            $(".remove-button").off("click");
	        }
	    }, {
	        key: "showCommodities",
	
	
	        //Event listeners------------------------------------------------------------------------------------------------------------------------------------	
	        value: function showCommodities(event) {
	            var target = $(event.target);
	
	            if (target.hasClass("title-button")) return;
	
	            var panel = $(target.data("panel"));
	
	            var table = panel.find(".commodity-table");
	            if (table.length) {
	                table.toggle("hidden");
	            } else {
	                panel.append(this.commodityTable(this.list[panel.attr("id")].commodities, panel.attr("id")));
	            };
	
	            $(".edit-com").off("click");
	            $(".edit-com").on("click", this.editCommodity.bind(this));
	            $(".remove-com").off("click");
	            $(".remove-com").on("click", this.removeCommodity.bind(this));
	            $(".add-com").off("click");
	            $(".add-com").on("click", this.addCommodity.bind(this));
	        }
	    }, {
	        key: "add",
	        value: function add() {
	            var shop = new _shop2.default({
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
	        }
	    }, {
	        key: "remove",
	        value: function remove(event) {
	            var button = $(event.target);
	            var item = $(button.data("item"));
	            this.list.delete(item.data("shop"));
	            item.remove();
	            this.render();
	        }
	    }, {
	        key: "edit",
	        value: function edit(event) {
	            var panel = $($(event.target).data("panel"));
	            //if (!panel.parent().hasClass("in")) return;
	            panel.parent().collapse("show");
	
	            var shop = this.list[panel.attr("id")];
	            panel.html(this.editItem(shop));
	
	            $(".shop-edit").off("submit");
	            $(".shop-edit").on("submit", { shop: shop }, this.shopSubmit.bind(this));
	        }
	    }, {
	        key: "shopSubmit",
	        value: function shopSubmit(event) {
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
	        }
	    }, {
	        key: "editCommodity",
	        value: function editCommodity(event) {
	            var target = $(event.target);
	            var shop = target.data("shop");
	            var commodity = target.data("com");
	
	            var row = target.closest("tr");
	            row.html(this.editTable(this.list[shop].commodities[commodity], shop));
	
	            $(".save-com").off("click");
	            $(".save-com").on("click", this.saveCommodity.bind(this));
	        }
	    }, {
	        key: "saveCommodity",
	        value: function saveCommodity(event) {
	            var target = $(event.target);
	            var row = target.closest("tr");
	            var tds = row.find("td");
	
	            var shop = target.data("shop");
	            var commodity = target.data("com");
	            commodity = this.list[shop].commodities[commodity];
	
	            tds.each(function (i, td) {
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
	        }
	    }, {
	        key: "removeCommodity",
	        value: function removeCommodity(event) {
	            var target = $(event.target);
	            var row = target.closest("tr");
	            var shop = target.data("shop");
	            var commodity = target.data("com");
	            delete this.list[shop].commodities[commodity];
	            row.remove();
	        }
	    }, {
	        key: "addCommodity",
	        value: function addCommodity(event) {
	            var target = $(event.target);
	            var nextRow = $(target.closest("tr"));
	            var shop = target.data("shop");
	            var commodity = new _commodity2.default({ name: "", description: "" });
	            this.list[shop].commodities = new _list2.default();
	            this.list[shop].commodities.add(commodity);
	
	            var row = $("<tr></tr>");
	            row.append(this.editTable(commodity, shop));
	            nextRow.before(row);
	
	            $(".save-com").off("click");
	            $(".save-com").on("click", this.saveCommodity.bind(this));
	        }
	
	        //Templates-----------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	    }, {
	        key: "listItem",
	        value: function listItem(shop) {
	            return "<div class=\"panel panel-primary shop-list-item\" id=\"item-" + shop.number + "\" data-shop=\"" + shop.number + "\">\n                    <div class=\"panel-heading\">\n                        <h3 class=\"panel-title\" data-target=\"#panel-" + shop.number + "\" data-toggle=\"collapse\" data-parent=\"#shop-list\">\n                            " + shop.number + ". " + shop.name + "\n                        </h3>\n                        <div class=\"navbar list-menu\">\n                            <ul class=\"nav navbar-nav\">\n                                <li>\n                                    <a href=\"#\" data-panel=\"#" + shop.number + "\" class=\"title-button edit-button\">\n                                        \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C\n                                    </a>\n                                </li>\n                                <li>\n                                    <a href=\"#\" data-item=\"#item-" + shop.number + "\" class=\"title-button remove-button\">\n                                        \u0423\u0434\u0430\u043B\u0438\u0442\u044C\n                                    </a>\n                                </li>\n                            </ul>\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </div>\n                    <div class=\"panel-collapse collapse\" id=\"panel-" + shop.number + "\">\n                        <div class=\"panel-body\" id=\"" + shop.number + "\">\n                            <h3>" + shop.name + "</h3>\n                            <p>\u0410\u0434\u0440\u0435\u0441: " + shop.address + "</p>\n                            <p>\u041C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C: " + shop.hours + "</p>\n                            <a class=\"show-commodities\" href=\"#\" data-panel=\"#" + shop.number + "\">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0442\u043E\u0432\u0430\u0440\u044B</a>\n                        </div>\n                    </div>\n                </div>";
	        }
	    }, {
	        key: "commodityTable",
	        value: function commodityTable(commodities, shopNum) {
	            var tmpl = _.template("<table class=\"table commodity-table\" id=\"table-" + shopNum + "\">\n            <thead>\n                <tr>\n                    <td>\n                        <h4>\u0422\u043E\u0432\u0430\u0440</h4>\n                    </td>\n                    <td>\n                        <h4>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</h4>\n                    </td>\n                </tr>\n            </thead>\n\t\t\t<tbody>\n\t\t\t\t<% for (var commodity in commodities) {%>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<%=self.commodityLine(commodities[commodity], " + shopNum + ")%>\n\t\t\t\t\t</tr>\n\t\t\t\t<%}%>\n\t\t\t\t<tr>\n\t\t\t\t\t<td></td>\n\t\t\t\t\t<td></td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a class=\"add-com\" data-shop=\"" + shopNum + "\" data-table=\"#table-" + shopNum + "\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n        </table>");
	
	            return tmpl({ commodities: commodities, self: this });
	        }
	    }, {
	        key: "commodityLine",
	        value: function commodityLine(commodity, shopNum) {
	            var tmpl = _.template("<td>\n                        <%=commodity.name%>\n                    </td>\n                    <td>\n                        <%=commodity.description%>\n                    </td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a class=\"edit-com\" data-shop=\"" + shopNum + "\" data-com=\"<%=commodity.number%>\" data-table=\"#table-" + shopNum + "\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</a>\n\t\t\t\t\t\t<a class=\"remove-com\" data-shop=\"" + shopNum + "\" data-com=\"<%=commodity.number%>\" data-table=\"#table-" + shopNum + "\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</a>\n\t\t\t\t\t</td>");
	            return tmpl({ commodity: commodity });
	        }
	    }, {
	        key: "editItem",
	        value: function editItem(shop) {
	            return "<form class=\"shop-edit\" data-item=\"#item-" + shop.number + "\" data-shop=\"" + shop.number + "\">\n            <div class=\"form-group input-group\">\n                <label for=\"name-input\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</label>\n                <input id=\"name-input\" type=\"text\" class=\"form-control\" name=\"name-input\" value=\"" + shop.name + "\">\n            </div>\n            <div class=\"form-group input-group\">\n                <label for=\"address-input\">\u0410\u0434\u0440\u0435\u0441</label>\n                <input id=\"address-input\" type=\"text\" class=\"form-control\" name=\"address-input\" value=\"" + shop.address + "\">\n            </div>\n            <div class=\"form-group input-group\">\n                <label for=\"hours-input\">\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B</label>\n                <input id=\"hours-input\" type=\"text\" class=\"form-control\" name=\"hours-input\" value=\"" + shop.hours + "\">\n            </div>\n            <a class=\"show-commodities\" href=\"#\" data-panel=\"#" + shop.number + "\">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0442\u043E\u0432\u0430\u0440\u044B</a>\n            <button type=\"submit\" class=\"btn btn-default\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n        </form>";
	        }
	    }, {
	        key: "editTable",
	        value: function editTable(commodity, shopNum) {
	            return "<td>\n                    <input id=\"name\" value=\"" + commodity.name + "\">\n                </td>\n                <td>\n\t\t\t\t\t<input id=\"description\" value=\"" + commodity.description + "\">\n                </td>\n\t\t\t\t<td>\n\t\t\t\t\t<a class=\"save-com\" data-com=\"" + commodity.number + "\" data-shop=\"" + shopNum + "\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</a>\n\t\t\t\t</td>";
	        }
	    }]);
	
	    return ShopList;
	}();
	
	exports.default = ShopList;
	;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entity = __webpack_require__(3);
	
	var _entity2 = _interopRequireDefault(_entity);
	
	var _list = __webpack_require__(4);
	
	var _list2 = _interopRequireDefault(_list);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Shop = function (_Entity) {
	    _inherits(Shop, _Entity);
	
	    function Shop(options) {
	        _classCallCheck(this, Shop);
	
	        var _this = _possibleConstructorReturn(this, (Shop.__proto__ || Object.getPrototypeOf(Shop)).call(this, options.name, options.number));
	
	        _this.address = options.address;
	        _this.hours = options.hours;
	        return _this;
	    }
	
	    _createClass(Shop, [{
	        key: "addCommodity",
	        value: function addCommodity(commodity) {
	            if (!this.commodities) this.commodities = new _list2.default();
	            this.commodities.add(commodity);
	        }
	    }]);
	
	    return Shop;
	}(_entity2.default);
	
	exports.default = Shop;
	;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Entity = function Entity(name, number) {
	    _classCallCheck(this, Entity);
	
	    this.name = name;
	    this.number = number;
	};
	
	exports.default = Entity;
	;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var List = function () {
	    function List() {
	        _classCallCheck(this, List);
	
	        Object.defineProperty(this, "length", { iterable: false, value: 1, writable: true });
	    }
	
	    _createClass(List, [{
	        key: "add",
	        value: function add(value) {
	            value.number = this.length;
	            this[this.length++] = value;
	        }
	    }, {
	        key: "delete",
	        value: function _delete(prop) {
	            delete this[prop];
	            for (var i = prop; i < this.length - 1; i++) {
	                this[i] = this[i + 1];
	                this[i].number = i;
	            };
	            delete this[this.length - 1];
	            this.length--;
	        }
	    }]);
	
	    return List;
	}();
	
	exports.default = List;
	;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _entity = __webpack_require__(3);
	
	var _entity2 = _interopRequireDefault(_entity);
	
	var _list = __webpack_require__(4);
	
	var _list2 = _interopRequireDefault(_list);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//options = {
	//  description: description
	//}
	
	var Commodity = function (_Entity) {
	    _inherits(Commodity, _Entity);
	
	    function Commodity(options) {
	        _classCallCheck(this, Commodity);
	
	        var _this = _possibleConstructorReturn(this, (Commodity.__proto__ || Object.getPrototypeOf(Commodity)).call(this, options.name));
	
	        _this.description = options.description;
	        return _this;
	    }
	
	    return Commodity;
	}(_entity2.default);
	
	exports.default = Commodity;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Mover = function () {
	    function Mover(selectorToCatch, selectorToMove, parent) {
	        var _this = this;
	
	        _classCallCheck(this, Mover);
	
	        this.selectorElement = $(selectorToCatch);
	        this.selectorToMove = selectorToMove;
	        this.parent = parent;
	
	        this.selectorElement.off("mousedown");
	        this.selectorElement.on("mousedown", function (event) {
	            _this.timer = setTimeout(function () {
	                _this.init(event);
	            }, 300);
	            $(document).on("mouseup", _this.setItem.bind(_this));
	        });
	    }
	
	    _createClass(Mover, [{
	        key: "init",
	        value: function init(event) {
	            this.initialized = true;
	
	            this.bunch = $(this.selectorToMove);
	            this.elem = $(event.target).closest(this.selectorToMove);
	
	            $(document.body).css({
	                cursor: "-webkit-grab"
	            });
	            $(document.body).css({
	                cursor: "grab"
	            });
	
	            $(document).on("mousemove", this.selectAvailableSpaces.bind(this));
	
	            console.log("init");
	        }
	    }, {
	        key: "setItem",
	        value: function setItem(event) {
	            clearTimeout(this.timer);
	            if (!this.initialized) return;
	            this.initialized = false;
	
	            $(document).off("mouseup");
	            $(document).off("mousemove");
	
	            var first = $(this.bunch[0]);
	            var last = $(this.bunch[this.bunch.length - 1]);
	
	            if (event.pageY < this.bunch.offset().top) {
	                first.before(this.elem);
	            } else if (event.pageY > last.offset().top) {
	                last.after(this.elem);
	            } else {
	                for (var i = 0; i < this.bunch.length - 1; i++) {
	                    if (this.elem.get(0) === this.bunch[i]) {
	                        continue;
	                    };
	
	                    var item = $(this.bunch[i]),
	                        next = $(this.bunch[i + 1]);
	
	                    if (event.pageY > item.offset().top && event.pageY <= next.offset().top) {
	                        item.after(this.elem);
	                    };
	                };
	            };
	
	            $(document.body).css({
	                cursor: "default"
	            });
	
	            this.clearBorders();
	            this.arrangeNumbers();
	        }
	    }, {
	        key: "selectAvailableSpaces",
	        value: function selectAvailableSpaces(event) {
	            event.preventDefault();
	
	            var first = $(this.bunch[0]);
	            var last = $(this.bunch[this.bunch.length - 1]);
	
	            if (event.pageY < this.bunch.offset().top) {
	                this.clearBorders();
	
	                first.css({
	                    borderTop: "5px solid blue"
	                });
	            } else if (event.pageY > last.offset().top) {
	                this.clearBorders();
	
	                last.css({
	                    borderBottom: "5px solid blue"
	                });
	            } else {
	                first.css({
	                    borderTop: "none"
	                });
	                last.css({
	                    borderBottom: "none"
	                });
	
	                for (var i = 0; i < this.bunch.length - 1; i++) {
	                    if (this.elem.get(0) === this.bunch[i]) {
	                        continue;
	                    };
	
	                    var item = $(this.bunch[i]),
	                        next = $(this.bunch[i + 1]);
	
	                    if (event.pageY > item.offset().top && event.pageY <= next.offset().top) {
	                        item.css({
	                            borderBottom: "5px solid blue"
	                        });
	                    } else {
	                        item.css({
	                            borderBottom: "none"
	                        });
	                    };
	                };
	            };
	        }
	    }, {
	        key: "clearBorders",
	        value: function clearBorders() {
	            this.bunch.each(function (i, item) {
	                $(item).css({
	                    borderBottom: "none"
	                });
	            });
	        }
	    }, {
	        key: "arrangeNumbers",
	        value: function arrangeNumbers() {
	            var _this2 = this;
	
	            this.bunch = $(this.selectorToMove);
	
	            this.bunch.each(function (i, item) {
	                var shop = $(item).data("shop");
	                _this2.parent.list[shop].number = i + 1;
	            });
	
	            Array.prototype.sort.call(this.parent.list, function (a, b) {
	                return a.number - b.number;
	            });
	
	            for (var i = this.parent.list.length - 1; i > 0; i--) {
	                this.parent.list[i] = this.parent.list[i - 1];
	            };
	            delete this.parent.list[0];
	
	            this.parent.render();
	        }
	    }]);
	
	    return Mover;
	}();
	
	exports.default = Mover;
	;

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map