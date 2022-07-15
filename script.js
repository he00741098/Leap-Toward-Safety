$(".question").hide();
var player; 
var playerDirection; 
var playerMode; 
var door; 
var appleCount; 
var appleGroup; 
var stoneGroup; 
var orangeBlockGroup; 

var crashAnimation; 

var punchSound; 
var jumpSound;
var pickupSound; 
var crashSound; 
var doorOpeningSound; 
var answering = false;

function playerControl() {
  if (playerMode == 'move') {
    if (keyDown('RIGHT')) {
      player.velocity.x = 6;
      playerDirection = 'right';
      
    } else if (keyDown('LEFT')) {
      player.velocity.x = -6;
      playerDirection = 'left';
    }
    else {
      player.velocity.x = 0;
    }

    if (playerDirection == 'right') {
      player.changeAnimation('moveRight');
    } else {
      player.changeAnimation('moveLeft');
    }

    if (keyDown('SPACE')) {
      playerMode = 'punch';

      var punch;
      if (playerDirection == 'right') {
        player.changeAnimation('punchRight');
        punch = createSprite(player.position.x + 30, player.position.y + 10, 30, 30);
      } else {
        player.changeAnimation('punchLeft');
        punch = createSprite(player.position.x - 30, player.position.y + 10, 30, 30);
      }

      punch.overlap(orangeBlockGroup, crash);
      punch.remove();
      punchSound.play();
    }
  }


  if (playerMode == 'punch') {
    player.velocity.x = 0;

    if (!keyDown('SPACE')) {
      playerMode = 'move';
    }
  }

  player.velocity.y += 1;
  if (player.touching.bottom) {
    if (keyDown('UP')) {
      if (player.velocity.y > 0) {
        player.velocity.y = -15;

        jumpSound.play();
      }
    } else {
      player.velocity.y = 0;
    }
  }
//console.log(answering);
	if(!answering){
		
  player.overlap(appleGroup, pickup);
	
	}
	//console.log(answering);
  if (door.getAnimationLabel() == 'opened') {

    player.overlap(door, escape);
  }
}

var avatar;
var appler;
function pickup(player, apple) {
	answering = true;
	avatar = player;
	appler = apple;
  var quotes = [
  "What is one of the three steps to do in an earthquake when you are in a building? a)run b)hold c)yell/scream",
  "How many small earthquakes occur in a year? a)10000 b)20000 c)30000 d)40000",
  "Where should you go in Oregon during an earthquake if you are hurt? a)City Hall b)BEECN red tent c)Grandma's house d)Nearby school",
    "How long does an average earthquake last? a)30 seconds b)1 minutes c) 2 minutes d)3 minutes",
    "All earthquake can change the length of day? a)False b)True",
    "What is the name of the Earthquake zone in Oregon? a)Ring of Fire b)Cascadia subduction zone c)Mount Hood subduction zone",
    "How to best prepare for water before an earthquake? a)Not prepare and depend on your friend b)Buy water from store beforehand c)life straw",
    "What is one of the three steps to do in an earthquake when you are in a building? a)run b)drop c)yell/scream",
   'What is one of the three steps to do in an earthquake when you are in a building? a)run b)cover c)yell/scream',
    'From where shouldn’t you retrieve water if yours is tainted? a)Water heaters b)Radiators c)Canned vegetables d)Toilet tank',
    'How long after a major earthquake can aftershocks continue to happen? a)Hours b)Weeks c)Days d)Months',
    'If you see a large fire you should: a)Leave immediately b)Call fire department and leave immediately afterwards. c)Try to put it out d)Call for help and wait for fire department to arrive',
    'What does CERT stand for? a)Community Experimental Research Team b)Community Emergency Response Team c)Central Emergency Response Terminal d)Controlled Evacuation and Response Tactics',
    'How much water should you have in your home emergency kit? a)3 gallons per person per day b)1 gallon per person per day c)1 gallon per every 2 people per day d)3 gallons per family per day',
    'How often should you replace perishable items in your emergency kit such as water, food, meds, and batteries? a)Every 4 months b)Every year c)Every 6 months d)Every 2 years',
    'How long can you keep frozen foods in the freezer if the door is closed? a)Hours b)A few days c)One nigh d)A week',
    'More people are injured or killed by falling furniture than building damage. a)False b)True',
    'To where should you evacuate if near a large body of water? a)The closest shelter b)Higher ground c)The nearest tall tree d)Your car',
    'When indoors during an earthquake, the safest place to be is: a)In a doorway b)Under a sturdy furniture c)In your bedroom',
    'If you are outside during an earthquake you should seek shelter in a building. a)True b)False',
    'A good indicator of an impending earthquake is: a)Hot,dry weather b)Neither of these c)Unsettled pet',
    'If an earthquake hits while driving you should: a)Drive quickly away from the earthquake b)Pull over and stay in your car c)Pull over and get out of your car',
    'The most common hazard after an earthquake is: a)Tsunami b)Fire c)Sewer back up'
];

	$("#prompt").html(quotes[Math.floor( Math.random() * quotes.length) ]);
	$(".question").show();
	$("#submit").click(next);
		  
}
var position = 0;
function next(){
	var q = $("#answer").val(); 
	if(q.substring(position,position+1) == 'b'){
    appleCount += 1;
		console.log(appleCount);
  }else{ 
    appleCount+=0;
		console.log(q);
    alert("Nope, the correct answer is b");
    
		gameover();
		
  }
  
  if ((appleCount%3)==0) {
    door.changeImage('opened');
    doorOpeningSound.play();
  }

  pickupSound.play();

  appler.remove();
	answering = false;

	$(".question").hide();
$("#answer").html("<button id='submit'>Submit</button>");
	}


