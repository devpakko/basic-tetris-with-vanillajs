document.addEventListener('DOMContentLoaded', ()=> {
    // Select grid element
    const grid = document.querySelector('.grid')
    // Create array from all the divs inside the grid
    let squares = Array.from(document.querySelectorAll('.grid div'))
    // select h1 and button element
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')

    const width = 10;
    
    //The tetrominoe shapes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]
    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]
    const tTetromino= [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width,width+1,width+2,width*2+1],
        [1, width, width+1, width*2+1]
    ]
    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]
    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, iTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0
    
    // Select tetrominoes randomly
    let random = Math.floor(Math.random()*theTetrominoes.length)

    let current = theTetrominoes[random][currentRotation];

    // Draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        })
    }

    // Undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    // move tetromino down
    timerId = setInterval(moveDown, 1000)

    // assign functions to keycodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            //rotate
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    // move down function
    function moveDown(){
        undraw()
        currentPosition += width
        draw()
        freeze()
    }
    console.log(squares[currentPosition].classList)
    // freeze function - stop tetromino from going out of the range
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // start a new tetromino
            random = Math.floor(Math.random()* theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }
    //move tetromino to left untill it hits the edge of grid
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index % width === 0 ))

        if(!isAtLeftEdge) currentPosition -= 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1
        }
        draw()
    }

    // move to right
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1)

        if(!isAtRightEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -=1
        }

        draw()
    }

})