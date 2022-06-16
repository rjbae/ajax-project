var $homeNav = document.querySelector('.nav-home');
var $homePage = document.querySelector('.home-page');
var $parksResult = document.querySelector('.parks-list');
var $searchButton = document.querySelector('.search-button');
// var $options = document.querySelector('option');

$homeNav.addEventListener('click', homeNavEvent);

function homeNavEvent(event) {
  $homePage.className = 'home-page';
  $parksResult.className = 'parks-list hidden';
}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://developer.nps.gov/api/v1/parks?limit=466&start=0&q=parks&api_key=1tk21xLEsdglEhmTVa3WKMvdsPPTz04Mrgd4F9pw');
xhr.responseType = 'json';

xhr.addEventListener('load', xhrEvent);
function xhrEvent(event) {
  var parks = xhr.response;
  // console.log(parks);
  for (var i = 0; i < parks.data.length; i++) {
    var parkInfo = parks.data[i];
    var parkName = parkInfo.fullName;
    var parkImg = parkInfo.images[0].url;
    var parkDescription = parkInfo.description;
    var parkState = parkInfo.states;

    var $parkList = document.createElement('li');

    var $columnDiv = document.createElement('div');
    $columnDiv.setAttribute('class', 'column-half');
    $parkList.appendChild($columnDiv);

    var $image = document.createElement('img');
    $image.setAttribute('src', parkImg);
    $image.setAttribute('class', 'park-img');
    $columnDiv.appendChild($image);

    var $parkName = document.createElement('a');
    $parkName.setAttribute('href', parkState);
    $parkName.setAttribute('class', 'state-link');
    $parkName.textContent = parkName;
    $columnDiv.appendChild($parkName);

    var $parkDescription = document.createElement('p');
    $parkDescription.textContent = parkDescription;
    $columnDiv.appendChild($parkDescription);

    $ul.appendChild($parkList);
  }
}
xhr.send();

var $ul = document.querySelector('.parks-result');

// var $dropDown = document.querySelector('.state-dropdown');

$searchButton.addEventListener('click', renderSearch);
// $dropDown.addEventListener('click', renderSearch);

function renderSearch(event) {
  var parks = xhr.response;
  for (var i = 0; i < parks.data.length; i++) {
    // var parkInfo = parks.data[i];
    // var parkName = parkInfo.fullName;
    // var parkImg = parkInfo.images[0].url;
    // var parkDescription = parkInfo.description;
    // var parkState = parkInfo.states;
    $homePage.className = 'home-page hidden';
    $parksResult.className = 'parks-list';
    var list = [];
    var select = document.querySelector('.state-dropdown');
    for (var j = 1; j < select.length; j++) {
      var swag = select.options[j].value;
      list.push(swag);
    }
  }
}
// function returnThis() {
//   var list = [];
//   var select = document.querySelector('.state-dropdown');
//   for (var j = 1; j < select.length; j++) {
//     var swag = select.options[j].value;
//     list.push(swag);
//   }
//   return list;
// }
