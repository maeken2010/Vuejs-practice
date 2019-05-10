// [1,1,1,1,1,2,2,3] -> [[1,1,1,1,1],[2,2],[3]]
// みたいに変換するよ
function group(list) {
  const l = list.length
  let x = list[0]
  let g = [x]
  let result = []
  for (var i = 1; i < l; i++) {
    if (x !== list[i]) {
      result.push(g)
      g = []
    }
    g.push(list[i])
    x = list[i]
  }
  result.push(g)
  return result
}

function hasLine (list) {
  return group(list).filter((v) => v.length > 4 && v[0] !== 0 ).length !== 0
}

export default function isGameEnd(cells) {
  const boardSize = cells.length
  let lh = []
  let lw = []
  for (var n = 0; n < boardSize; n++) {
    for (var m = 0; m < boardSize; m++) {
      lh.push(cells[n][m])
      lw.push(cells[m][n])
    }
    if (hasLine(lh) || hasLine(lw)) {
      return true
    }
    lh=[]
    lw=[]
  }
  return false
}
