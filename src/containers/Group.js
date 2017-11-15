import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../actions/authenticate'
import Paper from 'material-ui/Paper'
import fetchStudents from '../actions/students/fetch'
import Student from './Student'
import styles from './Group.css'

class Group extends PureComponent {
  componentWillMount() {
    const { pathname } = this.props.location
    const groupId = pathname.slice(pathname.lastIndexOf("/") + 1)

    this.props.authenticate()
    this.props.fetchStudents(groupId)
  }

  showStudents = (student, index) => {
    return (
       <Paper key={index} className="student">
         <h3>{student.name}</h3>
         <img className="picture" src={student.picture} alt={student.name}/>
      </Paper>
    )
  }


  render() {

    const {students} = this.props
    return (
      <div className="Group">
      <h1>Class</h1>
      <Paper className="paper">
        {students.map(this.showStudents)}
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

export default connect(mapStateToProps,{authenticate, fetchStudents})(Group)
