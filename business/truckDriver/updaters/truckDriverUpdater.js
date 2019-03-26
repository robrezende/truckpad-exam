const truckDriverModel = require('../../../db/schema/TruckDriverModel');
const locationByAddressGetter = require('../../location/getters/locationByAddressGetter');

const update = async (id, updatedParameters) => {
    try {

        if(updatedParameters.from){
            const fromCoordinates = await locationByAddressGetter.get(updatedParameters.from);
            updatedParameters.fromLat = fromCoordinates.latitude;
            updatedParameters.fromLong = fromCoordinates.longitude;
        }
        if(updatedParameters.to){
            const toCoordinates = await locationByAddressGetter.get(updatedParameters.to);
            updatedParameters.toLat = toCoordinates.latitude;
            updatedParameters.toLong = toCoordinates.longitude;
        }

        return await truckDriverModel.updateOne({ _id: id }, { $set: updatedParameters });

    } catch (err) {
        throw new Error(err)
        
    }

}

module.exports.update = update;