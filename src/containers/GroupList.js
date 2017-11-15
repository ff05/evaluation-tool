import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../actions/authenticate'
import Group from './Group'
import fetchGroups from '../actions/groups/fetch'

class GroupList extends PureComponent {
  componentWillMount() {
    this.props.authenticate()
    this.props.fetchGroups()
  }

  showGroups(group) {
    return <Group group={group}/>
  }

  render() {
    const { groups } = this.props

    return (
      <div className="GroupList">
        {groups.map(group => (this.showGroups(group)))}
      </div>
    )
  }
}
const mapStateToProps = ({ groups }) => ({ groups })

export default connect(mapStateToProps, { authenticate, fetchGroups })(GroupList)
