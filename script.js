var myPlanner = {};
var today = dayjs();
// var appointment;

function dayScheduler(time) {
  var hour = "";
  var timeString = time.toString();
  if (time < 12) {
    hour = timeString.concat("AM");
  } else if (time === 12) {
    hour = timeString.concat("PM");
  } else {
    var formatTime = time - 12;
    timeString = formatTime.toString();
    hour = timeString.concat("PM");
  }

  // create
  var sectionEl = $("<section>");
  var divEl = $("<div>");
  var textEl = $("<textarea>");
  var buttonEl = $("<button>");
  var iconEl = $("<i>");
  // set
  sectionEl.addClass("row time-block").attr("id", hour);
  divEl.addClass("col-2 col-md-1 hour text-center py-3").text(hour);
  textEl.addClass("col-8 col-md-10 description").attr("rows", "3");
  buttonEl.addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
  iconEl.addClass("fas fa-save").attr("aria-hidden", "true");
  // append
  $("#main-container").append(sectionEl);
  sectionEl.append(divEl);
  sectionEl.append(textEl);
  sectionEl.append(buttonEl);
  buttonEl.append(iconEl);

  // When save button is pressed, I want the message to be saved
  buttonEl.on("click", function () {
    myPlanner[hour] = textEl.val();
    console.log(myPlanner[hour])

    // I want to store myPlanner object to localStorage
    localStorage.setItem("appointment", JSON.stringify(myPlanner))
  });

  // compare time to today
  // why: to see if time is in past, present, future
  // how: with if condition

  if (time < parseInt(today.format("HH"))) {
    textEl.addClass("past");
  } else if (time === parseInt(today.format("HH"))) {
    textEl.addClass("present");
  } else {
    textEl.addClass("future");
  }
}

// Create a function that will update date every 24hours (86400000 milliseconds)
setInterval(updateDate(), 86400000);
function updateDate() {
  // Create currentDate's date
  var currentDate = today.format("dddd, MMMM D");
  // add text to the webpage
  $("#currentDay").text(currentDate);
}

// a function that reads local storage
function readLocalStorage() {
  console.log(myPlanner);
  myPlanner = JSON.parse(localStorage.getItem("appointment"));
  if(!myPlanner){
    myPlanner = {};
  }
}

// a function that check if there data in localStorage and render it to the page when page reload
function renderAppointment() {
  if (myPlanner){
    for (var [key, value] of Object.entries(myPlanner)) {
      $(`#${key} textarea`).val(value);
    }
  }
}

// a function that initiate
function init() {
  for (var i = 9; i < 18; i++) {
    dayScheduler(i);
  }
  readLocalStorage();
  renderAppointment();

}
init();
