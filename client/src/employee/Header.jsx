import React, {Component} from 'react';

class Header extends Component {

 	render(){
 		return(
 		<div className="header">
          <a href="#" onClick={this.props.onViewAllEmployees}>View all employees</a>
          <a href="#"  onClick={this.props.onCreateEmployee}>Create an employee</a>
        </div>
 		)
 	}
}
export default Header;