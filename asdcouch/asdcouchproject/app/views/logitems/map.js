function(doc) {
  if (doc._id.substr(0, 7) === "logitem") {
    emit(doc._id.substr(7), {
    	"_id": doc._id,
    	"_rev": doc._rev,
    	"fname": doc.fname,
		"lname": doc.lname,
		"date": doc.date,
		"currentTime": doc.currentTime,
		"bsreading": doc.bsreading,
		"sex": doc.sex,
		"condition": doc.condition,
		"treatments": doc.treatments,
		"comments":	doc.comments
    });
  }
};