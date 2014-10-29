/* 
Eamon Lightning
eamon_lightning@student.uml.edu
Sound Recording Technology major; Computer Science minor.
Created on October 22, 2014

This javascript file is part of a single page web application 
that constructs multiplication tables dynamically. This file
is responsible for all html form validation, and dynamic construction
of the multiplication tables. 
*/

$(document).ready(function() { 
  $("form").submit(function() {
    
    var error = 0;
    var errorLocation = [];
    var errorMessage = "";
    var i;

    //Converts character input to number values. 
    var rowmin = Number(this.rowmin.value);
    var rowmax = Number(this.rowmax.value);
    var colmin = Number(this.colmin.value);
    var colmax = Number(this.colmax.value);

    /* Tests for valid input. The first conidition tests if the parameter
    submitted was an integer. The second tests if a feild was left blank. 
    If an integer is not submitted, or if a feild is left blank, an error
    message is returned. The Number() function converts an empty feild to
    zero, so on its own the first condition would be unreliable. However,
    the parseInt() function allows for silly submissions combining letters
    and numbers, so on its own, the second condition would also be unreliable.
    It is necessary to combine the two for optimal error-testing. */
    if (rowmin % 1 !== 0 || isNaN(parseInt(this.rowmin.value))) {
      errorLocation[errorLocation.length] = " Row Min";
      error++;
    }
    if (rowmax % 1 !== 0 || isNaN(parseInt(this.rowmax.value))) {
      errorLocation[errorLocation.length] = " Row Max";
      error++;
    }
    if (colmin % 1 !== 0 || isNaN(parseInt(this.colmin.value))) {
      errorLocation[errorLocation.length] = " Column Min";
      error++;
    }
    if (colmax % 1 !== 0 || isNaN(parseInt(this.colmax.value))) {
      errorLocation[errorLocation.length] = " Column Max";
      error++;
    }

    if (error) {

      /* Hides a previously rendered table in the case of a new erroneous
      submission, so that the error message may be clearly displayed. */
      $("#table").css({"display": "none"});
      
      errorMessage = "<p>- ";

      /* If there is only one error, a message is printed (singular). */
      if (error == 1) {
        errorMessage += errorLocation[0] + " entry is invalid. Please enter an integer. </p>";
      }

      /* If there are multiple errors, a message is printed (plural). */
      else {
        for (i = 0; i < (errorLocation.length) - 1; i++) {
          errorMessage += errorLocation[i] + ",";
        }
        errorMessage += " and " + errorLocation[i] + " entries are invalid. Please enter integers. </p>"
      }

      /* The error message is added to the DOM, and displayed. */
      $("#feedback").html(errorMessage);
      $("#feedback").css({"display": "initial"});
      return;
    }  

    error = 0;

    /* Tests for valid numerical relationships. Both rowmin and column
    min must be less than or equal to their corresponding max. */
    if (rowmin > rowmax)  {
      $("#feedback").html("<p> - Row Min must be less than or equal to Row Max. </p>" );
      error = 1;
    } 
    if (colmin > colmax)  {
      $("#feedback").html("<p> - Column Min must be less than or equal to Column Max. </p>" );
      error = 1;
    } 
    if (error) {

      /* The error message is added to the DOM, and displayed. */
      $("#table").css({"display": "none"});
      $("#feedback").css({"display": "initial"});
      return;
    } 

    //Builds table
    var topRow = [];
    var leftCol = [];
    var table;
    var j;

    /* Constructs two arrays. One holds the multipliers, the other
    holds the multiplicands. */
    for (i = colmin; i <= colmax; i++) topRow[topRow.length] = i;
    for (i = rowmin; i <= rowmax; i++) leftCol[leftCol.length] = i;

    /* Constructs the first row, which are table headers. The <th>
    elements are given the class "frame" so that they may be styled
    in a way to differentiate them from the body of the table. */
    table = "<table> <tr> <th> </th>";
    for (i = 0; i < topRow.length; i++) {
      table += "<th class=\"frame\">" + topRow[i] + "</th>";
    }
    table += "</tr>"

    /* Constructs the body of the table. The first <td> elements in
    each row are given the class "frame" so that they may be styled
    in a way to differentiate them from the body of the table. All
    other <td> elements are given the class "cell", so that the mouseover
    event below works only the body of the table- not the leftmost column.
    This nested loop multiplies each number in left column by each number
    in the top row whose result is placed in a <td> element. */
    for (i = 0; i < leftCol.length; i++) {
      table += "<tr>" + "<td class=\"frame\">" + leftCol[i] + "</td>";
      for (j = 0; j < topRow.length; j++) {
        table += "<td class=\"cell\">" + (topRow[j] * leftCol[i]) + "</td>";
      }
      table += "</tr>";
    }

    table += "</table>";

    /* Hides any previously displayed error message, adds the newly
    constructed table to the DOM, and displays it. */ 
    $("#feedback").css({"display": "none"})
    $("#table").css({"display": "initial"});
    $("#table").html(table);
    
  });

  /* This mouseover event is used to display which row and column
  a product belongs to. The fuction finds the first child of the parent 
  of the <td> element being "moused over". This first child is the row
  in which the product belongs. Then, using simple algebra, I deduce which 
  column the product belongs to and print the enitre expression to the
  screen. This is especially helpful if the user builds a very large table
  and can no longer see the multipliers or multiplicands of the table. */
  $(document).on("mouseover", ".cell", function() {
    var rowElements = this.parentNode.getElementsByTagName("td");
    var rowNum = rowElements[0].innerHTML;
    var colNum = this.innerHTML / rowNum;
    var calcMessage = "<p>" + rowNum + " x " + colNum + " = " + this.innerHTML + "</p>";
    $("#calc").html(calcMessage);
  }); 

});