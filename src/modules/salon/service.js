import  Salon from './salon.js';

export const getAllSalons = async (req,res) => {
        try {
            const salonsCollection = req.db.collection('salons');
            const salons = await salonsCollection.find().toArray();
            res.json(salons);
          } catch (err) {
            res.status(500).send({ message: err.message });
          }
};
