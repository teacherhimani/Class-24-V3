class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    this.trajectory = [];
    World.add(world, this.body);
  }

  shoot() {
   var newAngle = cannon.angle - 28;
    newAngle = newAngle *(3.14/180)
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)})
  }

  /* 8 To draw the trajectory line first we’ll need all the positions
      that the ball has traveled to. Then we can draw the
      lines/image to create the trajectory line.
      So when do we want to start to collect the positions?
      We’ll start to collect the positions from the current
      positions of the cannonball.
  */


  

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.r, this.r);
    pop();

    // Additional Activity

    /*9 Now inside the code to capture the positions we’ll create a
        new array called as position and put the positions inside it.
        There are multiple ways to add elements to the array
        such as creating an empty array and then pushing the
        elements inside it using the push() method.
        This method requires additional lines of code.
        The smart method that we have is to declare a list and add
        the variables directly inside the list.
        Which is what we are doing here.
        we declare a position array and inside the array add the
        variables position.x and position.y which will automatically
        fill the values.

    */ 

        /* 10 Our position array just has the single position of the
          cannonball, similarly, we need to store all the positions
          traveled by the cannonball.

          To do so we’ll create a trajectory array and push all the
          positions inside this trajectory array.
          So the all the position array will be inside the trajectory
          array making it an array of arrays.
          ex. trajectory =[ [position1], [position2],
          [position3].........]

        */

    if (this.body.velocity.x > 0 && pos.x > 10) {
      var position = [pos.x, pos.y];
      this.trajectory.push(position);
    }



    /* 11 Now we have all the positions traveled by the
        cannonball.
        All we need to do is to draw the image on the positions
        stored in the trajectory array.
        We can just use a for loop to get all the values inside the
        trajectory array and draw an image on it.
    */

    /* 12
    we are using the for loop to get the values inside the
      array.
      We are using a loop on the length of the trajectory array.
      While looping on the array the variable i will act as the
      index number for all the elements inside the trajectory
      array.
      trajectory[i][0] here the trajectory[i] means accessing
      the first array inside the trajectory array.
      trajectory[i][0] means accessing the first element inside
      the array using index number 0.

      */

    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}
