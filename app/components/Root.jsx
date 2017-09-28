import React, { Component } from 'react';
import Campuses from './Campuses'
import Students from './Students'
import Campus from './Campus'
import Menu from './Menu'
import { Route, HashRouter } from 'react-router-dom'

export default function Main () {
	return (
		<div className='container'>
			<h1> Student Campus </h1>
			<HashRouter>
				<div>
					<Menu />
					<br />
					<Route exact path='/campuses' component={Campuses} />
					<Route exact path='/students' component={Students} />
					<Route exact path='/campus/:campusId' component={Campus} />
				</div>
			</HashRouter>
		</div>
	)
}
