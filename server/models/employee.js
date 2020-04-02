var mongoose = require('mongoose');

var employeeInfoSchema = new mongoose.Schema({
    employeeAddress: String,
    employeeContact: {type: Number},
});

var employeeSchema = new mongoose.Schema({
    employeeName: { type: String, required: true, min: 3, max: 20},
    employeeId: { type: String, required: true, max: 5, unique: true },
    employeeInfo: employeeInfoSchema,
  });

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;