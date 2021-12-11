var player,playerimg,enemy,enemygroup,enemyimg,owl,owlimg;
var canvas;
var backgroundimg,bg;
var coin,coinimg,coinGroup,coin2,coin3;
var platform,platformimg,platformGroup;
var gameState = "play";
var mushroom,mushroomimg,mushroomedimg;
var purple;


var ground,groundimg;

function preload(){

  backgroundimg = loadImage("./assets/background.jpg");
  playerimg = loadImage("./assets/Rat.png");
  platformimg = loadImage("./assets/platform.png");
  coinimg = loadAnimation("./assets/coin.png");
  enemyimg = loadAnimation("./assets/enemy1.jpg");
  owlimg = loadAnimation("./assets/owl.jpg");
  mushroomimg = loadImage("./assets/mushroom.png");
  mushroomedimg = loadImage("./assets/mushroomedrat.png")
  


  
}

function setup(){

  canvas = createCanvas(windowWidth,windowHeight);

  bg = createSprite(width/2,height/2,width,height);
  bg.addImage(backgroundimg);
  bg.velocityX=-2
  

  ground = createSprite(width/2,800,2000,100);
  ground.visible = false;

  player = createSprite(500,500,100,100);
  player.addImage(playerimg);
  player.scale = 0.15;
  player.setCollider("circle",0,0,150);
  player.debug = false;

  coin = createSprite(200,350);
  coin.addAnimation("enemy",enemyimg);
  coin.addAnimation("coin",coinimg);
  coin.changeAnimation("coin",coinimg)
  coin.scale = 0.1;
  

  coin2 = createSprite(1400,350);
  coin2.addAnimation("enemy",enemyimg);
  coin2.addAnimation("coin",coinimg);
  coin2.changeAnimation("coin",coinimg);
  coin2.scale = 0.1;
 

  coin3 = createSprite(800,150);
  coin3.addAnimation("enemy",enemyimg);
  coin3.addAnimation("coin",coinimg);
  coin3.changeAnimation("coin",coinimg)
  coin3.scale = 0.1;

  purple = createSprite(width/2,height/2,2000,1000);
  purple.shapeColor = rgb(201,18,255, 0.5)
  purple.visible = false;
 
  


  


  


  
  
  
  platformGroup = new Group();
  coinGroup = new Group();
  
  coinGroup.add(coin);


}

function draw(){
  background(255);

  if(bg.x<width-10){
    bg.x=bg.width/2
  }
  
  var platformpositions = [
    {x: 200,y:400,image: platformimg},
    {x: 1400,y:400,image: platformimg},
    {x: 800,y:200,image: platformimg}]


  

 

  
  
    
    NewSprites(platformGroup,platformpositions.length,platformimg,0.21,platformpositions)
    
    
    if(player.velocity.y >= 10){

      player.velocity.y = [];
    }

  if(keyDown(UP_ARROW)    ){
      player.position.y -= 3;
      
    
     
    }

    if(keyDown(RIGHT_ARROW)){

      player.position.x += 5;
     
    }

    if(keyDown(LEFT_ARROW)){

      player.position.x -= 5;
   
    }
    if(keyDown(DOWN_ARROW)){

      player.position.y += 5;
     
    }

    platformGroup.collide(player, removeplatform)


    //if(platformGroup.isTouching(player)){

      
    //}

    //if(player.position.y <= 130){

      //player.velocity.y += 4;
   // }

    



    

   //  player.velocity.y += 1;

   if(player.isTouching(coinGroup)){

    coin.changeAnimation("enemy",enemyimg);
    coin.scale = 0.4;

    coin3.changeAnimation("enemy",enemyimg);
    coin3.scale = 0.4;

    mushroomed();
    
  }



 
    

  
  player.collide(ground);
  player.collide(platformGroup);
  
 


  drawSprites();
}


function NewSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []){


  for(var i = 0; i < numberOfSprites; i++){

    var x,y;

    if(positions.length > 0){

      x = positions[i].x;
      y = positions[i].y;
      
      spriteImage = positions[i].image;

    }

    var sprite = createSprite(x,y);
    sprite.addAnimation("sprite",spriteImage);
    sprite.changeAnimation("sprite",spriteImage)

    sprite.scale = scale;
    spriteGroup.add(sprite);
    sprite.setCollider("rectangle",0,0,350,40);
    sprite.debug = false;
    
    if(keyDown("a")){
      sprite.position.x+=10;
    }
    
    player.depth=sprite.depth;
    sprite.depth=sprite.depth-3;
    purple.depth = player.depth;
    purple.depth += 1
    
  }
 

  
}




function removeplatform(platform){

  platform.remove();
}

function mushroomed(){

  player.addImage(mushroomedimg);
  purple.visible = true;

  

   

      player.rotation = player.rotation +30
    
  

  var randx = Math.round(random(200,1000));
  var randy = Math.round(random(200,700));
  var velx = Math.round(random(2,10));
  var vely = Math.round(random(-10,10));

  for(var i = 0; i < 20; i++){

    mushroom = createSprite(randx,randy);
    mushroom.addImage(mushroomimg);
    mushroom.scale = 0.5
    mushroom.velocity.x = velx;
    mushroom.velocity.y = vely;
   
    
  }
}







