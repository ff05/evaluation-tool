import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { authenticate } from '../actions/authenticate'
import PropTypes from 'prop-types'
import fetchGroups from '../actions/groups/fetch'
import addGroup from '../actions/groups/add'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import AddIcon from 'material-ui/svg-icons/social/people'
import styling from './GroupList.css'

export class GroupList extends PureComponent {
  static propTypes = {
    fetchGroups: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired,
    authenticate: PropTypes.func.isRequired,

    groups: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      batch: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })),

    students: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      group: PropTypes.string.isRequired,
      days: PropTypes.array
    })),
  }

  componentWillMount() {
    const { groups, authenticate, fetchGroups } = this.props
    authenticate()
    fetchGroups()

    if (!groups) fetchGroups()
  }

  goToGroup = groupBatch => event => this.props.push(`/groups/${groupBatch}`)

  showGroups = (group, index) => {
    const { batch, startDate, endDate } = group

    function changeDateFormat(groupDate) {
      const date = new Date(groupDate)
      const year = date.getFullYear()
      const month= ("0" + (date.getMonth()+1)).slice(-2)
      const day = ("0" + date.getDate()).slice(-2)
      const newDate = day + " / " + month + " / "  + year
      return newDate
    }


    return (

       <li key={index} className="group" onClick={this.goToGroup(group.batch)}>
         <span>{batch}</span>
         <span>{changeDateFormat(startDate)}</span>
         <span>{changeDateFormat(endDate)}</span>
      </li>
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    const newGroup = {
      batch: this.refs.batch.getValue(),
      startDate: this.refs.startDate.getValue(),
      endDate: this.refs.endDate.getValue()
    }
    this.props.addGroup(newGroup);
  }

  componentWillReceiveProps(nextProps) {
    const { groups } = nextProps

    if (!groups) {
      this.props.fetchGroups()
    }
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form">
        <div className="input">
          <TextField ref="batch" type="email" hintText="Class #" />
        </div>
        <div className="input">
          <TextField ref="startDate" type="date" hintText="Start Date"/>
        </div>
        <div className="input">
          <TextField ref="endDate" type="date" hintText="End Date" />
        </div>
        <RaisedButton
          onClick={ this.handleSubmit.bind(this) }
          label="Add Class"
          primary={true} />
      </form>
    )
  }

  render() {
    const { groups } = this.props
    if (!groups) return null

    return (
      <div className="GroupList">
        <h1>Classes</h1>
        {this.renderForm()}
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
const mapStateToProps = ({groups, students}) => ({groups, students})

export default connect(mapStateToProps, { authenticate, addGroup, fetchGroups, push })(GroupList)
