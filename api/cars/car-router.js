const express = require('express')
const knex = require('knex')

const carDb = knex({
    client: 'sqlite3',
    connection: {
        filename: './data/car-dealer.db3'
    },
    useNullAsDefault: true
});

const { validateCar } = require('./car-middleware.js')

const router = express.Router()

router.get('/', (req, res) => {
    carDb('cars')
        .select('*')
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Server was unable to get cars' })
        })
})

router.get('/:id', (req, res) => {
    const carId = req.params.id

    carDb('cars')
        .select('*')
        .where({ id: carId })
        .first()
        .then(car => {
            if (car) {
                res.status(200).json(car)
            } else {
                res.status(404).json({ message: 'Unable to find car, please new a new id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Server was unable to retrieve car' })
        })
})

router.post('/', validateCar, (req, res) => {
    const newCar = req.body

    carDb('cars')
        .insert(newCar, 'id')
        .then(id => {
            const carId = id[0]
            return carDb('cars')
                .select('*')
                .where({ id: carId })
                .first()
                .then(car => {
                    res.status(201).json({ message: 'New car was added!', Car: car })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Server was unable to add new car' })
        })
})

module.exports = router