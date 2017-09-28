import axios from 'axios'

//Action Types

const GET_CAMPUSES 		= 'GET_CAMPUSES'
const CREATE_CAMPUS  = 'CREATE_CAMPUS'
const DELETE_CAMPUS = 'DELETE_CAMPUS'


//Action Creators

const getCampuses = campuses => {
	const action = { type : GET_CAMPUSES, campuses }
	return action;
}

const createCampus = campus => {
	const action = { type : CREATE_CAMPUS, campus }
	return action; 
}


//Thunk Creators


export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
			.then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  }
}

export function putCampus (campus) {
	return function thunk (dispatch) {
		return axios.put(`api/campuses/${campus.id}`, campus)
			.then(() => {
				const action = fetchCampuses();
				console.log('update success')
        dispatch(action);
			})
  }
}

export function postCampus (campus) {
	return function thunk (dispatch) {
		return axios.post(`api/campuses/`, campus)
			.then(res => res.data )
			.then((campus) => {
				console.log('created campus', campus)
				const action = fetchCampuses();
        dispatch(action);
			})
  }
}

export default function campusReducer (state = [], action) {
	switch(action.type) {
    case GET_CAMPUSES:
      return  action.campuses
    case CREATE_CAMPUS:
      return  [...state.campuses, action.campus] 
		case DELETE_CAMPUS:
			return  [...state.campuses].filter((campus)=> {return campus.id != action.campusId})
		default : 
			return state
  }
}
