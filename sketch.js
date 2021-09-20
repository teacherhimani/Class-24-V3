const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;

/*1 use these concepts of Arrays to create
multiple cannonballs instead of creating multiple variables
for storing many balls. We can create an empty array to
store all the cannonballs we will create in the game*/

var balls = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();


  /* 6 use the for loop on the balls array to
      get all the cannonballs.
      Call the showCannonBalls() function and pass the balls I
      index to it.
  */

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i]);
  }

  cannon.display();
}


/* 2 create a new ball when the
down arrow key is pressed. We will create a keyPressed()
function and inside this function when a key is pressed,
we’ll create a new cannonball and push it in the balls
array. */

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    //empty array
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    //pushing new cannon ball in balls array
    balls.push(cannonBall);
  }
}


/* 3 because the cannonBall is stored in an array, we
can traverse through each element of an array using a for
loop.
*/


/*4Now that we are creating a separate function for showing
cannonballs; let us remove cannonball.display from the
draw() function that we wrote in the last class.
*/

/* 5 function showCannonBalls(). This
function will take  parameter, ball, and we can call
ball.display() inside this function if there are balls in the balls array.
*/

function showCannonBalls(ball) {
  if (ball) {
    ball.display();
  }
}


/* 7 Now the cannonballs are ready to be shot.
We’ll shoot them when the down arrow key is released.
To do so we’ll use the keyReleased() function.

key is released, call the shoot() function on the
balls array.

ball.length is the number of elements in an array; we are using ball.length -1, as we are
accessing the last ball from the array. The index of an array starts from 0, and the length
of the array will always be 1 more than the last index of the array. So to get the last
element we write length -1.
ex: ar=[100,200,300]
ar.length = 3
and to access 300 we need to write
ar[2] which is as good as ar[ar.length-1] (3-1 = 2)


*/

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
