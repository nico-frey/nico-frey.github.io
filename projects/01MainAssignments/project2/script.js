let len = 10;
let bg;

function setup() {
	createCanvas(windowWidth,windowHeight);
	background(0);
	frameRate(30);
	rectMode(CENTER);
	bg = color(200, 0, 58);
}

function  draw() {
	background(bg);
	noFill();
	strokeWeight(5);
	stroke(0,130, 140);
	
	ellipse(pmouseX, pmouseY, len, len)
  //height - mouseY mirrors the object along y axis
  	ellipse(pmouseX, height - pmouseY, len, len)
	//increase the lenght by 1px every frame
	len++;
	
	if(mouseIsPressed) {
		len = 0;  
		bg = color(189, 3, 33);
	}
}

