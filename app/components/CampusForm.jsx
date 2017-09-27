import React, {Component} from 'react'
import {connect} from 'react-redux'
import store, {putCampus, postCampus} from '../store.jsx'

class CampusForm extends Component {

	constructor() {
		super()
		this.state = {
			campusName : '',
			image : ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		console.log('i mounted',this.props.campus)
		if(this.props.campus) {
			const {name, image} = this.props.campus
			console.log('setting campus state', name)
			this.setState({
				campusName : name,
				image
			})
		}
		else {
			console.log('no campus')
		}
	}

	componentWillReceiveProps(props) {
		if(props.campus) {
			const {name,image} = props.campus
			console.log('received props')
			this.setState({
				campusName : name,
				image
			})
		}
	}

	handleChange(event) {
		this.setState({ [event.target.name] : event.target.value	})
	}

	handleSubmit(event) {
		event.preventDefault()
		const { campusName, image } = this.state
		let newCampus
		console.log('before state', store.getState())
		if (this.props.campus) {
			newCampus = Object.assign(this.props.campus, {name : campusName,image})
			this.props.editCampus(newCampus)
		}
		else {
			newCampus = {name : campusName, image}
			this.props.createCampus(newCampus)
		}

	}

	render() {
		console.log('form rendering', this.props.campus)
		console.log('state', this.state)
		return (
			<div className='col-sm-3 panel-body'>
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
