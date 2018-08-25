'use strict';

const canvas = document.getElementById("gameCanvas");
canvas.style.backgroundColor = "white";
const ctx = canvas.getContext("2d");

const points = document.getElementById("points");
const tryAgain = document.getElementById("tryAgain");

var gameOverImage = new Image();
gameOverImage.src = '../../src/images/game_over.png';
gameOverImage.onload = () => {
    ctx.drawImage(gameOverImage, 50, 50);
}

var player;
var walls = [];
var wall;
let gameOver;
let score;
let firstHeight;
let wallInterval;

let i, a;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

tryAgain.addEventListener('click', function (event) {
    tryAgain.innerHTML = ''
    tryAgain.style.borderStyle = 'none'
    a = 1;
    tryAgain.hidden = true;
    setTimeout(setup, 100)
});

document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 32:
            player.fly();
            break;
    }
});


function setup() {
    let testMode = false;
    
    player = new Bird();

    a = 0;
    
    walls = [];
    
    gameOver = false;
    score = 0;
    points.innerHTML = score;
    
    if(!testMode) {
        let firstHeight = getRandomIntInclusive(100, 400);
        walls.push(new Wall(firstHeight));
        walls.push(new Wall(firstHeight));

        wallInterval = setInterval(() => {
            walls.push(new Wall(getRandomIntInclusive(100, 400)));
        }, 1500)
    } else {
        walls.push(new Wall(300))

        player.gravity = 0;

        walls[0].x = 300;

        walls[0].space = 70;
        walls[0].xSpeed = 0;

        document.addEventListener('keydown', function(event) {
            switch (event.keyCode) {
                case 37:
                    player.testingMovement('left');
                    break;
                case 39:
                    player.testingMovement('right');
                    break;
                case 38:
                    player.testingMovement('up');
                    break;
                case 40:
                    player.testingMovement('down');
                    break;
            }
        });
    }
    window.requestAnimationFrame(draw);
}

function draw() {
    if(gameOver) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        player.update();
        for (wall of walls) {
            wall.show();
        }
        player.show();
        ctx.drawImage(gameOverImage, canvas.width/2 - gameOverImage.width/2, canvas.height/2 - gameOverImage.height/2)
        if(a) {
            return;
        }
    } else {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        
        for (wall of walls) {
            
            wall.show();
            wall.update();

            if (player.intersects(wall)) {
                clearInterval(wallInterval);
                gameOver = true;
                player.flySpeed = 0;
                tryAgain.hidden = false;
                tryAgain.innerHTML = "Try Again";
                tryAgain.style.borderStyle = "solid";
            }
        }

        player.update();
        player.show();
        
        if(player.passedWall(walls)) {
            score++;
            console.log(score);
            points.innerHTML = score;
        }

        if (walls.length > 4) {
            walls.splice(0, 1);
        }
    }

    window.requestAnimationFrame(draw);
}

setup();
