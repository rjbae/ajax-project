var $homeNav = document.querySelector('.nav-home');
var $homePage = document.querySelector('.home-page');
var $parksResult = document.querySelector('.parks-list');
var $form = document.querySelector('.search-bar');
var $input = document.querySelector('.search-button');
var $select = document.querySelector('.stateSelect');
var $selectedPark = document.querySelector('.selected-park');

$homeNav.addEventListener('click', homeView);

function parksView(event) {
  $homePage.className = 'home-page hidden';
  $parksResult.className = 'parks-list';
  $selectedPark.className = 'selected-park hidden';
  data.view = 'parks-result';
}

function homeView(event) {
  $homePage.className = 'home-page';
  $parksResult.className = 'parks-list hidden';
  $selectedPark.className = 'selected-park hidden';
  data.view = 'home-page';
}

// function parkInfoView(event) {
//   $homePage.className = 'home-page hidden';
//   $parksResult.className = 'parks-list hidden';
//   $selectedPark.className = 'selected-park';
//   data.view = 'parks-info';
// }

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
      $parkName.setAttribute('id', park.id);
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

var parkInfoRequest = new XMLHttpRequest();
parkInfoRequest.responseType = 'json';

function renderStateInfo(parkCode) {
  parkInfoRequest.open('GET', 'https://developer.nps.gov/api/v1/parks?limit=466&start=0&q=' + parkCode + '&api_key=1tk21xLEsdglEhmTVa3WKMvdsPPTz04Mrgd4F9pw');
  parkInfoRequest.send();
  parkInfoRequest.addEventListener('load', function () {
    var parkInfo = parkInfoRequest.response;
    var $selectedPark = document.querySelector('.selected-park');

    for (var i = 0; i < parkInfo.data.length; i++) {
      var parkData = parkInfo.data[i];

      var $row = document.createElement('div');
      $row.setAttribute('class', 'row');

      var $column = document.createElement('div');
      $column.setAttribute('class', 'column-full');
      $row.appendChild($column);

      var $img = document.createElement('img');
      $img.setAttribute('class', 'park-info-img');
      $img.setAttribute('src', parkData.images[0].url);
      $column.appendChild($img);

      var $header = document.createElement('h2');
      $header.setAttribute('class', 'selected-park-name');
      $header.textContent = parkData.fullName;
      $column.appendChild($header);

      var $parkTextDiv = document.createElement('div');
      $parkTextDiv.setAttribute('class', 'park-text');
      $column.appendChild($parkTextDiv);

      var $descriptionLabel = document.createElement('b');
      $descriptionLabel.textContent = 'Description:';
      $parkTextDiv.appendChild($descriptionLabel);

      var $descriptionText = document.createElement('p');
      $descriptionText.textContent = parkData.description;
      $parkTextDiv.appendChild($descriptionText);

      var $activitiesLabel = document.createElement('b');
      $activitiesLabel.textContent = 'Activities:';
      $parkTextDiv.appendChild($activitiesLabel);

      var $activitiesText = document.createElement('p');
      $activitiesText.textContent = parkData.activities[0].name + ', ' + parkData.activities[1].name + ', ' + parkData.activities[2].name + ', ' + parkData.activities[3].name + ', ' + parkData.activities[4].name;
      $parkTextDiv.appendChild($activitiesText);

      var $directionsLabel = document.createElement('b');
      $directionsLabel.textContent = 'Directions:';
      $parkTextDiv.appendChild($directionsLabel);

      var $directionsText = document.createElement('p');
      $directionsText.textContent = parkData.directionsInfo;
      $parkTextDiv.appendChild($directionsText);

      var $buttonDiv = document.createElement('div');
      $buttonDiv.setAttribute('class', 'my-parks-button');
      $column.appendChild($buttonDiv);

      var $myParksButton = document.createElement('button');
      $myParksButton.setAttribute('type', 'button');
      $myParksButton.textContent = 'Add to My Parks';
      $buttonDiv.appendChild($myParksButton);

      $selectedPark.appendChild($row);
    }
  });
}

renderStateInfo('alca');
