/* exported data */
var data = {
  view: 'my-parks-page',
  myParks: [],
  resultsId: 1
};

var myParks = localStorage.getItem('data-parks');

window.addEventListener('beforeunload', unloadEvent);

if (myParks !== null) {
  data = JSON.parse(myParks);
}

function unloadEvent(event) {
  var resultsJSON = JSON.stringify(data);
  localStorage.setItem('data-parks', resultsJSON);
}
