/****** MAKE SURE TO ADD COMMENTS TO ALL FUNCTIONS AND COMPLEX PARTS OF THE APP *********/
/****** MAKE SURE TO TEST APP IN AT LEAST 3 DIFFERENT BROWSERS *********/

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


//Variable that stores the student-list within the HTML of index.html
var $studentList = $(".student-list");

//Variable that stores search results that are to be displayed after search function is run
var studentListHolder;

//Variable that stores the number of list-items within the unordered-list with the class student-list
var studentListSize = $studentList.children().length;

//Initial page number, updated when page index number is changed when user clicks a different pagination anchor
var lastPageNumber;

//Current page number determined by default state of page loading or what user has selected by clicking pagination anchor
var currentPageNumber = 1;

//Variable used to store "input" element's text, to be updated in later function(s) to capture user text input
var $input;

//Variable that stores the number of matching search results 
var searchResultCount;

//Adds search input and search button to page-header class
$(function() {

  $(".page-header").append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button>");

});

//Initialize page with appropriate number of pagenation elements and add the class "active" to the first anchor element
//*********** NAME THIS FUNCTION SO THAT IT CAN BE CALLED IN THE CASE THAT THE USER DELETES TEXT FROM "INPUT" ELEMENT
  //Maybe bind function to onload to initialize and then to also be available to be called by name to reset pages

//$(function (totalPageLinks, $listItem, $pageLink) {
// function initializePages (totalPageLinks, $listItem, $pageLink){}

$(function (totalPageLinks, $listItem, $pageLink) {

  //DOES THIS LINE OF CODE NEED TO BE OUTSIDE OF THIS FUNCTION?
  $(".student-list").append('<div class="pagination"><ul></ul></div>');

  //Calculate the number of pagination elements needed to contain the total number 10 student-list item groups
  totalPageLinks = Math.ceil(studentListSize/10);

  //Initializes all pagination anchor elements
  for (var j = 0; j < totalPageLinks; j++) {
      $pageUl = $(".pagination ul");
      $listItem = $("<li></li>");
      $pageLink = $('<a href="#">' + (j+1) + '</a>');

      $listItem.appendTo($pageUl);
      $pageLink.appendTo($listItem);

    }

   //addClass "active" to the first pagination anchor element
   $(".pagination a").eq(0).addClass("active");

    //************** REMOVE THE NEXT IF STATEMENT? *******************
    //Show appropriate number of first set of student-list elements when student-list is small (redundant)
    if(($studentList.children().length) < 10){
      $(".student-list li").show();
    } else {

      //Hide all student-list list item elements per page  
      for (var j = 0; j < studentListSize; j++){
        $(".student-list li").eq(j).hide();
      }

      //Show 10 relevant student-list list item elements per page
      for (var i = 0; i < 10; i++){
        $(".student-list li").eq(i).show();
      }
    }

/********** BINDING OF HANDLER EVENTS TO PAGE ELEMENTS **********/

  //On click, function manageClasses adds and removes active class on clicked anchor elements
  $(".pagination a").click(manageClasses);

  //Bind keyup to student-search input element to fire on keyup action from user while that input element has focus
    //The binding of this handler does work with the code below
  // $(".student-search input").keyup(searchStudentElements);

  //On click, function searchStudentElements searches through student-list elements using text within student-search input element
    //Also needs to be activated when user presses enter? (focus/blur? or submit?)
  $(".student-search button").click(searchStudentElements);

});


//*************************************************************************
function manageClasses (){
   

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
  for(var i = 0; i < endIndex; i++){
    $(".student-list li").eq(i).hide();
      
    //Find student-list elements to display for the clicked pagination anchor
    if(i >= startIndex && i <= endIndex){
      $(".student-list li").eq(i).show();
    }
  }
}

