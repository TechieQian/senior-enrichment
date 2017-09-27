import { combineReducers } from 'redux'
import axios from 'axios';

const initialState = {
	students 		: [],
	campuses 		: []
}

//ACTION TYPES

const 
	GET_STUDENTS 		= 'GET_STUDENTS',
	GET_CAMPUSES 		= 'GET_CAMPUSES'
	
//ACTION CREATORS

const getStudents = students => {
	const action = { type : GET_STUDENTS, students }
	return action;
}

const getCampuses = campuses => {
	const action = { type : GET_CAMPUSES, campuses }
	return action
}

//THUNK CREATORS


export function fetchStudents () {
  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
			.then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  }
}

export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campuses')
		//    .then(res => res.data)
			.then(campuses => {
				console.log('got campuses')
				console.log(campuses)
        const action = getCampuses(campuses);
        dispatch(action);
      });
  }
}

const rootReducer = function(state = initialState, action) {
	switch(action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        name: action.name
      };
    default: return state
  }
};

export default rootReducer
