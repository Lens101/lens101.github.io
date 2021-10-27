const about = document.querySelector(".about");
const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");

//Practice for targetting the event target, not the current target.
about.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (id) {
    //remove active from the other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active"); //remove class of active from all buttons.
      e.target.classList.add("active"); //add class of active to the button you are currently clicking on.
    });
    //Hide other articles
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

window.onload = function () {
  canv = document.getElementById("gc"); //Game Content - size decided by css styling.
  ctx = canv.getContext("2d"); //set style of game content, 2d. - could be 'webgl' (3d), 'webgl2'(3d) or 'bitmaprenderer' (image renderer).
  document.addEventListener("keydown", keyPush); //on any keypush on the arrow keys, start the game.

  //set the scoreboard to 0
  score = 0;

  document.getElementById("scoreboard").innerHTML = score;

  //allow for game pauses
  paused = false;

  setInterval(game, 1000 / 15); //call game 15 times / second
};
snakePosX = snakePosY = 10;
gridSize = tileCount = 20;
applePosX = applePosY = 15;
snakeVelocityX = snakeVelocityY = 0;
score = 0;
//positions of snake trail to keep track of previous path taken (to restart on collision).
trail = [];
//snake size
tail = 5;

function game() {
  if (!paused) {
    snakePosX += snakeVelocityX;
    snakePosY += snakeVelocityY;
    /* 
  ============================ 
      World wrapping
  ============================
  */
    //if snake goes off edge, continue from opposite edge.
    //imagine grid that has lower-left corner as (0,0) and upper-right corner as (20,20)
    if (snakePosX < 0) {
      snakePosX = tileCount - 1;
    }
    if (snakePosX > tileCount - 1) {
      snakePosX = 0;
    }
    if (snakePosY < 0) {
      snakePosY = tileCount - 1;
    }
    if (snakePosY > tileCount - 1) {
      snakePosY = 0;
    }
    //fill canvas black to start
    ctx.fillStyle = "black";
    //fill the canvas black from x = 0 y = 0 , and height specified by the css.
    ctx.fillRect(0, 0, canv.width, canv.height);

    //fill the snake green
    ctx.fillStyle = "lime";

    //for all the positions in the snake trail length...
    for (var i = 0; i < trail.length; i++) {
      //Add the snake trail (X,Y) to the canvas element inside the tiles (20x20).
      ctx.fillRect(
        trail[i].x * gridSize,
        trail[i].y * gridSize,
        gridSize - 2,
        gridSize - 2
      );

      //if any position in the trail (X,Y) is the same as the head of the snake, reset tail length to 5. - i.e. if collision with itself.
      if (trail[i].x == snakePosX && trail[i].y == snakePosY) {
        tail = 5;
        score = 0;
        document.getElementById("scoreboard").innerHTML = score;
      }
    }

    //add all previous positions of snake to the trail
    trail.push({ x: snakePosX, y: snakePosY });

    //remove all previous trail positions past 'i' where the tail length is of size 'i'.
    //so, only keep track of trail up to the tail size, the rest can be discarded.
    while (trail.length > tail) {
      trail.shift();
    }

    /* 
  =========================================
      increase snake size & apple spawning
  =========================================
  */

    //if the apple (X,Y) is the same as the snake head (X,Y), add one to the tail size.
    if (applePosX == snakePosX && applePosY == snakePosY) {
      tail++;
      score++;
      document.getElementById("scoreboard").innerHTML = score;
      /* 
  =================================
      New apple collision detection
  =================================
  */

      //create random new apple grid position immediately, removing old one.
      applePosX = Math.floor(Math.random() * tileCount);
      applePosY = Math.floor(Math.random() * tileCount);

      //for i to trail.size
      //if collision flag == true, spawnNewApple()
      //if apple pos X && apple pos Y == trail[snakePosX] && [snakePosY] then
      //collision flag == true
      //therefore respawn a new apple and call function recusrively.
      //else, collision flag == false, and spawn new apple onto canvas.
    }

    //Initial apple starting point.
    //color the apple red
    ctx.fillStyle = "red";
    //Position the apple rectangle within the tilemap(20 x 20) @ 18 x 18.
    ctx.fillRect(
      applePosX * tileCount,
      applePosY * tileCount,
      gridSize - 2,
      gridSize - 2
    );
  }
}

//keyboard UP, DOWN , LEFT, RIGHT  and their changes on snake position.
function keyPush(evt) {
  switch (evt.keyCode) {
    case 37:
      snakeVelocityX = -1;
      snakeVelocityY = 0;
      break;
    case 38:
      snakeVelocityX = 0;
      snakeVelocityY = -1;
      break;
    case 39:
      snakeVelocityX = 1;
      snakeVelocityY = 0;
      break;
    case 40:
      snakeVelocityX = 0;
      snakeVelocityY = 1;
      break;
  }
  evt.preventDefault();
}

/* Pause functionality */

window.addEventListener("keydown", function (e) {
  console.log(e);
  console.log(paused);
  if (e.keyCode === 80) {
    // p key
    togglePause();
  }
});

function togglePause() {
  paused = !paused;
}
