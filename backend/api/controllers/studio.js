const { where } = require('sequelize');
const {Studio} = require('../models/model')


const getStudio = async (req, res) => {
    try {
        const userId = req.user.id;    
        const studio = await Studio.findOne({ where: { userId } })

        if (!studio) {
          return res.status(404).json({ message: 'Studio not found' })
        }

        res.status(200).json(studio);
    } catch (error) {
        res.status(500).json({error});
    }
}

const updateStudio = async (req, res) => {
    try {
        const userId = req.user.id;
        const { motherboardId, cpuId, gpuId, storageId, ramId, psuId, bodyId } = req.body

        const studio = await Studio.findOne({ where: { userId } });
        if (!studio) {
          return res.status(404).json({ message: 'Studio not found' });
        }

        studio.motherboardId = motherboardId || studio.motherboardId;
        studio.cpuId = cpuId || studio.cpuId;
        studio.gpuId = gpuId || studio.gpuId;
        studio.storageId = storageId || studio.storageId;
        studio.ramId = ramId || studio.ramId;
        studio.psuId = psuId || studio.psuId;
        studio.bodyId = bodyId || studio.bodyId;

        await studio.save();
        res.status(200).json({ message: 'Studio updated successfully', studio });
    } catch (error) {
        res.status(400).json({error});
    }
}

module.exports = {getStudio, updateStudio}