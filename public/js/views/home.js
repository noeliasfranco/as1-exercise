window.HomeView = Backbone.View.extend({
    events: {
        'click .newInspection': 'newInspection',
        'keyup .search-inspection': 'searchInspection',
        'click .inspectionDetails': 'inspectionDetails'
    },
    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());

        var items = this.model.models;
        var len = items.length;
        var total = len + "(s) vehicles";
        $('.vehicle-total').html(total);
        $('#inspectionList').html('<div class="row inspection-container"></div>');

        for (var i = 0; i < len; i++) {
            $('.inspection-container', this.el).append(new InspectionOrderListView({
                model: items[i]
            }).render().el);
        }

        self.inspectionTypes = new InspectionTypesCollection();

        return this;
    },
    updateInspectionOrderList: function () {
        var items = this.model.models;
        var len = items.length;
        var total = len + "(s) vehicles";

        $('.vehicle-total').html(total);
        $('#inspectionList').html('<div class="row inspection-container"></div>');

        for (var i = 0; i < len; i++) {
            $('.inspection-container', this.el).append(new InspectionOrderListView({
                model: items[i]
            }).render().el);
        }
    },

    newInspection: function () {
        var self = this;
        var modalView = new NewInspectionOrderModal({
            mode: 'add'
        });
        $('.app').html(modalView.render().el);
        modalView.on('updateorders', function () {
            var items = new InspectionOrdersCollection();
            items.fetch({
                success: function () {
                    self.model = items;
                    self.updateInspectionOrderList();
                }
            });
        });
    },
    inspectionDetails: function (ev) {
        var self = this;
        var itemId = $(ev.currentTarget).data('id');
        var item = this.model.get(itemId);
        var modalView = new NewInspectionOrderModal({
            model: item,
            mode: 'update'
        });
        $('.app').html(modalView.render().el);
        modalView.on('updateorders', function () {
            var items = new InspectionOrdersCollection();
            items.fetch({
                success: function () {
                    self.model = items;
                    self.updateInspectionOrderList();
                }
            });
        });
    },

    searchInspection: function (e) {
        var self = this;
        var query = $(e.currentTarget).val().toLowerCase();

        var items = new InspectionOrdersCollection();
        items.fetch({
            success: function () {
                self.model = items;
                if (!!query) {
                    models = _.filter(self.model.models, function (model) {
                        return (!!model.get('inspectionType').toString().includes(query) ||
                            (!!model.get('orderNumber') && !!model.get('orderNumber').toString().includes(query)) ||
                            !!model.get('vehicle')['model'].toLowerCase().includes(query) ||
                            !!model.get('vehicle')['year'].toString().toLowerCase().includes(query));


                    }, self);
                    self.model.models = models;
                    self.updateInspectionOrderList();
                } else {
                    self.updateInspectionOrderList();
                }

            }
        });
    },
});


window.NewInspectionOrderModal = Backbone.Modal.extend({
    template: '#modal-template',
    cancelEl: '.cancel',
    submitEl: '.create',
    beforeSubmit: function () {
        var model = {
            'vehicle': {
                'year': $('#year').val(),
                'make': $('#make').val(),
                'model': $('#model').val()
            },
            'note': $('#note').val(),
            'inspectionType': $('#inspectionType').val()

        };


        this.model.set(model);
        if (this.model.isValid(true)) {
            $(".alert").addClass('hidden');
            this.model.save();
            this.trigger('updateorders');
            return true;
        } else {
            $(".alert").removeClass('hidden');
            return false;
        }

    },
    setModel: function (model) {
        $('#note').val(model.get('note'));
        $('#inspectionType').val(model.get('inspectionType'));
        $('#year').val(model.get('vehicle')['year']);
        $('#make').val(model.get('vehicle')['make']);
        $('#model').val(model.get('vehicle')['model']);
        $('.create').html("Save");
    },
    onShow: function () {
        if (this.model.get("_id"))
            this.setModel(this.model);
    },
    onRender: function () {
        if (!this.model) {
            this.model = new InspectionOrder();
        }

        Backbone.Validation.bind(this);

        var inspectionTypes = new InspectionTypesCollection();
        inspectionTypes.fetch({
            success: function () {
                var html = '<option value="">Select</option>';
                _.each(inspectionTypes.models, function (item, i) {
                    html += '<option value="' + item.get('id') + '">' + item.get('name') + '</option>';
                });
                $("#inspectionType").html(html);

                var htmlYears = '<option value="">Select</option>';
                for (var i = 1900; i <= new Date().getFullYear(); i++) {
                    htmlYears += '<option value="' + i.toString() + '">' + i.toString() + '</option>';
                }
                $("#year").html(htmlYears);
            }
        });
    }
});