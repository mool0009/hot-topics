/*global $, console*/
/*Open ready() method */
$(document).ready(function () {
	"use strict";
	var contents, url, nm, em, sb, ms, dt, err, collect, i, fm;
	
	contents = {};
	// Use load method to load the home.html into index.html
	$(".bg-main .box").load("./partials/home.html", function (pageRsp) {
		contents["./partials/home.html"] = pageRsp;
	});
	/*
	    ------------------------------
	    HANDLING HTML FORM - SEND DATA 
	    TO SERVER USING $.ajax({})
	    ------------------------------ */
	function handleResponse(rsp) {
		$(".feedback").html(rsp);
	}

	function handleError(jqXHR, textStatus, errorThrown) {
		console.log("textStatus: " + textStatus + "\n" + "errorThrown: " + errorThrown);
	}

	function validateForm(ev) {
		dt = {};
		err = [];
		
		ev.preventDefault();
		nm = $("#full-name").val();
		em = $("#email").val();
		sb = $("#subject").val();
		ms = $("#message").val();
		/* 
       Use $.trim() method to remove eventual white space 
       from form elements */
		// evaluate full name:
		if (nm !== "") {
			dt.full_name = nm;
		}
		else {
			err.push("Full Name?");
		}
		// evaluate email:
		if (em !== "") {
			dt.email = em;
		}
		else {
			err.push("Email?");
		}
		// evaluate subject:
		if (sb !== "") {
			dt.subject = sb;
		}
		else {
			err.push("Subject?");
		}
		// evaluate message:
		if (ms !== "") {
			dt.message = ms;
		}
		else {
			err.push("Message?");
		}
		// Check if the data is ready
		if (err.length === 0) {
			// handle ajax request
			$.ajax({
				type: "post"
				, url: "./server-side-script/web-service.php"
				, data: dt
				, dataType: "text"
			}).done(handleResponse).fail(handleError);
		}
		else {
			// report error(s)
			collect = "Please fix the following errors:";
			for (i = 0; i < err.length; i += 1) {
				collect += err[i];
			}
			$(".feedback").html(collect);
		}
	}
	/* 
	Assign collect variable with initial message:
	"Please fix the following errors:" */
	/* 
	Loop through array errors and parse the values of 
	errors array to unordered list - for each loop iteration
	append (save) the result in collect variable. */
	/* 
	Pass collect to HTML element
	with class "feedback" placed below the 
	form element (in HTML document) */
	/* 
	Empty errors array */
	/* 
	Assign collect with empty string */
	/* 
	end else */
	/* 
	End function validateForm */
	/*Use $.trim() method to remove eventual white space 
	from form elements */
	/*
	    ---------------------
	    LOADING HTML PARTIALS
	    --------------------- */
	/* 
	Define function storeContents. This function
	will have parameter - container. This is the HTML
	element that receives content from HTML partials. */
	function storeContents(urlParam) {
		// if content already exists inside contents
		if (contents[urlParam]) {
			// load the content from contents
			$(".bg-main .box").html(contents[urlParam]);
			//console.log("Loaded from array!");
		}
		else {
			// load the content by ajax request
			$(".bg-main .box").load(urlParam, function (pageRsp) {
				contents[urlParam] = pageRsp;
				//console.log("Loaded by ajax request!");
			});
		}
	}
	/*       if object contents doesn't contain the currently
	       loaded HTML partial (use url as key): */
	/* 
	Use container as selector and load() method as
	action to load the content of HTML partial. 
	The first parameter of load() method is already 
	saved in variable url once contact-page nav-bar 
	item is selected. Second parameter of load()
	method is anonymous callback function which 
	contains a parameter itself - pageRsp. pageRsp 
	contains entire content from HTML partial */
	/* 
	Pass pageRsp to contents object 
	with the key url (contents[url]) */
	/*
	End load method here */
	/* 
	End if
	Otherwise: */
	/* 
	Use container as selector and html() 
	method as action to display the content 
	from object contents (contents[url]) */
	/* 
	End else */
	/* 
	End function storeContents.*/
	/* 
	HANDLE NAV-BAR CLICK */
	// what happens when link is clicked
	$(".bg-header .box a").on("click", function (ev) {
		ev.preventDefault();
		url = $(this).attr("href");
		/*
		// test
		console.log(url); */
		storeContents(url);
		$(".bg-main .box").on("submit", "form", validateForm);
	});
});
/* 
Use nav-bar link element as selector and 
on() method for click-event. This event 
handler needs to use event object to prevent 
default behaviour of link element. */
/* 
Prevent default behaviour of link element */
/* 
Use $(this) as selector and attr() method
to catch the relative path stored in href
attribute of clicked link tag. Pass that 
value to variable url. */
/* 
Call function storeContents. Assign its
parameter container with the CSS selector 
that points to HTML element which
receives the page-content. */
/* 
Add event listener - register validateForm 
function to the form element to listen for 
submit event.  */
/* 
End on() method */
/* 
End ready() method */