var pictureUrl = ['../images/bag.jpg','../images/banana.jpg','../images/bathroom.jpg','../images/boots.jpg','../images/breakfast.jpg','../images/bubblegum.jpg','../images/chair.jpg','../images/cthulhu.jpg','../images/dog-duck.jpg','../images/dragon.jpg','../images/pen.jpg','../images/pet-sweep.jpg','../images/scissors.jpg','../images/shark.jpg','../images/sweep.png','../images/tauntaun.jpg','../images/unicorn.jpg','../images/usb.gif','../images/water-can.jpg','../images/wine-glass.jpg'];

var picture =  ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

var threeImage = document.getElementById('threeImage');
var submit = document.getElementById('submitButton');
var playAgain = document.getElementById('playAgain');
var hideChartPlayAgain = document.getElementsByClassName('results');
var left = document.getElementsByClassName('left');
var center = document.getElementsByClassName('center');
var right = document.getElementsByClassName('right');
var paragraph = document.getElementsByClassName('paragraph');
var storeItemObject = [];
var limitClick = 0;
var resultsTimesClicked = [];
var resultsTimesShown = [];
var resultsPercent = [];

function StoreItem (name, source) {
  this.name = name;
  this.source = source;
  this.appearances = 0;
  this.clickedOn = 0;
}

//This creates an object for each item.
for(var j = 0; j < pictureUrl.length; j++) {
  var itemName = new StoreItem(picture[j],pictureUrl[j]);
  storeItemObject.push(itemName);
}

//Creates a random number
function getRandomIntInclusive () {
  return Math.floor(Math.random() * pictureUrl.length);
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
  storeItemObject[randomNumber[0]].appearances += 1;
  storeItemObject[randomNumber[1]].appearances += 1;
  storeItemObject[randomNumber[2]].appearances += 1;
}

function results(){
  for(var i = 0; i < storeItemObject.length; i++) {
    resultsTimesClicked.push(storeItemObject[i].clickedOn);
    resultsTimesShown.push(storeItemObject[i].appearances);
    var percentage = Math.floor((resultsTimesClicked[i] / resultsTimesShown[i]) * 100);
    resultsPercent.push(percentage);
  }
}

function graphResults (){
  var unhide = document.getElementById('chartHeading');
  var unhide2 = document.getElementById('chartHeading2');
  unhide.removeAttribute('hidden');
  unhide2.removeAttribute('hidden');
  var ctx = document.getElementById('myChart').getContext('2d');
  var ctx2 = document.getElementById('myChart2').getContext('2d');
  var data = {
    labels: picture,
    datasets: [
      {
        label: 'How many times clicked',
        // The properties below allow an array to be specified to change the value of the item at the given index
        // String  or array - the bar color
        backgroundColor: 'rgba(230,59,46,0.2)',
        // String or array - bar stroke color
        borderColor: 'rgba(230,59,46,1)',
        // Number or array - bar border width
        borderWidth: 1,
        // String or array - fill color when hovered
        hoverBackgroundColor: 'rgba(230,59,46,0.4)',
        // String or array - border color when hovered
        hoverBorderColor: 'rgba(230,59,46,1)',
        // The actual data
        data: resultsTimesClicked,
        // String - If specified, binds the dataset to a certain y-axis. If not specified, the first y-axis is used.
        yAxisID: 'y-axis-0',
      },
      {
        label: 'Times shown',
        backgroundColor: 'rgba(51,145,197,0.2)',
        borderColor: 'rgba(51,145,197,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(51,145,197,0.4)',
        hoverBorderColor: 'rgba(51,145,197,1)',
        data: resultsTimesShown
      }
    ]
  };

  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data
  });

  var data2 = {
    labels: picture,
    datasets: [
      {
        label: 'Percentage of Clicked/Shown',
        // The properties below allow an array to be specified to change the value of the item at the given index
        // String  or array - the bar color
        backgroundColor: 'rgba(230,59,46,0.2)',
        // String or array - bar stroke color
        borderColor: 'rgba(230,59,46,1)',
        // Number or array - bar border width
        borderWidth: 1,
        // String or array - fill color when hovered
        hoverBackgroundColor: 'rgba(230,59,46,0.4)',
        // String or array - border color when hovered
        hoverBorderColor: 'rgba(230,59,46,1)',
        // The actual data
        data: resultsPercent,
      }
    ]
  };

  var myBarChart2 = new Chart(ctx2, {
    type: 'bar',
    data: data2
  });

}

//During a click event this block should recreate 3 unique images only and increments when an image is clicked on.
function handleClick (event) {
  limitClick += 1;
  if(limitClick === 25){
    threeImage.removeEventListener('click',handleClick);
    submit.removeAttribute('hidden');
    playAgain.removeAttribute('hidden');
    left[0].setAttribute('hidden', 'hidden');
    center[0].setAttribute('hidden', 'hidden');
    right[0].setAttribute('hidden', 'hidden');
    paragraph[0].setAttribute('hidden', 'hidden');
    for (var i = 0; i < storeItemObject.length; i++) {
      if(event.target.id === storeItemObject[i].name) {
        storeItemObject[i].clickedOn += 1;
        localStorage.setItem('votes', JSON.stringify(storeItemObject));
      }
    }
  }else{
    for (var i = 0; i < storeItemObject.length; i++) {
      if(event.target.id === storeItemObject[i].name) {
        storeItemObject[i].clickedOn += 1;
        localStorage.setItem('votes', JSON.stringify(storeItemObject));
      }
    }
    threeRandomPhotos();
  }
}

function unhide(event) {
  hideChartPlayAgain[0].removeAttribute('hidden');
  results();
  graphResults();
}

function replay(event) {
  limitClick = 15;
  threeImage.addEventListener('click',handleClick);
  submit.setAttribute('hidden','hidden');
  playAgain.setAttribute('hidden', 'hidden');
  hideChartPlayAgain[0].setAttribute('hidden', 'hidden');
  left[0].removeAttribute('hidden');
  center[0].removeAttribute('hidden');
  right[0].removeAttribute('hidden');
  paragraph[0].removeAttribute('hidden');
}

threeRandomPhotos();
threeImage.addEventListener('click', handleClick);
submit.addEventListener('click', unhide);
playAgain.addEventListener('click', replay);

if(localStorage.getItem('votes')) {
  var addToArray = JSON.parse(localStorage.getItem('votes'));
  for (var i = 0; i < addToArray.length; i++) {
    storeItemObject[i].appearances = addToArray[i].appearances;
    storeItemObject[i].clickedOn = addToArray[i].clickedOn;
  }
}