//Function searches for and returns paginated results for string entered into "input" element by user to match user names and/or emails
function searchStudentElements(){

  //Search button fires on click
  //Input element text fires and is stored within "$input" variable

  //This is for dynamic search - start with search on click of .student-search button element
  // var keyPressed = $(this).val();

  //Get text from student-search input element to be used to search strings within student-list elements
  // currentPageNumber = parseInt($(this).text());

  //Reset studentListHolder to ready it to cache search results (BUG)
  // studentListHolder = $studentList;
  // $studentlist = "";

  //Variable that stores the number of matching search results is set to zero for new count of search result
  var searchResultCount = 0;

  //Get text from "input" element
  $input = $("input");
 

  //Perform search functionality if "input" element is NOT empty when search button is clicked
  if($input.val().length !== -1){
    
    $(".student-list li").hide();
    console.log($input.val());
    //Perform search functionality

    //
    // string???.toLowerCase().match();
    
    //Search by name using full or partial strings
      //Select user names
    $userNames = $(".student-details h3");
       
       //Outputs user name texts without spaces between last name and first name of next user
    //     //Convert toLowerCase(): str.toLowerCase();
    //     //Perform search - if NOT each() match() hide() element eq() and return student-list
    //     string???.toLowerCase().match();

      //Search by email using full or partial strings
        //Get email: "span .email"
    $emails = $("span.email");

        //Outputs email text without spaces - can make more specific selectors? or use diff func?
        //DISPLAYS THE THIRD EMAIL! WOOOOO!!!!!!!!
        // console.log($emails.eq(2).text());
        
  
        

      //Loop that iterates over all $userNames and $emails
      for(var i = 0; i < studentListSize; i++){
        
        //Search for matches to entered (sub)string within the "input" element when search button is clicked
        if($userNames.eq(i).text().indexOf($input.val().toLowerCase()) !== -1 || $emails.eq(i).text().indexOf($input.val().toLowerCase()) !== -1){

          //Adds matched by indexOf() $studentlist objects to studentListHolder
          // $studentList += studentListHolder.eq(i);
          
          //Display new student-list in group(s) of 10 with proper pagination
          // ARE SHOWN RESULTS PAGINATED????? NEED A PAGINATION FUNCTION? (TO BE CALLED AFTER THE FOR LOOP)
          $(".student-list li").eq(i).show();
          searchResultCount++;

          // studentListHolder += $emails.eq(i);
          // console.log($emails.eq(i).text());

          // console.log($userNames.eq(i).text());
          // console.log($emails.eq(i).text());
        }

      }

      //Call pagination function here?


        //add parent (of parent) element of matching userName or email to student-list

        //Convert toLowerCase(): str.toLowerCase();
        //Insert space after each email address ends (after ".com" string)
        //Perform search - if NOT each() match() hide() element eq() and return updated student-list, or 
          //call initialization function with arguement of studentListHolder ?

        //BONUS - objects should dyanmically match search "input" text when onKeyUp fires

      //******This needs to be the argument called to populate the page(s) with student-items
      // return $studentList;

    }

//If "input" element text is empty, then initial student-list is shown (reset) when search button is clicked
  if($input.val().length === 0){

    //CURRENTLY DISPLAYS ALL ELEMENTS WITHIN A SINGLE PAGE - PAGINATION IS FAILING FOR FUNCTION CALL ON INPUT RESET
    //Name the initialization function and write that name below... should be it...

    //initializationFunction();
    manageClasses();

  }

    //Set get text + search function to click handler (done)
    //Use text within "input" element in order to search student-list for matching strings
    //return matching strings as new student-list

  

  /*********** BELOW IS FOR DYANMIC SEARCH FUNCTIONALITY ************/

  //Check if search function has been run before setting the page numbers
    //if search function has been run, then populate student-list with the results of the search function

  //Perform search of student-list elements and reset "student-list" variable to store or to return search results

  //Run search using keyup() function that is binded to the search text input element "on.keyup()"

  if(searchResultCount === 0){
    //Show message

  } else{
      console.log("Call pagination function here");
  }

};



/*

//Use focus method since form element can be reached by keyboard and by mouse
// var inputTextField = $(".place-holder").text().val(); //returns "Search for students..."

// //IS THIS NECESSARY?
// $("input").focus(function(){

//   //reset on focus
//   $(this).val() = "";

//       //Bind student-search with eventListener onclick that resets the text within the 'student-search input'
     
//       //set text back after focus (off-focus?) if focus is gone
//       //otherwise, display the class ".place-holder" input text of "Search for students..."
// });



// //program text interactions within input like what happens on focus or click, after search is performed, etc.
  //h3 text within student-list
//select button properly

  //var searchResults = [];

  //return 
});






var $studentListItem = $("<li></li>");
$(".ul").each(studentListLength???).append($studentListItem);

//create 'a' within 'li'
var $studentAnchor = $("<a></a>");
$(".li").each(studentListLength???).append($studentAnchor);

//append 'href = #' to 'a' with proper page number LOGIC FOR PAGE NUMBER IS CURRENTLY THAT ALL PAGES GET SAME NUMBER

for(var i = 0; pages < 0; i++){

  $(".a").each().append('href = #'+ currentPageNumber);
}


function getPagenation() {
  //append conditional url text to 'href' and addClass 'active' to page 1, converted list length formula to string

};

function setPagenation() {

//Set the first page anchor on the page

//use document.createTextNode(n) where n in the proper page number
//use totalPageNumber(), the number of pages to create, in order to create a loop of appropriate text nodes to append to the appropriate hrefs within the anchors within the 'li's within the ul within the div
//Select text within each href and replace it with variable, for loop that uses each() and innerHTML and/or attr()?

//Make this bit correct based on http://api.jquery.com/attr/
var addHref = $( ".pagenation ul li a" ).each("a").attr( "href" ); //correct use of each() method?
$(".pagenation ul li a").text(addHref);


//number of 'li' within the 'ul', so loop through 'ul' with particular formula, assume n = total number of students
//Limit ul of student-list displayed per page to 10, bind to click of pagination and onload of screen for first ten students
      //Hide all but first 10 when first page loads
      //if length < 10, display all (probably unnecessary with well written looping logic)
      //if page n and n!=1, display 11-20, unless students less than 20 then display all - simplify - while list.length is less than displayCache display student objects '(page number * 10 )- 10')
    //Display remainder of students on final page, lastChild?
    //add selector ".student-item:last-child" to the final displayed element of the list (loop through all except last 1 if student list length is greater than 1, else add selector of last child to first li)
};




//Display up to 10 students for a particular 'active' pagination element on click of pagination link
$(accessStudentObject???).each(function(){


});

//Bind search button to return and to show proper student results onclick
$("button").click(function(){
    
    //Make sure "Susan" also searches for and returns "susan"
    //Hide not matching search options
      //paginate search results
    //BONUS - autocomplete search while user types with student firstName or lastName, As the user types in the search box, dynamically filter the student listings. In other words, after each letter is typed into the search box, display any listings that match .

});



$('.student-search').bind('input', function(e) {

  
    
    //Make sure "Susan" also searches for and returns "susan"
    //Hide not matching search options
      //paginate search results
    //BONUS - autocomplete search while user types with student firstName or lastName, As the user types in the search box, dynamically filter the student listings. In other words, after each letter is typed into the search box, display any listings that match .
};



    

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
    //Loop through remaining results if there is a remainder after the list of students is divided by 10
    //use modulus "%" to get the number of remaining elements to display on the final page, unless that number is zero (for loop to create div elements for pagination and with hrefs)
********/
