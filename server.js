var express = require('express'),
    path = require('path'),
    http = require('http'),
    inspection = require('./routes/inspections'),
    cons = require('consolidate'),
    bodyParser  = require('body-parser');

var app = express();

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.engine('html',cons.underscore);
    app.set('views', path.join(__dirname, 'public/tpl'));
    app.set('view engine', 'html');
}

app.get('/inspectionOrders', inspection.getAllInspectionOrders);
app.get('/inspectionTypes', inspection.getAllInspectionTypes);
app.get('/inspectionOrders/:id', inspection.findInspectionOrderById);
app.post('/inspectionOrders', inspection.addInspectionOrder);
app.put('/inspectionOrders/:id', inspection.updateInspectionOrder);
app.delete('/inspectionOrders/:id', inspection.deleteInspectionOrder);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

