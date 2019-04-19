// selecting all the input elements
var inputs = document.getElementsByTagName('input');

// selecting emailField
for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].type.toLowerCase() === 'email') {
        emailField = inputs[i];
    }
}

// defining a function validate for each input Object
for(i = 0; i < inputs.length; i++) {
	err = [];
	inputs[i].validate = function(params) {
		for(i = 0; i < params.length; i++) {

			if(params[i].type === 'required') {
				if (this.value.trim() === '') {
					err.push('cannot be empty');
				}
			}

			else if(params[i].type === 'regex') {
				if(!this.value.match(params[i].pattern)) {
					err.push('Invalid Format');
				}
			}

			else if(params[i].type === 'length') {
				if(this.value.length < params[i].min) {
					err.push('Minimum ' + params[i].min  + ' characters required');
				}
				else if(this.value.length > params[i].max) {
					err.push('Maximum characters limit of ' + params[i].max + ' exceeded');
				}
				else if(this.value.length !== params[i].just) {
					err.push('It should be ' + params[i].just + ' characters long');
				}
			}

			else if(params[i].type === 'different') {
				if(this.value === params[i].from){
					err.push('It should be different from your Email');
				}
			}

			else if(params[i].type === 'member') {
				var count = 0; 
				
				for(j = 0; j < params[i].of.length; j++){
					if(this.value === params[i].of[j]){
						count = count + 1;
					}
				}
				if(count === 0){
					err.push('It is not a member');
				}
			}

			else if(params[i].type === 'date') {
				var date = new Date(this.value);

				if(date.valueOf() < params[i].after) {
					var mindate = new Date(params[i].after);
					err.push('Please select a date after ' + mindate.toLocaleDateString());
				}

				if(date.valueOf() > params[i].before) {
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


		}

		if(err.length === 0) {
			return true;
		}
		else {
			return err;
		}
	}
}

console.log(err);
let result = document.getElementById('first').validate([{type:'file', ext: ['.jpg', '.gif']}]);
