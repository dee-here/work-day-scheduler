// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//Handle to DOM elements


$(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var timeBlockContainerEl = $('#time-block-container');
  var currentDayEl = $('#currentDay');
  var saveMessageEl = $('#changesSaved');

  var currentDay;
  // var currentHour;
  var currentHour = dayjs().hour();
  // var currentHour = 12;
  

  function handleTimeBlockClicks(event){
    //this event has a current target that gives us the clicked div id => div#hour-9, div#hour-10, div#hour-11
    console.log("code-handleTextAreaClicks with event : ", event);
  
    if($(event.target).is('div')) {
      var divClicked = $(event.target);
      console.log("divClicked !!", divClicked);
      console.log("divClicked this!!", this);
    }  
    
    if($(event.target).is('textarea')) {
      var textAreaClicked = $(event.target);
      console.log("textAreaClicked !!", textAreaClicked);
      console.log("textAreaClicked this!!", this);
    }
    if($(event.target).is('button')) {
      var buttonClicked = $(event.target);
      console.log("buttonClicked !!", buttonClicked);
      console.log("BntClicked this!!", this);
    }

  }

timeBlockContainerEl.on('click', '.time-block', handleTimeBlockClicks);
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

//Add colors to each time black
function addColorForTimeBlocks() {
  console.log("lets add color to: !", timeBlockContainerEl);

  console.log("lets add color to: !", timeBlockContainerEl.children('.time-block'));

  getHourFromDivId('hour-20');
  //var currentTime = dayjs();
  // console.log(`The current HOUR is: `, currentDay.hour());

  var allTimeBlock = timeBlockContainerEl.children('.time-block');
  console.log("allTimeBlock instance of Jquery: ", allTimeBlock instanceof jQuery);

  for(let i=0; i<allTimeBlock.length; i++) {
    // console.log("EACH TimeBlock instance of Jquery: ", $(allTimeBlock[i]) instanceof jQuery);
    // console.log(allTimeBlock[i]);
    // console.log($(allTimeBlock[i]));
    var blockId = getDivId($(allTimeBlock[i]));
    var blockHour = parseInt(getHourFromDivId(blockId));
    console.log("blockId : ", blockId, blockHour, currentHour);
    console.log("checking is Jquery for alltimeblock[i] ", allTimeBlock[i] instanceof jQuery);
    allTimeBlock[i] = $(allTimeBlock[i]);
    if(blockHour === currentHour) {
      console.log(" Add Current state !");
      allTimeBlock[i].removeClass('past');
      allTimeBlock[i].removeClass('future');
      allTimeBlock[i].addClass('present');

    } else if (blockHour < currentHour) {
      console.log( "add PAST ###");
      allTimeBlock[i].removeClass('present');
      allTimeBlock[i].removeClass('future');
      allTimeBlock[i].addClass('past');
    } else {
      console.log( "add Future !!!!"); 
      allTimeBlock[i].removeClass('present');
      allTimeBlock[i].removeClass('past');
      allTimeBlock[i].addClass('future');
    }
  }

}
function getHourFromDivId(id) {


    console.log((id.split('hour-'))[1]);
    if(id.length > 0) {
      console.log('ID : ', id)
      return (id.split('hour-'))[1];
    }

}

function getDivId(div) {
  console.log('DIV : ', div.prop('id'));
  if(div instanceof jQuery) {
    return div.prop('id');
  }

}


//call method to color each block!
addColorForTimeBlocks()

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
function displayTime() {

  //update time
  currentDay = dayjs();
  currentHour = currentDay.hour();

  currentDayEl.text(dayjs().format('ddd, MMM D, YYYY HH:mm:ss'));
  saveMessageEl.text(currentHour);

  //add colors for each block
  addColorForTimeBlocks();
}

//add timer event to update time
displayTime()
setInterval(displayTime, 1000);

});
