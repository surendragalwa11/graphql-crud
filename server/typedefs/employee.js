const { gql } = require('apollo-server');

// const employeeSchema = type Launch {
//     id: ID!,
//     site: String,
//     mission: Mission,
//     rocket: Rocket,
//     isBooked: Boolean!,
//   };


const employeeTypedef = gql `
    type Employee {
        id: ID!
        name: String
        address: Address
    }

    type Address {
        plotNumber: String
        landmark: String
        district: String
        state: String
        pin: Int
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
        launches: [Launch],
        getAllEmployees: [Employee]
        getEmployeeById(id: ID!): Employee
    }

    type employeeMutationResponse {
        success: Boolean!
        message: String
        employeeId: ID
    }

    type Mutation {
        editEmployee(id: [ID]!): employeeMutationResponse!
        deleteEmployee(id: ID!): employeeMutationResponse!
    }
`;

module.exports = employeeTypedef;