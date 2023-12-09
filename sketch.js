/*
	The Game Project Part 4 - Character Interaction
*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var canyons;

//declaring movement variables
var isLeft;
var isRight;
var isFalling;
//declaring plummeting variable
var isPlummeting;
//declaring new variables
var trees;
var clouds;
var mountains;
var cameraPosX;
var collectables;
var collectable;  //this variable is for the collectable that appears in the top left of the screen next to the score counter
var spikes;

var lvlScore = 1;
var gameScore = 0;
var totalGameScore = 0;
var deathCount = 0;
var highScore = 1;
//declaring state variables
var gameOver;
var levelComplete;

var ldash;
var rdash;
var canDash;

var firstTime = true;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = 30;
	gameChar_y = floorPos_y;
	//initialising new variable
	isPlummeting = false;

	canyons = []

	//initialising movement variables to false
	isLeft = false;
	isRight = false;
	isFalling = false;
	ldash = false;
	rdash = false;
	canDash = true;

	//initialising game states to false
	gameOver = false;
	levelComplete = false;
	

	//collectable item from part 3
	collectable = {  //this collectable appears in the top right next to the score!
		x_pos: 50,
		y_pos: 50
	}
	collectables = []

	spikes = []

	//flagpole from part 3
	flagpole = {
		x_pos: 872+((lvlScore-1)*1000),
		y_pos: floorPos_y,
		//initialising new property
		isReached: false
	}

	newCollectable();  //adds a new collectable each level
	newCanyon();
	newSpike();
	
	//initialising new variables

	trees = {
		x_pos: [-700, -160, 50, 500, 700, 1000, 1300],
		y_pos: floorPos_y
	}
	clouds = [
		{
			x_pos: -330,
			y_pos: 80,
		},
		{
			x_pos: 0,
			y_pos: 120,
		},
		{
			x_pos: 320,
			y_pos: 90,
		},
		{
			x_pos: 650,
			y_pos: 100,
		},
		{
			x_pos: 900,
			y_pos: 70,
		},
		{
			x_pos: 1400,
			y_pos: 85,
		}
	];

	mountains = {
		x_pos: [-400, 60, 800, 1400],
		y_pos: floorPos_y,
	}

	newTrees();
	newMountains();
	newClouds();
	cameraPosX = 0;
}

function draw()
{
	cameraPosX=gameChar_x-200; //starting camera movement
	///////////-------------------------------------------------------DRAWING CODE-----------------------------------------------------------------------
	strokeWeight(1);
	background(100,155,255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//starting camera movement
	push();
	translate(-cameraPosX,0);

	//draw the canyon
	for(var i = 0; i<canyons.length; i++){
		noStroke();
		fill(92, 40, 0);
		rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height -floorPos_y);
	}

	//---------------------------------------------------------------MOUNTAINS------------------------------------------------------

	for(var i = 0; i<mountains.x_pos.length; i++){
		fill(73,121,141);
		stroke(53,101,121); //mountains
		triangle(mountains.x_pos[i],mountains.y_pos,mountains.x_pos[i]+500,mountains.y_pos,mountains.x_pos[i]+250,mountains.y_pos-332);
		triangle(mountains.x_pos[i],mountains.y_pos,mountains.x_pos[i]+100,mountains.y_pos-202,mountains.x_pos[i]+200,mountains.y_pos);
		triangle(mountains.x_pos[i]+205,mountains.y_pos,mountains.x_pos[i]+310,mountains.y_pos-202,mountains.x_pos[i]+435,mountains.y_pos);
		triangle(mountains.x_pos[i]+80,mountains.y_pos,mountains.x_pos[i]+205,mountains.y_pos-232,mountains.x_pos[i]+330,mountains.y_pos);
		
		fill(255); //snow on the mountains
		noStroke();
		triangle(mountains.x_pos[i]+183,mountains.y_pos-244,mountains.x_pos[i]+298,mountains.y_pos-268,mountains.x_pos[i]+250,mountains.y_pos-332);
		triangle(mountains.x_pos[i]+75,mountains.y_pos-152,mountains.x_pos[i]+100,mountains.y_pos-202,mountains.x_pos[i]+120,mountains.y_pos-161);
		triangle(mountains.x_pos[i]+285,mountains.y_pos-153,mountains.x_pos[i]+310,mountains.y_pos-202,mountains.x_pos[i]+335,mountains.y_pos-161);
		triangle(mountains.x_pos[i]+165,mountains.y_pos-158,mountains.x_pos[i]+205,mountains.y_pos-232,mountains.x_pos[i]+238,mountains.y_pos-172);
		}
	
	//--------------------------------------------------DRAWING TREES---------------------------------------

	for(var i = 0; i<trees.x_pos.length; i++){
		noStroke();
    
		fill(150,75,0);
		rect(trees.x_pos[i],trees.y_pos,25,-100); //stump
		fill(50,150,30);
		ellipse(trees.x_pos[i]+12,trees.y_pos-94,70,50); //leaves
		ellipse(trees.x_pos[i]-5,trees.y_pos-100,70,50);
		ellipse(trees.x_pos[i]+30,trees.y_pos-100,70,50);
		ellipse(trees.x_pos[i]+12,trees.y_pos-117,70,50);
	
		fill(150,75,0);
		rect(trees.x_pos[i]+40,trees.y_pos,25,-100); //stump
		fill(50,150,30);
		ellipse(trees.x_pos[i]+52,trees.y_pos-74,70,50); //leaves
		ellipse(trees.x_pos[i]+35,trees.y_pos-80,70,50);
		ellipse(trees.x_pos[i]+70,trees.y_pos-80,70,50);
		ellipse(trees.x_pos[i]+52,trees.y_pos-97,70,50);
		
		fill(150,75,0);
		rect(trees.x_pos[i]+90,trees.y_pos,25,-100); //stump
		fill(50,150,30);
		ellipse(trees.x_pos[i]+102,trees.y_pos-94,70,50); //leaves
		ellipse(trees.x_pos[i]+85,trees.y_pos-100,70,50);
		ellipse(trees.x_pos[i]+120,trees.y_pos-100,70,50);
		ellipse(trees.x_pos[i]+102,trees.y_pos-117,70,50);
		
		fill(237,47,63);
		ellipse(trees.x_pos[i]+102,trees.y_pos-94,10,10); //apples
		ellipse(trees.x_pos[i]+107,trees.y_pos-124,10,10);
		ellipse(trees.x_pos[i]+122,trees.y_pos-89,10,10);
		ellipse(trees.x_pos[i]+62,trees.y_pos-104,10,10);
		ellipse(trees.x_pos[i]+72,trees.y_pos-74,10,10);
		ellipse(trees.x_pos[i]+42,trees.y_pos-84,10,10);
		ellipse(trees.x_pos[i]+22,trees.y_pos-107,10,10);
		ellipse(trees.x_pos[i]+18,trees.y_pos-77,10,10);
		ellipse(trees.x_pos[i]+5,trees.y_pos-102,10,10);
		ellipse(trees.x_pos[i]-15,trees.y_pos-102,10,10);
		ellipse(trees.x_pos[i]-10,trees.y_pos+-5,10,10);
		ellipse(trees.x_pos[i]+100,trees.y_pos+-5,10,10);
		ellipse(trees.x_pos[i]+80,trees.y_pos+-5,10,10);	
		}
	
	//--------------------------------------------------------------SPIKES-----------------------------------------------------------
	for(var i = 0; i<spikes.length; i++){
		noStroke();
		fill(139,69,19);
		ellipse(spikes[i].x_pos,spikes[i].y_pos,15);
		fill(255);
		stroke(2);
		triangle(spikes[i].x_pos-5,spikes[i].y_pos-5,spikes[i].x_pos+5,spikes[i].y_pos-5,spikes[i].x_pos,spikes[i].y_pos-20);
		triangle(spikes[i].x_pos-5,spikes[i].y_pos+5,spikes[i].x_pos+5,spikes[i].y_pos+5,spikes[i].x_pos,spikes[i].y_pos+20);
		triangle(spikes[i].x_pos-20,spikes[i].y_pos,spikes[i].x_pos-5,spikes[i].y_pos+5,spikes[i].x_pos-5,spikes[i].y_pos-5);
		triangle(spikes[i].x_pos+20,spikes[i].y_pos,spikes[i].x_pos+5,spikes[i].y_pos+5,spikes[i].x_pos+5,spikes[i].y_pos-5);

		if(dist(gameChar_x,gameChar_y,spikes[i].x_pos,spikes[i].y_pos)<=20){
			isLeft=false;
			isRight=false;
			gameOver=true;
		}
	}
	
	//------------------------------------------------------------COLLECTABLE--------------------------------------------------------
	for(var i = 0; i<collectables.length; i++){
		if(collectables[i].isFound == false){  //checking the players hasn't reached the collectable yet
			noStroke();
			fill(247,67,85);
			quad(collectables[i].x_pos,collectables[i].y_pos+28,collectables[i].x_pos-10,collectables[i].y_pos,collectables[i].x_pos,collectables[i].y_pos-28,collectables[i].x_pos+10,collectables[i].y_pos);
	
			noFill();
			stroke(148,27,39);
			quad(collectables[i].x_pos,collectables[i].y_pos+20,collectables[i].x_pos-5,collectables[i].y_pos,collectables[i].x_pos,collectables[i].y_pos-20,collectables[i].x_pos+5,collectables[i].y_pos);
	
		}
	}

	//-------------------------------------------------------FLAGPOLE-------------------------------------------------------

	if(flagpole.isReached==false){  //lowered state for flag before player reaches it
		stroke(100);
		fill(190);
		rect(flagpole.x_pos,flagpole.y_pos,10,-250);
		ellipse(flagpole.x_pos+5,flagpole.y_pos-255,14,10); //flagpole
		fill(255);
		noStroke();
		rect(flagpole.x_pos+10,flagpole.y_pos-60,100,60); //flag
		fill(0);
		noStroke();
		rect(flagpole.x_pos+10,flagpole.y_pos-60,20);
		rect(flagpole.x_pos+50,flagpole.y_pos-60,20);
		rect(flagpole.x_pos+90,flagpole.y_pos-60,20);
		rect(flagpole.x_pos+10,flagpole.y_pos-20,20);
		rect(flagpole.x_pos+50,flagpole.y_pos-20,20);
		rect(flagpole.x_pos+30,flagpole.y_pos-40,20);
		rect(flagpole.x_pos+70,flagpole.y_pos-40,20);
		rect(flagpole.x_pos+90,flagpole.y_pos-20,20);
	}else if(flagpole.isReached==true){  //raising the flag when the player reaches it
		stroke(100);
    	fill(190);
    	rect(flagpole.x_pos,flagpole.y_pos,10,-250);
    	ellipse(flagpole.x_pos+5,flagpole.y_pos-255,14,10); //flagpole
    	fill(255);
    	noStroke();
   		rect(flagpole.x_pos+10,flagpole.y_pos-250,100,60); //flag
    	fill(0);
    	noStroke();
    	rect(flagpole.x_pos+10,flagpole.y_pos-250,20);
    	rect(flagpole.x_pos+50,flagpole.y_pos-250,20);
    	rect(flagpole.x_pos+90,flagpole.y_pos-250,20);
    	rect(flagpole.x_pos+10,flagpole.y_pos-210,20);
    	rect(flagpole.x_pos+50,flagpole.y_pos-210,20);
    	rect(flagpole.x_pos+90,flagpole.y_pos-210,20);
    	rect(flagpole.x_pos+30,flagpole.y_pos-230,20);
    	rect(flagpole.x_pos+70,flagpole.y_pos-230,20);
	}

	//-----------------------------------------------PLUMMETING---------------------------------------
	for(var i = 0; i<canyons.length; i++){
		if(gameChar_x>canyons[i].x_pos && gameChar_x<canyons[i].x_pos+canyons[i].width && gameChar_y>=floorPos_y){  //checking the character is falling down the canyons
			isPlummeting=true;
		}
		if(isPlummeting==true){
			gameChar_y+=10;  //makes the player fall faster
			isLeft=false;
			isRight=false;  //stops the character from moving
			if(gameChar_y>height){
				gameOver=true;
			}
		}
	}
	//-------------------------------------------------------CLOUDS---------------------------------------------------

	for(var i = 0; i<clouds.length; i++){
		noStroke();
		fill(240);
		ellipse(clouds[i].x_pos,clouds[i].y_pos-15,120,100);
		ellipse(clouds[i].x_pos,clouds[i].y_pos,170,75);
		ellipse(clouds[i].x_pos-70,clouds[i].y_pos,100,75);
		ellipse(clouds[i].x_pos+70,clouds[i].y_pos,100,75);
	}

	//-------------------------------------------------GAME CHARACTER-------------------------------------
	if(isLeft && isFalling)
	{
		// add your jumping-left code
		
		stroke(0);
		strokeWeight(0.5);
	
		fill(229,170,122);  //head
		rect(gameChar_x-8,gameChar_y-60,16,-10);
	
		fill(0);  //eyes
		line(gameChar_x-7,gameChar_y-63,gameChar_x-7,gameChar_y-70);
		line(gameChar_x-3,gameChar_y-63,gameChar_x-3,gameChar_y-70);
	
		rect(gameChar_x+2,gameChar_y-60,6,-10);  //hair
	
		fill(156,90,60);  //hat & brim
		stroke(0);
		rect(gameChar_x-10,gameChar_y-68,20,-7);
		ellipse(gameChar_x,gameChar_y-68,44,2);
		
		fill(54,19,11);  //boots
		noStroke();
		rect(gameChar_x-12,gameChar_y-17,-13,6);
		ellipse(gameChar_x-20.5,gameChar_y-16,9,8);
		
		stroke(0);
		fill(47,54,153);  //jeans
		beginShape();  //first leg
		vertex(gameChar_x-5,gameChar_y-35);
		vertex(gameChar_x-22,gameChar_y-27);
		vertex(gameChar_x-19,gameChar_y-17);
		vertex(gameChar_x-12,gameChar_y-17);
		vertex(gameChar_x-14,gameChar_y-27);
		vertex(gameChar_x+5,gameChar_y-35);
		endShape(CLOSE);
	
		fill(54,19,11);  //boots
		noStroke();
		rect(gameChar_x-8,gameChar_y-15,-13,4);
		ellipse(gameChar_x-16.5,gameChar_y-16,9,8);
	
		stroke(0);
		fill(47,54,153);
		beginShape();  //second leg
		vertex(gameChar_x-5,gameChar_y-35);
		vertex(gameChar_x-18,gameChar_y-25);
		vertex(gameChar_x-15,gameChar_y-15);
		vertex(gameChar_x-8,gameChar_y-15);
		vertex(gameChar_x-10,gameChar_y-25);
		vertex(gameChar_x+5,gameChar_y-35);
		endShape(CLOSE);
	
		fill(54,19,11);
		noStroke();
		rect(gameChar_x-5,gameChar_y-35,10,-5);  //belt
	
		fill(156,90,60);  //jacket
		rect(gameChar_x-5,gameChar_y-40,10,-20);
	
		fill(229,170,122);  //hands
		ellipse(gameChar_x-17,gameChar_y-50,10,5);
		ellipse(gameChar_x-17,gameChar_y-52,10,5);
	
		fill(255,249,189); //shirt
		stroke(0);
		strokeWeight(0.5);
		beginShape();  //left arm
		vertex(gameChar_x+4,gameChar_y-58);
		vertex(gameChar_x-4,gameChar_y-58);
		vertex(gameChar_x-12,gameChar_y-52);
		vertex(gameChar_x-17,gameChar_y-52);
		vertex(gameChar_x-17,gameChar_y-48);
		vertex(gameChar_x-8,gameChar_y-48);
		endShape(CLOSE);
	
		beginShape();  //right arm
		vertex(gameChar_x+4,gameChar_y-58);
		vertex(gameChar_x-4,gameChar_y-58);
		vertex(gameChar_x-12,gameChar_y-54);
		vertex(gameChar_x-17,gameChar_y-54);
		vertex(gameChar_x-17,gameChar_y-50);
		vertex(gameChar_x-8,gameChar_y-50);
		endShape(CLOSE);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
		
		stroke(0);
		strokeWeight(0.5);
	
		fill(229,170,122);  //head
		rect(gameChar_x-8,gameChar_y-60,16,-10);
	
		fill(0);  //eyes
		line(gameChar_x+7,gameChar_y-63,gameChar_x+7,gameChar_y-70);
		line(gameChar_x+3,gameChar_y-63,gameChar_x+3,gameChar_y-70);
	
		rect(gameChar_x-2,gameChar_y-60,-6,-10); //hair
	
		fill(156,90,60);  //hat & brim
		stroke(0);
		rect(gameChar_x-10,gameChar_y-68,20,-7);
		ellipse(gameChar_x,gameChar_y-68,44,2);
		
		fill(54,19,11);  //boots
		noStroke();
		rect(gameChar_x+12,gameChar_y-17,13,6);
		ellipse(gameChar_x+20.5,gameChar_y-16,9,8);
		
		stroke(0);
		fill(47,54,153);  //jeans
		beginShape();  //first leg
		vertex(gameChar_x+5,gameChar_y-35);
		vertex(gameChar_x+22,gameChar_y-27);
		vertex(gameChar_x+19,gameChar_y-17);
		vertex(gameChar_x+12,gameChar_y-17);
		vertex(gameChar_x+14,gameChar_y-27);
		vertex(gameChar_x-5,gameChar_y-35);
		endShape(CLOSE);
	
		fill(54,19,11);  //boots
		noStroke();
		rect(gameChar_x+8,gameChar_y-15,13,4);
		ellipse(gameChar_x+16.5,gameChar_y-16,9,8);
	
		stroke(0);
		fill(47,54,153);
		beginShape();  //second leg
		vertex(gameChar_x+5,gameChar_y-35);
		vertex(gameChar_x+18,gameChar_y-25);
		vertex(gameChar_x+15,gameChar_y-15);
		vertex(gameChar_x+8,gameChar_y-15);
		vertex(gameChar_x+10,gameChar_y-25);
		vertex(gameChar_x-5,gameChar_y-35);
		endShape(CLOSE);
	
		fill(54,19,11);
		noStroke();
		rect(gameChar_x-5,gameChar_y-35,10,-5);  //belt
	
		fill(156,90,60);  //jacket
		rect(gameChar_x-5,gameChar_y-40,10,-20);
	
		fill(229,170,122);  //hands
		ellipse(gameChar_x+17,gameChar_y-50,10,5);
		ellipse(gameChar_x+17,gameChar_y-52,10,5);
	
		fill(255,249,189); //shirt
		stroke(0);
		strokeWeight(0.5);
		beginShape();  //left arm
		vertex(gameChar_x-4,gameChar_y-58);
		vertex(gameChar_x+4,gameChar_y-58);
		vertex(gameChar_x+12,gameChar_y-52);
		vertex(gameChar_x+17,gameChar_y-52);
		vertex(gameChar_x+17,gameChar_y-48);
		vertex(gameChar_x+8,gameChar_y-48);
		endShape(CLOSE);
	
		beginShape();  //right arm
		vertex(gameChar_x-4,gameChar_y-58);
		vertex(gameChar_x+4,gameChar_y-58);
		vertex(gameChar_x+12,gameChar_y-54);
		vertex(gameChar_x+17,gameChar_y-54);
		vertex(gameChar_x+17,gameChar_y-50);
		vertex(gameChar_x+8,gameChar_y-50);
		endShape(CLOSE);
	}
	else if(isLeft)
	{
		// add your walking left code
		
		fill(47,54,153);  //jeans
		quad(gameChar_x+5,gameChar_y-35, gameChar_x-5,gameChar_y-35,gameChar_x-15,gameChar_y-15,gameChar_x-5,gameChar_y-15);
		quad(gameChar_x+5,gameChar_y-35, gameChar_x-5,gameChar_y-35,gameChar_x+5,gameChar_y-15,gameChar_x+15,gameChar_y-15);
	
		fill(54,19,11);  //boots
		quad(gameChar_x-15,gameChar_y-15,gameChar_x-5,gameChar_y-15,gameChar_x-12.5,gameChar_y,gameChar_x-22.5,gameChar_y);  //left boot
		rect(gameChar_x-25,gameChar_y,10,-5);
		ellipse(gameChar_x-20,gameChar_y-5,10,7);
	
		quad(gameChar_x+15,gameChar_y-15,gameChar_x+5,gameChar_y-15,gameChar_x+12.5,gameChar_y,gameChar_x+22.5,gameChar_y);  //right boot
		rect(gameChar_x+12.5,gameChar_y,-10,-5);
		ellipse(gameChar_x+8,gameChar_y-5,10,7);
	
		rect(gameChar_x-5,gameChar_y-35,10,-5);  //belt
	
		fill(156,90,60);  //jacket
		rect(gameChar_x-5,gameChar_y-40,10,-20);
		
		fill(229,170,122);  //hands
		ellipse(gameChar_x-17,gameChar_y-42.5,10,7);
		ellipse(gameChar_x+10,gameChar_y-40,6,8)
	
		fill(255,249,189); //shirt
		stroke(0);
		strokeWeight(0.5);
		beginShape();  //left arm
		vertex(gameChar_x+4,gameChar_y-58);
		vertex(gameChar_x-4,gameChar_y-58);
		vertex(gameChar_x-12,gameChar_y-45);
		vertex(gameChar_x-17,gameChar_y-45);
		vertex(gameChar_x-17,gameChar_y-40);
		vertex(gameChar_x-8,gameChar_y-40);
		endShape(CLOSE);
	
		beginShape();  //right arm
		vertex(gameChar_x+5,gameChar_y-58);
		vertex(gameChar_x+15,gameChar_y-54);
		vertex(gameChar_x+12,gameChar_y-40);
		vertex(gameChar_x+8,gameChar_y-40);
		vertex(gameChar_x+8,gameChar_y-50);
		vertex(gameChar_x+5,gameChar_y-50);
		endShape(CLOSE);
	
		fill(229,170,122);  //head
		rect(gameChar_x-8,gameChar_y-60,16,-10);
	
		fill(0);  //eyes
		line(gameChar_x-7,gameChar_y-63,gameChar_x-7,gameChar_y-70);
		line(gameChar_x-3,gameChar_y-63,gameChar_x-3,gameChar_y-70);
	
		rect(gameChar_x+2,gameChar_y-60,6,-10);  //hair
	
		fill(156,90,60);  //hat & brim
		stroke(0);
		rect(gameChar_x-10,gameChar_y-68,20,-7);
		ellipse(gameChar_x,gameChar_y-68,44,2);

	}
	else if(isRight)
	{
		// add your walking right code
		
		fill(47,54,153);  //jeans
		quad(gameChar_x-5,gameChar_y-35, gameChar_x+5,gameChar_y-35,gameChar_x+15,gameChar_y-15,gameChar_x+5,gameChar_y-15);
		quad(gameChar_x-5,gameChar_y-35, gameChar_x+5,gameChar_y-35,gameChar_x-5,gameChar_y-15,gameChar_x-15,gameChar_y-15);
	
		fill(54,19,11);  //boots
		quad(gameChar_x-15,gameChar_y-15,gameChar_x-5,gameChar_y-15,gameChar_x-12.5,gameChar_y,gameChar_x-22.5,gameChar_y);  //left boot
		rect(gameChar_x-15,gameChar_y,10,-5);
		ellipse(gameChar_x-10,gameChar_y-5,10,7);
	
		quad(gameChar_x+15,gameChar_y-15,gameChar_x+5,gameChar_y-15,gameChar_x+12.5,gameChar_y,gameChar_x+22.5,gameChar_y);  //right boot
		rect(gameChar_x+25,gameChar_y,-10,-5);
		ellipse(gameChar_x+20,gameChar_y-5,10,7);
	
		rect(gameChar_x-5,gameChar_y-35,10,-5);  //belt
	
		fill(156,90,60);  //jacket
		rect(gameChar_x-5,gameChar_y-40,10,-20);
		
		fill(229,170,122);  //hands
		ellipse(gameChar_x+17,gameChar_y-42.5,10,7);
		ellipse(gameChar_x-10,gameChar_y-40,6,8)
	
		fill(255,249,189); //shirt
		stroke(0);
		strokeWeight(0.5);
		beginShape();  //left arm
		vertex(gameChar_x-4,gameChar_y-58);
		vertex(gameChar_x+4,gameChar_y-58);
		vertex(gameChar_x+12,gameChar_y-45);
		vertex(gameChar_x+17,gameChar_y-45);
		vertex(gameChar_x+17,gameChar_y-40);
		vertex(gameChar_x+8,gameChar_y-40);
		endShape(CLOSE);
	
		beginShape();  //right arm
		vertex(gameChar_x-5,gameChar_y-58);
		vertex(gameChar_x-15,gameChar_y-54);
		vertex(gameChar_x-12,gameChar_y-40);
		vertex(gameChar_x-8,gameChar_y-40);
		vertex(gameChar_x-8,gameChar_y-50);
		vertex(gameChar_x-5,gameChar_y-50);
		endShape(CLOSE);
	
		fill(229,170,122);  //head
		rect(gameChar_x-8,gameChar_y-60,16,-10);
	
		fill(0);  //eyes
		line(gameChar_x+7,gameChar_y-63,gameChar_x+7,gameChar_y-70);
		line(gameChar_x+3,gameChar_y-63,gameChar_x+3,gameChar_y-70);
	
		rect(gameChar_x-2,gameChar_y-60,-6,-10);  //hair
	
		fill(156,90,60);  //hat & brim
		stroke(0);
		rect(gameChar_x-10,gameChar_y-68,20,-7);
		ellipse(gameChar_x,gameChar_y-68,44,2)
	}
	else if(isFalling)
	{
		// add your jumping facing forwards code
		
		fill(47,54,153);
		rect(gameChar_x-15,gameChar_y-15,10,-15);  //jeans
		rect(gameChar_x+5,gameChar_y-15,10,-15); 
		rect(gameChar_x-15,gameChar_y-20,30,-10);
	
		fill(54,19,11);
		rect(gameChar_x-15,gameChar_y-25,30,-10);  //belt
		rect(gameChar_x-15, gameChar_y-10,10,-10);  //boots
		rect(gameChar_x-20,gameChar_y-10,10,-5);
		ellipse(gameChar_x-15,gameChar_y-15,10,5);
		rect(gameChar_x+15,gameChar_y-10,5,-5);
		ellipse(gameChar_x+15,gameChar_y-15,10,5);
		rect(gameChar_x+5,gameChar_y-10,10,-10);
		rect(gameChar_x-15, gameChar_y-10,10,-5);
		rect(gameChar_x+5,gameChar_y-10,10,-5);
		
		fill(255,249,189);
		rect(gameChar_x-15,gameChar_y-35,30,-20);  //shirt
		
		fill(156,90,60);
		rect(gameChar_x-15,gameChar_y-35,10,-20);  //jacket
		rect(gameChar_x+5,gameChar_y-35,10,-20);
		
		fill(180);
		triangle(gameChar_x+10,gameChar_y-50,gameChar_x+5,gameChar_y-45,gameChar_x+15,gameChar_y-45);  //badge
		triangle(gameChar_x+10,gameChar_y-43,gameChar_x+5,gameChar_y-48,gameChar_x+15,gameChar_y-48);
		
		fill(255,194,14);
		triangle(gameChar_x,gameChar_y-20,gameChar_x-5,gameChar_y-35,gameChar_x+5,gameChar_y-35);  //belt buckle
		triangle(gameChar_x,gameChar_y-40,gameChar_x-5,gameChar_y-25,gameChar_x+5,gameChar_y-25);
		
		fill(229,170,122);
		ellipse(gameChar_x,gameChar_y-55,8,15);  //chest under shirt
		stroke(0);
		rect(gameChar_x-10,gameChar_y-55,20,-20);  //head
	
		fill(0);
		rect(gameChar_x-10,gameChar_y-55,2,-20);
		rect(gameChar_x+8,gameChar_y-55,2,-20);
		
		fill(156,90,60);
		ellipse(gameChar_x,gameChar_y-65,44,2)  //hat brim
		rect(gameChar_x-11,gameChar_y-65,22,-10)  //hat
		
		fill(0);
		line(gameChar_x-2,gameChar_y-57,gameChar_x-2,gameChar_y-62);  //eyes
		line(gameChar_x+3,gameChar_y-57,gameChar_x+3,gameChar_y-62);
		
		noStroke();
		fill(229,170,122);
		ellipse(gameChar_x-20,gameChar_y-65,10,13);  //fists
		ellipse(gameChar_x+20,gameChar_y-65,10,13);
		fill(255,249,189);
		rect(gameChar_x-25,gameChar_y-45,10,-20); //arms
		rect(gameChar_x+15,gameChar_y-45,10,-20);
	}
	else
	{
		// add your standing front facing code
		
		fill(47,54,153);
		rect(gameChar_x-15,gameChar_y-15,10,-15);  //jeans
		rect(gameChar_x+5,gameChar_y-15,10,-15); 
		rect(gameChar_x-15,gameChar_y-20,30,-10);
		
		fill(54,19,11);
		rect(gameChar_x-15,gameChar_y-25,30,-10);  //belt
		rect(gameChar_x-15, gameChar_y,10,-10);  //boots
		rect(gameChar_x-20,gameChar_y,10,-5);
		ellipse(gameChar_x-15,gameChar_y-5,10,5);
		rect(gameChar_x+15,gameChar_y,5,-5);
		ellipse(gameChar_x+15,gameChar_y-5,10,5);
		rect(gameChar_x+5,gameChar_y,10,-10);
		rect(gameChar_x-15, gameChar_y-10,10,-5);
		rect(gameChar_x+5,gameChar_y-10,10,-5);
	
		fill(229,170,122);
		ellipse(gameChar_x-20,gameChar_y-35,10,13);  //fists
		ellipse(gameChar_x+20,gameChar_y-35,10,13);
	
		fill(255,249,189);
		rect(gameChar_x-15,gameChar_y-35,30,-20);  //shirt
		rect(gameChar_x-25,gameChar_y-35,10,-20);
		rect(gameChar_x+15,gameChar_y-35,10,-20);
	
		fill(156,90,60);
		rect(gameChar_x-15,gameChar_y-35,10,-20);  //jacket
		rect(gameChar_x+5,gameChar_y-35,10,-20);
	
		fill(180);
		triangle(gameChar_x+10,gameChar_y-50,gameChar_x+5,gameChar_y-45,gameChar_x+15,gameChar_y-45);  //badge
		triangle(gameChar_x+10,gameChar_y-43,gameChar_x+5,gameChar_y-48,gameChar_x+15,gameChar_y-48);
	
		fill(255,194,14);
		triangle(gameChar_x,gameChar_y-20,gameChar_x-5,gameChar_y-35,gameChar_x+5,gameChar_y-35);  //belt buckle
		triangle(gameChar_x,gameChar_y-40,gameChar_x-5,gameChar_y-25,gameChar_x+5,gameChar_y-25);
	
		fill(229,170,122);
		ellipse(gameChar_x,gameChar_y-55,8,15);  //chest under shirt
		stroke(0);
		rect(gameChar_x-10,gameChar_y-55,20,-20);  //head
	
		fill(0);
		rect(gameChar_x-10,gameChar_y-55,2,-20);
		rect(gameChar_x+8,gameChar_y-55,2,-20);
	
		fill(156,90,60);
		ellipse(gameChar_x,gameChar_y-65,44,2)  //hat brim
		rect(gameChar_x-11,gameChar_y-65,22,-10)  //hat
	
		fill(0);
		line(gameChar_x-2,gameChar_y-57,gameChar_x-2,gameChar_y-62);  //eyes
		line(gameChar_x+3,gameChar_y-57,gameChar_x+3,gameChar_y-62);
	}
	//ending camera movement
	pop();

	//--------------------------------------------------------------SCORES--------------------------------------------------------------------
	noStroke();  //drawing the collectable icon
	fill(247,67,85);
	quad(collectable.x_pos,collectable.y_pos+28,collectable.x_pos-10,collectable.y_pos,collectable.x_pos,collectable.y_pos-28,collectable.x_pos+10,collectable.y_pos);
	
	noFill();
	stroke(148,27,39);
	quad(collectable.x_pos,collectable.y_pos+20,collectable.x_pos-5,collectable.y_pos,collectable.x_pos,collectable.y_pos-20,collectable.x_pos+5,collectable.y_pos);

	textAlign(LEFT,BASELINE);
	textSize(32);
	fill(255);
	stroke(0);
	strokeWeight(4);
	text(gameScore+'/'+totalGameScore, 70, 60); //writing out the game score
	text('Level: '+lvlScore, 40, 110); //writing out the current level
	text('Deaths: '+deathCount,40,160); //writing out the death count
	text('High Score: '+highScore,40,210); //writing out the high score

	//--------------------------------------------------------------GAME OVER STATE--------------------------------------------------------------------
	if(gameOver == true){
		isLeft = false;
		isRight = false;
		canDash = false;

		fill(10,10,10,128);
		noStroke();
		rect(0,0,width,height); //rectangle that dims the screen apart from the text
		
		fill(200);
		strokeWeight(3);
		stroke(125);
		rect(width/2-120,height-140,240,100); //"Try again" box

		textSize(160);
		fill(255,0,0);
		stroke(0);
		strokeWeight(4);
		textAlign(CENTER,BOTTOM);
		text('GAME', width/2, height/2+15);
		textAlign(CENTER,TOP);
		text('OVER', width/2, height/2-20); //gameover text

		fill(0);
		textSize(40);
		noStroke();
		textAlign(CENTER);
		text('Try Again', width/2, height-110);  //try again text
		textAlign();
	}

	//--------------------------------------------------------------LEVEL COMPLETE STATE--------------------------------------------------------------------
	if(levelComplete == true){
		isLeft = false;
		isRight = false;
		canDash = false;

		fill(10,10,10,128);
		noStroke();
		rect(0,0,width,height); //rectangle that dims the screen apart from the text

		fill(200);
		strokeWeight(3);
		stroke(125);
		rect(width/2-120,height-140,240,100); //"Next level" box

		textSize(160);
		fill(0,255,0);
		stroke(0);
		strokeWeight(4);
		textAlign(CENTER,BOTTOM);
		text('LEVEL', width/2, height/2+15);
		textAlign(CENTER,TOP);
		text('COMPLETE', width/2, height/2-20);  //level complete text

		fill(0);
		textSize(40);
		noStroke();
		textAlign(CENTER);
		text('Next Level', width/2, height-110);  //next level text
		textAlign();
	}

	//----------------------------------------------------------------CONTROLS SCREEN-----------------------------------------------------------------------
	if(firstTime){
		fill(10,10,10,128);
		noStroke();
		rect(0,0,width,height); //rectangle that dims the screen apart from the text
		
		fill(200);
		strokeWeight(3);
		stroke(125);
		rect(width/2-120,height-140,240,100); //"Continue" box

		fill(200);
		strokeWeight(3);
		stroke(125);
		rect(width-(width/4),height-180,-(width/2),-350);

		fill(0);
		textSize(40);
		noStroke();
		textAlign(LEFT);
		text('Jump: W', width/2-230, height-400); 
		text('Move Left: A', width/2-230, height-350); 
		text('Move Right: D', width/2-230, height-300); 
		text('Dash: Shift', width/2-230, height-250);
		textAlign(CENTER);
		text('Controls', width/2, height-470); 
		text('Continue', width/2, height-80);  //next level text
		textAlign();
	}

	///////////--------------------------------------------------INTERACTION CODE--------------------------------------------------//////////
	//Put conditional statements to move the game character below here
	//Makes the game character fall after jumping
	if(gameChar_y<floorPos_y){
		isFalling=true;
		gameChar_y+=3;
		if(gameChar_y>floorPos_y-3 && isFalling == true){
			gameChar_y = floorPos_y;  //stops the character from going below the ground
			isFalling = false  //stops the character from falling after touching the ground
		}
	} else{  //stops the character from falling after touching the ground
		isFalling=false;
	}
	//makes the character move to the left
	if(isLeft==true){
		gameChar_x-=9;
	}
	//makes the character move to the right
	if(isRight==true){
		gameChar_x+=9;
	}

	if(ldash==true && canDash==true){
		gameChar_x-=200;
		canDash = false;
		ldash = false;
	}
	if(rdash==true && canDash==true){
		gameChar_x+=200;
		canDash = false;
		rdash = false;
	}

	if(gameChar_y==floorPos_y){
		canDash = true;
	}


	for(var i = 0; i<collectables.length; i++){
		if(dist(gameChar_x,gameChar_y,collectables[i].x_pos,collectables[i].y_pos)<45){
			if(collectables[i].isFound == false){
				gameScore++;  //increases the gamescore if the collectable hasn't already been found
			}
			collectables[i].isFound=true;  //checks if the player has reached the collectable
		}
	}

	if(dist(gameChar_x,gameChar_y,flagpole.x_pos,flagpole.y_pos)<70){
		flagpole.isReached = true;  //checks if the player has reached the flagpole
		levelComplete = true;  //marks the level as being completed once the player reaches the flagpole
	}
}
//----------------------------------------------------------------CONTROLS---------------------------------------------------------------

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if(gameOver||levelComplete){
		return;
	}

	//moving left
	if(key == 'a' && gameChar_y<=floorPos_y){
		isLeft=true;
	}

	//moving right
	if((key == 'd' || key == 'D') && gameChar_y<=floorPos_y){
		isRight = true;
	}

	//jumping
	if(key == 'w' && isFalling==false && gameChar_y<=floorPos_y){
		gameChar_y-=100;
	}
	
	//dash code
	if(keyIsDown(SHIFT) && isLeft == true){
		ldash = true;
	}

	if(keyIsDown(SHIFT) && isRight == true){
		rdash = true;
	}

}
function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
	//stops the character moving left
	if(key == 'a'){
		isLeft=false;
	}

	//stops the character moving right
	if(key == 'd'){
		isRight=false;
	}
}

function mousePressed(){  //function to make the user move onto the next level or restart the game when they click the prompt
	if(levelComplete == true && 392<mouseX && mouseX<632 && 536>mouseY && 436<mouseY){
		if(lvlScore == highScore){
			highScore++;
		}
		lvlScore++;
		setup();
	}
	if(gameOver == true && 392<mouseX && mouseX<632 && 536>mouseY && 436<mouseY){
		totalGameScore = 0;
		gameScore = 0;
		lvlScore = 1;
		deathCount+=1;
		setup();
	}
	if(firstTime == true && 392<mouseX && mouseX<632 && 536>mouseY && 436<mouseY){
		firstTime = false;
		setup();
	}
}
//-------------------------------------------------------------GENERATIVE FUNCTIONS---------------------------------------------------------------------
function newCollectable(){
	for(var i = 0; i<lvlScore; i++){
		totalGameScore++
		collectables.push(
			{
				x_pos: round(random(10,flagpole.x_pos-20)),
				y_pos: round(random(floorPos_y-75,floorPos_y-25)),
				isFound: false
			}
		)
	}
}

function newCanyon(){
	for(var i = 0; i<lvlScore; i++){
		canyons.push(
			{
				x_pos: round(random(50,flagpole.x_pos-270)),
				width: round(random(50,250))
			}
		)
	}
}

function newTrees(){
	for(var i = 0; i<lvlScore*2; i++){
		trees.x_pos.push(round(random(1300,flagpole.x_pos)))
	}
}

function newMountains(){
	for(var i = 0; i<lvlScore*2; i++){
		mountains.x_pos.push(round(random(mountains.x_pos[mountains.x_pos.length-1]+600,mountains.x_pos[mountains.x_pos.length-1]+1000)))
	}
}

function newClouds(){
	for(var i = 0; i<lvlScore*2; i++){
		clouds.push({
			x_pos: round(random(clouds[clouds.length-1].x_pos+100,clouds[clouds.length-1].x_pos+900)),
			y_pos: round(random(70,130))
		})
	}
}

function newSpike(){
	var newSpikeX;
	var validSpike;
	for(var i = 0; i<lvlScore; i++){
		validSpike = false;
		while(validSpike==false){
			newSpikeX = round(random(100,flagpole.x_pos-30));
			validSpike = checkValidSpike(newSpikeX)
		}
		spikes.push(
			{
				x_pos: newSpikeX,
				y_pos: round(random(floorPos_y-75,floorPos_y-25))
			}
		)
	}
}

function checkValidSpike(spikeXPos){  //function used to check that a spike isnt too close to a collectable
	for(var i = 0; i<collectables.length; i++){
		if(abs(collectables[i].x_pos - spikeXPos)<=30){
			return false;
		} 
	}
	return true;
}