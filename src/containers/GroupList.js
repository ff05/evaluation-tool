import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Group from './Group'
import fetchGroups from '../actions/groups/fetch'

class GroupList extends PureComponent {
  componentWillMount() {
    console.log(this.props.fetchGroups())
  }

  render() {
    return (
      <Group />
    )
  }
}
const mapStateToProps = ({ groups }) => ({ groups })

export default connect(mapStateToProps, { fetchGroups })(GroupList)
