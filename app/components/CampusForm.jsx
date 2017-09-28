import React, {Component} from 'react'
import {connect} from 'react-redux'
import {putCampus, postCampus} from '../store.jsx'

class CampusForm extends Component {

	constructor() {
		super()
		this.state = {
			campusName : ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		if(this.props.campus && this.props.campus.id) {
			const {name} = this.props.campus
			this.setState({
				campusName : name
			})
		}
	}

	componentWillReceiveProps(props) {
		if(props.campus) {
			const {name} = props.campus
			this.setState({
				campusName : name
			})
		}
	}

	handleChange(event) {
		this.setState({ [event.target.name] : event.target.value	})
	}

	handleSubmit(event) {
		event.preventDefault()
		const { campusName } = this.state
		let newCampus
		if (this.props.campus) {
			newCampus = Object.assign(this.props.campus, {name : campusName})
			this.props.editCampus(newCampus)
		}
		else {
			newCampus = {name : campusName}
			this.props.createCampus(newCampus)
		}

	}

	render() {
		return (
			<div className='col-sm-3'>
			<div className='panel panel-primary'>
				<div className='panel-heading'>
					{this.props.campus ? 'Edit Campus' : 'New Campus'}
				</div>
				<div className='panel-body'>
				<form onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<label>Name</label>
						<input 
							name='campusName' 
							className='form-control' 
							onChange={this.handleChange}
							value={this.state.campusName}
						/>
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

const mapStateToProps = ({campuses})=> {
	return {
		campuses
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createCampus : (campus)=> {dispatch(postCampus(campus))},
		editCampus : (campus)=> {dispatch(putCampus(campus))}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CampusForm)
