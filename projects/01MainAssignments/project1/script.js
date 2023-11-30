let len = 10;
let bg;

function setup() {
	createCanvas(windowWidth,windowHeight);
	background(0);
	frameRate(30);
	rectMode(CENTER);
	bg = color(10, 200, 58);
}

function  draw() {
	background(bg);
	noFill();
	strokeWeight(5);
	stroke(20,250, 40);
	
	rect(pmouseX, pmouseY, len, len)
  //height - mouseY mirrors the object along y axis
	rect(pmouseX, height - pmouseY, len, len)
	//increase the lenght by 1px every frame
	len++;
	
	if(mouseIsPressed) {
		len = 0;  
		bg = color(89, 30, 33);
	}
}

