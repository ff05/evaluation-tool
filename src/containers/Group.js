import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { authenticate } from '../actions/authenticate'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import StudentForm from './StudentForm'
import fetchGroups from '../actions/groups/fetch'
import fetchStudents from '../actions/students/fetch'
// import addStudent from '../actions/students/add'
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

    authenticate()
    fetchGroups()
    fetchOneGroup(groupId)

    fetchStudents(groupId)
    this.state = {
      ask : false,
      name: ""
    }
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

  askQuestion() {
    const { students } = this.props
    const reds = students.filter(s => s.days[0].eval === "red")
    const oranges = students.filter(s => s.days[0].eval === "orange")
    const greens = students.filter(s => s.days[0].eval === "green")
    const allColors1 = [reds, reds, reds, oranges, oranges, greens]
    return [].concat(...allColors1)
  }

  getRandom() {
    const allColors = this.askQuestion()
    const randStu = (allColors[Math.floor(Math.random()*allColors.length)])
    this.setState({ask: true,
    name: randStu.name})
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
        <div className="lower">
          <RaisedButton
          onClick={ this.getRandom.bind(this) }
            label= "ask random"
            primary={true}
          />
          { this.state.ask ? <h3 className="rand-name">{this.state.name}</h3>: null }
        </div>
      </div>
    )
  }

  render() {
    const { students, groups, group } = this.props
    // if (!students) return null
    if (!group) return null

    return (
      <div className="Group">
        <h1>Students</h1>
        <div className="upper">
          <StudentForm batch={group.batch}/>
          {
            students ? this.showPercentage() : null
          }
        </div>

        <Paper className="paper">
        {
           students ? students.map(this.showStudents) : null
        }

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

export default connect(mapStateToProps,{authenticate, fetchGroups, fetchStudents, fetchOneGroup, push})(Group)
