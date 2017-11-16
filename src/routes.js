import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { GroupList, Group, GroupCreator, Student, SignUp, SignIn } from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={GroupList} />
        <Route path="/groups/:groupId" component={Group} />
        <Route path="/create-group" component={GroupCreator} />
        <Route path="/groups/:groupId/students/:studentId" component={Student} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    )
  }
}
