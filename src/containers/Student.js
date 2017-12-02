import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { authenticate } from '../actions/authenticate'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { fetchOneStudent } from '../actions/students/fetch'
import updateStudent from '../actions/students/update'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styling from './Student.css'

class Student extends PureComponent {
    static propTypes = {
      authenticate: PropTypes.func.isRequired,
      fetchOneStudent: PropTypes.func.isRequired,

      students: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        group: PropTypes.number.isRequired,
        days: PropTypes.array
      })),

      match: PropTypes.object
    }

    constructor(props) {
      super(props)
        this.state = {
          color: ""
        }

    }

  componentWillMount() {
    const { authenticate, fetchOneStudent } = this.props

    const { studentId } = this.props.match.params

    authenticate()
    fetchOneStudent(studentId)

  }

  showDays = (day, index) => {
    const showColor = (color) => {
      if (color === "red") return "#F44336"
      if (color === "yellow") return "#FFEB3B"
      if (color === "green") return "#4CAF50"
      else return "transparent"
    }
    return (
      <div key={index} className="dayColor" style={{background:showColor(day.eval)}}></div>
    )
  }

  updateStudent(event) {
    event.preventDefault()

    const {days} = this.props.student
    const date = new Date(days[0].day)

    const editStudent =
      {
      "day" : date,
      "eval": this.state.color,
      "summary": this.refs.summary.getValue()
      }
    this.props.updateStudent(this.props.student.group, this.props.student._id, editStudent)
    // this.props.push('/students')

  }

  registerColor(color) {
    this.setState({color: color})
  }

  render() {
    const { student } = this.props
    if (!student) return null

    const { name, picture, group, days } = this.props.student

    return (
      <div className="Student">
        <Paper className="paper">
        <div className="upper">
          <img src={picture} alt={name}/>
          <div className="heading">
            <h3>{name}</h3>
            <h4>batch #{group}</h4>
            {days.map(this.showDays)}
          </div>
        </div>
        <div className="lower">
          <p>Daily evaluation for: </p>
          <div className="colors">
            <div className="green" onClick={this.registerColor.bind(this, "green")}> </div>
            <div className="yellow" onClick={this.registerColor.bind(this, "yellow")}></div>
            <div className="red" onClick={this.registerColor.bind(this, "red")}></div>
          </div>
          <form className="form" onSubmit={this.updateStudent.bind(this)}>
            <div className="input">
              <div className="input">
                <TextField ref="date" type="date" hintText="Date"  />
              </div>
             </div>
            <div className="input">
              <TextField
                ref="summary"
                type="text"
                hintText="Summary of today"
                multiLine = {true}
                rows = {2}
                 />
            </div>
            <RaisedButton
            onClick={ this.updateStudent.bind(this) }
              label= "Save"
              primary={true}
            />
          </form>
        </div>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({students}, {match}) => {
  const student = students.filter((s) => (s._id == match.params.studentId))[0]
  return {
    students,
    student
  }
}

export default connect(mapStateToProps,{authenticate, push, updateStudent, fetchOneStudent})(Student)
