let buttons = [];
let buttonPadding = 20;
let customFont;
let mic;
let allowButtonMovement = true;
let average = 0;

function preload() {
  customFont = loadFont('assets/gridular.otf');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(userStartAudio);
  createNewButton(width / 2 - 80, height / 2);
  textFont(customFont);

  // Initialize the microphone
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);

  micLevel = mic.getLevel();

  //volume average (smoother)
  average = average*0.95;
  average += micLevel*0.05;
//
  //volume indicator (toggle to see smoothness)
  //let y = height - average * height;
  //ellipse(width/2, y, 10, 10);

  // Draw a semi-transparent white trail behind the buttons
  fill(255, 255);
  noStroke();

  // Draw a rectangle for each button's previous position
  for (let i = 0; i < buttons.length; i++) {
    rect(buttons[i].x, buttons[i].y, buttons[i].width, buttons[i].height);
  }

  // Move buttons towards target pos
  if (allowButtonMovement) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].position(
        lerp(buttons[i].x, buttons[i].targetX, 0.1),
        lerp(buttons[i].y, buttons[i].targetY, 0.1)
      );
    }
  }

  checkMicrophoneInput();
}

function checkMicrophoneInput() {

  let micLevel = mic.getLevel();
  let threshold = 0.4;

  if (micLevel > threshold) {
    allowButtonMovement = false;
    resetButtons();
  } else {
    allowButtonMovement = true;
  }
}

function resetButtons() {
  // Remove all buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].remove();
  }

  buttons = [];

  // Create a new initial button
  createNewButton(width / 2 - 80, height / 2);
}

function changePosition(button) {
  // Change the target position of the given button to a random location
  button.targetX = random(width - button.width);
  button.targetY = random(height - button.height);
}

function createNewButton(x, y) {
  let newButton = createButton('delete data');
  newButton.x = x !== undefined ? x : random(buttonPadding, width - newButton.width - buttonPadding);
  newButton.y = y !== undefined ? y : random(buttonPadding, height - newButton.height - buttonPadding);
  newButton.targetX = newButton.x;
  newButton.targetY = newButton.y;
  newButton.mouseOver(function() {

    changePosition(newButton); 

    createNewButton(); 
  });
  // Set custom font (which diesn't work for some reason?)
  newButton.style('font-family', customFont); 
  buttons.push(newButton);
}
