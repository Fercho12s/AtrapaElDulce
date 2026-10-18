let visible ;
let spawnWhat = 1;
let canasta;
let dulce;
let fantasma;
let posicionDulce ;
let spawnEvery = 60;
let dulces = 0;
let duration = 30;
let startTime;
let state = 'start';
function spawnDulce() {
  posicionDulce = { x: random(40, width - 40), y: random(40, height - 40) };
  visible = true
  
  if (floor(random(1, 31)) === 4) {
    spawnWhat = 0;                  
  } else {
    spawnWhat = 1;                    
  }
}



function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    dulces = 0;
    startTime = millis();
    spawnDulce();
    return;
    
  }
  
  if (visible && dist(mouseX, mouseY, posicionDulce.x, posicionDulce.y) < 30) {
    if(spawnWhat == 1){
      dulces++;
    }else{
      dulces = max(0, dulces - 1)
    }
    visible = false;
    
  }
}



async function setup() {
  createCanvas(480, 360);
  imageMode(CENTER);
  canasta = await loadImage("img/descarga.png");
  dulce = await loadImage("img/dulce2.png");
  spawnDulce();
  startTime = millis();
  fantasma = await loadImage("img/fantasma.png")
}


function draw() {
  background(15, 10, 25); 
  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Click to start', width / 2, height / 2);
    return ;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Time over \nDulces: ' + dulces + '\nClick to retry', width / 2, height / 2);
    return;
  }
  noStroke();

  //canasta
  image(canasta, 240, 315, 100, 90);
  
  //dulce
  if (frameCount % spawnEvery === 0) spawnDulce();
  if (visible === true){
  if (spawnWhat === 1) {
    image(dulce, posicionDulce.x, posicionDulce.y, 80, 62);
  } else {
    image(fantasma, posicionDulce.x, posicionDulce.y, 80, 62);
  }
  }
  
  //dulces
  fill(255);
  textSize(16);
  textAlign(LEFT, BASELINE);
  text('Dulces: ' + dulces, 12, 26);
  //CALCULAR CUANTO TIEMPO QUEDA
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }
  if(timeLeft>5){
    fill(255,255,255)
  }
  else{
    fill(255, 0, 4)
  }
  text('Time: ' + ceil(timeLeft), 410, 26);
  if (dulces >= 1) {
    image(dulce, 215, 280, 30, 23);
  }
  if (dulces >= 2) {
    image(dulce, 240, 280, 30, 23);
  }
  if (dulces >= 3) {
    image(dulce, 265, 280, 30, 23); 
  }
}





