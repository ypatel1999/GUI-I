/*
 * Author: Yash Patel
 * Email: yash_patel2@student.uml.edu
 * File: script.js
 *
 * Description:
 *  Assignment No. 9 -- Implementing a Bit of Scrabble with Drag-and-Drop
 *  This javascript file adds the functionality to the webpage needed for scrabble.
 *
 * Source:
 * 1. https://jqueryui.com/draggable/
 * 2. https://stackoverflow.com/questions/6930777/jquery-ui-draggable-snapping-to-a-grid
 */

var boardLetters = []; //array to store letters placed on the board
var rackLetters = [];  //array to store letters that are randomly selected
var currentScore = 0; 
var totalScore = 0;
var currentWord = "";

const tiles_count = 7;
//Table to store the dispution of the letters and the point values
const TILES = [ 
  { "letter": "A", "count": 9, "value": 1 },
    { "letter": "B", "count": 2, "value": 3 },
    { "letter": "C", "count": 2, "value": 3 },
    { "letter": "D", "count": 4, "value": 2 },
    { "letter": "E", "count": 12, "value": 1 },
    { "letter": "F", "count": 2, "value": 4 },
    { "letter": "G", "count": 3, "value": 2 },
    { "letter": "H", "count": 2, "value": 4 },
    { "letter": "I", "count": 9, "value": 1 },
    { "letter": "J", "count": 1, "value": 8 },
    { "letter": "K", "count": 1, "value": 5 },
    { "letter": "L", "count": 4, "value": 1 },
    { "letter": "M", "count": 2, "value": 3 },
    { "letter": "N", "count": 6, "value": 1 },
    { "letter": "O", "count": 8, "value": 1 },
    { "letter": "P", "count": 2, "value": 3 },
    { "letter": "Q", "count": 1, "value": 10 },
    { "letter": "R", "count": 6, "value": 1 },
    { "letter": "S", "count": 4, "value": 1 },
    { "letter": "T", "count": 6, "value": 1 },
    { "letter": "U", "count": 4, "value": 1 },
    { "letter": "V", "count": 2, "value": 4 },
    { "letter": "W", "count": 2, "value": 4 },
    { "letter": "X", "count": 1, "value": 8 },
    { "letter": "Y", "count": 2, "value": 4 },
    { "letter": "Z", "count": 1, "value": 10 },
    { "letter": "_", "count": 2, "value": 0 }
]

//Clear the board of all letters
function clearLetter(){
    for(var i = 0; i < boardLetters.length; i++){
        boardLetters[i].letter_id = "";
    }
}

//Reset the current word information and re-fill the rack up to 7 letters
function resetWord() {
    clearLetter();

    $(".rack").empty();

    document.getElementById('current-word').innerHTML = "Current Word: ";
    document.getElementById('word-score').innerHTML = "Current Score: 0";
    
    board_tiles();
    drag_and_drop();
}

//Gives the letter tiles the drag and drop functionality
function drag_and_drop() {
    $(".board-tile").droppable({
        accept: '.tile',
        
        //Add the letter being dropped to the boardLetters array and remove it from 
        //the rackLetters array
        drop: function(event, ui) {
            var letter = $(ui.draggable).attr('id');
            var element_id = $(this).attr('id');
            var index = element_id[0];
            
            boardLetters[index].letter_id = letter;
            for(var i = 0; i < rackLetters.length; i++)
            {
                if(rackLetters[i] == letter[5])
                {
                    rackLetters[i] = null;
                    break;
                }
            }
            
            if(letter[5] == "_")
            {
                var replace = prompt("What letter would you like to use");
                boardLetters[index].letter_id = "tile-" + replace;
            }
          
            calculate_score();
        },
        
        //Add the letter being dropped to the rackLetters array and remove it from 
        //the boardLetters array
        out: function(event, ui) {
            var letter = ui.draggable.attr('id');
            var drop_id = $(this).attr('id');
            var index = drop_id[0];
            
            if (letter == boardLetters[index].letter_id) {
                boardLetters[index].letter_id = "";
            }
            
            for(var i = 0; i < rackLetters.length; i++)
            {
                if(rackLetters[i] == null)
                {
                    rackLetters[i] = letter[5];
                    break;
                }
            }
            
            calculate_score();
        }
    });
    
    $(".rack").droppable({
        accept: '.tile',
        
        drop: function(event, ui) {
            console.log('something was dropped back into the rack');
        },
        
        out: function(event, ui) {
            console.log('some was dragged out of the drop zone.');
        }
    });
    
    $(".tile").draggable({
        snap: ".board-tile, .rack",
        snapMode: "outer, inner",
        revert: "invalid"
    });
}

