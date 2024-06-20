const {Computer, Studio, Product} = require('../models/model')

const getAllComputers = async (req, res) => {
    try {
        const computers = await Computer.findAll();
        res.status(200).json(computers);        
    } catch (error) {
        res.status(500).json({error});
    }
}

const getComputer = async (req, res) => {
    try {
        const {id} = req.params;
        const computer = await Computer.findByPk(id);
        if (!computer)
            res.status(400).json({message: "Not found"});
        res.status(200).json(computer);        
    } catch (error) {
        res.status(500).json({error});
    }
}

const generateComputer = async (req, res) => {
    try {
        const {studioId} = req.params;
        const studio = await Studio.findByPk(studioId, {
            include: [
              { model: Product, as: 'motherboard' },
              { model: Product, as: 'cpu' },
              { model: Product, as: 'gpu' },
              { model: Product, as: 'storage' },
              { model: Product, as: 'ram' },
              { model: Product, as: 'psu' },
              { model: Product, as: 'body' }
            ]
        });
        if (!studio)
            res.status(400).json({message: "Studio Not found"});

        const { motherboard, cpu, gpu, storage, ram, psu, body } = studio;
        const total_price =
            (motherboard ? motherboard.price : 0) +
            (cpu ? cpu.price : 0) +
            (gpu ? gpu.price : 0) +
            (storage ? storage.price : 0) +
            (ram ? ram.price : 0) +
            (psu ? psu.price : 0) +
            (body ? body.price : 0);

        const computer = await Computer.create({
            motherboardId: motherboard ? motherboard.id : null,
            cpuId: cpu ? cpu.id : null,
            gpuId: gpu ? gpu.id : null,
            storageId: storage ? storage.id : null,
            ramId: ram ? ram.id : null,
            psuId: psu ? psu.id : null,
            bodyId: body ? body.id : null,
            total_price
        });

        res.status(200).json(computer);        
    } catch (error) {
        res.status(500).json({error});
    }
}

const updateComputer = async(req, res) => {
    try {
        const { motherboardId, cpuId, gpuId, storageId, ramId, psuId, bodyId } = req.body;
        const id = req.query.id;

        const computer = await Computer.findByPk(id);
        if (!computer)
            res.status(400).json({message: "Doesn't exist"});

        computer.update({motherboardId: motherboardId ? motherboard.id : null,
            cpuId: cpuId || computer.cpuId,
            gpuId: gpuId || computer.gpuId,
            storageId: storageId || computer.storageId,
            ramId: ramId || computer.ramId,
            psuId: psuId || computer.psuId,
            bodyId: bodyId || computer.bodyId
        });
        res.status(200).json(computer);        
    } catch (error) {
        res.status(500).json({error});
    }
}

module.exports = {updateComputer, generateComputer, getAllComputers, getComputer}
