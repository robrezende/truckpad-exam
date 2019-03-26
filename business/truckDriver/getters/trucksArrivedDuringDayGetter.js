const dayjs = require('dayjs');
const truckDriverModel = require('../../../db/schema/TruckDriverModel');


const get = async (date) => {

    const startOfDay = dayjs(date).startOf('day').format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const endOfDay = dayjs(date).endOf('day').format("YYYY-MM-DDTHH:mm:ss.SSSZ");

    return await truckDriverModel.countDocuments({
        arrivedAt:{
            $gte: startOfDay,
            $lte: endOfDay
        }
    }, (err, list) =>{
        if(err){
            throw err;
        }
        return list;
    })
}

module.exports.get = get;