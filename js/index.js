const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const squares = []
let score = 0

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
    const square = document.createElement('div')
    //put the square in grid
    grid.appendChild(square)
    //put square in squares array
    squares.push(square)


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
      if (!squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
          !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
          pacmanCurrentIndex + width < width*width ) 
        { pacmanCurrentIndex += width }
      break
    
    case 38:
      if (  !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >= 0) 
        { pacmanCurrentIndex -= width }
      break
    
    case 37:
      if (  !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
            pacmanCurrentIndex % width !== 0)
        { pacmanCurrentIndex -= 1 }

      if ( pacmanCurrentIndex === 364){
        pacmanCurrentIndex = 391
      }
      break

    case 39:
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
  pacDotEaten()
  powerPelletEaten()
  checkGameOver()
  checkForWin()
}
document.addEventListener('keyup', control)

function pacDotEaten(){
  if ( squares[pacmanCurrentIndex].classList.contains('pac-dot')){
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
    score++
    scoreDisplay.innerHTML = score
  }
}

function powerPelletEaten() {
  //if pacman contains a powerpellet
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')){

    squares[pacmanCurrentIndex].classList.remove('power-pellet')
    //update score
    score += 10
    scoreDisplay.innerHTML = score

    //make ghosts to Scared
    ghosts.forEach(ghost => ghost.isScared = true)

    //set timeout to unscare ghosts
    setTimeout(unScaredGhosts, 10000)
  }
}

function unScaredGhosts(){
  ghosts.forEach(ghost => ghost.isScared = false)
}

class Ghost {
  constructor(className, startIndex, speed){
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('inky', 351, 300),
  new Ghost('pinky', 376, 400),
  new Ghost('clyde', 379, 500)
]

//draw ghosts to the grid

ghosts.forEach(ghost => squares[ghost.startIndex].classList.add(ghost.className))

//move the ghost
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost){
  const directions = [-1, +1, +width, -width]
  let direction = directions[Math.floor(Math.random() * directions.length)]

  ghost.timerId = setInterval( function() {

    if (
        !squares[ghost.currentIndex + direction].classList.contains('wall') &&
        !squares[ghost.currentIndex + direction].classList.contains('ghost')
    ) {
      //remove any ghost 
      squares[ghost.currentIndex].classList.remove(ghost.className)
      squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')

      //add direction to the current index
      ghost.currentIndex += direction

      //add ghost class
      squares[ghost.currentIndex].classList.add(ghost.className)
      squares[ghost.currentIndex].classList.add('ghost')
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)]
    }

    //if the ghost is currently scared
    if (ghost.isScared){
      squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    //if the ghost is scared and pacman is on it
    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {

    //remove classnames - ghost.className, 'ghost', 'scared-ghost'
    squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')

    //change ghosts currentIndex to startIndex
    ghost.currentIndex = ghost.startIndex
    //add a score of 100
    score += 100

    //re-add classnames of ghost.className add 'ghost' to the ghosts new position
    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
    checkGameOver()

  }, ghost.speed)

}

//check for gameover
function checkGameOver() {
  //if the square pacman contains a ghost AND the square does not contain a sacred ghost
  if (squares[pacmanCurrentIndex].classList.contains('ghost') && 
      !squares[pacmanCurrentIndex].classList.contains('sacred-ghost')){
    //for each ghost - stop moving
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove EventListener from control function
    document.removeEventListener('keyup', control)
    //tell user the game is over
    scoreDisplay.innerHTML = 'You LOSE'
  }
}

//check for win
function checkForWin() {
  if (score === 274){
    //stop each ghost 
    ghosts.forEach(ghost => clearInterval(ghost.timerId))

    //remove the eventListener for control function
    document.removeEventListener('keyup', control)

    //win
    scoreDisplay.innerHTML = 'You WON!'
  }
}