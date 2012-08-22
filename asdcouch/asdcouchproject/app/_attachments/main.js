var parseLogItemForm = function(data){
	// uses form data here;
	console.log(data);
};

var getData = function(){
	console.log("Starting JSON");
	$("#logitemList").empty();
	$.couch.db("asdproject").view("diabeticlog/logitems", {
	    success: function(json) {
	        console.log(json);
	        $.each(json.rows, function(i, logItem){
	        	console.log(i + " " + logItem.value.fname[0] + " " + logItem.value.fname[1]);
	        	
	        	
	            /// do stuff
	        	var id = logItem.value._id;
	        	var rev = logItem.value._rev;
			    var makeli = $("<li id='listItem"+i+"'></li>");
			    var optSubText = $( "<img src='"+logItem.value.treatments[1]+".jpg'/>"+
	    				"<h3>"+logItem.value.date[1]+"</h3>"+
	    				"<h3>"+logItem.value.currentTime[1]+"</h3>"+
	    				"<p>"+logItem.value.fname[0]+" "+logItem.value.fname[1]+"</p>"+
	    				"<p>"+logItem.value.lname[0]+" "+logItem.value.lname[1]+"</p>"+
	    				"<p>"+logItem.value.bsreading[0]+" "+logItem.value.bsreading[1]+"</p>"+
	    				"<p>"+logItem.value.sex[0]+" "+logItem.value.sex[1]+"</p>"+
	    				"<p>"+logItem.value.condition[0]+" "+logItem.value.condition[1]+"</p>"+
	    				"<p>"+logItem.value.treatments[0]+" "+logItem.value.treatments[1]+"</p>"+
	    				"<p>"+logItem.value.comments[0]+" "+logItem.value.comments[1]+"</p>");
	    			//Creating Edit Link in Item
	    			var editLink = $("<a href='#addLogForm' id='edit"+i+"'> Edit Log Item</a>");
	    				editLink.on('click', function(){
	    					editItem(this.id);

	    				});
	    			//Creating Delete Link in Item
	    			var deleteLink = $("<a href='#list' id='delete"+i+"'>Delete Item</a>");
	    				deleteLink.on('click', function(){
	    					deleteItem(this.id);
	    				});
	    			//Make item data the edit link
	    			editLink.html(optSubText);
	    			//Adding edit and delete links to the list
	    			makeli.append(editLink, deleteLink).appendTo("#logitemList");
			    
			 	});
			$("#logitemList").listview('refresh');
	   		
	    },
	    error: function(){
	    	alert("JSON Ajax Error");
	    }
	});
	
};
var storeData = function(key){
	var logItem = {};	
	 logItem.fname = ["First Name:", $("#fname").val()];
	 logItem.lname = ["Last Name:", $("#lname").val()];
	 logItem.date = ["Today's Date:", $("#date").val()];
	 logItem.currentTime = ["Current Time:", $("#currentTime").val()];
	 logItem.bsreading = ["Blood Sugar Reading:", $("#bsreading").val()];
	 logItem.sex = ["Male or Female:", $('input[name="sex"]:checked', '#addLogItem').val()];
	 logItem.condition = ["Condition:", $("#condition").val()];
	 logItem.treatments = ["Current Treatment:", $("#treatments").val()];
	 logItem.comments = ["Comments:", $("#comments").val()];
	$.couch.db("asdproject").saveDoc(logItem, {
	    success: function(data) {
	        console.log(data);
	        alert("Log Saved!");
	    },
	    error: function(status) {
	        console.log(status);
	    }
	});	
	
	
	};

//edit single item
	
	/*$.couch.db("mydb").openDoc("d12ee5ea1df6baa2b06451f44a019ab9", {
	    success: function(data) {
	        console.log(data);
	    },
	    error: function(status) {
	        console.log(status);
	    }
	});
	
	var doc = {
		    _id: "d12ee5ea1df6baa2b06451f44a019ab9",
		    _rev: "1-967a00dff5e02add41819138abb3284d",
		    foo: "bar"
		};
		$.couch.db("mydb").saveDoc(doc, {
		    success: function(data) {
		        console.log(data);
		    },
		    error: function(status) {
		        console.log(status);
		    }
		});*/
	
	var editItem =function(id) {
		
		
		
		/*//grab the data from our item in local storage
		var key = parseInt(id.match(/\d+/g));
		var logItem = JSON.parse(localStorage.getItem(key));*/
		//Populate the form with current local storage values.
		$("#fname").val(logItem.value.fname[1]);
		$("#lname").val(logItem.value.lname[1]);
		$("#date").val(logItem.value.date[1]);
		$("#currentTime").val(logItem.value.currentTime[1]);
		$("#bsreading").val(logItem.value.bsreading[1]);
		$('input#' + logItem.value.sex[1].toLowerCase()).attr('checked', true).checkboxradio('refresh');
		$("#condition").val(logItem.value.condition[1]);
		$("#treatments").val(logItem.value.treatments[1]).selectmenu("refresh");
		$("#comments").val(logItem.value.comments[1]);
		//Change submit button value to edit button
		$("#addLogForm div form#addLogItem div.ui-field-contain.ui-body.ui-br div.ui-btn.ui-shadow.ui-btn-corner-all.ui-fullsize.ui-btn-block.ui-btn-up-b span.ui-btn-inner.ui-btn-corner-all span.ui-btn-text").text("Save Log Edit");
		//Save the key value established in this function as a property of #addLogItem
		$("#submit").attr("key", key);
		
		
		

	};
//delete single list item
	
	/*
	   
	   
	   var doc = {
		    _id: "d12ee5ea1df6baa2b06451f44a019ab9",
		    _rev: "2-13839535feb250d3d8290998b8af17c3"
		};
		$.couch.db("mydb").removeDoc(doc, {
		     success: function(data) {
		         console.log(data);
		    },
		    error: function(status) {
		        console.log(status);
		    }
		});*/
	
	var deleteItem = function(){
				var ask = confirm("Are you sure you want to delete this log entry?");
				var key = localStorage.key(i);
				if(ask){
					localStorage.removeItem(key);
					alert("Log Entry was deleted.");
					$("#logitemList").listview('refresh');
				}else{
					alert("Log entry was Not deleted.");
				};
		
	};
//clear local storage
	var clearData = function() {
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			var ask = confirm("Deleting ALL log items? This can NOT be undone.");
			if(ask){
				localStorage.clear();
				alert("All log items are deleted!");
				$("#logitemList").empty();
			}else{
				alert("Log items not deleted.");
			};
		};
	};

$("#home").on('pageinit', function(){
	console.log("I'm Ready!");
	$("#jsonBtn").on("click", getData);
});




$("#addLogForm").on('pageinit', function(){

	

	$("#addLogItem").validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			/*localStorage.setItem('formdata', this.serializeArray());*/
			storeData(this.id);
		}
	});

	

    	
    			
	    			
    
	    
	$("#submit").on("click", storeData);
	$("#displayLog").on("click", getData);

});


$("#list").on('pageinit', function(){



	
	
	
	

	//clear local storage
	var clearData = function() {
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			var ask = confirm("Deleting ALL log items? This can NOT be undone.");
			if(ask){
				localStorage.clear();
				alert("All log items are deleted!");
				$("#logitemList").empty();
			}else{
				alert("Log items not deleted.");
			};
		};
	};
	/*$("#displayLog, #news").on("click", getData);*/
	$("#clear").on("click", clearData);
});








	
	
	
