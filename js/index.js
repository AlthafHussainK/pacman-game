const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const squares = []

//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

//create board
function createBoard() {
  for( let i = 0; i < layout.length; i++){
    //create a sqaure
    const sqaure = document.createElement('div')
    //put the square in grid
    grid.appendChild(sqaure)
    //put square in squares array
    squares.push(sqaure)


    if(layout[i] === 0){
      squares[i].classList.add('pac-dot')
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall')
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair')
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet')
    }
  }
}

createBoard()

//starting position of a pacman

let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pacman')

// keyCodes - up = 38, left = 37, right = 39, down = 38
function control(e) {
  squares[pacmanCurrentIndex].classList.remove('pacman')
  switch(e.keyCode){
    case 40:
      console.log('down')
      if (!squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
          !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
          pacmanCurrentIndex + width < width*width ) 
        { pacmanCurrentIndex += width }
      break
    
    case 38:
      console.log('up')
      if (  !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >= 0) 
        { pacmanCurrentIndex -= width }
      break
    
    case 37:
      console.log('left')
      if (  !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
            pacmanCurrentIndex % width !== 0)
        { pacmanCurrentIndex -= 1 }

      if ( pacmanCurrentIndex === 364){
        pacmanCurrentIndex = 391
      }
      break

    case 39:
      console.log('right')
      if (  !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
            pacmanCurrentIndex % width < width - 1) 
        { pacmanCurrentIndex += 1 }
      if ( pacmanCurrentIndex === 391){
        pacmanCurrentIndex = 364
      }
      break
  }
  squares[pacmanCurrentIndex].classList.add('pacman')
}
document.addEventListener('keyup', control)