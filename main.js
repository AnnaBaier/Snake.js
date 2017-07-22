/**
 * Created by D067563 on 31.01.2017.
 */

'use strict';

const speed = 15;

let gameengine = undefined;
const rectangle = new Rectangle(15, 15, speed, speed, 'white', 'white', 3);
let body = [];

let food = undefined;
let foodArray = []

let colors = ['#EC407A', '#00BCD4', '#FFEB3B', '#FF5722', '#4CAF50', '#9C27B0'];
let color = undefined;
let streakColor = undefined;
let streak = 0;
let longestStreak = 0;
let score = 0;

let repeat = undefined;

let direction = '';


window.onload = function () {

    gameengine = new GameEngine('canvas');

    body[0] = rectangle;

    distributeFood();

    gameengine.keyDown(function (event) {
        switch (event.key) {
            case 'ArrowDown':
                if (direction !== 'ArrowUp') {
                    direction = event.key;
                }
                return true;
                break;
            case 'ArrowUp':
                if (direction !== 'ArrowDown') {
                    direction = event.key;
                }
                return true;
                break;
            case 'ArrowLeft':
                if (direction !== 'ArrowRight') {
                    direction = event.key;
                }
                return true;
                break;
            case 'ArrowRight':
                if (direction !== 'ArrowLeft') {
                    direction = event.key;
                }
                return true;
                break;
            default:
                return false;
        }
    });

    gameengine.drawLoop(loop, 20);
}

function loop() {

    move();

    //if snake eats food
    handleFoodCollision();

    //if snake collides with itself
    handleSnakeCollision();

    //draw canvas
    gameengine.calculateScale(60 * speed, 35 * speed, 0.2, 0.2);
    gameengine.setSize(60 * speed, 35 * speed);
    gameengine.setBackground('black');

    //draw food
    for (let i = 0; i < foodArray.length; i++) {
        gameengine.drawRectangle(foodArray[i]);
    }

    //draw snake
    for (let i = 0; i < body.length; i++) {
        gameengine.drawRectangle(body[i]);
    }

    //draw score
    document.getElementById('score').innerHTML = 'Score: ' + score + '        Best Streak: ' + longestStreak;
    document.body.style.visibility = 'visible';
}

function distributeFood() {
    for (let i = 0; i < 6; i++) {
        let xValue;
        let yValue;
        do {
            xValue = Math.random() * 1000;
            yValue = Math.random() * 1000;
        }
        while (xValue > 60 * speed - speed || xValue < speed || yValue > 35 * speed - speed || yValue < speed);

        color = randomColor();
        food = new Rectangle(xValue, yValue, 10, 10, color, color, 0);
        foodArray[i] = food;

        //prevent food-overlap
        for (let j = 0; j < i; j++) {
            if (foodArray[i].doesCollide(foodArray[j])) {
                i--;
                console.log('Neu:', xValue, yValue);
            }
        }
    }
}

function handleFoodCollision() {
    for (let i = 0; i < foodArray.length; i++) {
        if (body[0].doesCollide(foodArray[i])) {

            //create new Rectangle
            body[body.length] = new Rectangle(-100, -100, speed, speed, foodArray[i].fillColor, 'white', 3);

            //calculate streak
            if (foodArray[i].fillColor === streakColor) {
                streak++;
                if (streak > longestStreak) {
                    longestStreak = streak;
                    score++;
                }
            }
            else {
                streak = 1;
            }
            streakColor = foodArray[i].fillColor;

            //canvas gets new stroke color
            document.getElementById('canvas').style.borderColor = foodArray[i].fillColor;

            do {
                repeat = false;

                //create food on different position
                let xValue;
                let yValue;
                do {
                    xValue = Math.random() * 1000;
                    yValue = Math.random() * 1000;
                }
                while (xValue > 60 * speed - speed || xValue < speed || yValue > 35 * speed - speed || yValue < speed);

                color = randomColor();
                foodArray[i] = new Rectangle(xValue, yValue, 10, 10, color, color, 0);

                //prevent food-overlap
                for (let j = 0; j < i; j++) {
                    if (foodArray[i].doesCollide(foodArray[j])) {
                        console.log(xValue, yValue);
                        repeat = true;
                    }
                }
            }
            while (repeat === true);

            //Refresh score
            score = score + 1;
        }
    }
}

function handleSnakeCollision() {
    for (let i = 5; i < body.length; i++) {
        if (body[0].doesCollide(body[i])) {
            loose();
        }
    }
}

function move() {
    // Calculate positions
    if (direction === 'ArrowDown')
        if (body[0].y >= gameengine.canvas.height - speed) {
            loose();
        }
        else {
            getPositions(body[0].x, body[0].y + speed);
        }
    else if (direction === 'ArrowUp') {
        if (body[0].y <= 0) {
            loose();
        }
        else {
            getPositions(body[0].x, body[0].y - speed);
        }
    }
    else if (direction === 'ArrowRight') {
        if (body[0].x >= gameengine.canvas.width - speed) {
            loose();
        }
        else {
            getPositions(body[0].x + speed, body[0].y);
        }
    }
    else if (direction === 'ArrowLeft') {
        if (body[0].x <= 0) {
            loose();
        }
        else {
            getPositions(body[0].x - speed, body[0].y);
        }
    }
}

function getPositions(newX, newY) {
    for (let i = body.length - 1; i > 0; i--) {
        body[i].x = body[i - 1].x;
        body[i].y = body[i - 1].y;
    }

    //console.log(JSON.stringify(body, null, 4));

    body[0].x = newX;
    body[0].y = newY;
}

function loose() {
    location.reload();
}

function randomColor() {
    let wert;
    wert = Math.random() * colors.length;
    wert = Math.floor(wert);

    return colors[wert];
}









