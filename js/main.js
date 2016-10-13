/* ** Follow studentListSize variable --> a function needs to return a new $studentList so that searches work ** */

/****** MAKE SURE TO ADD COMMENTS TO ALL FUNCTIONS AND COMPLEX PARTS OF THE APP ******/
/****** MAKE SURE TO TEST APP IN AT LEAST 3 DIFFERENT BROWSERS ******/
/****** OMIT SEARCH OF SUBSTRINGS OF @ AND .COM ******/

//Questions for Team Treehouse: 
  //When defining a function, is there a benefit to defining local variables within the
  //parentheses of the function, like function(j), as opposed to within the brackets, like 'var = j;'
  //I tried both simply to experiment and would love to know if one is better than the other

  //Is preventing user access to text fields a concern for the search input area to avoid attacks on the app?

  //Is there a benefit to using the CSS selector .student-item.cf:nth-of-type(n+11) vs. hide() and show() eq()?
    //I opted to use jQuery to avoid having to access the CSS file from the js file. Is that worthwhile?
    //Would you please summarize how to use the CSS selector with a formula and with a jQuery selector. I am lost.

//Problem - Maintain progressive enhancement in case browser has JavaScript turned off
//Solution - Unobtrusive JavaScript used so that any content using JS is added by JS

//Problem - code user interactivity to work with styled elements

//Adds search input and search button to page-header class on ready
$(function() {

  $(".page-header").append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button>");

  $(".student-search button").click(searchStudentElements);
  // $(".student-list").append('<div class="pagination"><ul></ul></div>');
});

//Variable that stores the student-list that is in the HTML
var $studentList = $(".student-list");

//Variable that stores search results that are to be displayed after search function is run
//same as var searchResultCounter?
//Same as lastPageNumber scenario
var studentListHolder;

//Variable that stores the number of list-items within the unordered-list with the class student-list
var studentListSize = $studentList.children().length;

//Initial page number, updated when page index number is changed when user clicks a different pagination anchor
var lastPageNumber;

//Current page number determined by default state of page loading or what user has selected by clicking pagination anchor
var currentPageNumber = 1;

//Variable used to store "input" element's text, to be updated in later function(s) to capture user input dynamically
var $input;

//Variable that stores the number of matching search results 
var searchResultCount;


//Message that displays if no search results are shown
// var message; //= $("ul.student-list").append("<div><h2><b>NO SEARCH RESULTS AVAILABLE</b></h2></div>").css("display", "none");


//Variable that points to the button for event binding
// var $button = $(".page button");

  // $(".student-search button").click(searchStudentElements);

function bindHandlers(){

  // PAGINATION FUNCTION NEEDS TO BE CALLED FOR EACH SEARCH AS WELL

//*******GET EVENT HANDLERS OUTSIDE OF THE PAGINATION FUNCTION FOR APP TO WORK******

  //On click, function manageClasses adds and removes active class on clicked anchor elements
  $(".pagination a").click(manageClasses);

  //On click, function searchStudentElements searches through student-list elements using text within student-search input element
  $(".student-search button").click(searchStudentElements);

  //Bind keyup to student-search input element to fire on keyup action from user while that input element has focus
  $(".student-search input").keyup(searchStudentElements);


  $(".student-search input").keyup(initializePages);

  $(".student-search input").keyup(manageClasses);

  //RESET STUDENTLISTSIZE TO BE THE TOTAL UNSORTED LIST ELEMENT LIST SIZE FOR ANY FUTURE SEARCHES & ITERATIONS
  // studentListSize = $studentList.children().length;
}

//Initialize page with appropriate number of pagenation elements and add the class "active" to the first anchor element
//*********** NAME THIS FUNCTION SO THAT IT CAN BE CALLED IN THE CASE THAT THE USER DELETES TEXT FROM "INPUT" ELEMENT
  //Maybe bind function to onload to initialize and then to also be available to be called by name to reset pages

//$(function (totalPageLinks, $listItem, $pageLink) {
// function initializePages (totalPageLinks, $listItem, $pageLink){}  //ARGUEMENTS HERE SEEM WARRANTED


