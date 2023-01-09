// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

// -------------------------------My Work Starts Here!!!!----------------------------------------------------------

// Global variables
// var textEl = $(".description");
// var saveBtn = $(".btn");
// var timeBlock = $(".time-block");
// var textId = "";
// var textValue = "";
// var storedMessage = "";
myPlanner = new Object();
var today = dayjs();

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
  buttonEl.on("click", function (event) {
    // get hour id
    // why: to retrieve the typed msg
    // how: event.target, look for the closest parent div
    // var targetDiv = event.target.closest("div");
    // var tempId = targetDiv.id;
    // var tempValue = $("#hour-12 input").val();
    // var tempValue = $(textEl).val();
    // console.log(tempId);
    // console.log(tempValue.children)
    // console.log(tempValue);
    // hour.children(1)
    ////////////////
    myPlanner[hour] = textEl.val();
    console.log(typeof hour);
    console.log(hour);
    console.log(textEl.val());
    // console.log(myPlanner[hour])
    // console.log(myPlanner);
    ////////////////
    // saveItems to an object variable
    // why: to keep it organized
    // how: with a variable declaration

    // push the object to localStorage with setItem
    writeLocalStorage();
    // retrieve with getItem
  });

  // compare time to today
  // why: to see if time is in past, present, future
  // how: with if condition
  // console.log(today.format("HH"));
  // console.log(typeof parseInt(today.format('hh')))
  // console.log(time)
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
// create an object for date and text
// why:
// empty array
// type a message

console.log(myPlanner);

// a function that reads local storage
function readLocalStorage() {
  console.log(myPlanner);
  myPlanner = JSON.parse(localStorage.getItem("myPlannerStringify"));
  console.log(myPlanner);
}

function writeLocalStorage() {
  localStorage.setItem("myPlannerStringify", JSON.stringify(myPlanner));
}

function renderAppointment() {
  if (myPlanner){
    for (var [key, value] of Object.entries(myPlanner)) {
      $(`#${key} textarea`).val(value);
    }
  }
}

function init() {
  for (var i = 9; i < 18; i++) {
    dayScheduler(i);
  }
  readLocalStorage();
  renderAppointment();
}
init();
