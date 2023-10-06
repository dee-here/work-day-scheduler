//Handle to DOM elements
var timeBlockContainerEl = $("#time-block-container");
var currentDayEl = $("#currentDay");
var saveMessageEl = $("#changesSaved");

// Global Variables
var currentDay;
var currentHour = dayjs().hour();
var taskArray = new Array(9);

$(function () {
  function saveToLocalStorage() {
    var taskArrayToSave = JSON.stringify(taskArray);
    localStorage.setItem("tasks", taskArrayToSave);

    //display and fade save to local storage text
    fadeSavetoLocalStorageText();
    // get tasks from localSTorage
    loadTasksFromLocalStorage();
  }

  // get tasks saved in local storage
  function loadTasksFromLocalStorage() {
    var storedTaskArray = localStorage.getItem("tasks");
    if (storedTaskArray) {
      taskArray = JSON.parse(storedTaskArray);
    }
  }

  //Get tasks from local storage and update the individual text areas.
  function updateTasksForTimeBlocks() {
    loadTasksFromLocalStorage();
    var allTimeBlockDivs = timeBlockContainerEl.children(".time-block");
    for (let i = 0; i < allTimeBlockDivs.length; i++) {
      $(allTimeBlockDivs[i]).find("textarea").val(taskArray[i]);
    }
  }

  //if button area is clicked or the save icon inside it.
  function handleTimeBlockClicks(event) {
    if ($(event.target).is("button") || $(event.target).is("i")) {
      updateTaskArray(this);
      saveToLocalStorage();
    }
  }

  function updateTaskArray(div) {
    var clickedBlock = getDivId($(div));
    var clickedHour = parseInt(getHourFromDivId(clickedBlock));

    //get textarea for task text
    if (clickedBlock) {
      var textareaEl = $(div).find("textarea");
      var taskToSave = textareaEl.val().trim();
      if (taskToSave != null && taskToSave.trim() != "") {
        taskArray[clickedHour % 9] = taskToSave;
      }
    }
  }

  //Add colors to each time block based on current hour and blocks id
  function addColorForTimeBlocks() {
    var allTimeBlock = timeBlockContainerEl.children(".time-block");
    for (let i = 0; i < allTimeBlock.length; i++) {
      allTimeBlock[i] = $(allTimeBlock[i]);
      var blockId = getDivId($(allTimeBlock[i]));
      var blockHour = parseInt(getHourFromDivId(blockId));
      if (blockHour === currentHour) {
        allTimeBlock[i].removeClass("past");
        allTimeBlock[i].removeClass("future");
        allTimeBlock[i].addClass("present");
      } else if (blockHour < currentHour) {
        allTimeBlock[i].removeClass("present");
        allTimeBlock[i].removeClass("future");
        allTimeBlock[i].addClass("past");
      } else if (blockHour > currentHour) {
        allTimeBlock[i].removeClass("present");
        allTimeBlock[i].removeClass("past");
        allTimeBlock[i].addClass("future");
      }
    }
  }

  // get time from the id of the div clicked.  hour-8, hour-9, .. returns 8, 9.
  function getHourFromDivId(id) {
    if (id.length > 0) {
      return id.split("hour-")[1];
    }
  }

  function getDivId(div) {
    return $(div).prop("id");
  }

  function updateTime() {
    //update time
    currentDay = dayjs();
    currentHour = currentDay.hour();

    //format dayjs to display date and time in header
    currentDayEl.text(dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"));
    //add colors for each block as time updates
    addColorForTimeBlocks();
  }

  function fadeSavetoLocalStorageText() {
    //Show saved to local storage message.
    saveMessageEl.addClass("show-message");
    //Fade the messaage after 5 seconds.
    setTimeout(function () {
      saveMessageEl.removeClass("show-message");
    }, 5000);
  }

  function init() {
    //add event listener to each time block to handle updating tasks and finding hour
    timeBlockContainerEl.on("click", ".time-block", handleTimeBlockClicks);
    updateTime();
    addColorForTimeBlocks();
    updateTasksForTimeBlocks();

    // update time after every second
    setInterval(updateTime, 1000);
  }

  //start
  init();
});