//NAME THIS FUNCTION SO IT CAN BE CALLED LATER
function initializePages(studentListSize) {

  //TXT DISPLAYS IN DOM
  console.log("initializePages is being called");

  var totalPageLinks;
  var $listItem;
  var $pageLink;
  var $pageUl;

  //Calculate the number of pagination elements needed to contain the total number 10 student-list item groups
  totalPageLinks = Math.ceil(studentListSize/10);

  $(".student-list").append('<div class="pagination"><ul></ul></div>');
  //Initializes all pagination anchor elements
    //Initialization is done by first resetting the number of list-items attached to the unordered list and then
    //by adding the appropriate number of $listItems and $pageLinks
  
  $(".pagination ul li").detach();

    for (var j = 0; j < totalPageLinks; j++) {
      $pageUl = $(".pagination ul");
      $listItem = $("<li></li>");
      $pageLink = $('<a href="#">' + (j+1) + '</a>');

      $listItem.appendTo($pageUl);
      $pageLink.appendTo($listItem);

    }

    //If no students in list then display a message to let the user know to try another search and that list is empty
    if(studentListSize === 0){
      
      console.log("THIS IS WHERE THE NO SEARCH RESULTS SHOWN MESSAGE GOES");
      // displayMessage();
    
    } else {

      //addClass "active" to the first pagination anchor element
      $(".pagination a").eq(0).addClass("active");

      //Hide all student-list list item elements per page  
      for (var j = 0; j < studentListSize; j++){
        $(".student-list li").eq(j).hide();
      }

      //Show 10 relevant student-list list item elements per page
      for (var i = 0; i < 10; i++){
        $(".student-list li").eq(i).show();
      }
    }

    $(".pagination a").click(manageClasses);

}


//*************************************************************************
//RENAME THIS FUNCTION AS CREATEPAGINATIONELEMENTS, OR AS SOMETHING MORE SPECIFIC
function manageClasses (){
   
  //TXT DISPLAYS IN DOM
  console.log("manageClasses is being called");
   
  //Maybe add first page here?
  $(".pagination a").removeClass("active");
  $(this).addClass("active");

  //Check if search function has been run before setting the page numbers
    //if search function has been run, then populate student-list with the results of the search function
    //bind focus/blur to search button focus/blur - or use click?
  //if(searchStudentElements()){}

  //Set page number for new click
  lastPageNumber = currentPageNumber;

  //Get text from href to show which set of 10 or fewer student-list elements to display
  currentPageNumber = parseInt($(this).text());

  //Show appropriate student-list list elements using currentPageNumber index the elements
  var startIndex = currentPageNumber * 10 - 10;

  //Set new endIndex based on the clicked pagination anchor element
  var endIndex = currentPageNumber * 10;

  //Show appropriate student-list li given currentPageNumber assigned values to the startIndex and endIndex

//***************************************************************************

  //******* NEEDS TO USE A VARIABLE, RATHER THAN "STUDENT-LIST LI" SO THAT NEW SEARCHES CAN BE PERFORMED
  for(var i = 0; i < endIndex; i++){
    $(".student-list li").eq(i).hide();
      
    //Find student-list elements to display for the clicked pagination anchor
    if(i >= startIndex && i <= endIndex){
      $(".student-list li").eq(i).show();
    }
  }

}