function crash(punch, block) {
  var breakingBlock = createSprite(block.position.x, block.position.y);
  breakingBlock.addAnimation('crash', crashAnimation);

  crashSound.play();

  block.remove();
}



var stoneTimer = 0;
var stoneDirection = 'down';
var stoneVelocity;
function stoneControl() {
  stoneTimer++;
  if (stoneTimer == 60) {
    stoneDirection = 'down';
  }
  if (stoneTimer == 180) {
    stoneDirection = 'up';
    stoneTimer = 0;
  }
  if (stoneDirection == 'up') {
    stoneVelocity = -10;
  }
  else {
    stoneVelocity = 20;
  }

 
  for (var i = 0; i < stoneGroup.length; i++) {
    stoneGroup[i].velocity.y = stoneVelocity;
  }
}
[68],[68]
var stageLayout = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 7, 1, 1, 1, 1, 1, 1],
  [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 7, 1, 1, 1, 1, 1, 1, 1],
  [1, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 1, 1, 1, 1, 7, 7, 7, 0, 0, 7, 7, 7, 0, 7, 7, 1, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1, 1, 1, 1],
];


var blueBlockGroup;
var allBlockGroup;

var backgroundImage;
var blueBlockImage;
var orangeBlockImage;
var stoneImage;
var doorClosedImage;
var doorOpenedImage;
var appleImage;
var gameoverImage;
var escapedImage;

var playerMoveRightAnimation;
var playerMoveLeftAnimation;
var playerPunchRightAnimation;
var playerPunchLeftAnimation;

var bgmSound;
var escapedSound;
var gameoverSound;

var gameMode;

