import { expect } from 'chai'
import students from './students'

describe('students reducer', () => {
  const reducer = students
  const initialState = []

  it('returns an empty array for the initial state', () => {
    expect(reducer()).to.eql(initialState)
  })
})

it('should handle ADD_STUDENT', () => {
    expect(
      students([], {
        type: 'ADD_STUDENT',
        payload: {
          "name": "Wayne Louwrens",
          "picture": "https://avatars0.githubusercontent.com/u/29921542?s=400&v=4",
          "group" : "1",
          "days": [
            {
              "day" : "2017-10-18",
              "eval": "orange",
              "summary": "great motivation, a few more things"
            },
            {
              "day" : "2017-10-19",
              "eval": "green",
              "summary": "scrum went easy on him"
            }
          ]
        }
      })
    ).eql([
      {
        "name": "Wayne Louwrens",
        "picture": "https://avatars0.githubusercontent.com/u/29921542?s=400&v=4",
        "group" : "1",
        "days": [
          {
            "day" : "2017-10-18",
            "eval": "orange",
            "summary": "great motivation, a few more things"
          },
          {
            "day" : "2017-10-19",
            "eval": "green",
            "summary": "scrum went easy on him"
          }
        ]
      }
    ])

    expect(
      students([{
        "name": "Wayne Louwrens",
        "picture": "https://avatars0.githubusercontent.com/u/29921542?s=400&v=4",
        "group" : "1",
        "days": [
          {
            "day" : "2017-10-18",
            "eval": "orange",
            "summary": "great motivation, a few more things"
          },
          {
            "day" : "2017-10-19",
            "eval": "green",
            "summary": "scrum went easy on him"
          }
        ]
      }],
        {
          type: 'ADD_STUDENT',
          payload: {
            "name": "Maurice Buiten",
            "picture": "https://media.licdn.com/media/AAEAAQAAAAAAAAnXAAAAJDJhZTAyYjhiLWZjYTYtNDQ1Ni1iNzk2LTIxODE1MWRjNzc5Zg.jpg",
            "group" : "1",
            "days": [
              {
                "day" : "2017-10-18",
                "eval": "green",
                "summary": "seems like he knows what he's doing"
              },
              {
                "day" : "2017-10-19",
                "eval": "red",
                "summary": "couldn't get AJAX to work"
              }
            ]
          }
        })
    ).eql([
      {
        "name": "Maurice Buiten",
        "picture": "https://media.licdn.com/media/AAEAAQAAAAAAAAnXAAAAJDJhZTAyYjhiLWZjYTYtNDQ1Ni1iNzk2LTIxODE1MWRjNzc5Zg.jpg",
        "group" : "1",
        "days": [
          {
            "day" : "2017-10-18",
            "eval": "green",
            "summary": "seems like he knows what he's doing"
          },
          {
            "day" : "2017-10-19",
            "eval": "red",
            "summary": "couldn't get AJAX to work"
          }
        ]
      },
      {
        "name": "Wayne Louwrens",
        "picture": "https://avatars0.githubusercontent.com/u/29921542?s=400&v=4",
        "group" : "1",
        "days": [
          {
            "day" : "2017-10-18",
            "eval": "orange",
            "summary": "great motivation, a few more things"
          },
          {
            "day" : "2017-10-19",
            "eval": "green",
            "summary": "scrum went easy on him"
          }
        ]
      }
    ])
})
// 
// it('should handle FETCHED_ONE_STUDENT', () => {
//   expect(
//     students([
//       {
//         _id: 1,
//         a: "test",
//         c: "student",
//         b: "reducer"
//       },
//       {
//         _id: 2,
//         a: "testing",
//         c: "the",
//         b: "reducer"
//       }
//     ],
//     {
//       type: 'FETCHED_ONE_STUDENT',
//       payload: {
//         _id: 1
//       }
//     })
//   ).eql([
//     {
//       _id: 1,
//       a: "test",
//       c: "student",
//       b: "reducer"
//     }
//   ])
// })
