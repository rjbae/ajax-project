/* exported data */
var data = {
  view: 'home-page',
  myParks: [],
  myParksId: 1
};

var myParks = localStorage.getItem('my-parks');

window.addEventListener('beforeunload', unloadEvent);

if (myParks !== null) {
  data = JSON.parse(myParks);
}

function unloadEvent(event) {
  var resultsJSON = JSON.stringify(data);
  localStorage.setItem('my-parks', resultsJSON);
}
