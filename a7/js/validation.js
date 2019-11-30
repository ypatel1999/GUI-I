/*
 * Author: Yash Patel
 * Email: yash_patel2@student.uml.edu
 * File: validation.js
 *
 * Description:
 *  Assignmnet #7 -- Using the jQuery Validation Plugin with Your Dynamic Table
 *  This javascript file conatins the jquery code to validate the user input and 
 *  and display the error messages if any.
 *
 *
 * Source:
 * https://stackoverflow.com/questions/15060292/a-simple-jquery-form-validation-script
 * https://stackoverflow.com/questions/6545964/jquery-validation-error-placement
 */

function validateForm() {
    /*Checks if the upperbound value is greater than the lower bound value*/
    $.validator.addMethod("compare", function (value, element, param) {
        return parseInt(value, 10) > parseInt($(param).val(), 10);
    });

    var validator = $('#form').validate({
        /* All the rules the input must pass before creating the table */
        rules: {
          multiplier_1: {
              required: true,
              digits: true,
          },
          multiplier_2: {
              required: true,
              digits: true,
              compare: "#multiplier_1"
          },
          multiplicand_1: {
              required: true,
              digits: true,
          },
          multiplicand_2: {
              required: true,
              digits: true,
              compare: "#multiplicand_1"
          }
        },
        /* The messages to output for each of the rules that was not followed */
        messages: {
          multiplier_1: {
            required: "This is a required field!",
            digits: "Enter an integer for the lower bound value."
          },
          multiplier_2: {
            required: "This is a required field!",
            digits: "Enter an integer for the upper boundvalue.",
            compare: "You need to enter a value greater than lower bound."
          },
          multiplicand_1: {
            required: "This is a required field!",
            digits: "Enter an integer for the lower bound value."
          },
          multiplicand_2: {
            required: "This is a required field!",
            digits: "Enter an integer for the upper bound value.",
            compare: "You need to enter a value greater than lower bound."
          }
        },
        /* Wrap the error messages with classes for styling and location */
        errorPlacement: function(label, element) {
            label.insertAfter(element);
        },

        wrapper: 'span',

        /* Create the table if all the rules are followed */
        submitHandler: function (form) {
            createTable()
        }
    }); 
}

$(document).ready(function () {
    validateForm()
});