const mongoose = require('mongoose')

const truckDriverSchema = mongoose.Schema({
    name: { type: 'String', required: true },
    age: { type: 'Number', required: true },
    gender: {
        type: 'String',
        required: true,
        validate: {
            validator: function (gender) {
                return gender.toLowerCase() === 'male' || gender.toLowerCase() === 'female';
            },
            message: 'Gender must be Male or Female.'
        }
    },
    hasOwnVehicle: { type: 'Boolean', required: true },
    cnhType: {
        type: 'String',
        required: true,
        validate: {
            validator: function (cnhType) {
                return cnhType.toUpperCase() === 'A' ||
                    cnhType.toUpperCase() === 'B' ||
                    cnhType.toUpperCase() === 'C' ||
                    cnhType.toUpperCase() === 'D' ||
                    cnhType.toUpperCase() === 'E';
            },
            message: `CNH type invalid.`
        }
    },
    isLoaded: { type: 'Boolean', required: true },
    vehicleType: { type: 'Number', required: true },
    arrivedAt: { type: 'Date', required: true },
    from: { type: 'String', required: true },
    fromLat: { type: 'Number', required: true },
    fromLong: { type: 'Number', required: true },
    to: { type: 'String', required: true },
    toLat: { type: 'Number', required: true },
    toLong: { type: 'Number', required: true }
})

module.exports = mongoose.model('truckdrivers', truckDriverSchema);