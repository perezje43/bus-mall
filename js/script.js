var pictureUrl = ['../images/bag.jpg','../images/banana.jpg','../images/bathroom.jpg','../images/boots.jpg','../images/breakfast.jpg','../images/bubblegum.jpg','../images/chair.jpg','../images/cthulhu.jpg','../images/dog-duck.jpg','../images/dragon.jpg','../images/pen.jpg','../images/pet-sweep.jpg','../images/scissors.jpg','../images/shark.jpg','../images/sweep.png','../images/tauntaun.jpg','../images/unicorn.jpg','../images/usb.gif','../images/water-can.jpg','../images/wine-glass.jpg'];

var picture =  ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

var threeImage = document.getElementById('threeImage');
var submit = document.getElementById('submitButton');
var left = document.getElementsByClassName('left');
var center = document.getElementsByClassName('center');
var right = document.getElementsByClassName('right');
var storeItemObject = [];
var limitClick = 0;
var resultsTimesClicked = [];
var resultsTimesShown = [];

function StoreItem (name, source) {
  this.name = name;
  this.source = source;
  this.appearances = 0;
  this.clickedOn = 0;
  this.percentage = 0;
}

//This creates an object for each item.
for(var j = 0; j < pictureUrl.length; j++) {
  var itemName = new StoreItem(picture[j],pictureUrl[j]);
  storeItemObject.push(itemName);
}

function threeRandomPhotos() {
  var randomNumber = []; //Array to store random numbers.
  for(var i = 0; i < 3; i++) {
    randomNumber.push(getRandomIntInclusive());
  }
  while(randomNumber[0] === randomNumber[1]) {
    randomNumber[1] = getRandomIntInclusive();
  }
  while(randomNumber[1] === randomNumber[2] || randomNumber[2] === randomNumber[0]) {
    randomNumber[2] = getRandomIntInclusive();
  }
  left[0].src = pictureUrl[randomNumber[0]];
  center[0].src = pictureUrl[randomNumber[1]];
  right[0].src = pictureUrl[randomNumber[2]];
  left[0].id = picture[randomNumber[0]];
  center[0].id = picture[randomNumber[1]];
  right[0].id = picture[randomNumber[2]];
  storeItemObject[randomNumber[0]].appearances++;
  storeItemObject[randomNumber[1]].appearances++;
  storeItemObject[randomNumber[2]].appearances++;
}

function results(){
  for(var i = 0; i < storeItemObject.length; i++) {
    resultsTimesClicked.push(storeItemObject[i].clickedOn);
    resultsTimesShown.push(storeItemObject[i].appearances);
  }
}

//Creates a random number
function getRandomIntInclusive () {
  return Math.floor(Math.random() * pictureUrl.length);
}

function graphResults (){
  var unhide = document.getElementById('chartHeading');
  unhide.removeAttribute('hidden');
  var ctx = document.getElementById('myChart').getContext('2d');
  var data = {
    labels: picture,
    datasets: [
      {
        label: 'How many times clicked',

        // The properties below allow an array to be specified to change the value of the item at the given index
        // String  or array - the bar color
        backgroundColor: 'rgba(255,99,132,0.2)',

        // String or array - bar stroke color
        borderColor: 'rgba(255,99,132,1)',

        // Number or array - bar border width
        borderWidth: 1,

        // String or array - fill color when hovered
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',

        // String or array - border color when hovered
        hoverBorderColor: 'rgba(255,99,132,1)',

        // The actual data
        data: resultsTimesClicked,

        // String - If specified, binds the dataset to a certain y-axis. If not specified, the first y-axis is used.
        yAxisID: 'y-axis-0',
      },
      {
        label: 'Times shown',
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54,162,235,0.4)',
        hoverBorderColor: 'rgba(54,162,235,1)',
        data: resultsTimesShown
      }
    ]
  };

  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data
  });
}

//During a click event this block should recreate 3 unique images only and increments when an image is clicked on.
function handleClick (event) {
  limitClick++;
  for (var i = 0; i < storeItemObject.length; i++) {
    if(event.target.id === storeItemObject[i].name) {
      storeItemObject[i].clickedOn++;
    }
  }
  threeRandomPhotos();
  if (limitClick === 25){
    threeImage.removeEventListener('click',handleClick);
    submit.removeAttribute('hidden');
  }
}

threeRandomPhotos();
threeImage.addEventListener('click', handleClick);

function unhide (event) {
  event.preventDefault();
  console.log('here');
  results();
  graphResults();
}

submit.addEventListener('click', unhide);
