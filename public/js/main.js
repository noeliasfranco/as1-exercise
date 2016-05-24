var AppRouter = Backbone.Router.extend({

    routes: {
        ""                             : "home",
        "inspectionOrders"	           : "home"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function () {
        var items = new InspectionOrdersCollection();
        
        items.fetch({success: function(){
           if (!this.homeView) {
                    this.homeView = new HomeView({model: items});
                }
                $('#content').html(this.homeView.el);   
                $("#inspectionList").html(new InspectionListView({model: items}).el);
        }});
    },

});

utils.loadTemplate(['HomeView', 'HeaderView', 'InspectionOrderListView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});