/*
 * Author: Yash Patel
 * Email: yash_patel2@student.uml.edu
 * File: script.js
 *
 * Description:
 *  Assignmnet #7 -- Using the jQuery Validation Plugin with Your Dynamic Table
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
function createTable(){
  document.getElementById("table").innerHTML = "";
  var table = document.createElement('table');
  table.id = 'table';
  var rowDescription = true;
  var columnDescription = true;
  var multiplerMin = document.getElementById('multiplier_1').value;
  var multiplerMax = document.getElementById('multiplier_2').value;
  var multiplicandMin = document.getElementById('multiplicand_1').value;
  var multiplicandMax = document.getElementById('multiplicand_2').value;
  
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
  
  document.getElementById("table").appendChild(table);
}


