const {
    getEmployeeById, getAllEmployees, createEmployee,
    updateEmployee, deleteEmployee
} = require('../services/employee');

module.exports = {
    Query: {
        getAllEmployees: async (parent, args, context, info) => await getAllEmployees(),
        getEmployeeById: async (parent, {id}, context, info) => await getEmployeeById(id),
    },
    Mutation: {
        createEmployee: async (parent, {employee}, context, info) => await createEmployee(employee),
        updateEmployee: async (parent, {id, updateInfo}, context, info) => await updateEmployee(id, updateInfo),
        deleteEmployee: async (parent, {id}, context, info) => await deleteEmployee(id),
    },
}