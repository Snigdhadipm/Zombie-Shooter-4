var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie1
var fire
var score = 0;
var zombiegroup;
var firegroup;

function preload() {
shooterImg=loadImage("assets/shooter_1.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombie1Img = loadImage("assets/zombie.png");
  zombie2Img = loadImage("assets/zombie.png");
  zombie3 = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/bullet1.png");
  gun_sound = loadSound("assets/gunsound.mp3");
  background_music = loadSound("assets/backgroundmusic.mp3");
  
}

function setup() {


  createCanvas(windowWidth, windowHeight);

  background_music.play()

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1

 zombiegroup = new Group();
 firegroup = new Group();
  

  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = false;
  player.setCollider("rectangle", 0, 0, 300, 300)


}

function draw() {
  background(0);
  



  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {

    player.addImage(shooter_shooting)
  bullet()
  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }
  if(firegroup.isTouching(zombiegroup))
  {
    zombiegroup.destroyEach()
    score++
  }
  zombie()
  drawSprites();
  fill(0)
  textSize(30);
 text("score:"+score,displayWidth-900,displayHeight-800);

}

function zombie()
{
  if(frameCount%100===0)
  {

  
  zombie1 = createSprite(random(displayWidth - 200,displayWidth - 900), displayHeight - 300, 50, 50);
  zombie1.addImage(zombie1Img);
  zombie1.scale = 0.1;
  zombie1.velocityX = -4
  zombiegroup.add(zombie1);
  }
}

function bullet()
{
  gun_sound.play()
   fire = createSprite(displayWidth - 1090,displayHeight - 335,10,10)
  fire.addImage(bulletImg);
  fire.y = player.y;
  fire.scale = 0.1
  fire.velocityX = 13;
  firegroup.add(fire);
}
