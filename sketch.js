
var trex ,trex_running,trex_collided
var suelo,sueloimg
var obstacle1img,obstacle1,obstacleGroup,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var nuvesimg,nuves,nuvesGroup
var score
var PLAY=1
var END=0
var gameState=PLAY
var gameover,gemeoverimg
var reset,resetimg
var dieSound,jumpSound,checkpointSound

function preload(){

  trex_collided=loadAnimation("trex_collided.png")

  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  sueloimg=loadImage("ground2.png")  
  obstacle1img=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  nuvesimg=loadImage("cloud.png")
  gameoverimg=loadImage("gameOver.png")
  resetimg=loadImage("reset1.png")
  dieSound=loadSound("die.mp3")
  jumpSound=loadSound("jump.mp3")
  checkpointSound=loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(600,200)
  trex =createSprite(50,140,20,20)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trex_collided)
  trex.scale=0.5
  suelo =createSprite(50,165,200,20)
  suelo.addImage(sueloimg)
  suelo.velocityX=-3
  gameover=createSprite(300,50,30,30)
  gameover.addImage(gameoverimg)
  gameover.scale=0.5
  reset=createSprite(300,100,40,40)
  reset.addImage(resetimg)
  reset.scale=0.9
  suelo.x=suelo.width/2
  obstacleGroup= new Group()
  nuvesGroup= new Group()
  score=0
  trex.setCollider("circle",0,0,30)
  trex.debug=false
}

function draw(){
  background("red")
  text("puntos"+ score,300,30)
  if (gameState===PLAY){
    gameover.visible=false
    reset.visible=false
  
    
  
  score=score+Math.round(frameCount/40)

  if (suelo.x<0){

    suelo.x=suelo.width/2

  } 
if(score>0&&score%100===0){
  checkpointSound.play()
}
  if(keyDown("space")&&trex.y>=100){
    trex.velocityY=-10
    jumpSound.play()
    score=score+1
  }
  trex.velocityY = trex.velocityY + 0.8
  trex.collide(suelo)
  obstacles()
  nuves1()
  if(trex.isTouching(obstacleGroup)){
    gameState=END
    //trex.velocityY=-10
    dieSound.play()
   }
}else if(gameState===END){
  trex.changeAnimation("collided",trex_collided)
  trex.velocityY=0
  
  obstacleGroup.setVelocityXEach(0)
  gameover.visible=true
  reset.visible=true
  nuvesGroup.setVelocityXEach(0)
  obstacleGroup.setLifetimeEach(-1)
  nuvesGroup.setLifetimeEach(-1)
  if(mousePressedOver(reset)){
    reset1()
  }
}

 
  
 drawSprites()
}

function obstacles(){
  if(frameCount%60===0){
    obstacle1=createSprite(400,140,10,30)
    obstacle1.velocityX=-5
  

  
  var ran=Math.round(random(1,6))
  switch(ran){
    case 1: obstacle1.addImage(obstacle1img)
    break 
    case 2: obstacle1.addImage(obstacle2)
    break
    case 3: obstacle1.addImage(obstacle3)
    break
    case 4: obstacle1.addImage(obstacle4)
    break
    case 5: obstacle1.addImage(obstacle5)
    break 
    case 6: obstacle1.addImage(obstacle6)
    break
    default:
    break

  }
  obstacle1.scale=0.4
  obstacleGroup.add(obstacle1)
  obstacle1.lifetime=300
  
}
}

function nuves1(){
  if(frameCount%70===0){
    nuves=createSprite(600,50,30,20)
    nuves.addImage(nuvesimg)
    nuves.y=Math.round(random(15,60))
    nuves.velocityX=-5
    nuves.scale=0.5
    nuves.depth=trex.depth
    trex.depth=trex.depth+1
    nuvesGroup.add(nuves)
  }
}

function reset1 () {
  gameState= PLAY
  gameover.visible=false
    reset.visible=false
  trex.changeAnimation("running",trex_running)
  score= 0
  obstacleGroup.destroyEach()
  nuvesGroup.destroyEach()
}

