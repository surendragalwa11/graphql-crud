import React, {Component} from 'react';

import { withApollo } from '@apollo/react-hoc';

import {getEmployeeByIdQuery, getDeleteEmployeeMutation} from '../graphql/employee';

class ViewEmployees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedEmployee: {},
        };
    }

    componentDidMount() {
        this.props.refetch();
    }

    onDeleteClick = (emp) => {
        this.setState({selectedEmployee: emp});
    }

    onDeleteEmployee = async (id) => {
        const DELETE_EMPLOYEE = getDeleteEmployeeMutation();
        await this.props.client.mutate({
            mutation: DELETE_EMPLOYEE,
            variables: {id}
        });
        // refetch get all employee query
        this.props.refetch();
    }

    getEmployeeById = async (id) => {
        const GET_EMPLOYEE_BY_ID = getEmployeeByIdQuery();
        const employee = await this.props.client.query({
            query: GET_EMPLOYEE_BY_ID,
            variables: {id}
        });
        console.log('fetched employee', employee.data.getEmployeeById);
    }

    render() {
        const props = this.props;
        const selectedEmp = this.state.selectedEmployee;
        return(
            <div className='view-employees'>
                {
                    props.loading ?
                    <div className='loader' />
                    :
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Address</th>
                                <th scope="col">Contact</th>
                                <th scope='col'>Edit</th>
                                <th scope='col'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.employees.map(employee => (
                                        <tr key={employee._id} onClick={() => this.getEmployeeById(employee._id)}>
                                            <td>{employee.employeeName}</td>
                                            <td>{employee.employeeId}</td>
                                            <td>{employee.employeeInfo.employeeAddress}</td>
                                            <td>{employee.employeeInfo.employeeContact}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-warning"
                                                    onClick={() => this.props.onEditEmployee(employee)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    data-toggle="modal"
                                                    data-target="#exampleModalCenter"
                                                    onClick={() => this.onDeleteClick(employee)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    
                                }
                            </tbody>
                        </table>

                        {/* Empty table text */}
                        {
                            this.props.employees.length < 1
                            &&
                            <div className='no-data-text'>
                                No employee exist. Please create an employee first.
                            </div>
                        }
                        
                        {/* Delete Modal */}
                        <div
                            className="modal fade"
                            id="exampleModalCenter"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-hidden="true"
                        >
                            <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                            >
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">
                                        Delete Employee, {selectedEmp.employeeName} ?
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure, you want to delete this employee?
                                    Once you delete, all the information will be erased from database.
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        data-dismiss="modal"
                                        onClick={() => this.onDeleteEmployee(selectedEmp._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        );
    }
}

export default withApollo(ViewEmployees);
