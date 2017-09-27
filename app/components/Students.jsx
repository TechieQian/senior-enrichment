import React, {Component} from 'react'
import {connect} from 'react-redux'
import {putStudent, fetchCampuses,fetchStudents, removeStudent, fetchStudentById, postStudent} from '../store.jsx'
import {Link} from 'react-router-dom'
import Student from './Student'


class Students extends Component {

	constructor() {
		super()
		this.state = {
			showNew : false,
			showEdit : false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		this.props.getStudents()
		this.props.getCampuses()
	}

	handleSubmit(student) {
		this.setState( { showNew : false, showEdit : false } )
		if ( student.id ) {
			this.props.updateStudent(student)
		}
		else {
			this.props.createStudent(student)
		}

	}

	render() {
		return (
			<div>
				<div className='row'> 
					{ this.state.showEdit && 
							<Student 
								student={this.props.selectedStudent} 
								campuses={this.props.campuses} 
								handleSubmit={this.handleSubmit}
							/>}
					{ this.state.showNew &&	
							<Student 
								campuses={ this.props.campuses } 
								handleSubmit={this.handleSubmit}
							/>	}
				</div>
				<div className='well'>
					<table className="table">
						<thead>
							<tr>
								<th>#</th>
								<th>name</th>
								<th>campus</th>
								<th>
									<button className='btn btn-primary' onClick={ ()=> {this.setState({showNew : true, showEdit : false})} } > + </button>
								</th>
							</tr>
						</thead>
						<tbody>
						{
							this.props.students.map((student)=> 
								<tr key={student.id} onClick={()=> {this.props.getSelectedStudent(student.id)
								this.setState({ showEdit : true, showNew : false })}}>
									<td>{student.id}</td>
									<td>{student.name}</td>
									<td>{student.campus && student.campus.name}</td>
									<td>
										<button
											className = 'btn btn-danger'
											onClick={ (evt)=> {evt.stopPropagation() ; this.props.deleteStudent(student.id) }}
										>
											Delete
										</button>
									</td>
								</tr>
							)
						}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({campuses,selectedStudent, students})=> {
	return {
		students,
		selectedStudent,
		campuses
	}
}

const mapDispatchToProps = (dispatch)=> {
	return {
		getCampuses : ()=> {dispatch(fetchCampuses())},
		deleteStudent : (id)=> { dispatch(removeStudent(id)) },
		getStudents : ()=> {dispatch(fetchStudents())},
		getSelectedStudent : (id)=> {dispatch(fetchStudentById(id))},
		updateStudent : (student)=> {dispatch(putStudent(student))},
		createStudent : (student)=> {dispatch(postStudent(student))}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Students)

