import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import GroupList from './containers/GroupList'
import Group from './containers/Group'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={GroupList} />
        <Route path="/groups/:groupId" component={Group} />
      </div>
    )
  }
}
