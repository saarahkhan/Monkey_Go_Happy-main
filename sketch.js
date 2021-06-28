var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var player, player_running;
var ground, ground_img;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
}

function setup() {
  createCanvas(800,400);
  
  score = 0;
  survivalTime = 0;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("white");
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacle();
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
  }
  
  survivalTime = Math.ceil(frameCount/getFrameRate());
  
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time: "+ survivalTime, 100, 50);
  
  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.y = random(120,200);
    banana.velocityX = -5;
    banana.lifetime = 300;
    
    monkey.depth = banana.depth+1;
    
    foodGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(800,320,10,40);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}