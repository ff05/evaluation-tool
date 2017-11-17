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
      if (color === "orange") return "#FF5722"
      if (color === "green") return "#4CAF50"
      else return "transparent"
    }
    return (
      <div key={index} className="dayColor" style={{background:showColor(day.eval)}}></div>
    )
  }

  submitForm() {

  }

  registerColor(color) {
    this.setState({color: color})
    console.log(this.state.color)
  }

  render() {
    const { student } = this.props
    if (!student) return null

    const { name, picture, group, days } = this.props.student

    const date = new Date(days[0].day)
    const year = date.getFullYear();
    const month= ("0" + (date.getMonth()+1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const newDate = "[" + day + "]/" + "[" + month + "]/" + "[" + year + "] "
    console.log(newDate)

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
          <p>Daily evaluation for: {newDate}</p>
          <div className="green" style={{}} onClick={this.registerColor.bind(this, "green")}> </div>
          <div className="orange" style={{}} onClick={this.registerColor.bind(this, "orange")}></div>
          <div className="red" style={{}} onClick={this.registerColor.bind(this, "red")}></div>
          <form className="form" onSubmit={this.submitForm.bind(this)}>
            <div className="input">
              <TextField
                ref="summary"
                type="text"
                hintText="Summary of today"
                multiLine = {true}
                rows = {2}
                 />
            </div>
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

export default connect(mapStateToProps,{authenticate, fetchOneStudent})(Student)
