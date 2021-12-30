let mongoose = require('mongoose');
let express = require("express");
let router = express.Router();

let orderSchema = require('../models/Order');

//create order
router.route('/').post((req, res, next) => {
    orderSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

router.route('/history').get((req, res) => {
    studentSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;