var $homeNav = document.querySelector('.nav-home');
var $homePage = document.querySelector('.home-page');
var $parksResult = document.querySelector('.parks-list');
var $form = document.querySelector('.search-bar');
var $input = document.querySelector('.search-button');
var $select = document.querySelector('.stateSelect');

$homeNav.addEventListener('click', homeView);

function parksView(event) {
  $homePage.className = 'home-page hidden';
  $parksResult.className = 'parks-list';
  data.view = 'parks-result';
}

function homeView(event) {
  $homePage.className = 'home-page';
  $parksResult.className = 'parks-list hidden';
  data.view = 'home-page';
}

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';

function getState(name) {
  xhr.open('GET', 'https://developer.nps.gov/api/v1/parks?limit=466&start=0&q=' + name + '&api_key=1tk21xLEsdglEhmTVa3WKMvdsPPTz04Mrgd4F9pw');
  xhr.send();
  xhr.addEventListener('load', function () {
    var parks = xhr.response;
    var $parksList = document.querySelector('.parks-result');

    for (var i = 0; i < parks.data.length; i++) {
      var park = parks.data[i];
      var $parkList = document.createElement('li');

      var $row = document.createElement('div');
      $row.setAttribute('class', 'row');
      $parkList.appendChild($row);

      var $firstColumn = document.createElement('div');
      $firstColumn.setAttribute('class', 'column-half');
      $row.appendChild($firstColumn);

      var $image = document.createElement('img');
      $image.setAttribute('src', park.images[0].url);
      $image.setAttribute('class', 'park-img');
      $firstColumn.appendChild($image);

      var $parkName = document.createElement('a');
      $parkName.setAttribute('href', '');
      $parkName.setAttribute('class', 'state-link');
      $parkName.textContent = park.fullName;
      $firstColumn.appendChild($parkName);

      var $secondColumn = document.createElement('div');
      $secondColumn.setAttribute('class', 'column-half');
      $row.appendChild($secondColumn);

      var $parkDescription = document.createElement('p');
      $parkDescription.textContent = park.description;
      $secondColumn.appendChild($parkDescription);

      $parksList.appendChild($parkList);
    }
  });
}

$input.addEventListener('click', formEvent);

var parksHeader = document.querySelector('.result-header');
function formEvent(event) {
  event.preventDefault();
  parksView();
  var selectState = $select.value;
  parksHeader.textContent = 'Parks: ' + selectState;
  getState(selectState);
  $form.reset();
}
