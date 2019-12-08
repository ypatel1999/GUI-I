/*
 * Author: Yash Patel
 * Email: yash_patel2@student.uml.edu
 * File: validation.js
 *
 * Description:
 *  Assignment #8 -- Using the jQuery UI Slider and Tab Widgets
 *  This javascript file conatins the jquery code to validate the user input,
 *  create a new tab with the table on it, remove a single or mulitple tabs,
 *  and dynamically update a tab
 *
 *
 * Source:
 * https://stackoverflow.com/questions/15060292/a-simple-jquery-form-validation-script
 * https://stackoverflow.com/questions/6545964/jquery-validation-error-placement
 * https://api.jqueryui.com/slider/
 * https://api.jqueryui.com/tabs/
 */
   
/*
 * Main function
 *
 * Contains all the functions that perform specific to make
 * all of the buttons and generation work.
 *
 */

var main = (function() {

    var tabs = $('#tabs').tabs();
    var tabHandles = tabs.find('ul');
    var tabCount = 0;
    
    var init = function() {
        // Function to compare the values in the input box
        $.validator.addMethod("compare", function (value, element, param) {
            return parseInt(value, 10) >= parseInt($(param).val(), 10);
        });
        
        // Defines validation rules 
        $('form').validate({
            // Define restrictions on form inputs.
            rules: {
              multiplier_1: {
                  required: true,
                  number: true,
              },
              multiplier_2: {
                  required: true,
                  number: true,
                  compare: "#multiplier_1"
              },
              multiplicand_1: {
                  required: true,
                  number: true,
              },
              multiplicand_2: {
                  required: true,
                  number: true,
                  compare: "#multiplicand_1"
              }
            },
            
            // Error messages for all non-custom form restrictions.
            messages: {
              multiplier_1: {
                required: "This is a required field!",
                number: "Enter an integer for the lower bound value."
              },
              multiplier_2: {
                required: "This is a required field!",
                number: "Enter an integer for the upper boundvalue.",
                compare: "You need to enter a value greater than lower bound."
              },
              multiplicand_1: {
                required: "This is a required field!",
                number: "Enter an integer for the lower bound value."
              },
              multiplicand_2: {
                required: "This is a required field!",
                number: "Enter an integer for the upper bound value.",
                compare: "You need to enter a value greater than lower bound."
              }
            },
            
            // If validation passes, create a new tab with table in it
            submitHandler: function(form, event) {
                createNewTab(form);
            }
            
        });
        
        //Dynamiclly update the active tab
        $('input[type="number"]').on('input', function(event) {
            $(this).siblings('.slider').slider('value', $(this).val());
            if( form.elements['dynamic'].checked) {
                updateTab($(this).closest("form")[0]);
            }
        });
        
        //Define the attributes of the slider
        $('.slider').slider({
            value: 0,
            min: -100,
            max: 100,
            slide: function(event, ui) {
                $(this).siblings('input').val(ui.value);
                $(this).siblings('input').valid();
            },
            change: function(event, ui) {
                var form = $(this).closest("form")[0];
                if( form.elements['dynamic'].checked ) {
                    updateTab(form);
                }
            }
        });
    };
    
    //Remove the active tab
    $('#removeCurrent').on('click', function() {
        //Get the tab handle to remove
        var tabHandlesList = tabHandles.find('li');
        var active = tabs.tabs('option', 'active')
        var li = tabHandlesList.eq(active);
        var index = li.index();
        //Use the tab handles href as a selector to remove content
        $(li.find('a').attr('href')).remove();
        //remove the table handle
        li.remove();
        tabs.tabs('refresh');
        var remaining = tabHandles.find('li').length;
        if( active === index ){
            if(remaining <= index ) {
                index = remaining-1;
            }
            tabs.tabs('option', 'active', index);
        }
    });
    
    //Remove all of the tabs
    $('#removeAllTabs').on( 'click', function() {
        tabHandles.empty();
        tabs.find(":not(:first-child)").remove();
        tabs.tabs('refresh');
    });
    
    //Removes tabs right of active tab
    $('#removeTabsRight').on( 'click', function() {
        var active = tabs.tabs('option', 'active');
        var numTabs = tabHandles.find('li').length;
        if( active == numTabs-1 ) {
            alert('No tabs to the right exist');
        } else {
            removeTabsToSide(active, true);
        }
    });
    
    //Removes the tabs left of active tab
    $('#removeTabsLeft').on( 'click', function() {
        var active = tabs.tabs('option', 'active');
        if( active == 0 ) {
            alert('No tabs to the left exist');
        } else {
            removeTabsToSide(active, false);
        }
    });

    //Helper function that does the actually removal of tabs
    var removeTabsToSide = function(index, toRight) {
        var tabHandlesList = tabHandles.find('li');
        var end = index;
        var start = 0;
        if( toRight ) {
            end = tabHandlesList.length;
            start = index+1;
        }
        for( var i = start; i < end; i++ ) {
            var li = tabHandlesList.eq(i);
            
            $(li.find('a').attr('href')).remove();

            li.remove();
        }
        tabs.tabs('refresh');
    }
    
    //Update the tab if it already exists
    var updateTab = function(form){
        var active = tabs.tabs('option', 'active');
        if(active) {    //If a tab has not been created, create a new tab
            createNewTab(form);
        } else {    //update the the tab handle and table on current tab
            var tabHandle = tabHandles.find('li').eq(active);
            var titleText =
                '(' + form.elements['multiplier_1'].value +
                ' , ' + form.elements['multiplier_2'].value +
                ') x (' + form.elements['multiplicand_1'].value +
                ' , ' + form.elements['multiplicand_2'].value + ')';
        
            tabHandle.find('a')[0].innerHTML = titleText;
            
            $($(tabHandle.find('a').attr('href'))[0]).empty();
            $(tabHandle.find('a').attr('href'))[0].appendChild( createTable());
            tabs.tabs('refresh');
        }
        
    }
    
    //Create a brand new tab
    var createNewTab = function(form) {
        //Give the tab a new id
        var tabID = "tab-" + tabCount;
        tabCount++;
        
        //Add the tab to the handle
        var li = document.createElement('li');
        li.id = "handle-" + tabID;
        var a = document.createElement('a');
        a.href = "#" + tabID;
        li.appendChild(a);
        
        tabHandles.append(li);
        
        //Add the tab content holder
        var div = document.createElement('div');
        div.id = tabID;
        tabs.append(div);
        
        //Add the table title and table to the tab with a title
        var titleText =
            '(' + form.elements['multiplier_1'].value +
            ' , ' + form.elements['multiplier_2'].value +
            ') x (' + form.elements['multiplicand_1'].value +
            ' , ' + form.elements['multiplicand_2'].value + ')';
        
        a.innerHTML = titleText;
        
        $(div).empty();
        div.appendChild( createTable());
        
        tabs.tabs('refresh');
        
        //Make the new tab the active tab
        var index = tabHandles.find('li').length-1;
        tabs.tabs("option", "active", index);
    };
    
    return {
        init: init
    };
})();

// When DOM has loaded, initialize DOM-dependent javascript.
document.addEventListener('DOMContentLoaded', main.init);