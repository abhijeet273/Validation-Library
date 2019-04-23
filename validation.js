(function () {
'use strict';

// selecting all the input elements
  var inputs = document.getElementsByTagName('input');
  var textareas = document.getElementsByTagName('textarea');
  var selects = document.getElementsByTagName('select');

// defining a function validation 
  function  validation(params){
		for(i=0; i<params.length; i++){

			if(params[i].type === 'required'){
			  if (this.value.trim()===''){
			    err.push('cannot be empty');
			  }
			}

			else if(params[i].type === 'regex') {
			  if(!this.value.match(params[i].pattern)) {
			  	err.push('Invalid Format');
			  }
			}

			else if(params[i].type === 'length') {
			  if(!isNaN(params[i].min) && this.value.length < params[i].min) {
					err.push('Minimum '+params[i].min+' characters required');
			  }

			  if(!isNaN(params[i].max) && this.value.length > params[i].max) {
					err.push('Maximum characters limit of '+params[i].max+' exceeded');
			  }

			  if(!isNaN(params[i].just) && this.value.length !== params[i].just) {
					err.push('It should be '+params[i].just+' characters long');
			  }
			}

			else if(params[i].type === 'different') {
			  if(this.value === params[i].from) {
				err.push('It should be different from your Email');
			  }
			}

			else if(params[i].type === 'member') {
			  var count = 0;
			  for(j=0; j < params[i].of.length; j++) {
					if(this.value === params[i].of[j]){
				  count = count +1;
				}
			  }

			  if(count === 0) {
					err.push('It is not a member');
			  }
			}

			else if(params[i].type === 'date') {
			  var date = new Date(this.value);
			  if(date.valueOf() < params[i].after) {
					var mindate = new Date(params[i].after);
					err.push('Please select a date after ' + mindate.toLocaleDateString());
			  }

			  if(date.valueOf()>params[i].before) {
					var maxdate = new Date(params[i].before);
					err.push('please select a date before '+ maxdate.toLocaleDateString());
			  }
			}

			else if(params[i].type === 'file') {
			  function hasExtension(name, exts) {
					return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(name);
			  }

			  if (!hasExtension(this.value, params[i].ext)) {
					err.push('Invalid file!!');
			  }

			  if(this.files[0].size > params[i].max) {
					err.push('file size should not exceed : ' + params[i].max);
			  }
			}

			else if(params[i].type === 'email') {
			  if(!this.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
					err.push('Please enter correct email (e.g. something@example.com)');
			  }
			}


			}

			if(err.length === 0) {
			return true;
			}

			else {
			return err;
			}
		  }


// defining function validate for each input Object
  for(var i=0; i<inputs.length; i++) {
    var err = [];
		inputs[i].validate = validation
  }

//  setting the validate function to the prototype of textarea and select 
  for(var i=0; i<textareas.length; i++) {
    var err = [];
		textareas[i].validate = validation
  }

  for(var i=0; i<selects.length; i++) {
    var err = [];
		selects[i].validate = validation
  }

})();
//console.log(err);
//let result1 = document.getElementById('third').validate([{type:"email"}, {type:"required"}]);
// let result2 = document.getElementById('second').validate([{type:"length", max: 1, min: 8}, {type:"required"}]);
//console.log(result1);
//console.log(result2);
