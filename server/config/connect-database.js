var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/employee';

const initialiseDatabaseConnection = function initialiseDatabaseConnection() {
    mongoose.connect(mongoDB, { useNewUrlParser: true });

    //Get the default connection
    var db = mongoose.connection;

    db.once('open', function() {
        console.log('connected to database')
    });
    
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = initialiseDatabaseConnection;