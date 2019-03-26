const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');

const databaseConnector = require('./db/connection/databaseConnector');
const truckDriverService = require('./services/truckDriverService');
const locationService = require('./services/locationService');

const port = 3001;

databaseConnector.connect();

app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send('Olá')
});

app.use('/truckDrivers', truckDriverService);
app.use('/locations', locationService);

http.listen(port, () => console.log(`Iniciado na porta ${port}`))