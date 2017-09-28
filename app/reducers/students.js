import axios from 'axios'

//Action Types

const GET_STUDENTS 		= 'GET_STUDENTS'
const CREATE_STUDENT  = 'CREATE_STUDENT'
const DELETE_STUDENT  = 'DELETE_STUDENT'

//Action Creators

const getStudents = students => {
	const action = { type : GET_STUDENTS, students }
	return action;
}

const deleteStudent = studentId => {
  const action = { type : DELETE_STUDENT, studentId }
  return action
}

//Thunk Creators


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

export function putStudent (student) {
	return function thunk (dispatch) {
		return axios.put(`api/students/${student.id}`, student)
			.then(() => {
				const action = fetchStudents();
				console.log('update success')
        dispatch(action);
			})
  }
}

export function removeStudent (studentId) {
  return function thunk (dispatch) {
    console.log('remove ran', studentId)
    return axios.delete(`api/students/${studentId}`)
      .then(() => {
        const action = deleteStudent(studentId);
        console.log('delete success')
        dispatch(action);
      })
  }
}


export function postStudent (student) {
	return function thunk (dispatch) {
		return axios.post(`api/students/`, student)
			.then(res => res.data )
			.then((student) => {
				console.log('created student', student)
				const action = fetchStudents();
        dispatch(action);
			})
  }
}

export default function studentReducer(state = [], action) {
	switch(action.type) {
    case GET_STUDENTS:
      return  action.students
    case CREATE_STUDENT:
      return  [...state, action.student] 
		case DELETE_STUDENT:
			return  [...state].filter((student)=> {return student.id != action.studentId})
		default: 
			return state
  }
}
