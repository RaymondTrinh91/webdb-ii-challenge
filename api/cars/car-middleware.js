
module.exports = {
    validateCar: (req, res, next) => {
        const { VIN, make, model, mileage } = req.body

        if(!VIN || !make || !model || !mileage ){
            res.status(400).json({ message: 'Please make sure to add a VIN number, a make and model, and the mileage' })
        } else {
            next()
        }
    }
}