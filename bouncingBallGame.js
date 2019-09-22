let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 12; x = canvas.width / 2;y = canvas.height - 30;
let dx = 3;
let dy = -3;
let color = "#ed6189"
let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key == "ArrowRight") {
        rightPressed = true;
    }
    if (e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "ArrowRight") {
        rightPressed = false;
    }
    if (e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


function chanceColorBall() {
    function getRandomHex() {
        return Math.floor(Math.random() * 255)
    }

    function getRandomColor() {
        let red = getRandomHex();
        let green = getRandomHex();
        let blue = getRandomHex();
        return "rgb(" + red + "," + blue + "," + green + ")";
    }

    color = getRandomColor();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ed6189";
    ctx.fill();
    ctx.closePath();
}


function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ed6189";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ed6189";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        chanceColorBall()
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        chanceColorBall();
    }
    if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            chanceColorBall()
            score++;
        } else {
            lives--;
            if (!lives) {
                alert("GAME OVER!!! \n You score = "+score);
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
                chanceColorBall()
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();