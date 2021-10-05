var dog,dogImage, happyDog,happyDogImage, database, foodS, foodStock;

function preload()
{
  dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png")
}

function setup() {

  database=firebase.database()

  createCanvas(500, 500);
  dog=createSprite(200,200)
  dog.addImage(dogImage)
  dog.scale=0.15

  //happyDog=createSprite(300,300);
  //happyDog.addImage(happyDogImage)
  foodStock=database.ref('food');
  foodStock.on("value",readStock)
  
}


function draw() {  
  background(255)
  if(keyWentDown(UP_ARROW))
  {
    WriteStock(foodS)
    dog.addImage(happyDogImage)

  }
  drawSprites();
  fill(0)
  text("food reamining:"+foodS,170,200)
  textSize(13)
  text("press up arrow to feed the dog",130,300)
}

function readStock(data)
{
  foodS=data.val()
}

function WriteStock(x)
{
  if(x<=0){x=0}

  else{x=x-1}
  database.ref('/').update({food:x})
}

