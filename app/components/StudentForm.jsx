import React, {Component} from 'react'


class StudentForm extends Component {

	constructor() {
		super()
		this.state = {
			name : '',
			campusId : undefined,
			campuses : []
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		if (this.props.student) {
			const {name} = this.props.student
			const campusId = this.props.student.campusId ? this.props.student.campusId : 0 
			const campuses = this.props.campuses
			this.setState({ 
				name,
				campusId,
				campuses
			})
		}

	}

	componentWillReceiveProps(props) {
		if ( this.props.student.id != props.student.id ) {
			const campusId = props.student.campusId ? props.student.campusId : 0 
			const {name} = props.student
			const campuses = props.campuses
			this.setState({ 
				name,
				campusId,
				campuses
			})
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		const { name } = this.state
		const campusId = this.state.campusId ? this.state.campusId : null
		const submittedStudent = this.props.student ? 
			Object.assign(this.props.student, {name,campusId}) :
			{name, campusId}
		this.props.handleSubmit(submittedStudent)
	}

	handleChange(event) {
		this.setState({ [event.target.name] : event.target.value	})
	}

	render() {
		const student = this.props.student
		return (
			<div className='col-sm-4'>
				<div className='panel panel-primary'>
					<div className='panel-heading'>
						{ this.props.student ? 'Edit Student' : 'New Student' }
					</div>
					<div className='panel-body'>
						<form onSubmit={this.handleSubmit}>
							<div className='form-group'>
								<label>Name</label>
								<input 
									name='name' 
									className='form-control' 
									onChange={this.handleChange}
									value={this.state.name}
								/>
							</div>					
							<div className='form-group'>
								<label>Campus</label>
								<select 
									name='campusId' 
									className='form-control'
									value={this.state.campusId} 
									onChange={this.handleChange}>
									<option key={0} value={null}></option>
									{
										this.props.campuses && this.props.campuses.map((campus)=> {
											return (
												<option key={campus.id} value={campus.id}>{campus.name}</option>
											)
										})

									}
								</select>
							</div>
							<div className='form-group'>
								<button
									type="submit"
									className="btn btn-primary btn-block"
								>Save</button>
							</div>					
						</form>
					</div>
				</div>
			</div>
		)
	}
}


export default StudentForm
