const truckDriverModel = require('../../../db/schema/TruckDriverModel');

const get = async () => {
    return await truckDriverModel.countDocuments({hasOwnVehicle: true}, (err, count) =>{
        if(err){
            console.log(err);
            throw err;
        }
        return count;
    })
}

module.exports.get = get;