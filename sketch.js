var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
//createCanvas(1200,300);
createCanvas(displayWidth,displayHeight);
// Fondo en movimiento
path=createSprite(displayWidth,displayHeight/2); 
path.addImage(pathImg);
path.velocityX = -5;

//crear el niño que corre
mainCyclist  = createSprite(displayWidth/6-100,displayHeight/2);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//establece el colisionador para el mainCyclist
mainCyclist.setCollider("circle",150,50,650);
mainCyclist.debug = true;
  
gameOver = createSprite(displayWidth/2,displayHeight/2);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("             Distancia:\n                   "+distance+"\n(っ＾▿＾)۶🍸🌟🍺٩(˘◡˘ )",displayWidth/2-50,displayHeight/4-125);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/30);
   path.velocityX = -(6 + 2*distance/75);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
  
  //código para reiniciar el fondo
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //código para reproducir el sonido de la campana del ciclista
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //crear jugadores oponentes de forma continua
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 75 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    //Agrega aquí el código para mostrar la instrucción de reinicio del juego, en forma de texto
  text("presiona la tecla de flecha\nhacia Arriba o presiona\ngame over con el raton para\nreiniciar el juego.    (⊙▂⊙✖ )",displayWidth/2-140,displayHeight/3);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    //escribe la condición para llamar reset( )
    if(mousePressedOver(gameOver)||
     keyDown("UP_ARROW")&&gameState==END) {
      reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1200,Math.round(random(50, 700)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1200,Math.round(random(50, 700)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1200,Math.round(random(50, 700)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

//crea aquí la función de reinicio
function reset(){
  yellowCG.destroyEach();
  redCG.destroyEach();
  pinkCG.destroyEach();
  gameState=PLAY;
  gameOver.visible=false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  distance=0;
}