//**** IMMEDIATELY AFTER EACH SEARCH, PAGINATION SHOULD BE CALLED
//Function searches for and returns paginated results for string entered into "input" element by user to match user names and/or emails
function searchStudentElements(){


  //Reset studentListHolder to ready it to cache search results (BUG)
  //$studentList.length is used in another function to determine the number of pages to be displayed
  // studentListHolder = $studentList;
  // $studentlist = "";
  console.log("searchStudentElements is being called");

  //Variable that stores the number of matching search results is set to zero for new count of search result
  var searchResultCount = 0;

  //Get "input" element
  $input = $("input");

  //Get user names
  $userNames = $(".student-details h3");

  //Get emails
  $emails = $("span.email");
 

  //Perform search functionality if "input" element value is NOT empty when search button is clicked
  if($input.val().length !== -1){
    
    // $(".student-list li").hide();
    
    //Display string within "input" element within the console
    console.log($input.val());
    
    //Perform search functionality

  
      //Loop that iterates over all $userNames and $emails
      for(var i = 0; i < studentListSize; i++){
       //****** Does the below line allow the pagination to occur again? Compare with pagination function 
        $(".student-list li").eq(i).hide();
        //Search for matches to entered (sub)string within the "input" element when search button is clicked
        if($userNames.eq(i).text().indexOf($input.val().toLowerCase()) !== -1 || $emails.eq(i).text().indexOf($input.val().toLowerCase()) !== -1){

          //Adds matched by indexOf() $studentlist objects to studentListHolder
          // $studentList += studentListHolder.eq(i);
          
          //Display new student-list in group(s) of 10 with proper pagination
          // ARE SHOWN RESULTS PAGINATED????? NEED A PAGINATION FUNCTION? (TO BE CALLED AFTER THE FOR LOOP)
          $(".student-list li").eq(i).show();
          
          //***** searchResultCount is new studentListSize to be used in new pagination function call
          searchResultCount++;

          //Works properly by showing that searchResultCount updates for each search performed, even on keyup
          console.log(searchResultCount);
        }

      }

  

      // studentListSize = searchResultCount;
      
      //Call pagination function here?
      //Pagination is messed up after search because the function has no name

      // manageClasses();


      //******This needs to be the argument called to populate the page(s) with student-items
      // return $studentList;
      // return searchResultCount;


    }

//If "input" element text is empty, then initial student-list is shown (reset) when search button is clicked
  if($input.val().length === 0){

    // searchResultCount = 0;
    //CURRENTLY DISPLAYS ALL ELEMENTS WITHIN A SINGLE PAGE - PAGINATION IS FAILING FOR FUNCTION CALL ON INPUT RESET
    //Name the initialization function and write that name below... should be it...

    //initializationFunction();
    // manageClasses();

  }

    //Set get text + search function to click handler (done)
    //Use text within "input" element in order to search student-list for matching strings
    //return matching strings as new student-list

  // ?????????  
  //Check if search function has been run before setting the page numbers
    //if search function has been run, then populate student-list with the results of the search function

  //**** Could also run a hide message function if result count is not 0 and call pagination function at the end?
  if(searchResultCount === 0){
    
    //****** Show message - WORKS BUT NEEDS TO BE DETACHED UPON PAGINATION FUNCTION CALL
      
    console.log("THIS IS WHERE THE NO SEARCH RESULTS SHOWN MESSAGE GOES");
    // displayMessage();

  } else{
      //DOES PAGINATION NEED TO BE CALLED HERE IF SEARCH RESULT IS NOT ZERO? LOOKS RIGHT.
      console.log("Call pagination function here");

      studentListSize = searchResultCount;
      initializePages(studentListSize);

      // manageClasses();
      //Needs to be done with CSS SINCE MESSAGE IS NOT A FUNCTION OR COULD DETACH THE DISPLAYMESSAGE() HTML
      // message.hide();
  }
  // return studentListSize;
}

//Assigns a "no search results found" HTML to message variable
function displayMessage(){

  /*** HTML FOR THE "NO SEARCH RESULTS AVAILABLE" MESSAGE, needs ID, function to display message ***/
  message = $(".student-list ul li").append("<div><h2><b>NO SEARCH RESULTS AVAILABLE</b></h2></div>");
  // message.show();

}

initializePages(studentListSize);
  
  //Binds pagination anchor element so that on user click, function manageClasses adds and removes active class on clicked anchor elements



  //***** BINDING IS FAILING FOR SOME REASON
  //Binds search button so that on user click, function searchStudentElements searches through student-list elements for text within student-search input element
// $(".student-search button").click(searchStudentElements);

  // //Bind keyup to student-search input element to fire on keyup action from user while that input element has focus
  // $(".student-search input").keyup(searchStudentElements);


  // $(".student-search input").keyup(initializePages);

  // $(".student-search input").keyup(manageClasses);

// searchStudentElements();
/********

//Bind search button to return and to show proper student results onclick
      //paginate search results
    

  //Sequential pagination divs

    //Create function to add active class to particular pagination div
      //Bind add 'active' class to pagination div onclick
    //Adjust number of pagination divs (li within the ul of the class pagination) for returned results of search 
      //if n results returned with remainder, then show n+1 pagination results with page 1 selected
      //else return n pagination divs with page 1 'active'
      //function to create proper href within each pagination div
      //when made active, navigate to appropriate href from pagination div element

  //Problem - solution is running without syntax error
  //Problem - comments are descriptive and helpful to other developers and viewers
  //Problem - app is cross browser compatible

  //Problem - use simple animations when transitioning between pages or student results listings (use jQuery plugin called aminisition: https://teamtreehouse.com/library/using-jquery-plugins/introducing-jquery-plugins/adding-a-plugin-to-a-web-page)
  //Problem - if there are no search results to return, then display a message within the HTML to let the user know there are no matches

    //Use formula to display correct student elements (as enterted into a student object) on each page

********/
