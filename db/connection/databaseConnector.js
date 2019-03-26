const mongoose = require('mongoose');
const config = require('../../config.json');
const uri = config.CONNECTION_STRING;

const connect = (dbName) =>{
  mongoose.connect(uri, {
    dbName: dbName || 'truckpad',
    useNewUrlParser: true
  });
}

module.exports = {
  connect: connect
}