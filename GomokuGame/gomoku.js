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

function isSizeRange(x, s) {
  return 0 <= x && x < s
}

// groupで分割して、５個以上連続していたら終了判定
function hasLine (list) {
  return group(list).filter((v) => v.length > 4 && v[0] !== 0 ).length !== 0
}

function searchVHLihe(cells) {
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

// すべてを網羅できるように検査
function searchDLine(cells) {
  const boardSize = cells.length
  const r = _.range(boardSize)
  const fill0List = r.map(i => 0)
  const fillSizeList = r.map(i => boardSize)

  // ３隅の辺
  const l1 = _.zip(fill0List, r)
  const l2 = _.zip(r, fill0List)
  const l3 = _.zip(r, fillSizeList)

  for (var p of l1) {
    const l1 = createDLine1(p, cells, boardSize)
    const l2 = createDLine2(p, cells, boardSize)
    if (hasLine(l1) || hasLine(l2)) return true
  }

  for (var p of l2) {
    const l1 = createDLine1(p, cells, boardSize)
    if (hasLine(l1)) return true
  }

  for (var p of l3) {
    const l2 = createDLine2(p, cells, boardSize)
    if (hasLine(l2)) return true
  }

  return false
}

// 座標を増やしていく方向
function createDLine1(p, cells, size) {
  let [n, m] = p
  return _.range(size)
    .map(i => {
      return isSizeRange(n+i, size) && isSizeRange(m+i, size) ? [n+i, m+i] : undefined
    })
    .filter(i => !_.isNil(i))
    .map(i => cells[i[0]][i[1]])
}

// 片方の座標は減らす、もう片方は増やす方向
function createDLine2(p, cells, size) {
  let [n, m] = p
  return _.range(size)
    .map(i => {
      return isSizeRange(n+i, size) && isSizeRange(m-i, size) ? [n+i, m-i] : undefined
    })
    .filter(i => !_.isNil(i))
    .map(i => cells[i[0]][i[1]])
}

export default function isGameEnd(cells) {
  // 縦横判定 || 斜め判定
  return searchVHLihe(cells) || searchDLine(cells)
}
