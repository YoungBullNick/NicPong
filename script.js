var canvasWidth = 500, canvasHeight = 500;
var myBall;
var ballSize = 30;
var myBall_xPos = canvasWidth/2, myBall_yPos = canvasHeight/2,
	myBall_xVel = 0, myBall_yVel = 0,
	myBall_top    = myBall_yPos - ballSize/2,
	myBall_bottom = myBall_yPos + ballSize/2,
	myBall_left   = myBall_xPos - ballSize/2,
	myBall_right  = myBall_xPos + ballSize/2;
var paddleWidth = 10, paddleLength = canvasHeight/6, paddleVel = 5,
	paddleL_xPos   = ballSize, paddleR_xPos = canvasWidth - ballSize,
	paddleL_yPos   = canvasHeight / 2, paddleR_yPos = canvasHeight / 2,
	paddleL_top    = paddleL_yPos - paddleLength/2,
	paddleL_bottom = paddleL_yPos + paddleLength/2,
	paddleL_left   = paddleL_xPos + paddleWidth/2,
	paddleL_right  = paddleL_xPos - paddleWidth/2,
	paddleR_top    = paddleR_yPos - paddleLength/2,
	paddleR_bottom = paddleR_yPos + paddleLength/2,
	paddleR_left   = paddleR_xPos + paddleWidth/2,
	paddleR_right  = paddleR_xPos - paddleWidth/2;
var r = 0, g = 0, b = 0; function setup() {
	createCanvas(canvasWidth, canvasHeight);
	background(color(r,g,b));
	rectMode(CENTER);
	myBall_xVel = random(-5,5);
	myBall_yVel = random(-5,5);
} function draw() {
	background(color(r,g,b));
	rect(paddleL_xPos,paddleL_yPos,paddleWidth,paddleLength);
	rect(paddleR_xPos,paddleR_yPos,paddleWidth,paddleLength);
	movePaddles();
	bouncePaddles();
	moveAndBounceWall();
	rect(myBall_xPos,myBall_yPos,ballSize,ballSize);
} function moveAndBounceWall() {
	myBall_xPos  = myBall_xPos + myBall_xVel;
	myBall_left  = myBall_xPos - ballSize/2;
	myBall_right = myBall_xPos + ballSize/2;
	if ( (myBall_right > canvasWidth) || (myBall_left < 0) ) {
		myBall_xVel = -myBall_xVel;
		colorChange();
	} myBall_yPos   = myBall_yPos + myBall_yVel;
	myBall_top    = myBall_yPos - ballSize/2;
	myBall_bottom = myBall_yPos + ballSize/2;
	if ( (myBall_bottom > canvasHeight) || (myBall_top < 0) ) {
		myBall_yVel = -myBall_yVel;
		colorChange();}
}
function colorChange() {
	r = random(256);
	g = random(256);
	b = random(256); }
function movePaddles() {
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
	} }
var bounceL = 0;
var bounceR = 0;
function bouncePaddles() {
	if ((myBall_bottom >= paddleL_top) && (myBall_top <= paddleL_bottom)) {
		if (myBall_left <= paddleL_right) {
			myBall_xVel = -myBall_xVel;
			bounceL++;
			console.log("Bounce Left  " + bounceL);
		}
	}
if ((myBall_bottom >= paddleR_top) && (myBall_top <= paddleR_bottom)) {
		if (myBall_right >= paddleR_left) {
			myBall_xVel = -myBall_xVel;
			bounceR++;
			console.log("Bounce Right " + bounceR);
		}
	}
}  