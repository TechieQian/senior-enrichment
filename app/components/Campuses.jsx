import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCampuses} from '../store.jsx'
import { Link  } from 'react-router-dom'
import CampusForm from './CampusForm'

class Campuses extends Component {

	componentDidMount() {
		this.props.getCampuses()
	}

	render() {
		return (
			<div>
				<div className='row'>
					{
						this.props.campuses.map((campus)=> {
							return (
								<div className='well col-sm-3' >
									<Link className='thumbnail' to={`/campus/${campus.id}`} >
										<div className="caption">
											<h5>
												<span>{ campus.name }</span>
											</h5>
										</div>
									</Link>
								</div>
							)
						})
					}
				</div>
				<div>
					<CampusForm />
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

const mapDispatchToProps = (dispatch) => {
	return {
		getCampuses : ()=> { dispatch(fetchCampuses()) }
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Campuses)
