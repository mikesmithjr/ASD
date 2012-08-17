var parseLogItemForm = function(data){
	// uses form data here;
	console.log(data);
};
var storeData = function(key){
		//if there is no key , this is a new item and needs a key
		if(!key){
		var id = Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same key that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here.
			id = key;
		}
		//Get Form Data and store in object
		//Object properties contain array with form label and input value.
		
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
		//Saving data into local storage using Stringify
		localStorage.setItem(id, JSON.stringify(logItem));
		alert("Log Saved!");
		
	};

//edit single item
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
	console.log("I'm Ready!")
	$("#jsonBtn").on("click", function(){
		console.log("Starting JSON");
		$("#logitemList").empty();
		$.ajax({
		    url      : "_view/logitems",
		    type     : "GET",
		    dataType : "json",
		    success  : function(json){
		        console.log(json);
		        $.each(json.rows, function(i, logItem){
		        	console.log(i + " " + logItem.value.fname[0] + " " + logItem.value.fname[1]);
		        	
		        	
		            /// do stuff
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
		
	});
});

$("#dataTypes").on('pageinit', function(){

	



	$("#xmlBtn").on("click", function(){
			console.log("Starting XML");
			$("#logitemList").empty();

			$.ajax({
				url: "data/data.xml",
				type: "GET",
				dataType: "xml",
				success: function(xml){
					console.log("where is my xml");
					$(xml).find("item").each(function(){
					    var item = $(this);
					    console.log("Name: ", item.find("fname").text());
					    
					    var makeli = $("<li id='listItem"+item+"'></li>");
		    					    			
		    			//create log item list
		    			var optSubText = $( "<img src='"+item.find("treatments").text()+".jpg'/>"+
		    				"<h3>"+item.find("date").text()+"</h3>"+
		    				"<h3>"+item.find("currentTime").text()+"</h3>"+
		    				"<p>"+"First Name:"+" "+item.find("fname").text()+"</p>"+
		    				"<p>"+"Last Name:"+" "+item.find("lname").text()+"</p>"+
		    				"<p>"+"Blood Sugar Reading:"+" "+item.find("bsreading").text()+"</p>"+
		    				"<p>"+"Male or Female:"+" "+item.find("sex").text()+"</p>"+
		    				"<p>"+"Condition:"+" "+item.find("condition").text()+"</p>"+
		    				"<p>"+"Current Treatment:"+" "+item.find("treatments").text()+"</p>"+
		    				"<p>"+"Comments:"+" "+item.find("comments").text()+"</p>");
		    			//Creating Edit Link in Item
		    			var editLink = $("<a href='#addLogForm' id='edit"+item+"'> Edit Log Item</a>");
		    				editLink.on('click', function(){
		    					editItem(this.id);

		    				});
		    			//Creating Delete Link in Item
		    			var deleteLink = $("<a href='#list' id='delete"+item+"'>Delete Item</a>");
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
					alert("XML Ajax Error");
				}

			
		});
		
	});

	$("#yamlBtn").on("click", function(){
			$("#logitemList").empty();
			YAML.fromURL("data/data.yaml", function(yaml){
					console.log("Starting YAML");
					console.log(yaml);
					var logItems = {}
					$.extend(logItems, yaml);
					console.log(logItems);
							/// do stuff
							

						$.each(logItems, function(i, logItem){
			        	console.log(i + " " + " " + logItem.fname);
			        	
			        	
			            /// do stuff
					    var makeli = $("<li id='listItem"+i+"'></li>");
					    var optSubText = $( "<img src='"+logItem.treatments+".jpg'/>"+
			    				"<h3>"+logItem.date+"</h3>"+
			    				"<h3>"+logItem.currentTime+"</h3>"+
			    				"<p>"+"First Name: "+" "+logItem.fname+"</p>"+
			    				"<p>"+"Last Name: "+" "+logItem.lname+"</p>"+
			    				"<p>"+"Blood Sugar Reading: "+" "+logItem.bsreading+"</p>"+
			    				"<p>"+"Male or Female: "+" "+logItem.sex+"</p>"+
			    				"<p>"+"Condition: "+" "+logItem.condition+"</p>"+
			    				"<p>"+"Current Treament: "+" "+logItem.treatments+"</p>"+
			    				"<p>"+"Comments: "+" "+logItem.comments+"</p>");
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
					});
					

			
		
	});	

});


$("#addLogForm").on('pageinit', function(){

	

	$("#addLogItem").validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			/*localStorage.setItem('formdata', this.serializeArray());*/
			storeData(this.id);
		}
	});

	
	//Display the data from local storage to screen
    	var getData = function(){
    		if(localStorage.length === 0){
    			alert("There is no data in Local Storage so default data was added.");
    			autoFillData();
    			/*$("#logitemList").listview('refresh');*/
    		}
    		//Write Data from Local Storage to the browser
    		$("#logitemList").empty();
    		//Making list items
    		for(var i=0, len=localStorage.length; i<len;i++){
    			var makeli = $("<li id='listItem"+i+"'></li>");
    			var key = localStorage.key(i);
    			var value = localStorage.getItem(key);
    			//Converting string from local storage value back to an object using JSON.parse()
    			var obj = JSON.parse(localStorage.getItem(key));

    			//create log item list
    			var optSubText = $( "<img src='"+obj.treatments[1]+".jpg'/>"+
    				"<h3>"+obj.date[1]+"</h3>"+
    				"<h3>"+obj.currentTime[1]+"</h3>"+
    				"<p>"+obj.fname[0]+" "+obj.fname[1]+"</p>"+
    				"<p>"+obj.lname[0]+" "+obj.lname[1]+"</p>"+
    				"<p>"+obj.bsreading[0]+" "+obj.bsreading[1]+"</p>"+
    				"<p>"+obj.sex[0]+" "+obj.sex[1]+"</p>"+
    				"<p>"+obj.condition[0]+" "+obj.condition[1]+"</p>"+
    				"<p>"+obj.treatments[0]+" "+obj.treatments[1]+"</p>"+
    				"<p>"+obj.comments[0]+" "+obj.comments[1]+"</p>");
    			//Creating Edit Link in Item
    			var editLink = $("<a href='#addLogForm' id='edit"+key+"'> Edit Log Item</a>");
    				editLink.on('click', function(){
    					editItem(this.id);

    				});
    			//Creating Delete Link in Item
    			var deleteLink = $("<a href='#list' id='delete"+key+"'>Delete Item</a>");
    				deleteLink.on('click', function(){
    					deleteItem(this.id);
    				});
    			//Make item data the edit link
    			editLink.html(optSubText);
    			//Adding edit and delete links to the list
    			makeli.append(editLink, deleteLink).appendTo("#logitemList");
    			};
    			
	    			
    	};
	    //Auto Populate Default data to local storage
		var autoFillData = function(){
			//Store the JSON Object into local storage
			for(var n in json){
				var id = Math.floor(Math.random()*100000001);
				localStorage.setItem(id, JSON.stringify(json[n]));
			};
			
		};
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








	
	
	
