import { flipHorizontaly, flipVerticaly, rotateLeft, rotateRight } from './transformations.js'

describe('matrix transformations', () => {
  it('rotates 90° right', () => {
    expect(rotateRight([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])).to.include.deep.members([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ])
  })

  it('rotates 90° left', () => {
    expect(rotateLeft([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])).to.include.deep.members([
      [3, 6, 9],
      [2, 5, 8],
      [1, 4, 7]
    ])
  })

  it('rotates 180° right/left', () => {
    expect(rotateRight(rotateRight([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]))).to.include.deep.members([
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1]
    ])
  })

  it('flips horizontaly', () => {
    expect(flipHorizontaly([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])).to.include.deep.members([
      [7, 8, 9],
      [4, 5, 6],
      [1, 2, 3]
    ])
  })

  it('flips vertically', () => {
    expect(flipVerticaly([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])).to.include.deep.members([
      [3, 2, 1],
      [6, 5, 4],
      [9, 8, 7]
    ])
  })
})
