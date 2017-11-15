import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { authenticate } from '../actions/authenticate'
import Group from './Group'
import fetchGroups from '../actions/groups/fetch'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import List from 'material-ui/List'
import AddIcon from 'material-ui/svg-icons/social/people'
import styling from './GroupList.css'

class GroupList extends PureComponent {
  componentWillMount() {
    this.props.authenticate()
    this.props.fetchGroups()
  }

  goToGroup = groupId => event => this.props.push(`/groups/${groupId}`)

  showGroups = (group, index) => {
    return (

       <li className="group" onClick={this.goToGroup(group._id)}>
         <span>{group.batch}</span>
         <span>{group.startDate}</span>
         <span>{group.endDate}</span>
      </li>
    )
  }

  render() {
    const { groups } = this.props

    return (
      <div className="GroupList">
        <h1>Classes</h1>
        <RaisedButton
          label="New Class"
          primary={true}
          onClick={this.props.createGroup}
          icon={<AddIcon />}
        />
        <Paper className="paper">
          <ul className="groups">
            <li className="group group-header">
              <span>Batch</span>
              <span>Start Date</span>
              <span>End Date</span>
            </li>
            {groups.map(this.showGroups)}
          </ul>
        </Paper>
      </div>
    )
  }
}
const mapStateToProps = ({ groups }) => ({ groups })

export default connect(mapStateToProps, { authenticate, fetchGroups, push })(GroupList)
