import { expect } from 'chai'
import groups from './groups'

describe('groups reducer', () => {
  const reducer = groups
  const initialState = []

  it('returns an empty array for the initial state', () => {
    expect(reducer()).to.eql(initialState)
  })
})

it('should handle ADD_GROUP', () => {
    expect(
      groups([], {
        type: 'ADD_GROUP',
        payload: {
          batch: 1,
          startDate: "2017-01-01",
          endDate: "2017-02-01"
        }
      })
    ).eql([
      {
        batch: 1,
        startDate: "2017-01-01",
        endDate: "2017-02-01"
      }
    ])

    expect(
      groups([{
          batch: 1,
          startDate: "2017-01-01",
          endDate: "2017-02-01"
        }],
        {
          type: 'ADD_GROUP',
          payload: {
            batch: 2,
            startDate: "2017-02-01",
            endDate: "2017-03-01"
          }
        })
    ).eql([
      {
        batch: 2,
        startDate: "2017-02-01",
        endDate: "2017-03-01"
      },
      {
        batch: 1,
        startDate: "2017-01-01",
        endDate: "2017-02-01"
      }
    ])
})
