import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Courses from './containers/Courses/Courses';
import Course from './containers/Course/Course';
import Users from './containers/Users/Users';
import NoMatch from './containers/NoMatch/NoMatch';

class App extends Component {
  render () {
    return (
      <div className="App">
        <ol style={{textAlign: 'left'}}>
          <li>Add Routes to load "Users" and "Courses" on different pages (by entering a URL, without Links)</li>
          <li>Add a simple navigation with two links =&gt; One leading to "Users", one leading to "Courses"</li>
          <li>Make the courses in "Courses" clickable by adding a link and load the "Course" component in the place of "Courses" (without passing any data for now)</li>
          <li>Pass the course ID to the "Course" page and output it there</li>
          <li>Pass the course title to the "Course" page - pass it as a param or score bonus points by passing it as query params (you need to manually parse them though!)</li>
          <li>Load the "Course" component as a nested component of "Courses"</li>
          <li>Add a 404 error page and render it for any unknown routes</li>
          <li>Redirect requests to /all-courses to /courses (=&gt; Your "Courses" page)</li>
        </ol>
        <nav>
          <ul style={{listStyle:'none',margin:'auto',padding:'0px'}}>
            <li style={{margin:'10px', display:'inline-block'}}>
              <NavLink to='/users' >Users</NavLink>
            </li>
            <li style={{margin:'10px', display:'inline-block'}}>
              <NavLink to='/courses'>Courses</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
        <Route path='/users' component = {Users}></Route>
        {/* I<Route path='/courses/:courseId/' component = {Course}></Route> */}
        <Route path='/courses' component = {Courses}></Route>
        <Redirect from="/all-courses" to='/courses'></Redirect>
        <Route component={NoMatch}></Route>      
        </Switch>
        

      </div>
    );
  }
}

export default App;