//Add the images of the board tiles to the html file
function board() {
    var board = document.getElementById('board');
    
    for(var i = 0; i < tiles_count; i++) {
        var id;
        var file;
        var image = document.createElement('img');
        
        if(i == 1 || i == 5){
            file = 'images/Board/double_word.jpg';
            id = 'double';
        }
        else {
            file = 'images/Board/blank_board.jpg';
            id = 'blank';
        }
        
        image.id = i + '-' + id;
        image.src = file;
        image.className = 'board-tile';
        
        boardLetters[i] = {
            'type': id,
            'letter_id': '',
            'img_id': image.id
        }
        
        board.appendChild(image);
    }
}

//Fill up the rack with 7 randomly selected letters
function board_tiles(){
    for(var i = 0; i < tiles_count; i++){
        var random = Math.floor(Math.random() * 27);
        var letter = TILES[random].letter;
        if(rackLetters[i] == null)
        {
            if(TILES[random].count > 0)
            {
                $(".rack").append('<img class="tile" id="tile-' + letter + '"src="images/Letters/Scrabble_Tile_' + letter + '.jpg">')
                rackLetters[i] = letter;
                TILES[random].count--;
            }
            else
            {
                i--;
            }
        }
        else
        {
            $(".rack").append('<img class="tile" id="tile-' + rackLetters[i] + '"src="images/Letters/Scrabble_Tile_' + rackLetters[i] + '.jpg">');
        }
            
    }
    
    var remainingLetters = 0;
    for(var i = 0; i < TILES.length; i++)
    {
        remainingLetters += TILES[i].count;
    }
    
    document.getElementById('remaining').innerHTML = "Remaining Letters: " + remainingLetters;
}

//Calculate the score of the current word on the board with the
//double space taken into account
function calculate_score(){
    currentScore = 0;
    currentWord = "";
    
    for(var i = 0; i < boardLetters.length; i++) {
        for(var j = 0; j < TILES.length; j++) {
            var multiplier = 1;
            
            if (boardLetters[i].letter_id != "" && (boardLetters[i].letter_id[5] == TILES[j].letter)) {
                currentWord += boardLetters[i].letter_id[5];
                
                if(boardLetters[i].type.includes('double')){
                    multiplier = 2;
                }
                
                currentScore += (TILES[j].value * multiplier);
            }
        }
    }
    
    document.getElementById('word-score').innerHTML = "Word Score: " + currentScore;
    document.getElementById('current-word').innerHTML = "Current Word: " + currentWord;
    return currentScore;
}

//Check if the word length if greater than 2 and update the information for the user
function updateSubmit() {
    
    var length = 0;
    
    for(var i = 0; i < boardLetters.length; i++) {
        if(boardLetters[i].letter_id != ""){
            length++
        }
    }
    
    if(length < 2){
        alert('You need to play at least two letters in order to submit a valid word for scoring! The current world length is ' + length + ' letters.');
        return false;
    }
    
    document.getElementById("last-word").innerHTML = "Last Word: " + currentWord;
    totalScore += calculate_score();
    document.getElementById("total-score").innerHTML = "Total Score: " + totalScore;
    resetWord();
}  

//When the document is ready, create the board, select the tiles, and add click listener
$(document).ready(function() {
    board();
    board_tiles();
    drag_and_drop();
    
    $("#startOver").click(function() {
        location.reload();
    });
    
    $("#submit").click(function () {
        updateSubmit();
    });
});

   

    

