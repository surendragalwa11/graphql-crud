const Employee = require('../models/employee');


const getAllEmployees = async function() {
    console.log('fetch all employees');
    try {
        const employees = await Employee.find({});
        return employees;
    } catch(error) {
        console.log(error);
        return false;
    }
};

const getEmployeeById = async function(employeeId) {
    console.log('get Employe by id', employeeId);
    try {
        const employee = await Employee.findById(employeeId);
        return employee;
    } catch(error) {
        console.log(error);
        return false;
    }
}

const createEmployee = async function(employee) {
    console.log('create employee', employee);
    try {
        const emp = new Employee(employee);
        const employeeInfo = await emp.save();
        return employeeInfo._id;
    } catch(error) {
        console.log(error);
        return false;
    }
}

const updateEmployee = async function(employeeId, updateInformation) {
    console.log('update employee', employeeId, updateInformation);
    try {
        const updateStatus = await Employee.updateOne({_id: employeeId}, updateInformation);
        return updateStatus;
    } catch(error) {
        console.log(error);
        return false;
    }
}

const deleteEmployee = async function(employeeId) {
    console.log('delete employee', employeeId);
    try {
        const deleteStatus = await Employee.deleteOne({_id: employeeId});
        return deleteStatus;
    } catch(error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    getEmployeeById,
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
}