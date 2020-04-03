import React, {Component} from 'react';

import { withApollo } from '@apollo/react-hoc';

import {getUpdateEmployeeMutation, getCreateEmployeeMutation} from '../graphql/employee';


class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            employeeId: '',
            employeeAddress: '',
            employeeContact: '',
        };
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    onCreateEmployee = async () => {
        const employee = {
            "employeeName" : this.state.employeeName,
            "employeeId" : this.state.employeeId,
            "employeeInfo": {
                "employeeAddress" : this.state.employeeAddress,
                "employeeContact" : parseInt(this.state.employeeContact)
            }
        };
        
        if(this.props.isEditPage) {
            const UPDATE_EMPLOYEE = getUpdateEmployeeMutation();
            const id = this.props.employee._id;
            const res = await this.props.client.mutate({
                mutation: UPDATE_EMPLOYEE,
                variables: {id, employee}
            });
            console.log('update employee res', res);
        } else {
            const CREATE_EMPLOYEE = getCreateEmployeeMutation();
            const res = await this.props.client.mutate({
                mutation: CREATE_EMPLOYEE,
                variables: {employee}
            });
            console.log('create employee', res);
        }
        // reedirect to table page
        this.props.onViewAllEmployees();
    }

    componentDidMount() {
        if(this.props.isEditPage 
        ) {
            this.setState({
                employeeName: this.props.employee.employeeName,
                employeeId: this.props.employee.employeeId,
                employeeAddress: this.props.employee.employeeInfo.employeeAddress,
                employeeContact: this.props.employee.employeeInfo.employeeContact,
            });
        }
    }

    render() {
        const isEditPage = this.props.isEditPage;
        let empName = this.state.employeeName;
        let empId = this.state.employeeId;
        let empAddress = this.state.employeeAddress;
        let empContact = this.state.employeeContact;
        return(
            <div className='create-employee-form'>
                <div className="create-container">
                    <form action="#">
                        <label htmlFor="Empid">Employee Id</label>
                        <input type="text" onChange={this.onChange} id="emp" name="employeeId" placeholder="Employee ID" defaultValue={empId} />

                        <label htmlFor="fname">Employee Name</label>
                        <input type="text" onChange={this.onChange} id="fname" name="employeeName" placeholder="Employee Name" defaultValue={empName} />

                        <label htmlFor="email">Address</label>
                        <input type="text" onChange={this.onChange} id="email" name="employeeAddress" placeholder="Employee Address" defaultValue={empAddress} />

                        <label htmlFor="contact">Contact Number</label>
                        <input type="tel" onChange={this.onChange} id="contact" name="employeeContact" placeholder="Employee Contact" defaultValue={empContact} />

                        <button type="button" onClick={this.onCreateEmployee} id="button" name="create">
                            {isEditPage ? 'Update' : 'Create'}
                        </button>

                    </form>  
                </div>
            </div>
        );
    }
}
export default withApollo(CreateEmployee);