import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { authenticate } from '../actions/authenticate'
import PropTypes from 'prop-types'
import { fetchOneStudent } from '../actions/students/fetch'
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
  componentWillMount() {
    const { authenticate, fetchOneStudent } = this.props

    const { studentId } = this.props.match.params

    authenticate()
    fetchOneStudent(studentId)
  }

  showDays = (day, index) => {
    const red = "#F44336"
    const orange = "#FF5722"
    const green = "#4CAF50"
    const showColor = (color) => {
      if (color === "red") return "#F44336"
      if (color === "orange") return "#FF5722"
      if (color === "green") return "#4CAF50"
      else return "transparent"
    }
    return (
      <div key={index} className="dayColor" style={{background:showColor(day.eval)}}></div>
    )
  }

  render() {
    const { student } = this.props
    if (!student) return null

    const { name, picture, group, days } = this.props.students[0]

    return (
      <div className="Student">
        <Paper className="paper">
          <img src={picture} alt={name}/>
          <div className="heading">
            <h3>{name}</h3>
            <h4>batch #{group}</h4>
            {days.map(this.showDays)}
          </div>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({students}, {match}) => {
  const student = students.filter((s) => (s._id == match.params.studentId))[0]
  return {
    student,
    students
  }
}

export default connect(mapStateToProps,{authenticate, fetchOneStudent})(Student)
