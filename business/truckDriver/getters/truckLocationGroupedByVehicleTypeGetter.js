const truckDriverModel = require('../../../db/schema/TruckDriverModel');


const get = async () => {

    let result = await truckDriverModel.aggregate(
        [
            {
                $group:
                {
                    _id: "$vehicleType",
                    destinos: { $push: { from: "$from", to: "$to", fromLat: '$fromLat', fromLong: '$fromLong', toLat: '$toLat', toLong: '$toLong' } }
                }
            },
            {
                $project: {
                    _id: 0,
                    vehicleType: {
                        $switch: {
                            branches: [
                               {case: {$eq: ["$_id",1]}, then: "Caminhão 3/4"},
                               {case: {$eq: ["$_id",2]}, then: "Caminhão Toco"},
                               {case: {$eq: ["$_id",3]}, then: "Caminhão Truck"},
                               {case: {$eq: ["$_id",4]}, then: "Carreta Simples"},
                               {case: {$eq: ["$_id",5]}, then: "Carreta Eixo Estendido"},
                            ]
                        }
                    },
                    destinos: 1
                    
                }
            }

        ], (err, list) =>{
                    if(err){
                        throw err;
                    }
                    return list;
                }
    );

    return result.reduce((map, obj) => {
        map[obj.vehicleType] = obj.destinos;
        return map;
    }, {});
}


module.exports.get = get;

// db.getCollection('test').aggregate(
//     [
//       {
//         $group:
//           {
//             _id: "$type",
//             destinos: { $push:  { from: "$from", to: "$to" } }
//           }
//       },
//       {
//           $project: {
//               _id: 0,
//               type: {
//                   $switch: {
//                       branches: [
//                          {case: {$eq: ["$_id",1]}, then: "Tipo 1"},
//                          {case: {$eq: ["$_id",2]}, then: "Tipo 2"},
//                       ]
//                   }
//               },
//               destinos: 1
              
//           }
//       }
      
//     ]
//  )