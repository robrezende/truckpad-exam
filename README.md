# API TruckPad


## Usage

**CLI**

You can run via CLI using `npm start` on root folder. This requires `node` and `npm` installed

**Tests**

API Tests can be run using `npm test` on root folder. This requires `node` and `npm` installed

**Docker**

You can run a docker container using `docker-compose up`. This requires `Docker` and `Docker Compose` installed

**Keys**

You must have an google api key and a mongo db atlas connection string and fill them in `config.json`

**Responses**

All responses will have the form

```json
{
    "data": "Response result when happens",
    "message": "Description of what happened"
}
```

### Create a Truck Driver

**Definition**

`POST /truckDrivers/create`

**Arguments**

- `"name":string` name of the driver
- `"age":number` age of the driver
- `"gender":string` gender of the driver, can be `male`or `female`
- `"hasOwnVehicle":boolean` flag denoting if the driver is owner of his vehicle. `true` if is owner and `false` if it is not owner
- `"cnhType":string` CNH type according to brazilian traffic laws. Possible values are `"A"`, `"B"`, `"C"`, `"D"` and `"E"`
- `"isLoaded":boolean` flag denoting if the driver arrives into the station loaded. `true` if loaded and `false`if is not loaded
- `"vehicleType":number` vehicle type according to the table below. Possivle values are `1`, `2`, `3`, `4`and `5`
- `"from":string` location where the driver departed from
- `"to":string` location where the driver will arrive by

```json
    {
        "name":"F",
        "age":32,
        "gender":"Male",
        "hasOwnVehicle":true,
        "cnhType":"A",
        "isLoaded":true,
        "vehicleType":2,
        "from": "Rio de Janeiro",
        "to": "São Paulo"
    }
```

**Vehicle Type**
| Type                   | Value       |
| -----------            | ----------- |
| Caminhão 3/4           | 1           |
| Caminhão Toco          | 2           |
| Caminhão Truck         | 3           |
| Carreta Simples        | 4           |
| Carreta Eixo Estendido | 5           |

**Response**

- `201 OK` on success

```json
{
    "message": "Motorista cadastrado com sucesso.",
    "data": {
        "diver": {
            "_id": "5c9927d54f0f4642b80d3403",
            "name": "F",
            "age": 32,
            "gender": "Male",
            "hasOwnVehicle": true,
            "cnhType": "A",
            "isLoaded": true,
            "vehicleType": 2,
            "from": "Rio de Janeiro",
            "to": "São Paulo",
            "arrivedAt": "2019-03-25T19:11:16.866Z",
            "fromLat": -22.9068467,
            "fromLong": -43.1728965,
            "toLat": -23.5505199,
            "toLong": -46.63330939999999,
            "__v": 0
        }
    }
}
```

- `400 Bad Request` on invalid json format

### Update a Truck Driver Info

**Definition**

`PUT truckDrivers/update`

**Arguments**

- `"id":string` the database id of the truck driver to be updated
- `"updateParams":object` an object with the parameters to be updated, on the same format of `create` object. You don't need to send all parameters, just the modified ones

If a device with the given identifier already exists, the existing device will be overwritten.

```json
{
    "id": "5c97e4a9862fdf254167b8d",
    "updatedParams":
    {
        "name":"F",
        "age":32,
        "gender":"Male",
        "hasOwnVehicle":true,
        "cnhType":"A",
        "isLoaded":true,
        "vehicleType":2,
        "from": "Rio de Janeiro",
        "to": "São Paulo"
    }
}
```

**Response**

- `204 no content` on success

## Retrieve all unloaded trucks

`GET /truckDrivers/allUnloaded`

**Response**

- `404 Not Found` if no truck was found
- `200 OK` on success

```json
{
    "data": {
        "list": [
            {
                "_id": "5c97e3743b3bda230970223c",
                "name": "B",
                "age": 30,
                "gender": "Male",
                "hasOwnVehicle": false,
                "cnhType": "D",
                "isLoaded": false,
                "vehicleType": 1,
                "arrivedAt": "2019-03-23T03:00:00.000Z",
                "__v": 0
            },
            {
                "_id": "5c97e4503e6eb924951dfd91",
                "name": "C",
                "age": 40,
                "gender": "Female",
                "hasOwnVehicle": true,
                "cnhType": "D",
                "isLoaded": false,
                "vehicleType": 4,
                "arrivedAt": "2019-03-20T03:00:00.000Z",
                "__v": 0
            }
        ]
    }
}
```

## Total trucks by Period

**Definition**

`GET /truckDrivers/trucksByPeriod/:period`
`GET /truckDrivers/trucksByPeriod/`

**Arguments**

- `period`the periodicity desired. Possible values are `day`, `week` and `month`

**Response**

- `400 Bad Request` if period is not available
- `200 OK` on success

```json
{
    "data": {
        "day": 1,
        "week": 4,
        "month": 5
    }
}
```
## Vechicle Owners Count

**Definition**

`GET /truckDrivers/vehicleOwners`

**Response**

- `200 OK` on success

```json
{
    "data": {
        "count": 3
    }
}
```

## Locations Grouped By Vechicle Type

**Definition**

`GET /locations/groupedByType`

**Response**

- `200 OK` on success

```json
{
    "data": {
        "result": {
            "Caminhão Toco": [
                {
                    "from": "Porto Alegre",
                    "to": "Goiânia",
                    "fromLat": -30.0346471,
                    "fromLong": -51.2176584,
                    "toLat": -16.6868982,
                    "toLong": -49.2648114
                },
                {
                    "from": "Rio de Janeiro",
                    "to": "São Paulo",
                    "fromLat": -22.9068467,
                    "fromLong": -43.1728965,
                    "toLat": -23.5505199,
                    "toLong": -46.63330939999999
                }
            ],
            "Caminhão Truck": [
                {
                    "from": "São Paulo",
                    "to": "Rio de Janeiro",
                    "fromLat": -23.5505199,
                    "fromLong": -46.63330939999999,
                    "toLat": -22.9068467,
                    "toLong": -43.1728965
                }
            ],
            "Caminhão 3/4": [
                {
                    "from": "São Paulo",
                    "to": "Salvador",
                    "fromLat": -23.5505199,
                    "fromLong": -46.63330939999999,
                    "toLat": -12.977749,
                    "toLong": -38.5016301
                }
            ],
            "Carreta Simples": [
                {
                    "from": "São Paulo",
                    "to": "Belo Horizonte",
                    "fromLat": -23.5505199,
                    "fromLong": -46.63330939999999,
                    "toLat": -19.9166813,
                    "toLong": -43.9344931
                },
                {
                    "from": "Rio de Janeiro",
                    "to": "Niterói",
                    "fromLat": -22.9068467,
                    "fromLong": -43.1728965,
                    "toLat": -22.8859267,
                    "toLong": -43.1152587
                }
            ]
        }
    }
}

```

