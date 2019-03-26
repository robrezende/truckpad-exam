const express = require('express');
const router = express.Router();

const truckDriverCreator = require('../business/truckDriver/creators/truckDriverCreator');
const truckDriverUpdater = require('../business/truckDriver/updaters/truckDriverUpdater');
const veichleOwnersGetter = require('../business/truckDriver/getters/veichleOwnersCountGetter');
const unloadedTruckListGetter = require('../business/truckDriver/getters/unloadedTruckListGetter');
const trucksArrivedByPeriodGetter = require('../business/truckDriver/getters/trucksByArrivedByPeriodGetter');
const truckDriversGetter = require('../business/truckDriver/getters/truckDriversGetter');

router.get('/', (req, res) => {
    res.sendStatus(200);
})

// - (def) Precisamos criar uma api para para cadastrar os motoristas que chegam nesse terminal e saber
// mais informações sobre eles. Precisamos saber nome, idade, sexo, se possui veiculo, tipo da CNH,
// se está carregado, tipo do veiculo que está dirigindo.
router.post('/create', async (req, res) => {
    let truckDriver = req.body;
    truckDriver.arrivedAt = new Date();
    try {
        const result = await truckDriverCreator.create(truckDriver);
        res.status(201).json({
            data: { driver: result }
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }

});

// - Será necessário atualizar os registros dos caminhoneiros.
router.put('/update', async(req, res) => {

    const id = req.body.id;
    const updatedParams = req.body.updatedParams;

    try {
        await truckDriverUpdater.update(id, updatedParams)
        res.status(204).json({message:'Atualizado com sucesso'});

    } catch (err) {
        res.status(400).json({message: 'Erro ao atualizar'})
    }
});

// - (def) Precisamos de um método para consultar todos os motoristas que não tem carga para voltar ao seu
// destino de origem.
router.get('/allUnloaded', async (req, res) => {
    const list = await unloadedTruckListGetter.get();
    if(list.length){
        res.status(200).json({
            data: { list: list }
        });
    }else{
        res.status(404).json({
            data: { list: [] }
        });
    }

});

// - Precisamos saber quantos caminhões passam carregados pelo terminal durante o dia, semana e
// mês.
router.get('/trucksByPeriod/:period', async (req, res) => {
    const period = (req.params.period).toLowerCase()
    if (period !== 'day' && period !== 'week' && period !== 'month') {
        res.status(400).json({
            message: `Período não pode ser ${period}`
        });
        return;
    }
    try {
        const result = await trucksArrivedByPeriodGetter.get(period);
        res.status(200).json({ data: result })
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.get('/trucksByPeriod', async (req, res) => {
    try {
        const result = await trucksArrivedByPeriodGetter.get();
        res.status(200).json({ data: result })
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// - Precisamos saber quantos caminhoneiros tem veiculo próprio.
router.get('/vehicleOwners', async (req, res) => {
    const count = await veichleOwnersGetter.get();
    res.status(200).json({
        data: { count: count }
    });
});

router.get('/all', async(req, res) =>{
    const list = await truckDriversGetter.get();
    res.status(200).json({
        data: { list: list }
    });
})


module.exports = router;