/* ** MAKE PAGINATION METHOD SO THAT IT CAN BE CALLED AFTER SEARCHES AND AFTER KEYUP SEARCHES ** */

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

  //Bind keyup to student-search input element to fire on keyup action from user while that input element has focus
  //Works but pagination isn't working - isn't making first element active properly
  $(".student-search input").keyup(searchStudentElements);


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
  
  $(".pagination").detach();

  $(".student-list").append('<div class="pagination"><ul></ul></div>');

  $pageUl = $(".pagination ul");

    for (var j = 0; j < totalPageLinks; j++) {
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

// *********** ISSUE IS HERE!!!!!!! WHY DOES COMMENETING THIS OUT WORK???????
/***

      //Hide all student-list list item elements per page  
      for (var j = 0; j < studentListSize; j++){
        $(".student-list li").eq(j).hide();
      }

      //Show 10 relevant student-list list item elements per page
      for (var i = 0; i < 10; i++){
        $(".student-list li").eq(i).show();
      }
    
***/
    }
    
    $(".pagination a").click(manageClasses);

    //
    // manageClasses();

    studentListSize = $studentList.children().length;

}


//****************************************** - SIMPLY NEED TO ADD PAGINATION TO SEARCH RESULTS

//RENAME THIS FUNCTION AS CREATEPAGINATIONELEMENTS, OR AS SOMETHING MORE SPECIFIC
function manageClasses (){
   
  console.log("manageClasses is being called");
   
  //Maybe add first page here?
  $(".pagination a").removeClass("active");
  $(this).addClass("active");

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

  // ************************************************************************

  console.log("searchStudentElements is being called");

  //Variable that stores the number of matching search results is set to zero for new count of search result
  var searchResultCount = 0;

  //Get "input" element
  $input = $("input");

  //Get user names
  $userNames = $(".student-details h3");

  //Get emails
  $emails = $("span.email");
 

    //Display string within "input" element within the console
    console.log($input.val());
    
    //Perform search functionality

      for(var i = 0; i < $studentList.children().length; i++){
       //****** Does the below line allow the pagination to occur again? Compare with pagination function 
        $(".student-list li").eq(i).hide();
        //Search for matches to entered (sub)string within the "input" element when search button is clicked
        if($userNames.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1 || $emails.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1){

          $(".student-list li").eq(i).show();
          
          //***** searchResultCount is new studentListSize to be used in new pagination function call
          searchResultCount++;

          //Works properly by showing that searchResultCount updates for each search performed, even on keyup
          console.log("Search result count is " + searchResultCount);
        }

      }

//If "input" element text is empty, then initial student-list is shown (reset) when search button is clicked
  if($input.val().length === 0){

    //Manage this fringe case

  }

  //**** Could also run a hide message function if result count is not 0 and call pagination function at the end?
  if(searchResultCount === 0){
    
    //****** Show message - WORKS BUT NEEDS TO BE DETACHED UPON PAGINATION FUNCTION CALL
    // $(".student-list li").hide();  
    console.log("THIS IS WHERE THE NO SEARCH RESULTS SHOWN MESSAGE GOES");
    displayMessage();

  } else{
      //DOES PAGINATION NEED TO BE CALLED HERE IF SEARCH RESULT IS NOT ZERO? LOOKS RIGHT.
      console.log("Call pagination function here");
      $("student-list").remove("#shownMessage");

      studentListSize = searchResultCount;
      initializePages(studentListSize);

      // manageClasses();
     
  }
  return studentListSize;
}


//Appends a "no search results available" message to what should be an empty student list
function displayMessage(){

  $(".student-list").append("<div id = 'shownMessage'><h2><b>NO SEARCH RESULTS AVAILABLE</b></h2></div>");

}

initializePages(studentListSize);
  


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
