moment.locale("is");

const gogn="https://gist.githubusercontent.com/lorraineros/7094568a0857009655911c59310ee42f/raw/07a0dc6b081d40dc63f1c12535df623f28ffb007/data.json";

let events = [];
let eventElements = [];

fetch(gogn)
    .then(
    function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
            }
            response.json().then(function(data) {
                for(let i = 0; i<data.results.length; i++){
                  events.push ({
                      name:data.results[i].eventDateName,
                      date:data.results[i].date,
                      location:data.results[i].location,
                      imageSource:data.results[i].imageSource
                  });
                  addEvent(i);
                }
                displayEvents();
            });
        }
    )
    .catch(function(err) { console.log('Fetch Error :-S', err); });


function addEvent(event){
    let div = document.createElement("div"); 
    let name = document.createElement("h1");
    let date = document.createElement("h3");
    let location = document.createElement("h3");
    let img = document.createElement("img");
    img.setAttribute("src", events[event].imageSource);
  
    date.classList.add("date");
    location.classList.add("location");
  
    name.appendChild(document.createTextNode(events[event].name));
    date.appendChild(document.createTextNode(moment(events[event].date).format('LLL')));
    location.appendChild(document.createTextNode(events[event].location));
  
    div.appendChild(name);
    div.appendChild(date);
    div.appendChild(location);
    div.appendChild(img);
    div.classList.add("event");
  
    eventElements.push(div);
}
function displayEvents(){
for (let i = 0; i < eventElements.length; i++)
    document.getElementById("list").appendChild(eventElements[i]);
}

function Events(){
let input, filter, txtValue;
input = document.getElementById("search");
filter = input.value.toUpperCase();

let startDate = document.getElementById("startdate").value;
let endDate = document.getElementById("enddate").value;

for (let i = 0; i < eventElements.length; i++){
    txtValue = events[i].name;
    if( txtValue.toUpperCase().indexOf(filter) < 0 || events[i].date.slice(0,10) < startDate || events[i].date.slice(0,10) > endDate)
    eventElements[i].classList.add("hidden");
    else
        eventElements[i].classList.remove("hidden");
}}


 