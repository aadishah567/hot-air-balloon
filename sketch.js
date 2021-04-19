var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  database.ref('balloon/height').on("value",readPosition,showError);

  textSize(20); 
}

function readPosition(data){
  position = data.val();

  balloon.x = position.x;
  balloon.y = position.y;
}
function showError(){
  console.log("Error in writing to the database");
}
function updatePosition(x,y){
  database.ref('balloon/height').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

// function to display UI
function draw() {
  background(bg);  
  drawSprites();
  if(keyDown(LEFT_ARROW)){
    // balloon.x -=10;
    updatePosition(-10,0);
    balloon.changeAnimation("balloon1",balloonImage2);
  }else if(keyDown(RIGHT_ARROW)){
    // balloon.x +=10;
    updatePosition(10,0);
    balloon.changeAnimation("balloon1",balloonImage2);
  }else if(keyDown(UP_ARROW)){
    // balloon.y -=10;
    updatePosition(0,-10);
    balloon.changeAnimation("balloon1",balloonImage2);
    balloon.scale=balloon.scale -0.001;
  }else if(keyDown(DOWN_ARROW)){
    // balloon.y +=10;
    updatePosition(0,10);
    balloon.changeAnimation("balloon1",balloonImage2);
    balloon.scale=balloon.scale+0.001;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}