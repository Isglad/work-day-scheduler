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
// textEl.val("see doctor")
// console.log("text added => " + textEl.val())
var saveBtn = $(".btn");
var textId = ""


// Create a function that will update date every 24hours (86400000 milliseconds)
setInterval(updateDate(), 86400000);
function updateDate(){
  // Create today's date
  var now = dayjs();
  var today = now.format('dddd, MMMM D')
  // add text to the webpage
  dayEl.text(today)
}


// when I change/type message in textarea field, I want a random id attribute to be created for that specific text area.
textEl.on("blur", function(){
  console.log("This is the text are field => " + textEl)
  textId = 'textarea-' + Date.now() + '-' + Math.floor(Math.random()*1000);
  console.log("randomg id generate => " + textId)
});

// When save button is pressed, I want the message to be saved
saveBtn.on("click", function(){
  console.log("Save button clicked")
  // I want to add random id generated above to the textarea element
  textEl.attr('id', textId)
  // I want to change the value of textarea element to whatever user types in
  // textEl.on('keyup', function(){
  //   var appointment = textEl.val();
  //   console.log("User type => " + appointment)
  // })
  var appointment = textEl.val();
  console.log("User type => " + appointment)
  // I want to save text in the localStorage using setItem() method
  localStorage.setItem("appointment", appointment);
  // I want to display message in that textarea field only and make it persist when the page reload.
  var appointmentText = (localStorage.getItem("appointment"));
  console.log("Appt stored => " + appointmentText)
  if(appointmentText){
    textEl.val(appointment)
  }
})
