const express = require('express');
const bodyParser = require('body-parser')
let mongoose = require("mongoose");
const dayjs = require('dayjs')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const truckDriverService = require('../../../services/truckDriverService');
const databaseConnector = require('../../../db/connection/databaseConnector');
const truckDriverModel = require('../../../db/schema/TruckDriverModel')

chai.use(chaiHttp)
const init = () =>{
    const app = express();
    app.use(bodyParser.json());
    app.use(truckDriverService);
    return app;
}

before(() =>{
    databaseConnector.connect('truckpadspec');
});

describe('POST /create', () =>{

    before(async () =>{
        await truckDriverModel.deleteMany();
    })

    after(async () =>{
        await truckDriverModel.deleteMany();
    })

    it('should create data correctly', (done) =>{
        const app = init();
        chai.request(app)
        .post('/create')
        .set('content-type', 'application/json')
        .send({
            name:'F',
            age: 22,
            gender:'Male',
            hasOwnVehicle:true,
            cnhType:'A',
            isLoaded:true,
            vehicleType:2,
            from: 'Rio de Janeiro',
            to: 'São Paulo'
        }).end(async (err, res) =>{
            res.should.have.status(201)
            const id = res.body.data.driver._id.trim();
            await truckDriverModel.findByIdAndDelete(id)
            done()
        });
    });

    it('should return error if object is incomplete', (done) =>{
        const app = init();
        chai.request(app)
        .post('/create')
        .set('content-type', 'application/json')
        .send({
            name:'F',
            gender:'Male',
            hasOwnVehicle:true,
            cnhType:'A',
            isLoaded:true,
            vehicleType:2,
            from: 'Rio de Janeiro',
            to: 'São Paulo'
        })
        .end((err, res) =>{
            res.should.have.status(400)
            res.body.message.should.be.eql('ValidationError: age: Path `age` is required.')
            done()
        });
    });
});

describe('PUT /update', () =>{

    before(async () =>{
        await truckDriverModel.deleteMany();
        const d1 = {
            "_id": "5c97adb8b760cc5cc858ba8c",
            "name": "A",
            "age": 30,
            "gender": "Male",
            "hasOwnVehicle": true,
            "cnhType": "E",
            "isLoaded": true,
            "vehicleType": 4,
            "arrivedAt": dayjs(new Date()).subtract(12, 'day').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            "__v": 0,
            "from": "São Paulo",
            "fromLat": -23.5505199,
            "fromLong": -46.63330939999999,
            "to": "Belo Horizonte",
            "toLat": -19.9166813,
            "toLong": -43.9344931
        };
        await truckDriverModel.insertMany([d1]);
    })

    after(async () =>{
        await truckDriverModel.deleteMany();
    })
    
    it('should update data correctly', (done) =>{
        const app = init();
        chai.request(app)
        .put('/update')
        .set('content-type', 'application/json')
        .send({id: '5c97adb8b760cc5cc858ba8c', updatedParams: {name: 'Renamed'}})
        .end(async (err, res) =>{
            res.should.have.status(204)
            const updated = await truckDriverModel.findOne({_id: '5c97adb8b760cc5cc858ba8c'})
            updated.name.should.be.eql('Renamed')
            done()
        });
    });

    it('should update return error if object does not exist', (done) =>{
        const app = init();
        chai.request(app)
        .put('/update')
        .set('content-type', 'application/json')
        .send({id: '1', updatedParams: {name: 'A'}})
        .end((err, res) =>{
            res.should.have.status(400)
            done()
        });
    });
});


