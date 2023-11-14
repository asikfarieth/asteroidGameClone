// Further idea implemented: score of asteroids, addition of more asteroids as game progresses

var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var count;
var millisecond;


//////////////////////////////////////////////////
function setup() {
  createCanvas(1200, 800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width / 2, height * 2.9);
  atmosphereSize = new createVector(width * 3, width * 3);
  earthLoc = new createVector(width / 2, height * 3.1);
  earthSize = new createVector(width * 3, width * 3);
  count = 0;
  millisecond = millis();




  //console.log(height);
}

//////////////////////////////////////////////////
function draw() {


  background(0);
  sky();


  //console.log('time:', millisecond);

  spaceship.run();
  asteroids.run();

  drawEarth();
  //console.log('test');

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth() {
  noStroke();

  textSize(32);
  text('Score:' + count, height / 2, 50);
  //draw atmosphere
  fill(0, 0, 255, 50);

  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
  //draw earth
  fill(100, 255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids) {
 
  for (var i = 0; i < asteroids.locations.length; i++) {
    

    var asteroidsLoc = asteroids.locations[i];
    var asteroidsDiam = asteroids.diams[i];
      //spaceship-2-asteroid collisions
    var r = isInside(asteroidsLoc,asteroidsDiam, spaceship.location, spaceship.size);
    if (r) {
      gameOver();
    }


    //Earth-2-asteroid collisions
    if (isInside(earthLoc, earthSize.x, asteroids.locations[i], asteroids.diams[i])) {
      gameOver();
    }

  }

  if (isInside(earthLoc, earthSize.x, spaceship.location, spaceship.size)) {
   // console.log('inside!!!');
    gameOver();
  }

  if (isInside(atmosphereLoc, atmosphereSize.x, spaceship.location, spaceship.size)) {
    spaceship.setNearEarth();

  }

var bulletSys = spaceship.bulletSys;
 var bullets = bulletSys.bullets;
 for (var i = 0; i<bullets.length; i++){
   for (var j = 0; j<asteroids.locations.length; j++){
   var asteroidsLoc = asteroids.locations[i];
   var asteroidsDiam = asteroids.diams[i];

   console.log(aster);
  //  var r = isInside(asteroidsLoc, asteroidsDiam, bullets[i], bulletSys.diam);
  //  if(r){
  //   count = count + 1;
  //   asteroids.destroy(j);
  //  }

  }
 }


//   for (var i = 0; i < asteroids.locations.length; i++) {
// console.log(asteroids.locations[i]);
//     for (var j = 0; j < spaceship.bulletSys.bullets.length; j++) {
//       if (isInside(spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam, asteroids.locations[i], asteroids.diams[i])) {
        
//       }

//     }

//   }

  // for (var i = 0; i< bullets.length; i++){
  // }




  //YOUR CODE HERE (2-3 lines approx)

  //asteroid-2-earth collisions
  //YOUR CODE HERE (2-3 lines approx)

  //spaceship-2-earth
  //YOUR CODE HERE (1-2 lines approx)

  //spaceship-2-atmosphere
  //YOUR CODE HERE (1-2 lines approx)

  //bullet collisions
  //YOUR CODE HERE (3-4 lines approx)
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB) {

  var d = dist(locA.x, locA.y, locB.x, locB.y);
  var maxDist = sizeA/2 + sizeB/2;
  //console.log(dist(locA.x, locA.y, locB.x, locB.y));
 //console.log(locB);
  if (maxDist<d) {

    //console.log('inside');
    return false;
  } // YOUR CODE HERE (3-5 lines approx)

  else{
    return true;
  }
}

//////////////////////////////////////////////////
function keyPressed() {
  if (keyIsPressed && keyCode === 32) { // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver() {
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky() {
  push();
  while (starLocs.length < 300) {
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i = 0; i < starLocs.length; i++) {
    rect(starLocs[i].x, starLocs[i].y, 2, 2);
  }

  if (random(1) < 0.3) starLocs.splice(int(random(starLocs.length)), 1);
  pop();
}