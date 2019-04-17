# Validation-Library

#Overview
This Library helps you validate your HTML inputs by using only one method and passing several validation parameters to it.

Include the validation.js file at the bottom of your closing body tag ( i.e. just above your main HTML closing tag) using <script src="validation.js"></script>

To validate any input you need to select that input object using selectors API (for e.g. x = document.getElementById('IdName') and apply the validate metod on it.
eg. result = document.getElementById('Idname').validate()

The validate function takes in as parameter an array which specifies the type of validation you wan't to make.
 
If you want to check if an input field has correct email value then you would use :  result = document.getElementById('Idname').validate([{type:"email"}])
The validate function would return true(bool) if input successfully passes the validation check, otherwise it returns an array of error messages.

You can also check for multiple validations at once by passing your validation parameters as array objects to the validation function.

Let's say you want to check for 2 things:
1. That your input represents correct email address.
2. That it satisfy a certain regular expression. 

The above validations can be performed using:
let result = document.getElementById('Idname').validate([{type:"email"}, {type: "regex", pattern: /^.+$/}])

As of now this library supports following validations:

{type: 'email'}

{type: 'required'}

{type: 'regex', pattern: /^.+$/}

{type: 'length', min: 8}

{type: 'length', max: 42}

{type: 'length', just: 10}

{type: 'different', from: emailField.value}

{type: 'member', of: zipcodeArray}

{type: 'date', after: timestamp}

{type: 'date', before: timestamp}

{type: 'file', ext: ['gif', 'png', ...], max: byteNum}

