import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Menu() {
	return (
		<ul className="nav nav-pills">
      <li className="nav-item">
				<NavLink to={`/campuses`} activeClassName="selected">Campuses</NavLink>
      </li>
      <li className="nav-item">
				<NavLink to={`/students`} activeClassName="selected">Students</NavLink>
      </li>
		</ul>
	)
}
