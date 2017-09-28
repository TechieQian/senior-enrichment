import React, {Component} from 'react'
import CampusForm from './CampusForm'

function Campus (props) {
	const campus = props.location.state.campus
	const students = props.location.state.students
	console.log(students)
	return (
		<div >
			<h2> {campus.name} </h2>
			<table className="table">
				<thead>
					<tr>
						<th>#</th>
						<th>name</th>
					</tr>
				</thead>
				<tbody>
				{
					students &&
					students.map((student)=> {
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
			<CampusForm campus={campus} />
		</div>
	)
}

export default Campus

