import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { authenticate } from '../actions/authenticate'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import fetchGroups from '../actions/groups/fetch'
import fetchStudents from '../actions/students/fetch'
import addStudent from '../actions/students/add'
import { fetchOneGroup } from '../actions/groups/fetch'
import styles from './Group.css'

class Group extends PureComponent {
  static propTypes = {
    fetchGroups: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    authenticate: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    addStudent: PropTypes.func.isRequired,
    fetchOneGroup: PropTypes.func.isRequired,

    groups: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      batch: PropTypes.number.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })),

    students: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      group: PropTypes.number.isRequired,
      days: PropTypes.array
    })),
  }

  componentWillMount() {
    const { authenticate, fetchOneGroup, fetchStudents, fetchGroups } = this.props

    const { groupId } = this.props.match.params

    authenticate()
    fetchGroups()
    fetchOneGroup(groupId)

    fetchStudents(groupId)
  }

  goToStudent = (studentId) => event => this.props.push(`/students/${studentId}`)

  showStudents = (student, index) => {
    return (
       <div key={index} className="student" onClick={this.goToStudent(student._id)}>
         <h3>{student.name}</h3>
         <img className="picture" src={student.picture} alt={student.name}/>
      </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault()

    const { groupId } = this.props.match.params
    const newStudent = {
      name: this.refs.name.getValue(),
      picture: this.refs.picture.getValue(),
      group: groupId,
      days:
        {
        "day" : "2018-10-17",
        "eval": "",
        "summary": ""
        }

    }
    this.props.addStudent(groupId, newStudent);
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form">
        <div className="input">
          <TextField ref="name" type="text" hintText="Name" />
        </div>
        <div className="input">
          <TextField ref="picture" type="text" hintText="Image source"/>
        </div>
        <RaisedButton
          onClick={ this.handleSubmit.bind(this) }
          label="Add Student"
          primary={true} />
      </form>
    )
  }

  render() {
    const { students } = this.props
    if (!students) return null

    return (
      <div className="Group">
        <h1>Students</h1>
        {this.renderForm()}
        <Paper className="paper">
            {students.map(this.showStudents)}
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({groups, students}, {match}) => {
  const group = groups.filter((g) => (g.batch == match.params.groupId))[0]
  return {
    groups,
    group,
    students
  }
}

export default connect(mapStateToProps,{authenticate, fetchGroups, addStudent, fetchStudents, fetchOneGroup, push})(Group)
