const truckDriverModel = require('../../../db/schema/TruckDriverModel');

const get = async () => {
    return await truckDriverModel.find({isLoaded: false}, (err, list) =>{
        if(err){
            throw err;
        }
        return list;
    })
}

module.exports.get = get;