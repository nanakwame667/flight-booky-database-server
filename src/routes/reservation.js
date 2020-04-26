const express       = require("express");
const Reservation   = require('../models/reservation');
const Flight        = require('../models/flight');
const MiddleWares   = require('../config/middlewares');
const Functions     = require('../utils/functions');
const router        = express.Router();


router.post("/", MiddleWares.userAuthRequired, (req, res)=>{

    let data = req.body;

    if (Functions.hasOwnProperties(data, ['travelClass', 'numberOfPersons', 'flightID'])){
     
        Reservation.count({where: {
            userID: req.user.id,
            flightID: data.flightID,
            reservationStatus: 'not-complete'
        }}).then((count)=>{
            if (count == 0){        
                Reservation.create({
                    userID: req.user.id,
                    flightID: data.flightID,
                    travelClass: data.travelClass,
                    numberOfPersons: data.numberOfPersons
                }).then((reservation)=>{
                    console.log("new reservation added : ", reservation);
                    res.status(200).json({status: 'success', result: { data: reservation}});
                }).catch((err)=>{
                    res.status(500).json({status: 'failed', result: {message: 'error creating new reservation', error: err}});
                });
            }
            else{
                res.status(500).json({status: 'failed', result: {message: 'you already made this reservation!. you can try updating it'}});
            }
        }).catch((err)=>{
            res.status(500).json({status: 'failed', result: {message: 'unable to make reservation', error: err}});
        });

    }
    else{
        res.status(500).json({status: 'failed', result: {message: 'arguments not valid. requires travelClass, numberOfPersons and flightID'}});
    }

});

router.get("/", MiddleWares.userAuthRequired, (req, res)=>{
    let whereClause = req.body;
    if (!whereClause) whereClause = {};
    whereClause.userID = req.user.id;
    Reservation.findAll({where: whereClause}).then((reservations) => {
        res.status(200).json({status: 'success', result: { data: reservations }});       
    }).catch((err) => {
        res.status(500).json({status: 'failed', result: {message: 'unable to get reservations', error: err}});
    });
});

router.delete("/", MiddleWares.userAuthRequired, (req, res)=>{
    let whereClause = req.body;
    if (!whereClause) whereClause = {};
    whereClause.userID = req.user.id;
    Reservation.destroy({
        where: whereClause, truncate: true
    }).then(() => {
        res.status(200).json({status: 'success', result: {message: 'deleted reservation successfully'}});
    }).catch((err) => { 
        res.status(500).json({status: 'failed', result: {message: 'unable to delete reservation', error: err}});
    });
});

router.get("/:id", MiddleWares.userAuthRequired, (req, res)=>{
    Reservation.findOne({
        where: {
            userID: req.user.id,
            id: req.params.id
        }
    }).then((reservation) => {
        res.status(200).json({status: 'success', result: { data: reservation }});
    }).catch((err)=>{
        res.status(500).json({status: 'failed', result: {message: 'unable to get reservation', error: err}});
    });
});

router.delete("/:id", MiddleWares.userAuthRequired, (req, res)=>{
    
    Reservation.destroy({
        where: {
            userID: req.user.id,
            id: req.params.id
        }
    }).then(() => {
        res.status(200).json({status: 'success', result: {message: 'deleted reservation successfully'}});
    }).catch((err)=>{ 
        res.status(500).json({status: 'failed', result: {message: 'unable to delete reservation', error: err}});
    });
});

router.put("/:id", MiddleWares.userAuthRequired, (req, res)=>{
    Reservation.update(req.body, {
        where: {
            userID: req.user.id,
            id: req.params.id
        }
    }).then((reservation) => {
        res.status(200).json({status: 'success', result: {data: reservation, message: 'updated reservation successfully'}});
    }).catch((err)=>{ 
        res.status(500).json({status: 'failed', result: {message: 'unable to update reservation', error: err}});
    });
});

module.exports = router;