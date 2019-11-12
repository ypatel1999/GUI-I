/*
 * Author: Yash Patel
 * Email: yash_patel2@student.uml.edu
 * File: script.js
 *
 * Description:
 *  Assignmnet #6 -- Creating an Interactive Dynamic Table
 *  This javascript file contains a funcation that takes 4 values
 *  and generates a multiplicationt table and append to the webpage.
 */



/*
 * Creates a multiplication table with the given values. 
 * 
 * @param {number} multiplerMin     Smallest value of Multipler
 * @param {number} multiplerMax     Highest value of Multipler
 * @param {number} MultiplicandMin  Smallest value of Multiplicand
 * @param {number} MultiplicandMax  Highest value of MultMultiplicandipler
 *
 * @return {HTMLTable} A HTMLTable that has all the values filled out
 */
function createTable(multiplerMin, multiplerMax, multiplicandMin, multiplicandMax){
  var table = document.createElement('table');
  table.id = 'table';
  var rowDescription = true;
  var columnDescription = true;
  
  for(var row = multiplicandMin - 1; row <= multiplicandMax; row++) //keeps track of the rows of the table
  {
    var tableRow = document.createElement('tr'); 
    
    for(var col = multiplerMin - 1; col <= multiplerMax; col++) //keeps track of the columns of the table
    {
      var cell;
      var text;
      
      if(rowDescription) //checks to see if the cell needs a row description cell or value cell
      {
        cell = document.createElement('th');
        if(!columnDescription)
        {
          text = document.createTextNode(col);
          cell.appendChild(text);
        }
      }
      else 
      {
        if(columnDescription) //checks to see if the cell needs a col description cell or value cell
        {
          cell = document.createElement('th');
          text = document.createTextNode(row);
          cell.appendChild(text);
        }
        else //creates the cell with the multiplication value of the row * col
        {
          cell = document.createElement('td');
          text = document.createTextNode(row * col); 
          cell.appendChild(text);
        }
      }
      
      tableRow.appendChild(cell); //adds the cell to the row
      columnDescription = false; 
    }
    table.appendChild(tableRow); //add the row to the table
    rowDescription = false;
    columnDescription = true;
  }
  
  return table;
}

/*
 * Checks if the user entered in correct values and
 * then calls the createTable function, and appends 
 * the return table to the html webpage
 *
 * This function get called when the user presses the submit 
 * button on the form
 *
 */
function validate()
{  
    document.getElementById("table").innerHTML = "";
    multipler_Min = parseInt(document.getElementById("multiplier_1").value,10);
    multipler_Max = parseInt(document.getElementById("multiplier_2").value,10);
    multiplicand_Min = parseInt(document.getElementById("multiplicand_1").value,10);
    multiplicand_Max = parseInt(document.getElementById("multiplicand_2").value,10);
    
    if(multipler_Min > multipler_Max) //swap the values if user did not enter in numberically order
    {
        multipler_Max = [multipler_Min, multipler_Min = multipler_Max][0];
    }
    
    if(multiplicand_Min > multiplicand_Max) //swap the values if user did not enter in numberically order
    {
        multiplicand_Max = [multiplicand_Min, multiplicand_Min = multiplicand_Max][0];
    }
    
    if(Math.abs(multipler_Max-multipler_Min) >= 50 || Math.abs(multiplicand_Max-multiplicand_Min) >= 50) //check if the range of values if greater than or equal to 15
    {
        alert("Range is too big");
        return;
    }
    
    document.getElementById("table").appendChild(createTable(multipler_Min, multipler_Max, multiplicand_Min, multiplicand_Max)); //append the table to the webpage
}
