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
var dayEl = $("#currentDay");
var textEl = $(".description");
var saveBtn = $(".btn");
var timeBlock = $(".time-block");
var textId = "";
var textValue = "";
var storedMessage = "";
var myPlanner = {};
var today = dayjs();

function dayScheduler(time) {
  var hour = "";
  var timeString = time.toString()
  if(time < 12){
    hour = timeString.concat("AM")
  }
  else if (time === 12){
    hour = timeString.concat("PM")
  }
  else{
    time -= 12
    timeString = time.toString()
    hour = timeString.concat("PM")
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
    var targetDiv = event.target.closest("div");
    var tempId = targetDiv.id;
    // var tempValue = $("#hour-12 input").val();
    var tempValue = $(textEl).val()
    console.log(tempId);
    // console.log(tempValue.children)
    console.log(tempValue);
    myPlanner = {
      tempId: tempValue,
    };
    console.log(myPlanner);
    // saveItems to an object variable
    // why: to keep it organized
    // how: with a variable declaration

    // push the object to localStorage with setItem
    // retrieve with getItem
  });
}

// Create a function that will update date every 24hours (86400000 milliseconds)
setInterval(updateDate(), 86400000);
function updateDate() {
  // Create currentDate's date
  var currentDate = today.format("dddd, MMMM D");
  // add text to the webpage
  dayEl.text(currentDate);
}

// when I change/type message in textarea field, I want a random id attribute to be created for that specific text area.
textEl.on("blur", function () {
  // I want to generate a random Id
  textId = Math.random().toString(36).substr(2, 9);
  console.log("your id is => " + textId);
  // I want to add random id attribute to the textarea element
  textEl.attr("id", textId);
  $(this).val($(this).val());
  textValue = $(this).val();
  console.log("your text message => " + textValue);
  // console.log("your text message => " + $(this).val())
  // I want to save text in the localStorage using setItem() method
  localStorage.setItem("appointment", textValue);
  // var appointment = {"appt": textValue}
  // localStorage.setItem("appointment", JSON.stringify(appointment))
});

function onPageReload() {
  // I want to retrieve user message from localStorage
  storedMessage = localStorage.getItem("appointment");
  // storedMessage = JSON.parse(localStorage.getItem("appointment"))
  console.log("message stored => " + storedMessage);
  // If there is a content availabe in localStorage, I want to display it in that textarea element only and make it persist when the page reload.
  if (storedMessage) {
    console.log("local storage has content!");
    // $(textId).val(storedMessage);
    // document.getElementById("textId").innerHTML = storeMessage;
    this.innerHTML = storedMessage;
    console.log(this);
    // textValue = storedMessage
  }
}

window.addEventListener("beforeunload", onPageReload());

// create an object for date and text
// why:
// empty array
// type a message

console.log(myPlanner);

function init(){
  for(var i = 9; i < 18; i++){
    dayScheduler(i)
  }
  
}
init();