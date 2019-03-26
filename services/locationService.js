const express = require('express');
const router = express.Router();

const truckLocationGroupedByVehicleTypeGetter = require('../business/truckDriver/getters/truckLocationGroupedByVehicleTypeGetter');

router.get('/groupedByType', async(req, res) =>{
    const result = await truckLocationGroupedByVehicleTypeGetter.get();
    res.status(200).json({
        data: { result: result}
    })
})

module.exports = router;

