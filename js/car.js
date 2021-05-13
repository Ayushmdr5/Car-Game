const carImage = new Image();
carImage.src = "image/cropcar.png"

let obstaclesArr = []

const CAR_HEIGHT = 150;
const CAR_WIDTH = 100;

const CAR_POSITION_Y = canvasHeight - CAR_HEIGHT - 20;
const lanePosition = [288, 452, 613]

let currentPosition = 1
let isGameOver = false
let highScore = localStorage.getItem('highscore') || 0;
let score = 0

const instructionMenu = document.querySelector('.main-menu')
const gameOverMenu = document.querySelector('.game-over-container')

if (!highScore){
    localStorage.setItem('highscore', 0)
}

document.querySelector('.high-score').textContent = highScore

let isPlaying = false
const keyBoardHandler = (e) => {
    if (e.keyCode == 37){
        currentPosition <= 0 ? currentPosition = 0 : currentPosition--
    }
    if (e.keyCode == 39){
        currentPosition >= 2 ? currentPosition = 2 : currentPosition++
    }
    if (e.keyCode == 13){
        if(!isGameOver){
            score = 0
            obstacleSpeed = 9
            instructionMenu.style.display = 'none'
            isPlaying = true
        }
        else if (isGameOver){
            gameOverMenu.style.display = 'none'
            c.clearRect(0, 0, canvas.width, canvas.height);
            obstacleSpeed = 8
            obstaclesArr = [];
            bulletArr = []
            score = 0
            isGameOver = false
            isPlaying = true
            userCarAnimate()
        }

    }
}

let speedTimer = 1;
const userCarAnimate = () => {
    c.drawImage(carImage, lanePosition[currentPosition], CAR_POSITION_Y, CAR_WIDTH , CAR_HEIGHT)
    requestAnimationFrame(userCarAnimate)

    if(speedTimer % 700 === 0 && isPlaying){
        obstacleSpeed += 1;
    }
    speedTimer++;
}
userCarAnimate()

window.addEventListener('keydown', keyBoardHandler)
