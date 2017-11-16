import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../actions/authenticate'
import Paper from 'material-ui/Paper'
import fetchStudents from '../actions/students/fetch'
import { fetchOneGroup } from '../actions/groups/fetch'
import styles from './Group.css'

class Group extends PureComponent {
  componentWillMount() {
    // const { pathname } = this.props.location
    // const { groups } = this.props
    // const groupId = pathname.slice(pathname.lastIndexOf("/") + 1)
    // const currentGroup = groups.filter(group => group._id === groupId)
    // const batchNr = currentGroup[0].batch
    const { group, students, authenticate, fetchOneGroup, fetchStudents } = this.props

    const { groupId } = this.props.match.params

    if (!group) { fetchOneGroup(groupId) }
    if (students.length === 0) fetchStudents()
  }

  showStudents = (student, index) => {
    return (
       <div key={index} className="student">
         <h3>{student.name}</h3>
         <img className="picture" src={student.picture} alt={student.name}/>
      </div>
    )
  }


  render() {
    const { students } = this.props
    if (!students) return null
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
  const { groups, students } = state
  const group = groups.filter((g) => (g._id === this.props.match.params.groupId))[0]
  return {
    groups,
    group,
    students
  }
}

export default connect(mapStateToProps,{authenticate, fetchStudents, fetchOneGroup})(Group)
