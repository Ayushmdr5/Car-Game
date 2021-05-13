let hiddenRoadTop = -canvasHeight;
let obstacleSpeed = 0;

const roadImage = new Image();
const roadWidth = canvasWidth / 2

roadImage.src = "image/ra.png";

const roadAnimate = () => {
  c.drawImage(roadImage, 250, hiddenRoadTop, canvasWidth / 2, canvasHeight * 2);
  hiddenRoadTop += obstacleSpeed;
  if (hiddenRoadTop >= 0) hiddenRoadTop = -canvasHeight;

  requestAnimationFrame(roadAnimate);

};
roadAnimate();
