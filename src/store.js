import firebase from 'firebase'
import _ from 'lodash'

var config = {
  apiKey: 'AIzaSyCV75QBr8hleUZ2rQ-uOx1NyE8q2Rn1uXo',
  authDomain: 'cf-excel.firebaseapp.com',
  databaseURL: 'https://cf-excel.firebaseio.com',
  storageBucket: ''
}
var db = firebase.initializeApp(config)

var data = {
  cells: []
}

// var rowsNumber = 100
// var colsNumber = 20

// for (var row = 0; row < rowsNumber; row++) {
//   data.cells[row] = []
//   for (var col = 0; col < colsNumber; col++) {
//     let cell = {
//       row,
//       col,
//       content: ((col === 1) ? Math.round(Math.random() * 100) : '')
//     }
//     save(cell)
//     data.cells[row][col] = cell
//   }
// }

db.database().ref('/cells').once('value', function (snapshot) {
  try {
    var cells = snapshot.val()
    for (let cellId in cells) {
      var cell = cells[cellId]
      if ((cell.row >= data.cells.length) || (!data.cells[cell.row])) {
        data.cells.$set(cell.row, [])
      }
      data.cells[cell.row].$set(cell.col, cell)
    }
  } catch (ex) {
    console.error(ex)
    console.error(cell)
  }
})

db.database().ref('/cells').on('child_changed', function (childSnapshot, prevChildKey) {
  var cell = childSnapshot.val()
  if (!cell.content) {
    cell.content = ''
  }
  console.log('Before assign:', (new Date()).getTime())
  _.assign(data.cells[cell.row][cell.col], cell)
  console.log('After assign:', (new Date()).getTime())
})

// Generate the data
// data.rows = []

// var rowsNumber = 100
// var colsNumber = 20

// for (var row = 0; row < rowsNumber; row++) {
//   data.rows[row] = []
//   for (var col = 0; col < colsNumber; col++) {
//     data.rows[row][col] = {
//       row,
//       col,
//       content: ((col === 1) ? Math.round(Math.random() * 100) : null)
//     }
//   }
// }

export default data

export function isFormula (content) {
  if ((typeof content) !== 'string') {
    return false
  }
  if (content.length === 0) {
    return false
  }
  if (content[0] === '=') {
    return true
  }
  return false
}

function literalToOffset (cellName) {
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var colName = cellName[0].toUpperCase()
  var rowName = cellName.substring(1)

  var row = (rowName * 1) - 1
  var col = letters.indexOf(colName)
  return {
    row,
    col
  }
}

function getCellsRect (worksheet, start, end) {
  var startOffset = literalToOffset(start)
  var endOffset = literalToOffset(end)
  if (startOffset.row > endOffset.row) {
    let temp = startOffset.row
    startOffset.row = endOffset.row
    endOffset = temp
  }
  if (startOffset.col > endOffset.col) {
    let temp = startOffset.col
    startOffset.col = endOffset.col
    endOffset = temp
  }

  var cells = []
  for (var row = startOffset.row; row <= endOffset.row; row++) {
    for (var col = startOffset.col; col <= endOffset.col; col++) {
      cells.push(worksheet.cells[row][col])
    }
  }
  return cells
}

function applyFormula (worksheet, formula) {
  var formulaRegex = /=([^\(]+)\(([^\)]+)\)/gi
  var tokens = formulaRegex.exec(formula)
  try {
    var name = tokens[1].toUpperCase()
    var params = tokens[2]
    var interval = params.split(':')
    var cells = getCellsRect(worksheet, interval[0], interval[1])
    var cellsLength = cells.length

    if (name === 'SUM') {
      let sum = 0
      for (let i = 0; i < cellsLength; i++) {
        let cell = cells[i]
        sum += (getValue(worksheet, cell.row, cell.col) * 1)
      }
      return sum
    }

    if (name === 'MAX') {
      let max = Number.NEGATIVE_INFINITY
      for (let i = 0; i < cellsLength; i++) {
        let cell = cells[i]
        let value = getValue(worksheet, cell.row, cell.col) * 1
        if (value > max) {
          max = value
        }
      }
      return max
    }

    if (name === 'MIN') {
      let min = Number.POSITIVE_INFINITY
      for (let i = 0; i < cellsLength; i++) {
        let cell = cells[i]
        let value = getValue(worksheet, cell.row, cell.col) * 1
        if (value < min) {
          min = value
        }
      }
      return min
    }

    if (name === 'AVERAGE') {
      let sum = 0
      for (let i = 0; i < cellsLength; i++) {
        let cell = cells[i]
        sum += (getValue(worksheet, cell.row, cell.col) * 1)
      }
      let avg = (sum / cellsLength)
      return avg
    }

    return 'UNDEF'
  } catch (ex) {
    return 'err'
  }
}

export function getValue (worksheet, row, col) {
  // if (row === 3 && col === 4) {
  //   var sum = 0
  //   for (var i = 0; i < worksheet.cells.length; i++) {
  //     sum += (getValue(worksheet, i, 1) * 1)
  //   }
  //   return sum
  // }
  var content = worksheet.cells[row][col].content
  var isForm = isFormula(content)
  if (!isForm) {
    return worksheet.cells[row][col].content
  }
  return applyFormula(worksheet, content)
  // compute the formula
}

// export compute(worksheet) {
//   var rowsNumber = worksheet.cells.length
//   var colsNumber = worksheet.cols.length
//   for (var row = 0; row < rowsNumber; row++) {
//     for (var col = 0; col < colsNumber; col++) {
//       worksheet[row][col].value = getValue(worksheet, row, col);
//     }
//   }
// }

// db.database().ref('/').set(data)

export function save (cell) {
  var id = cell.row + '_' + cell.col
  var ref = '/cells/' + id
  // console.log('Saving to ' + ref, cell)
  db.database().ref(ref).set(cell)
}
