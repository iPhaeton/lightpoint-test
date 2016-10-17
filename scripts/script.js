(function () {
    //Create a sample list
    var list = new Set();

    for (var i = 0; i < 10; i++) {
        var shop = new Shop({
            name: "Shop" + (i+1),
            address: "Street: " + (i+1) + ", house: 1",
            hours: "9.00 - 21.00",
            number: (i+1)
        });

        for (var j = 0; j < 10; j++) {
            var commodity = new Commodity({
                name: "Commodity" + (j+1),
                description: "Commodity" + (j+1) + " from Shop" + (i+1)
            });
            shop.addCommodity(commodity);
        };

        list.add(shop);
    };

    var shopList = new ShopList(null, list);
    shopList.render();
})();