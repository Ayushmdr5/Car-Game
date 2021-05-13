let bulletArr = [];
const bulletImg = new Image();
bulletImg.src = "image/bullets.png";

const BULLET_WIDTH = 10
const BULLET_HEIGHT = 30

class Bullet {
  constructor(y) {
    this.y = y;
    this.x = lanePosition[currentPosition] + CAR_WIDTH / 2 - 5
    this.fired = false
  }
  drawBullet = () => {
    c.drawImage(
      bulletImg,
      this.x,
      this.y,
      BULLET_WIDTH,
      BULLET_HEIGHT
    );
  };
  updateBullet = () => {
    window.addEventListener('keydown', e => {
        if(e.code == "Space"){
            this.XAfterFire = lanePosition[currentPosition] + CAR_WIDTH / 2 - 5
            this.fired = true
        }
    })
    if(this.fired){
        this.x = this.XAfterFire
        this.y -= obstacleSpeed
        obstaclesArr.forEach(obstacle => {
            if (this.x < obstacle.x + obstacleWidth &&
                this.x + BULLET_WIDTH > obstacle.x &&
                this.y < obstacle.y + obstacleHeight &&
                this.y + BULLET_HEIGHT > obstacle.y) {
                    bulletArr.splice(bulletArr.indexOf(this),2)
                    obstaclesArr.splice(obstaclesArr.indexOf(obstacle),1)
                    this.fired = false
                }
            else if (this.y <= 0){
                bulletArr.splice(bulletArr.indexOf(this),2)
                
            }
        })
    }
    else{
        this.x = lanePosition[currentPosition] + CAR_WIDTH / 2 - 5
    }
    this.drawBullet();
  };
}

let timer = 1
let spawnBulletY = 0
let spawnBulletX = lanePosition[generateRandomFromRange(0,2)] + CAR_WIDTH / 2
let toGenerateBullet = false

const spawnBullet = () => {
    if(!isGameOver && isPlaying){
        if(timer % 600 === 0) toGenerateBullet = true
        if(toGenerateBullet){
            spawnBulletY += obstacleSpeed
            c.drawImage(bulletImg,spawnBulletX - 5, spawnBulletY, BULLET_WIDTH, BULLET_HEIGHT)
        }
        if(spawnBulletY > canvasHeight){
            toGenerateBullet = false
            spawnBulletY = -10 
            spawnBulletX = lanePosition[generateRandomFromRange(0,2)] + CAR_WIDTH / 2 - 5
        }
        if (spawnBulletX < lanePosition[currentPosition] + CAR_WIDTH &&
            spawnBulletX + BULLET_WIDTH > lanePosition[currentPosition] &&
            spawnBulletY < CAR_POSITION_Y + CAR_HEIGHT &&
            spawnBulletY + BULLET_HEIGHT > CAR_POSITION_Y) {
                spawnBulletY = spawnBulletY + 100
                let bullet = new Bullet(CAR_POSITION_Y - 28);
                bulletArr.push(bullet);
         }
        timer++
    }

}
const updateBulletCount = () => {

        document.querySelector('.bullet-number').innerHTML = Math.floor((bulletArr.length / 2) + 0.5) ;
}


const bulletAnimate = () => {
  spawnBullet()
  requestAnimationFrame(bulletAnimate);
  bulletArr.forEach((bullet) => {
    bullet.updateBullet();
  });
  updateBulletCount()
};

bulletAnimate();
