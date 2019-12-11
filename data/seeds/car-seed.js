
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: "YS3FB45S831050660", make: "Honda", model: "Civic", mileage: 97000, transmission: "Automatic", status: "Clean" },
        { VIN: "5NPEB4AC2CH433603", make: "Ford", model: "Mustang", mileage: 55000, status: "Salvage" },
        { VIN: "JT5FG02T6V0024626", make: "Lexus", model: "LC", mileage: 42000, transmission: "Manual" }
      ]);
    });
};