describe('GET', () => {

    before(async () =>{
        await truckDriverModel.deleteMany();
        const d1 = {
            "_id": "5c97adb8b760cc5cc858ba8c",
            "name": "A",
            "age": 30,
            "gender": "Male",
            "hasOwnVehicle": true,
            "cnhType": "E",
            "isLoaded": true,
            "vehicleType": 4,
            "arrivedAt": dayjs(new Date()).subtract(12, 'day').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            "__v": 0,
            "from": "São Paulo",
            "fromLat": -23.5505199,
            "fromLong": -46.63330939999999,
            "to": "Belo Horizonte",
            "toLat": -19.9166813,
            "toLong": -43.9344931
        };
        const d2 = {
            "_id": "5c97e3743b3bda230970223c",
            "name": "B",
            "age": 30,
            "gender": "Male",
            "hasOwnVehicle": false,
            "cnhType": "D",
            "isLoaded": false,
            "vehicleType": 1,
            "arrivedAt": dayjs(new Date()).subtract(2, 'month').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            "__v": 0,
            "from": "São Paulo",
            "fromLat": -23.5505199,
            "fromLong": -46.63330939999999,
            "to": "Salvador",
            "toLat": -12.977749,
            "toLong": -38.5016301
        };
        const d3 = {
            "_id": "5c97e4503e6eb924951dfd91",
            "name": "C",
            "age": 40,
            "gender": "Female",
            "hasOwnVehicle": true,
            "cnhType": "D",
            "isLoaded": false,
            "vehicleType": 4,
            "arrivedAt": dayjs(new Date()).subtract(9, 'day').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            "__v": 0,
            "from": "Rio de Janeiro",
            "fromLat": -22.9068467,
            "fromLong": -43.1728965,
            "to": "Niterói",
            "toLat": -22.8859267,
            "toLong": -43.1152587
        };
        const d4 = {
            "_id": "5c97e4897a148724eb0aafe2",
            "name": "D",
            "age": 40,
            "gender": "Male",
            "hasOwnVehicle": false,
            "cnhType": "A",
            "isLoaded": true,
            "vehicleType": 3,
            "arrivedAt": dayjs(new Date()).subtract(4, 'day').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            "__v": 0,
            "from": "São Paulo",
            "fromLat": -23.5505199,
            "fromLong": -46.63330939999999,
            "to": "Rio de Janeiro",
            "toLat": -22.9068467,
            "toLong": -43.1728965
        };
        const d5 = {
            "_id": "5c97e4a9862fdf254167b8df",
            "name": "E",
            "age": 22,
            "gender": "Female",
            "hasOwnVehicle": false,
            "cnhType": "A",
            "isLoaded": false,
            "vehicleType": 2,
            "arrivedAt": dayjs(new Date()).subtract(1, 'month').add(4, 'day').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            "__v": 0,
            "from": "Porto Alegre",
            "fromLat": -30.0346471,
            "fromLong": -51.2176584,
            "to": "Goiânia",
            "toLat": -16.6868982,
            "toLong": -49.2648114
        };
        const d6 = {
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
            "arrivedAt": dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            "fromLat": -22.9068467,
            "fromLong": -43.1728965,
            "toLat": -23.5505199,
            "toLong": -46.63330939999999,
            "__v": 0
        };

        await truckDriverModel.insertMany([d1,d2, d3, d4, d5, d6])
        
    })

    after(async () =>{
        await truckDriverModel.deleteMany();
    })

    describe('GET /vehicleOwners', () =>{
        it('it should retrieve vehicle owners quantity correctly', (done) =>{
            const app = init();
            chai.request(app)
            .get('/vehicleOwners')
            .end((err, res) =>{
                res.should.have.status(200)
                res.body.data.count.should.be.eql(3)
                done()
            });
        });
    });
    
    describe('GET /trucksByPeriod', () =>{
        it('should bring vehicles arriveAt count by period', (done) =>{
            const app = init();
            chai.request(app)
            .get('/trucksByPeriod')
            .end((err, res) =>{
                
                res.should.have.status(200)
                res.body.data.day.should.be.eql(1)
                res.body.data.week.should.be.eql(2)
                res.body.data.month.should.be.eql(5)
                done()
            });
        })
    });
    
    describe('GET /trucksByPeriod/:period', () =>{
        it('should bring vehicles arriveAt count by day', (done) =>{
            const app = init();
            chai.request(app)
            .get('/trucksByPeriod/day')
            .end((err, res) =>{
                
                res.should.have.status(200)
                res.body.data.day.should.be.eql(1)
                done()
            });
        });
    
        it('should bring vehicles arriveAt count by week', (done) =>{
            const app = init();
            chai.request(app)
            .get('/trucksByPeriod/week')
            .end((err, res) =>{
                
                res.should.have.status(200)
                res.body.data.week.should.be.eql(2)
                done()
            });
        });
    
        it('should bring vehicles arriveAt count by month', (done) =>{
            const app = init();
            chai.request(app)
            .get('/trucksByPeriod/month')
            .end((err, res) =>{
                
                res.should.have.status(200)
                res.body.data.month.should.be.eql(5)
                done()
            });
        });
    
        it('should return error on invalid period', (done) =>{
            const app = init();
            chai.request(app)
            .get('/trucksByPeriod/year')
            .end((err, res) =>{
                
                res.should.have.status(400)
                res.body.message.should.be.eql('Período não pode ser year')
                done()
            });
        })
    });
    
    describe('GET /allUnloaded', () =>{
        it('it should retrieve all unloaded truck drivers correctly', (done) =>{
            const app = init();
            chai.request(app)
            .get('/allUnloaded')
            .end((err, res) =>{
    
                res.should.have.status(200)
                res.body.data.list.length.should.be.eql(3)
                res.body.data.list[0].isLoaded.should.be.eql(false)
                done()
            });
        });
    });
})