function preload() {
  backgroundImage = loadImage('data/background.png'); 
  blueBlockImage = loadImage('data/soil.png'); 
  grassBlockImage = loadImage('data/grass.png'); 
  orangeBlockImage = loadImage('data/orange_block00.png'); 
  stoneImage = loadImage('data/stage.png');
  appleImage = loadImage('data/apple.png');
  doorClosedImage = loadImage('data/door_close.png');
  doorOpenedImage = loadImage('data/door_open.png');
  gameoverImage = loadImage('data/game_over.png');
  escapedImage = loadImage('data/game_clear.png');

  playerMoveRightAnimation = loadAnimation('data/player_right_0.png', 'data/player_right_3.png');
  playerMoveLeftAnimation = loadAnimation('data/player_left_0.png', 'data/player_left_3.png');
  playerPunchRightAnimation = loadAnimation('data/player_punch_right_0.png', 'data/player_punch_right_2.png');
  playerPunchRightAnimation.looping = false;
  playerPunchLeftAnimation = loadAnimation('data/player_punch_left_0.png', 'data/player_punch_left_2.png');
  playerPunchLeftAnimation.looping = false;
  crashAnimation = loadAnimation('data/orange_block00.png', 'data/orange_block07.png');
  crashAnimation.looping = false;
  bgmSound = loadSound('data/bgm.mp3');
  gameoverSound = loadSound('data/gameover.mp3');
  escapedSound = loadSound('data/escaped.mp3');
  punchSound = loadSound('data/punch.mp3');
  jumpSound = loadSound('data/jump.mp3');
  pickupSound = loadSound('data/pickup.mp3');
  crashSound = loadSound('data/crash.mp3');
  doorOpeningSound = loadSound('data/door_open.mp3');
}

function setup() {
  createCanvas(50 * 15, 50 * 10);
  textAlign(CENTER);
  textSize(25);
  fill(255);
  gameSetup();
}


function draw() {
  for (var i = 0; i < 10; i++) {
    image(backgroundImage, i * backgroundImage.width - width / 4 + player.position.x * 0.7, 0);
  }

  if (gameMode == 'playing') {
    playing();
  }
  drawSprites();

  if (gameMode == 'gameover') {
    drawGameover();
  } else if (gameMode == 'escaped') {
    drawEscaped();
  }
  textSize(30);
  text(appleCount, player.position.x, player.position.y - 50);

}

function gameSetup() {
  blueBlockGroup = createGroup();
  grassBlockGroup = createGroup();
  orangeBlockGroup = createGroup();
  allBlockGroup = createGroup();
  appleGroup = createGroup();
  stoneGroup = createGroup();

  for (y = 0; y < stageLayout.length; y++) {
    for (x = 0; x < stageLayout[y].length; x++) {
      if (stageLayout[y][x] == 1) {
        var block = createSprite(x * 50 + 25, y * 50 + 25, 50, 50);
        block.addImage(blueBlockImage);
        block.immovable = true;
        blueBlockGroup.add(block);
        allBlockGroup.add(block);
      } else if (stageLayout[y][x] == 2) {
        player = createSprite(x * 50 + 25, y * 50 + 25);
        player.setCollider('rectangle', 0, 0, 50, 60);
        player.addAnimation('moveRight', playerMoveRightAnimation);
        player.addAnimation('moveLeft', playerMoveLeftAnimation);
        player.addAnimation('punchRight', playerPunchRightAnimation);
        player.addAnimation('punchLeft', playerPunchLeftAnimation);
      } else if (stageLayout[y][x] == 3) {
        var stone = createSprite(x * 50 + 25, y * 50 + 25);
        stone.addImage('stone', stoneImage);
        stoneGroup.add(stone);
      } else if (stageLayout[y][x] == 4) {
        var apple = createSprite(x * 50 + 25, y * 50 + 25);
        apple.addImage(appleImage);
        appleGroup.add(apple);
      } else if (stageLayout[y][x] == 5) {
        door = createSprite(x * 50 + 25, y * 50 + 25);
        door.addImage('closed', doorClosedImage);
        door.addImage('opened', doorOpenedImage);
        door.setCollider('rectangle', 25, 0, 100, 340);
      } else if (stageLayout[y][x] == 6) {
        var block = createSprite(x * 50 + 25, y * 50 + 25, 50, 50);
        block.addImage(orangeBlockImage);
        block.immovable = true;
        orangeBlockGroup.add(block);
        allBlockGroup.add(block);
      } else if (stageLayout[y][x] == 7) {
        var block = createSprite(x * 50 + 25, y * 50 + 25, 50, 50);
        block.addImage(grassBlockImage);
        block.immovable = true;
        grassBlockGroup.add(block);
        allBlockGroup.add(block);
      }
    }
  }
  appleCount = 0;
  playerMode = 'move';
  playerDirection = 'right';
  gameMode = 'playing';
  bgmSound.loop();

}

