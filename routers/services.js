const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const getClient = require('../db/mongodb');

router.get('/services', (req, res) => {
    getClient((err, db) => {
        if (err) return res.send(err);
        db.collection('services').find().toArray((err, result) => {
            if (err) return res.send(err);
            return res.send(result);
        });
    });
});

router.post('/service', (req, res) => {
    const ar = [];
    ar.push(req.body);
    req.body.created = new Date();

    getClient((err, db) => {
        if (err) return res.send(err);
        db.collection('services').insertMany(ar, (err, result) => {
            if (err) return res.send(err);
            return res.send(result);
        });
    });
});

router.patch('/service/:id', (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
    getClient((err, db) => {
        if(err) return res.status(500).send(err);        
        db.collection('services').updateOne(
            { _id: new ObjectId(id)}, 
            { $set: { price } },
            (err, result) => {
                if(err) return res.status(500).send(err);
                return res.send(result);
            }
        );
    });
});

router.delete('/service/:id', (req, res) => {
    const id = req.params;
    getClient((err, db) => {
        if (err) return res.status(500).send(err);
        db.collection('services').deleteOne({
            _id: new ObjectId(id)
        }, (err, result) =>{
            if(err) return res.status(500).send(err);
            return res.send(result);
        });
    });
});

module.exports = router
