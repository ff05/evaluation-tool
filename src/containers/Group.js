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

export class Group extends PureComponent {
  static propTypes = {
    fetchGroups: PropTypes.func,
    fetchStudents: PropTypes.func,
    authenticate: PropTypes.func,
    push: PropTypes.func,
    addStudent: PropTypes.func,
    fetchOneGroup: PropTypes.func,

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

  constructor(props) {
    super(props)
    const { authenticate, fetchOneGroup, fetchStudents, fetchGroups } = this.props

    const { groupId } = this.props.match.params

    fetchGroups()
    fetchOneGroup(groupId)

    fetchStudents(groupId)
  }

  goToStudent = (studentId) => event => this.props.push(`/students/${studentId}`)

  showStudents = (student, index) => {
    const showColor = (color) => {
      if (color === "red") return "#F44336"
      if (color === "orange") return "#FF5722"
      if (color === "green") return "#4CAF50"
      else return "transparent"
    }
    return (
       <div key={index} className="student" onClick={this.goToStudent(student._id)}>
         <h3>{student.name}</h3>
         <img className="picture" src={student.picture} alt={student.name}/>
         <div className="color" style={{background:showColor(student.days[0].eval)}}></div>
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

  showPercentage() {
    const { students } = this.props
    const days = students.map(s => s.days)
    const colors1 = days.map(d => d.map(e => e.eval))
    const colors2 = [].concat(...colors1)
    const perc = (color) => {
      const occ = colors2.filter(c => c === color).length
      return ( occ / colors2.length * 100 ) + "%"
    }
    return (
      <div className="avgScore">
        <h3>Average Score: </h3>
        <div className="green" style={{width: perc("green")}}> </div>
        <div className="orange" style={{width: perc("orange")}}></div>
        <div className="red" style={{width: perc("red")}}></div>
      </div>
    )
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
    const { students, groups } = this.props
    if (!students) return null
    if (!groups) return null
    return (
      <div className="Group">
        <h1>Students</h1>
        <div className="upper">
          {this.renderForm()}
          {this.showPercentage()}
        </div>

        <Paper className="paper">
            {students.map(this.showStudents)}
        </Paper>
      </div>
    )
  }

}

const mapStateToProps = ({groups, students}, {match}) => {
  const group = groups.filter((g) => (g.batch == match.params.groupId))[0]
  if (students[0] && groups[0]) return {
    groups,
    group,
    students
  }
  return {}
}

export default connect(mapStateToProps,{authenticate, fetchGroups, addStudent, fetchStudents, fetchOneGroup, push})(Group)
