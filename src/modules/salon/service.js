import  salon from './salon.js';

export const getAllSalons = async (req,res) => {
        try {
            const salonsCollection = req.db.collection('salon');
            const salons = await salonsCollection.find().toArray();
            res.json(salons);
          } catch (err) {
            res.status(500).send({ message: err.message });
          }
};