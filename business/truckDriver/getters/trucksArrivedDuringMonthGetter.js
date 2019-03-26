const dayjs = require('dayjs');
const truckDriverModel = require('../../../db/schema/TruckDriverModel');


const get = async (date) => {
    const oneMonthBeforeStartOfDay = dayjs(date).subtract(1, 'month').startOf('day').format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const endOfDay = dayjs(date).endOf('day').format("YYYY-MM-DDTHH:mm:ss.SSSZ");

    return await truckDriverModel.countDocuments({
        arrivedAt:{
            $gte: oneMonthBeforeStartOfDay,
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