function playing() {
  camera.position.x = player.position.x + width / 4;
  playerControl();
  stoneControl();
  player.overlap(stoneGroup, gameover);
  if (player.position.y > height) {
    gameover();
  }
  player.collide(allBlockGroup);
  stoneGroup.collide(allBlockGroup);
}

function gameover() {
  gameMode = 'gameover';
  bgmSound.stop();
  gameoverSound.play();
  noLoop();
}

function escape() {
  gameMode = 'escaped';
  bgmSound.stop();
  escapedSound.play();
  noLoop();
}

function drawGameover() {
  image(gameoverImage, camera.position.x - 205.5, height / 2 - 20);
  text('Click the Mouse to Play Again', camera.position.x, 330);
}

function drawEscaped() {
  image(escapedImage, camera.position.x - 177, height / 2 - 20);
  text('Click the Mouse to Go to Next Level', camera.position.x, 330);
}
var setting = false;
function mouseClicked() {
  if (gameMode == 'gameover') {
    player.remove();
    door.remove();
    blueBlockGroup.removeSprites();
    orangeBlockGroup.removeSprites();
    appleGroup.removeSprites();
    stoneGroup.removeSprites();
    allBlockGroup.removeSprites();
    gameSetup();
    loop();
  }
  else if(gameMode == 'escaped' && !setting){
		setting = true;
    player.remove();
    door.remove();
    blueBlockGroup.removeSprites();
    orangeBlockGroup.removeSprites();
    appleGroup.removeSprites();
    stoneGroup.removeSprites();
    allBlockGroup.removeSprites();
    newGameSetup();
    loop();
  }
}



function createArray(Y, X) {
    var arr = new Array(Y);
		for(y = 0; y<arr.length; y++){
			arr[y] = new Array(X);
		}

  for (y = 0; y < arr.length; y++) {
    for (x = 0; x < arr[y].length; x++) {
			arr[y][x] = 0;
		}}
    return arr;
}

//var newStageLayout = createArray(10, 68);
function  newGameCreate(){
	
	var newStageLayout = createArray(10, 68);
	//console.log(newStageLayout)
	
	var ran = Math.floor(Math.random()*(newStageLayout.length-2))+2;
	newStageLayout[ran][0] = 7;
	newStageLayout[ran-2][0]=2;
	//more = easier
	var difficulty = 2;
	for(h = 0; h<difficulty;h++){
	var max_X_move = 4;
	var max_Y_move = 2;
	var Y_fall = -4;
	var playerGenPosX = 0;
	var playerGenPosY = ran-1;
	var stoneFallDistance = 4;
var bob = true;
	while(bob) {
      var randomX = Math.floor(Math.random()*max_X_move+1)+playerGenPosX;
			var randomY= Math.floor(Math.random()*max_Y_move);
			while((randomY+playerGenPosY > newStageLayout.length) || playerGenPosY>newStageLayout.length-max_Y_move){
				randomY--;
				playerGenPosY--;
			}
		while(playerGenPosY+randomY<=1){
			
			randomY++;
		
		}

		
		//console.log(randomX);
		//console.log(randomY);
		if(randomX<newStageLayout[0].length){
			//console.log(randomY + ", "+playerGenPosY + ", "+playerGenPosX)
			newStageLayout[randomY+playerGenPosY][randomX] = 7;
			playerGenPosX = randomX;
			playerGenPosY = randomY+playerGenPosY;
		}else{bob = false;}
		
	
	
	}
	}



	
	//console.log(newStageLayout)
	var apples = 0
	var max_apples = 3;
	var apples_distance = 10;
	var last_i = -1;
	var genDoor = false;
	for(i = 0; i<newStageLayout[0].length-1; i++){
		var applePlaced = false;
		var rockPlaced = false;
		for(k = 2; k<newStageLayout.length-2; k++){
			if(i>2){
			if(!rockPlaced && newStageLayout[k+1][i]==7 && apples <max_apples){
				if(i-last_i>=apples_distance){
				newStageLayout[k][i]=4;
				apples++;
				last_i = i;
					applePlaced = true;
				}else if(i==-1){
					last_i = i;
				}
			}else if(k-stoneFallDistance>0 && newStageLayout[k][i]==7 && !applePlaced){
				random = Math.floor(Math.random()*10);
				//console.log("Random Num: "+random);
				if(random==1){
				newStageLayout[k-stoneFallDistance][i]=3;
				rockPlaced = true;
				}
			}



if(!genDoor && newStageLayout[k+1][i]==7 && newStageLayout[0].length - i<7){
	newStageLayout[k+1][i]=5;
	//console.log("success, "+i+", "+(k+1));
	genDoor=true;
}


				
			}
		}
		
	}
	for(i = 0; i<newStageLayout[0].length; i++){
	for(k=1; k< newStageLayout.length; k++){
					if(newStageLayout[k-1][i]==1 || newStageLayout[k-1][i]==7){
				newStageLayout[k][i] = 7;
				console.log("placed dirt");
			}

		
	}
	
}

var print = "";
	for(i = 0; i<newStageLayout.length; i++){
	for(k=0; k< newStageLayout[0].length; k++){
	print+=newStageLayout[i][k];
	}
	print+="\n";
	}
console.log(print);
	
	return newStageLayout;
}


