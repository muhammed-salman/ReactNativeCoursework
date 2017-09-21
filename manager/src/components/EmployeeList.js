import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
	componentWillMount() {
		this.props.employeesFetch();
		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		//nextProps new props, this.props still contains old props
		this.createDataSource(nextProps);
	}

	createDataSource({ employees }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});	
		//cloneWithRows expects an array not object
		this.DataSource = ds.cloneWithRows(employees);
	}
	
	renderRow() {
		return <ListItem employee={this.props.employees} />;
	}
	render() {
		return (
			<ListView 
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>	
		);
	}
}

const mapStateToProps = state => {
	const employees = _.map(state.employees, (val, uid) => {
		return { ...val, uid };
	});
	return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
