const truckDriverModel = require('../../../db/schema/TruckDriverModel');
const locationByAddressGetter = require('../../location/getters/locationByAddressGetter')


const create = async (truckDriver) => {
    try {
        const fromCoordinates = await locationByAddressGetter.get(truckDriver.from);
        const toCoordinates = await locationByAddressGetter.get(truckDriver.to);

        truckDriver.fromLat = fromCoordinates.latitude;
        truckDriver.fromLong = fromCoordinates.longitude;
        truckDriver.toLat = toCoordinates.latitude;
        truckDriver.toLong = toCoordinates.longitude;


        return await truckDriverModel.create(truckDriver);
    }catch(err) {
        return Promise.reject(new Error(err));
    }


}

module.exports.create = create;