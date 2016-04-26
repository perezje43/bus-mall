var pictureUrl = ['../images/bag.jpg','../images/banana.jpg','../images/bathroom.jpg','../images/boots.jpg','../images/breakfast.jpg','../images/bubblegum.jpg','../images/chair.jpg','../images/cthulhu.jpg','../images/dog-duck.jpg','../images/dragon.jpg','../images/pen.jpg','../images/pet-sweep.jpg','../images/scissors.jpg','../images/shark.jpg','../images/sweep.png','../images/tauntaun.jpg','../images/unicorn.jpg','../images/usb.gif','../images/water-can.jpg','../images/wine-glass.jpg'];

var picture =  ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

var threeImage = document.getElementById('threeImage');
var storeItemObject = [];

function StoreItem (name, source) {
  this.name = name;
  this.source = source;
  this.appearances = 0;
  this.clickedOn = 0;
  this.percentage = function() {
    return (Math.floor(this.clickedOn / this.appearances) * 100);
  };
}

function getRandomIntInclusive () {
  return Math.floor(Math.random() * pictureUrl.length);
}

function handleClick (event) {
  console.log('event handler fired');
}

for(var i = 0; i < 3; i++) {
  var getImage = document.createElement('img');
  var pictureIndex = getRandomIntInclusive();
  getImage.src = pictureUrl[pictureIndex];
  getImage.classList.add('picture');
  threeImage.appendChild(getImage);
}

for(var j = 0; j < pictureUrl.length; j++) {
  var itemName = new StoreItem(picture[j],pictureUrl[j]);
  storeItemObject.push(itemName);
}

threeImage.addEventListener('click', handleClick);
