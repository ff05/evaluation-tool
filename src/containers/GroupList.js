import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { authenticate } from '../actions/authenticate'
import fetchGroups from '../actions/groups/fetch'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import AddIcon from 'material-ui/svg-icons/social/people'
import styling from './GroupList.css'

class GroupList extends PureComponent {
  componentWillMount() {
    const { groups, authenticate, fetchGroups } = this.props
    authenticate()
    fetchGroups()

    if (!groups) fetchGroups()
  }

  goToGroup = groupBatch => event => this.props.push(`/groups/${groupBatch}`)

  showGroups = (group, index) => {
    return (

       <li key={index} className="group" onClick={this.goToGroup(group.batch)}>
         <span>{group.batch}</span>
         <span>{group.startDate}</span>
         <span>{group.endDate}</span>
      </li>
    )
  }

  componentWillReceiveProps(nextProps) {
    const { groups } = nextProps

    if (!groups) {
      this.props.fetchGroups()
    }
  }

  render() {
    const { groups } = this.props
    if (!groups) return null

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
const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    students: state.students
  }
}

export default connect(mapStateToProps, { authenticate, fetchGroups, push })(GroupList)
