import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchStudents, fetchCampuses} from '../store.jsx'
import { Link  } from 'react-router-dom'
import CampusForm from './CampusForm'

class Campuses extends Component {

	componentDidMount() {
		this.props.getStudents()
		this.props.getCampuses()
	}

	render() {
		return (
			<div>
				<div className='row'>
					{
						this.props.campuses.map((campus)=> {
							const students = this.props.students.filter((student)=> {
								return student.campus && student.campus.id == campus.id
							})
							return (
								<div className='panel panel-primary col-sm-3' >
									<div className='panel-body'>
										<Link to={{
											pathname : 	`/campus/${campus.id}`,
											state : { campus, students }
											}}>
											<h5>
												<span>{ campus.name }</span>
											</h5>
										</Link>
									</div>
								</div>
							)
						})
					}
				</div>
				<div className='row'>
					<CampusForm />
				</div>
			</div>
		)
	}

}

const mapStateToProps = ({students,campuses})=> {
	return {
		students,
		campuses
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getStudents : ()=> {dispatch(fetchStudents())},
		getCampuses : ()=> { dispatch(fetchCampuses()) }
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Campuses)
