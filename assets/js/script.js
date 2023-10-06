// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//Handle to DOM elements
var timeBlockContainerEl = $('#time-block-container');
var currentDayEl = $('#currentDay');
var saveMessageEl = $('#changesSaved');

var currentDay;
var currentHour = dayjs().hour();

//localStorage
var taskArray = new Array(9);

$(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

function saveToLocalStorage() {
  console.log("about to save: ", taskArray, JSON.stringify(taskArray));
var taskArrayToSave = JSON.stringify(taskArray);
localStorage.setItem('tasks', taskArrayToSave);

//display and fade save to local storage text
fadeSavetoLocalStorageText();
// get tasks from localSTorage
loadTasksFromLocalStorage();
}


function loadTasksFromLocalStorage() {
  var storedTaskArray = localStorage.getItem('tasks');
  if(storedTaskArray) {
    taskArray = JSON.parse(storedTaskArray);
  }
  console.log('storedTaskArray ', storedTaskArray);
}

function updateTasksForTimeBlocks() {
  loadTasksFromLocalStorage();
  var allTimeBlockDivs = timeBlockContainerEl.children(".time-block");
  // console.log("allTimeBlock instance of Jquery: ", allTimeBlock instanceof jQuery);

  for (let i = 0; i < allTimeBlockDivs.length; i++) {
    console.log("update task with :", $(allTimeBlockDivs[i]).find('textarea').val(taskArray[i]));

    $(allTimeBlockDivs[i]).find('textarea').val(taskArray[i]);

  //  textareaToupdate = $(allTimeBlockDivs[i]);

    // var blockId = getDivId($(allTimeBlock[i]));
    // var blockHour = parseInt(getHourFromDivId(blockId));
  }
}
  function handleTimeBlockClicks(event){
    if($(event.target).is('button') || $(event.target).is('i')) {
      updateTaskArray(this);
      saveToLocalStorage();
    }
  }

function updateTaskArray(div) {
  var clickedBlock = getDivId($(div));
  console.log("clickedBlock : ", clickedBlock);
  var clickedHour = parseInt(getHourFromDivId(clickedBlock));

  console.log("clickedHour to update : ", clickedHour);

  //get textarea for task text
  if(clickedBlock) {
    var textareaEl = $(div).find('textarea');
    var taskToSave = (textareaEl.val()).trim();
    if(taskToSave != null && taskToSave.trim() != '' ) {
      console.log("saving: ", taskToSave , " at: ", clickedHour % 9);
      taskArray[clickedHour % 9 ] = taskToSave;
    }
    // console.log("textareaEl : ", textareaEl, textareaEl.val());
  }
}

// timeBlockContainerEl.on('click', '.time-block', handleTimeBlockClicks);
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

//Add colors to each time black
function addColorForTimeBlocks() {

  var allTimeBlock = timeBlockContainerEl.children('.time-block');
  // console.log("allTimeBlock instance of Jquery: ", allTimeBlock instanceof jQuery);

  for(let i=0; i<allTimeBlock.length; i++) {
    allTimeBlock[i] = $(allTimeBlock[i]);
    var blockId = getDivId($(allTimeBlock[i]));
    var blockHour = parseInt(getHourFromDivId(blockId));
    if(blockHour === currentHour) {
      // console.log(" Add Current state !");
      allTimeBlock[i].removeClass('past');
      allTimeBlock[i].removeClass('future');
      allTimeBlock[i].addClass('present');

    } else if (blockHour < currentHour) {
      // console.log( "add PAST ###");
      allTimeBlock[i].removeClass('present');
      allTimeBlock[i].removeClass('future');
      allTimeBlock[i].addClass('past');
    } else if (blockHour > currentHour) {
      // console.log( "add Future !!!!"); 
      allTimeBlock[i].removeClass('present');
      allTimeBlock[i].removeClass('past');
      allTimeBlock[i].addClass('future');
    }
  }

}
function getHourFromDivId(id) {


    // console.log((id.split('hour-'))[1]);
    if(id.length > 0) {
      // console.log('ID : ', id)
      return (id.split('hour-'))[1];
    }

}

function getDivId(div) {
  // console.log('DIV : ', div.prop('id'));
  if(div instanceof jQuery) {
    return div.prop('id');
  }

}


//call method to color each block!
// addColorForTimeBlocks()

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
function updateTime() {
  //update time
  currentDay = dayjs();
  currentHour = currentDay.hour();

  currentDayEl.text(dayjs().format('dddd, MMMM D, YYYY h:mm:ss A'));
  // saveMessageEl.text(currentHour);

  //add colors for each block
  addColorForTimeBlocks();
}

function fadeSavetoLocalStorageText() {
  //Show saved to local storage message.
  saveMessageEl.addClass('show-message');
  //Fade the messaage after 5 seconds.
  setTimeout(function() {
    saveMessageEl.removeClass('show-message');
  }, 5000);
}

//mainfunction
function init() {
//add timer event to update time
timeBlockContainerEl.on('click', '.time-block', handleTimeBlockClicks);
updateTime()
addColorForTimeBlocks();
updateTasksForTimeBlocks()
setInterval(updateTime, 1000);
}

init();
});
