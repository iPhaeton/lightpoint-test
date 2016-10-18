class Mover {
    constructor (selectorToCatch, selectorToMove) {
        this.selectorElement = $(selectorToCatch);
        this.selectorToMove = selectorToMove;

        this.selectorElement.off("mousedown");
        this.selectorElement.on("mousedown", (event) => {
            this.timer = setTimeout(() => {
                this.init(event)
            }, 300);
            $(document).on("mouseup", this.setItem.bind(this));
        });
    };

    init (event) {
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
    };

    setItem (event) {
        clearTimeout(this.timer);
        if (!this.initialized) return;
        this.initialized = false;

        $(document).off("mouseup");
        $(document).off("mousemove");

        var first = $(this.bunch[0]);
        var last = $(this.bunch[this.bunch.length-1]);

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
                    next = $(this.bunch[i+1]);

                if (event.pageY > item.offset().top && event.pageY <= next.offset().top) {
                    item.after(this.elem);
                };
            };
        };

        $(document.body).css({
            cursor: "default"
        });

        this.clearBorders();
    };

    selectAvailableSpaces (event) {
        event.preventDefault();

        var first = $(this.bunch[0]);
        var last = $(this.bunch[this.bunch.length-1]);

        if (event.pageY < this.bunch.offset().top) {
            this.clearBorders();

            first.css({
                borderTop: "5px solid blue"
            })
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
                    next = $(this.bunch[i+1]);

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
    };

    clearBorders () {
        this.bunch.each ((i, item) => {
            $(item).css({
                borderBottom: "none"
            })
        });
    }
};