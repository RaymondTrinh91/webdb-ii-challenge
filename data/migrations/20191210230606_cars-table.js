
exports.up = function (knex) {
    return knex.schema.createTable("cars", cars => {
        cars.increments()

        cars.string('VIN', 17)
            .unique()
            .notNullable()
        
        cars.string('make', 30)
            .notNullable()

        cars.string('model', 30)
            .notNullable()

        cars.integer('mileage', 20)
            .notNullable()

        cars.string('transmission')

        cars.string('status')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cars')
};
