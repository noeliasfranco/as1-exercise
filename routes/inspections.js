var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('autoserve1db', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'autoserve1db' database");
		
        db.collection('inspectionTypes', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'inspectionTypes' collection doesn't exist. Creating it with dummy data");
                createInspectionTypes();
            }
        });
		
		db.collection('inspectionOrders', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'inspectionOrders' collection doesn't exist. Creating it with dummy data");
                createInspectionOrders();
            }
        });
    }
});

exports.findInspectionOrderById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving inspection order: ' + id);
    db.collection('inspectionOrders', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.getAllInspectionOrders = function(req, res) {
    db.collection('inspectionOrders', function(err, collection) {
        collection.find({closed: false}).toArray(function(err, items) {
            console.log(items);
            res.send(items);
        });
    });
};

exports.getAllInspectionTypes = function(req, res) {
    db.collection('inspectionTypes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addInspectionOrder = function(req, res) {
    var item = req.body;
    console.log('Adding inspection order: ' + JSON.stringify(item));
    db.collection('inspectionOrders', function(err, collection) {
        collection.insert(item, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateInspectionOrder = function(req, res) {
    var id = req.params.id;
    var item = req.body;
    delete item._id;
    console.log('Updating inspection order: ' + id);
    console.log(JSON.stringify(item));
    db.collection('inspectionOrders', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, item, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating inspection order: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' item(s) updated');
                res.send(item);
            }
        });
    });
}

exports.deleteInspectionOrder = function(req, res) {
    var id = req.params.id;
    console.log('Deleting inspection order: ' + id);
    db.collection('inspectionOrders', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with dummy data - Used only first time app is loaded.
var createInspectionTypes = function() {

    var inspectionTypes = [
		{
			'id': 0,
			'name': 'Vehicle 360 Inspection'
		},
		{
			'id': 1,
			'name': 'Detailed Inspection'
		},
		{
			'id': 2,
			'name': 'Quick Photos Inspection'
		}	
	];

    db.collection('inspectionTypes', function(err, collection) {
        collection.insert(inspectionTypes, {safe:true}, function(err, result) {});
    });

};

var createInspectionOrders = function() {

    var inspectionOrders = [
		{
			'note': 'Test node',
			'orderNumber': 'RD #1',
			'inspectionType': '1',
			'vehicle': {
				'year': 2010,
				'make': 'Volkswagen',
				'model': 'Amarok'
			},
			'closed': false			
		},
        {
			'note': 'Test node 2',
			'orderNumber': 'RD #2',
			'inspectionType': '0',
			'vehicle': {
				'year': 2014,
				'make': 'Ford',
				'model': 'Ranger'
			},
			'closed': false			
		},
        {
			'note': 'Test node 3',
			'orderNumber': 'RD #3',
			'inspectionType': '2',
			'vehicle': {
				'year': 2016,
				'make': 'Toyota',
				'model': 'Hilux'
			},
			'closed': false			
		}
    ];

    db.collection('inspectionOrders', function(err, collection) {
        collection.insert(inspectionOrders, {safe:true}, function(err, result) {});
    });

};