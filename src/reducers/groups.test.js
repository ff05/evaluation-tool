import { expect } from 'chai'
import groups from './groups'

describe('groups reducer', () => {
  const stateBefore = []
  const action = {
    type: 'FETCHED_GROUPS',
    payload: {
      batch : 1,
      startDate : "2017-10-18T16:00:00Z",
      endDate : "2017-12-18T16:00:00Z"
    }
  }
  const stateAfter = [
    {
      batch : 1,
      startDate : "2017-10-18T16:00:00Z",
      endDate : "2017-12-18T16:00:00Z"
    }
  ]
  it('adds groups when FETCHED_GROUPS is dispatched', () => {
    expect(groups(stateBefore, action)).to.eql(stateAfter)
  })
})
