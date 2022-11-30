const $homeNav = document.querySelector('.nav-home');
const $homePage = document.querySelector('.home-page');
const $parksResult = document.querySelector('.parks-list');
const $form = document.querySelector('.search-bar');
const $input = document.querySelector('.search-button');
const $select = document.querySelector('.stateSelect');
const $selectedPark = document.querySelector('.selected-park');
const $myParksPage = document.querySelector('.my-parks');
const $myParksNav = document.querySelector('.nav-parks');
const $myParksList = document.querySelector('.my-parks-list');

$homeNav.addEventListener('click', homeView);
$myParksNav.addEventListener('click', myParksView);

// View swapping
function parksView(event) {
  $homePage.className = 'home-page hidden';
  $parksResult.className = 'parks-list';
  $selectedPark.className = 'selected-park hidden';
  $myParksPage.className = 'my-parks hidden';
  data.view = 'parks-result';
}

function homeView(event) {
  $homePage.className = 'home-page';
  $parksResult.className = 'parks-list hidden';
  $selectedPark.className = 'selected-park hidden';
  $myParksPage.className = 'my-parks hidden';
  data.view = 'home-page';
}

function parkInfoView(event) {
  $homePage.className = 'home-page hidden';
  $parksResult.className = 'parks-list hidden';
  $selectedPark.className = 'selected-park';
  $myParksPage.className = 'my-parks hidden';
  data.view = 'parks-info';
}

function myParksView(event) {
  $homePage.className = 'home-page hidden';
  $parksResult.className = 'parks-list hidden';
  $selectedPark.className = 'selected-park hidden';
  $myParksPage.className = 'my-parks';
  data.view = 'my-parks-page';
}

// Drop down search results
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';

function getState(name) {
  xhr.open('GET', 'https://developer.nps.gov/api/v1/parks?stateCode=' + name + '&stateCode=&limit=447&start=0&q=National%20Parks&api_key=1tk21xLEsdglEhmTVa3WKMvdsPPTz04Mrgd4F9pw');
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
      $parkName.setAttribute('href', '#parks-info');
      $parkName.setAttribute('class', 'state-link');
      $parkName.setAttribute('id', park.parkCode);
      $parkName.textContent = park.fullName;
      $firstColumn.appendChild($parkName);

      $parkName.addEventListener('click', function (event) {
        parkInfoView();
        renderStateInfo(event.target.id);
      });

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

// Park Info Page
var parkInfoRequest = new XMLHttpRequest();
parkInfoRequest.responseType = 'json';

function renderStateInfo(parkCode) {
  parkInfoRequest.open('GET', 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkCode + '&parkCode=&stateCode=&limit=447&start=0&q=National%20Parks&api_key=1tk21xLEsdglEhmTVa3WKMvdsPPTz04Mrgd4F9pw');
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
      $header.setAttribute('id', data.myParksId);
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
      $activitiesText.textContent = parkData.activities[0].name + ', ' + parkData.activities[1].name;
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
      $myParksButton.setAttribute('id', 'myParksButton');
      $myParksButton.textContent = 'Add to My Parks';
      $buttonDiv.appendChild($myParksButton);

      $selectedPark.appendChild($row);

      // Modal Event
      var $modalContainer = document.querySelector('.modal-container');
      $myParksButton.addEventListener('click', function () {
        $modalContainer.className = 'modal-container background';
      });

      var $noButton = document.querySelector('.no-button');
      $noButton.addEventListener('click', function () {
        $modalContainer.className = 'modal-container hidden';
      });

      var $yesButton = document.querySelector('.yes-button');
      $yesButton.addEventListener('click', function (event) {
        $modalContainer.className = 'modal-container hidden';
        event.preventDefault();
        var myParksList = {};
        myParksList.name = parkData.fullName;
        myParksList.img = parkData.images[0].url;
        myParksList.parkCode = parkData.parkCode;
        myParksList.id = data.myParksId;
        data.myParks.unshift(myParksList);
        data.myParksId++;
        $myParksList.prepend(myParksList);
        myParksView();
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', domContentLoaded);

function domContentLoaded(event) {
  for (var i = 0; i < data.myParks.length; i++) {
    var myParksResult = renderMyParks(data.myParks[i]);
    $myParksList.appendChild(myParksResult);
  }
}

function renderMyParks(parkData) {

  var $li = document.createElement('li');
  $li.setAttribute('id', parkData.id);
  $li.setAttribute('class', 'my-parks-li');

  var $myParksImg = document.createElement('img');
  $myParksImg.setAttribute('src', parkData.img);
  $myParksImg.setAttribute('class', 'my-parks-img');
  $li.appendChild($myParksImg);

  var $parkName = document.createElement('p');
  $li.appendChild($parkName);

  var $aElement = document.createElement('a');
  $aElement.setAttribute('href', '#');
  $aElement.setAttribute('class', 'park-link');
  $aElement.setAttribute('id', parkData.parkCode);
  $aElement.textContent = parkData.name;
  $parkName.appendChild($aElement);

  var $removeP = document.createElement('p');
  $removeP.setAttribute('class', 'remove-text');
  $li.appendChild($removeP);

  var $removeA = document.createElement('a');
  $removeA.textContent = 'Remove Park';
  $removeA.setAttribute('href', '#');
  $removeA.setAttribute('class', 'remove-park');
  $removeP.appendChild($removeA);

  $aElement.addEventListener('click', function (event) {
    parkInfoView();
    renderStateInfo(event.target.id);
  });

  var $myParksModal = document.querySelector('.my-parks-modal');
  $removeP.addEventListener('click', function () {
    $myParksModal.className = 'my-parks-modal background';
  });

  return $li;
}

var $myParksModal = document.querySelector('.my-parks-modal');

var $noButton = document.querySelector('.remove-no');
$noButton.addEventListener('click', function () {
  $myParksModal.className = 'my-parks-modal hidden';
});

var $yesButton = document.querySelector('.remove-yes');
$yesButton.addEventListener('click', function (event) {
  $myParksModal.className = 'my-parks-modal hidden';
  var list = document.querySelector('.my-parks-li');
  var listId = list.getAttribute('id');
  var listNodes = document.querySelectorAll('.my-parks-li');
  for (var i = 0; i < listNodes.length; i++) {
    if (listNodes[i].getAttribute('id') === listId) {
      listNodes[i].remove();
    }
  }
  for (i = 0; i < data.myParks.length; i++) {
    if (listId === data.myParks[i].id.toString()) {
      data.myParks.splice(i, 1);
      data.myParksId--;
    }
  }
  myParksView();
});

if (data.view === 'home-page') {
  homeView();
} else if (data.view === 'parks-result') {
  parksView();
} else if (data.view === 'parks-info') {
  parkInfoView();
} else if (data.view === 'my-parks-page') {
  myParksView();
}
