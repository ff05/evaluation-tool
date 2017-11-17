import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import addStudent from '../actions/students/add'

class StudentForm extends PureComponent {
  static propTypes = {
    batch: PropTypes.number.isRequired
  }

  handleSubmit(event) {
    event.preventDefault()

    const { batch } = this.props
    const newStudent = {
      name: this.refs.name.getValue(),
      picture: this.refs.picture.getValue(),
      group: batch,
      days:
        {
        "day" : "2018-10-17",
        "eval": "green",
        "summary": ""
        }

    }
    this.props.addStudent(this.props.batch, newStudent);
  }

  render() {
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
}

export default connect(null,{addStudent})(StudentForm)
