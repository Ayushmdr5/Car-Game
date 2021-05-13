const obstacleHeight = 150;
const obstacleWidth = 100;

const obstacleImage = new Image();
obstacleImage.src = "image/police1.png";

const obstaclePositionY = 100;

const posibleGenerationPosition = [];
const obstaclePositionX = [288, 452, 613];
let currentObstaclePosition = 0;

const obstacleCars = ["greycar", "police1", 'zeep', 'sport', 'ambulance'];
const possibleObstacleY = [-300, -600, -900];

class Obstacle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  draw() {
    let obstacleImg = new Image();
    obstacleImg.src = `image/${this.type}.png`;
    c.drawImage(obstacleImg, this.x, this.y, obstacleWidth, obstacleHeight);
  }
  update() {
    if (
      this.x < lanePosition[currentPosition] + CAR_WIDTH &&
      this.x + obstacleWidth > lanePosition[currentPosition] &&
      this.y < CAR_POSITION_Y + CAR_HEIGHT &&
      this.y + obstacleHeight > CAR_POSITION_Y
    ) {
      this.type = "blast2";
      obstacleSpeed = 0;
      handleGameOver()
    }

    this.y += obstacleSpeed;
    this.draw();
  }
}

const handleGameOver = () => {
    isGameOver = true
    isPlaying = false
    if(highScore <= score){
        localStorage.setItem('highscore', score)
        document.querySelector('.high-score').innerHTML = score
    }
    if (isGameOver){
        document.querySelector('.game-over-container').style.display = 'block'
    }
}

const deleteFromArr = (ObstacleToRemove) => {
  var index = obstaclesArr.indexOf(ObstacleToRemove);
  if (index > -1) {
    obstaclesArr.splice(index, 1);
  }
};

const spawnObstacle = () => {
  if (obstaclesArr.length < 2) {
    var positionXIndex = generateRandomFromRange(0, 2);
    var imageTypeIndex = generateRandomFromRange(0, obstacleCars.length - 1);
    var positionYIndex = generateRandomFromRange(0, 2);

    while (true) {
      var positionXIndex2 = generateRandomFromRange(0, 2);
      var imageTypeIndex2 = generateRandomFromRange(0, obstacleCars.length - 1);
      var positionYIndex2 = generateRandomFromRange(0, 2);

      if (
        positionXIndex !== positionXIndex2 &&
        positionYIndex !== positionYIndex2
      )
        break;
    }

    const obstacle1 = new Obstacle(
      lanePosition[positionXIndex],
      possibleObstacleY[positionYIndex],
      obstacleCars[imageTypeIndex]
    );
    const obstacle2 = new Obstacle(
      lanePosition[positionXIndex2],
      possibleObstacleY[positionYIndex2],
      obstacleCars[imageTypeIndex2]
    );

    obstaclesArr.push(obstacle1);
    obstaclesArr.push(obstacle2);
  }
};

score = -1;

const obstacleAnimate = () => {
  spawnObstacle();
  obstaclesArr.forEach((car) => {
    car.update();
  });

  if (obstacleSpeed) {
    let l = obstaclesArr.length;
    obstaclesArr = obstaclesArr.filter((obstacle) => obstacle.y < canvasHeight);
    if (obstaclesArr.length != l) {
      score += 1;
    }
    document.querySelector(".user-score").innerHTML = score;
  }
  requestAnimationFrame(obstacleAnimate);
};

obstacleAnimate();
