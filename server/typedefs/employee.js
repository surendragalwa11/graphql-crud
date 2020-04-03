const { gql } = require('apollo-server');

const employeeTypedef = gql `
    type EmployeeInfo {
        employeeAddress: String
        employeeContact: Float
    }

    input EmployeeInfoInput {
        employeeAddress: String
        employeeContact: Float
    }

    type Employee {
        _id: ID
        employeeName: String
        employeeId: String
        employeeInfo: EmployeeInfo
    }

    input EmployeeInput {
        employeeName: String
        employeeId: String
        employeeInfo: EmployeeInfoInput
    }

    type Launch {
        flight_number: Int
        mission_name: String
        mission_id: [String]
        upcoming: Boolean
        launch_year: String
        launch_date_unix: Int
    }

    type Query {
        launches: [Launch]
        launch(id: ID!): Launch
        getAllEmployees: [Employee]
        getEmployeeById(id: ID!): Employee
    }

    type employeeMutationResponse {
        nModified: Int
        ok: Int
        n: Int
    }

    type Mutation {
        createEmployee(employee: EmployeeInput): String
        updateEmployee(id: ID!, updateInfo: EmployeeInput): employeeMutationResponse
        deleteEmployee(id: ID!): employeeMutationResponse
    }
`;

module.exports = employeeTypedef;