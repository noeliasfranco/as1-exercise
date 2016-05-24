window.InspectionOrder = Backbone.Model.extend({

    urlRoot: "/inspectionOrders",
    idAttribute: "_id",
    initialize: function () {
       
    },

    defaults: {
        'note': null,
        'orderNumber': null,
        'inspectionType': null,
        'vehicle': {
            'year': null,
            'make': null,
            'model': null
        },
        'closed': false			
    },
    validation: {
        'inspectionType': {
            required: true,
            msg: 'Please select an inspection type'
        },
        'vehicle.year': {
            required: true,
            msg: 'Please select a year'
        },
        'vehicle.make': {
            required: true,
            msg: 'Please enter the vehicle make'
        },
        'vehicle.model': {
            required: true,
            msg: 'Please enter the vehicle model'
        },
    }
});


window.InspectionType = Backbone.Model.extend({

    urlRoot: "/inspectionTypes",
    idAttribute: "id",
    initialize: function () {
    },
});

window.InspectionOrdersCollection = Backbone.Collection.extend({

    model: InspectionOrder,
    url: "/inspectionOrders"

});


window.InspectionTypesCollection = Backbone.Collection.extend({

    model: InspectionType,
    url: "/inspectionTypes"

});