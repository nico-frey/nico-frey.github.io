let sphereRadius = 250;
let sphereX, sphereY, sphereZ;
let font;
let textureBuffer = [];

function preload() {
  font = loadFont('assets/margobeuys.otf');
}

function setup() {
  createCanvas(1569, 850, WEBGL);

  textureBuffer = [createTypographicTexture("Genetically modified food controversies"),
                  createTypographicTexture("Deoxyribonucleic acid makeup info"),
                  createTypographicTexture("Engineering biomedical capabilities"),
                  createTypographicTexture("Recombinant Genome Technologies"),
                  createTypographicTexture("Chromosomal of Southern hybrides"),
                  createTypographicTexture("Nuclear Production edible vaccines"),];

  sphereX = width / 2;
  sphereY = height / 2;
  sphereZ = 0;
}

function createTypographicTexture(content) {
  let buffer = createGraphics(2000, 2000, WEBGL);

  buffer.textFont(font);
  buffer.textSize(110);
  buffer.textAlign(CENTER, CENTER);

  buffer.background(0, 0, 0);
  buffer.fill(255);

  buffer.text(content, 0, 0);

  for (let i = -500; i <= 500; i++) {
    buffer.text(content, 0, i * 140);
  }

  return buffer;
}

function draw() {
  background(0);

  randomSeed(132350);

  ambientLight(200);
  pointLight(255, 255, 255, 0, 0, 500);

  shininess(2);
  specularMaterial(30);

  let camX = map(mouseX, 0, width, -width / 2, width / 2)*0.05;
  let camY = map(mouseY, 0, height, -height / 2, height / 2)*0.05;
  camera(camX, camY, (height / 2) / tan(PI / 6), camX, camY, 0, 0, 1, 0);

  translate(-width / 2, -height / 2);
  translate(sphereX / 2 - 200, sphereY / 2);

  let indexCounter = 0; 

  for (let r = 0; r < 2; r++) {
    for (let i = 0; i < 3; i++) {
      push();
      translate(sphereX * i * 0.75, sphereY * r * 1.3);
  
      let speedX = map(mouseX, 0, width, 0.002, 0.003);
      let speedY = map(mouseY, 0, height, 0.002, 0.003);
  
      rotateX(frameCount * speedX);
      rotateY(frameCount * speedY);
  
      let textureIndex = indexCounter % textureBuffer.length;
      texture(textureBuffer[textureIndex]);
  
      sphere(sphereRadius, 100, 100);
      pop();
  
      indexCounter++;
    }
  }
}