function newGameSetup() {
	setting = false;
	console.log("Generating new level...")
	var newStageLayout = newGameCreate();
  blueBlockGroup = createGroup();
  grassBlockGroup = createGroup();
  orangeBlockGroup = createGroup();
  allBlockGroup = createGroup();
  appleGroup = createGroup();
  stoneGroup = createGroup();

  for (y = 0; y < newStageLayout.length; y++) {
    for (x = 0; x < newStageLayout[y].length; x++) {
      if (newStageLayout[y][x] == 1) {
        var block = createSprite(x * 90 + 25, y * 90 + 25, 90, 90);
        block.addImage(blueBlockImage);
        block.immovable = true;
        blueBlockGroup.add(block);
        allBlockGroup.add(block);
      } else if (newStageLayout[y][x] == 2) {
        player = createSprite(x * 50 + 25, y * 50 + 25);
        player.setCollider('rectangle', 0, 0, 50, 60);
        player.addAnimation('moveRight', playerMoveRightAnimation);
        player.addAnimation('moveLeft', playerMoveLeftAnimation);
        player.addAnimation('punchRight', playerPunchRightAnimation);
        player.addAnimation('punchLeft', playerPunchLeftAnimation);
      } else if (newStageLayout[y][x] == 3) {
        var stone = createSprite(x * 50 + 25, y * 50 + 25);
        stone.addImage('stone', stoneImage);
        stoneGroup.add(stone);
      } else if (newStageLayout[y][x] == 4) {
        var apple = createSprite(x * 50 + 25, y * 50 + 25);
        apple.addImage(appleImage);
        appleGroup.add(apple);
      } else if (newStageLayout[y][x] == 5) {
        door = createSprite(x * 50 + 25, y * 50 + 25);
        door.addImage('closed', doorClosedImage);
        door.addImage('opened', doorOpenedImage);
        door.setCollider('rectangle', 25, 0, 100, 340);
      } else if (newStageLayout[y][x] == 6) {
        var block = createSprite(x * 50 + 25, y * 50 + 25, 50, 50);
        block.addImage(orangeBlockImage);
        block.immovable = true;
        orangeBlockGroup.add(block);
        allBlockGroup.add(block);
      } else if (newStageLayout[y][x] == 7) {
        var block = createSprite(x * 50 + 25, y * 50 + 25, 50, 50);
        block.addImage(grassBlockImage);
        block.immovable = true;
        grassBlockGroup.add(block);
        allBlockGroup.add(block);
      }
    }
  }
  appleCount = appleCount;
  playerMode = 'move';
  playerDirection = 'right';
  gameMode = 'playing';
  bgmSound.loop();

}
