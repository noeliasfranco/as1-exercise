window.InspectionListView = Backbone.View.extend({
    initialize: function () {
        this.render();

    },

    render: function () {
        var self = this;
        var items = this.model.models;
        var len = items.length;
        var total = len + "(s) vehicles";
        $('.vehicle-total').html(total);

        $(this.el).html('<div class="row inspection-container"></div>');


        for (var i = 0; i < len; i++) {
            var view = new InspectionOrderListView({
                model: items[i]
            });
            $('.inspection-container', this.el).append(view.render().el);
            view.on("refreshorders", function () {
                self.updateOrders();
            });
        }



        return this;
    },
    updateOrders: function () {
        var self = this;
        var items = new InspectionOrdersCollection();
        items.fetch({
            success: function () {
                self.model = items;
                self.render();
            }
        });
    }
});

window.InspectionOrderListView = Backbone.View.extend({

    tagName: "div",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .close': 'closeOrder'
    },

    closeOrder: function () {
        this.model.set({
            "closed": true
        });
        this.model.save();
        this.trigger("refreshorders");
    }

});