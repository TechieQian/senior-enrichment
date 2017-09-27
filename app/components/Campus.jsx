import React, {Component} from 'react'
import {connect} from 'react-redux'
import store,{fetchCampusById} from '../store.jsx'
import {Link} from 'react-router-dom'
import CampusForm from './CampusForm'

class Campus extends Component {

	componentDidMount() {
		const campusId = this.props.match.params.campusId
		this.props.fetchCampus(campusId)
	}

	componentWillReceiveProps(props) {
		console.log('got new campus mount')
	}

	render() {
		console.log(this.props.campus)
		return (
			<div >
				<h2> {this.props.campus.name} </h2>
				<table className="table">
					<thead>
						<tr>
							<th>#</th>
							<th>name</th>
						</tr>
					</thead>
					<tbody>
					{
						this.props.campus.students &&
						this.props.campus.students.map((student)=> {
							return (
								<tr key={student.id}>
									<td>{student.id}</td>
									<td>{student.name}</td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
				<CampusForm campus={this.props.campus} />
			</div>
		)
	}
}

const mapStateToProps = ({campus})=> {
	return {
		campus
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCampus : (id)=> { dispatch(fetchCampusById(id)) }
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Campus)

