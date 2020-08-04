var canvasWidth = 500, canvasHeight = 500;
var ballSize = 30;
var myBall_xPos = canvasWidth/2, myBall_yPos = canvasHeight/2, myBall_xVel = 0, myBall_yVel = 0,	myBall_top    = myBall_yPos - ballSize/2,	myBall_bottom = myBall_yPos + ballSize/2,	myBall_left   = myBall_xPos - ballSize/2,
	myBall_right  = myBall_xPos + ballSize/2; var paddleWidth = 10, paddleLength = canvasHeight/6, paddleVel = 5,
	paddleL_xPos   = ballSize, paddleR_xPos = canvasWidth  - ballSize,	paddleL_yPos   = canvasHeight / 2, paddleR_yPos = canvasHeight / 2,	paddleL_top    = paddleL_yPos - paddleLength/2,	paddleL_bottom = paddleL_yPos + paddleLength/2,	paddleL_left   = paddleL_xPos + paddleWidth/2,	paddleL_right  = paddleL_xPos - paddleWidth/2,	paddleR_top    = paddleR_yPos - paddleLength/2,	paddleR_bottom = paddleR_yPos + paddleLength/2,	paddleR_left   = paddleR_xPos + paddleWidth/2,	paddleR_right  = paddleR_xPos - paddleWidth/2;
var scoreL = 0, scoreR = 0;
var r = 255, g = 255, b = 255;
var speeds = [ -4, -3, -2, 2, 3, 4 ]; function setup() {
	// frameRate(10);
	createCanvas(canvasWidth, canvasHeight);
	background(color(r,g,b));
	rectMode(CENTER);
	textAlign(CENTER);
	myBall_xVel = random(speeds);
	myBall_yVel = random(speeds);
} function draw() {
	background(color(r,g,b));
	fill(color(0,0,0));
	line(canvasWidth/2, 0, canvasWidth/2, canvasHeight)
	fill(color(255,255,255));
	rect(paddleL_xPos,paddleL_yPos,paddleWidth,paddleLength);
	rect(paddleR_xPos,paddleR_yPos,paddleWidth,paddleLength);
	movePaddles();
	bouncePaddles();
	moveAndBounceWall();
	displayScore();
	fill(color(255,255,255));
	rect(myBall_xPos,myBall_yPos,ballSize,ballSize);
} function moveAndBounceWall() {
	myBall_xPos  = myBall_xPos + myBall_xVel;
	myBall_left  = myBall_xPos - ballSize/2;
	myBall_right = myBall_xPos + ballSize/2;
	if ( (myBall_right >= canvasWidth) || (myBall_left <= 0) ) { updateScore();
		myBall_xPos = canvasWidth / 2;
		myBall_yPos = canvasHeight / 2;
		myBall_xVel = random(speeds);
		myBall_yVel = random(speeds);
		colorChange();
	} myBall_yPos   = myBall_yPos + myBall_yVel;
	myBall_top    = myBall_yPos - ballSize/2;
	myBall_bottom = myBall_yPos + ballSize/2;
	if ( (myBall_bottom >= canvasHeight) || (myBall_top <= 0) ) {
		myBall_yVel = -myBall_yVel;
		colorChange();
	}
} function colorChange() {
	r = random(256);
	g = random(256);
	b = random(256);
} function movePaddles() {
	paddleL_top    = paddleL_yPos - paddleLength/2;
	paddleL_bottom = paddleL_yPos + paddleLength/2;
	paddleL_left   = paddleL_xPos + paddleWidth/2;
	paddleL_right  = paddleL_xPos - paddleWidth/2;
	paddleR_top    = paddleR_yPos - paddleLength/2;
	paddleR_bottom = paddleR_yPos + paddleLength/2;
	paddleR_left   = paddleR_xPos + paddleWidth/2;
	paddleR_right  = paddleR_xPos - paddleWidth/2;
if (keyIsDown(87) && (paddleL_top > 0)) {
		paddleL_yPos -= paddleVel;
	} else if (keyIsDown(83) && (paddleL_bottom < canvasHeight)) {
		paddleL_yPos += paddleVel;
	}
if (keyIsDown(79) && (paddleR_top > 0)) {
		paddleR_yPos -= paddleVel;
	} else if (keyIsDown(76) && (paddleR_bottom < canvasHeight)) {
		paddleR_yPos += paddleVel;
	}
}
var bounceL = 0;
var bounceR = 0;
function bouncePaddles() {
	if ((myBall_bottom >= paddleL_top) && (myBall_top <= paddleL_bottom)) {
		if (myBall_left <= paddleL_right+10) {
			myBall_xVel = -myBall_xVel;
			colorChange();
			bounceL++;
			console.log("Bounce Left  " + bounceL);
		}
	} if ((myBall_bottom >= paddleR_top) && (myBall_top <= paddleR_bottom)) {
		if (myBall_right >= paddleR_left-10) {
			myBall_xVel = -myBall_xVel;
			colorChange();
			bounceR++;
			console.log("Bounce Right " + bounceR);
		}
	}
} function updateScore() {
	if (myBall_right >= canvasWidth) {
		scoreL++;
	}
if (myBall_left <= 0) {
		scoreR++;
	}
} function displayScore() {
	fill(color(0,0,0));
	textSize(20);
	text("Score: " + scoreL, canvasWidth/4, ballSize);
	text("Score: " + scoreR, canvasWidth * 0.75, ballSize);
}