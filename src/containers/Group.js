import React, { PureComponent } from 'react'
import Student from './Student'

export default class Group extends PureComponent {
  render() {
    console.log(this.props.group)
    return (
      <Student />
    )
  }
}
