const truckDriverModel = require('../../../db/schema/TruckDriverModel');

const get = async () => {
    return await truckDriverModel.find({}, (err, list) =>{
        if(err){
            throw err;
        }
        return list;
    })
}

module.exports.get = get;