var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var Score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600,500);
  
  backgr=createSprite(0,290,800,400);
  backgr.addImage(backImage);
 // backgr.scale=2.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(0,490,400,10);
  ground.x=ground.width/2;
  ground.visible=false;
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  spawnBananas();
  spawnobstacles();
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
     Score=Score+2;
     player.scale+=0.01
   }
   if(obstacleGroup.isTouching(player)){
   
       gameState=END;
  }
  else if (gameState === END) {
      
   backgr.velocityX=0;
    player.velocityY=0;     
   FoodGroup.destroyEach();
 obstacleGroup.destroyEach();
 FoodGroup.velocityEachX=0;
 obstacleGroup.velocityEachX=0;
 fill ("white");


  }
 
  } 

  drawSprites();
  fill ("white");   
stroke(20);

text("Score: "+ Score, 110,20);
if (gameState === END) {
  text("GAME OVER", 210,20);
}

}


function spawnBananas(){
  if (frameCount % 90 === 0){
   banana= createSprite(600,Math.round(random(120,200)),10,40);
   banana.velocityX = -2   
   banana.addImage(bananaImage);
   banana.scale = 0.05;
   banana.lifetime=300;
    
    FoodGroup.add(banana);     
  }}
 
 
function spawnobstacles(){
  if (frameCount % 300 === 0){
  obstacles= createSprite(600,456,10,40);
  obstacles.velocityX = -2   
  obstacles.addImage(obstacleImage);
  obstacles.scale = 0.1;
  obstacles.lifetime=300;

     obstacleGroup.add(obstacles);
    
    
    }}
