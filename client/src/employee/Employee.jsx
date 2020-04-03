import React, {Component} from 'react';

import {Query} from '@apollo/react-components';

import {getAllEmployeesQuery} from '../graphql/employee';

import ViewEmployees from './ViewEmployees.jsx';
import CreateEmployee from './CreateEmployeeForm.jsx';
import './employee.css';
import  Header from './Header.jsx';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isViewPage: false,
            isCreatePage: true,
            isEditPage: false,
            editEmployee: null,
        };
    }

    // will be called when we click on the edit button in view page table row
    onEditEmployee = (employee) => {
        this.setState({
            isViewPage: false,
            isCreatePage: false,
            isEditPage: true,
            editEmployee: employee
        });
    }
    
    //will be called when we click on view all employees link in header
    onViewAllEmployeesLinkClick = async () =>{
        this.setState({
            isViewPage: true,
            isCreatePage: false,
            isEditPage: false
        });
    }

    // will be called when we click on create employee link in header
    onCreateEmployeeLinkClick =  () =>{
        this.setState({
            isViewPage: false,
            isCreatePage: true,
            isEditPage: false
        });
    }



    render() {
        const GET_ALL_EMPLOYEES = getAllEmployeesQuery();
        let employees = [];
        if(this.state.isViewPage) {
            return(
                <Query query={GET_ALL_EMPLOYEES}>
                    {({loading, error, data, refetch}) => {
                        if(data) employees = data.getAllEmployees;
                        return (
                            <>
                                <Header
                                    onViewAllEmployees ={this.onViewAllEmployeesLinkClick}
                                    onCreateEmployee ={this.onCreateEmployeeLinkClick}
                                />
                                <ViewEmployees
                                    loading={loading}
                                    error={error}
                                    employees={employees}
                                    refetch={refetch}
                                    onEditEmployee={this.onEditEmployee}
                                />
                            </>
                        );
                    }}
                    
                </Query>
            );
        } else if(this.state.isCreatePage) {
            return (
                <div>
                    <Header
                        onViewAllEmployees={this.onViewAllEmployeesLinkClick}
                        onCreateEmployee ={this.onCreateEmployeeLinkClick}
                    />
                    <CreateEmployee
                        onViewAllEmployees={this.onViewAllEmployeesLinkClick}
                    />
                </div>
            )
        } else if(this.state.isEditPage) {
            const employee = this.state.editEmployee;
             return (
            <div>
                <Header
                    onViewAllEmployees ={this.onViewAllEmployeesLinkClick}
                    onCreateEmployee ={this.onCreateEmployeeLinkClick}
                />
                <CreateEmployee
                    isEditPage={true}
                    employee={employee}
                    onViewAllEmployees={this.onViewAllEmployeesLinkClick}
                />
            </div>
            )
        }
    }
}

export default Employee;