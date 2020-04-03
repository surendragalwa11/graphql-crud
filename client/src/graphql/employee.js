import gql from 'graphql-tag';

export const getCreateEmployeeMutation = () => gql`
    mutation createEmployee($employee: EmployeeInput) {
        createEmployee(employee: $employee)
    }
`;

export const getEmployeeByIdQuery = () => gql`
    query getEmployeeById($id: ID!) {
        getEmployeeById(id: $id) {
            employeeName
            employeeId
        }
    }
`;

export const getAllEmployeesQuery = () => gql`
    query getAllEmployees {
        getAllEmployees {
            _id
            employeeName
            employeeId
            employeeInfo {
                employeeAddress
                employeeContact
            }
        }
    }
`;


export const getUpdateEmployeeMutation = () => gql`
    mutation updateEmployee($id: ID!, $employee: EmployeeInput) {
        updateEmployee(id: $id, updateInfo: $employee) {
            nModified
        }
    }
`;

export const getDeleteEmployeeMutation = () => gql`
    mutation deleteEmployee($id: ID!) {
        deleteEmployee(id: $id) {
            nModified
        }
    }
`;