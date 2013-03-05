$(document).ready(function () {

	
		String.prototype.repeat = function( num )
	{
		return new Array( num + 1 ).join( this );
	}
	
	$("#wrapper #help").not("#wrapper #nav .button#help-button").hide();
	$("#wrapper #welcome a.close").click(function() {
		$("#wrapper #welcome").slideUp();
	});
	
	$("#wrapper #nav .button#help-button").click(function() {
		$("#wrapper #help").not("#wrapper #nav .button#help-button").slideToggle();
	});
	
	$("#wrapper #help a.close").click(function () {
		$("#wrapper #help").not("#wrapper #nav .button#help-button").slideUp();
	});
	
	$.fn.getPreText = function () {
		var ce = $("<pre />").html(this.html());
		if ($.browser.webkit)
		  ce.find("div").replaceWith(function() { return "\n" + this.innerHTML; });
		if ($.browser.msie)
		  ce.find("p").replaceWith(function() { return this.innerHTML + "<br>"; });
		if ($.browser.mozilla || $.browser.opera || $.browser.msie)
		  ce.find("br").replaceWith("\n");

		return ce.text();
	};
	/*
	FB.init({appId: "YOUR_APP_ID", status: true, cookie: true});

	function postToFeed() {

		// calling the API ...
		var obj = {
			method: 'feed',
			link: window.location.origin + '/' + $("div#wrapper").data("listid"),
			picture: window.location.origin + '/static/img/facebook.png',
			name: 'Jiirist: a shareable notepad!',
			caption: $("input#list-title").val(),
			description: 'Simple list written with Jiirilist!'
		};

		function callback(response) {
			document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
		}

		FB.ui(obj, callback);
	}
	
	$("div#sharea").click(function () {
		postToFeed();
		return false;
	});
	*/
	var postData = function () {
		data = {};
		data["title"] = preventXss($("input#list-title").val());
		data["input"] = preventXss($("div#list-input").html());
		data["csrfmiddlewaretoken"] = $('input[name="csrfmiddlewaretoken"]').attr("value");
		data["listid"] = $("div#wrapper").data("listid");
		$.ajax({
			type: "POST",
			url: $("div#wrapper").data("listid") + "/post/",
			data: data
		});
	};
	
	
	$("input#list-title").keyup(postData);
	
	var $listInput = $("div#list-input");
	
	$("div#stripes").on( "click", function () {
		$listInput.focus();
	});
	
	$listInput.on({
		focusin : function () {
			if ($(this).text().trim() == "Write your own list here!") {
				$(this).html("<div></div>");
			}
		},
		
		focusout : function () {
			if ($(this).text().trim() == 0) {
				$(this).html("<div>Write your own list here!</div>");
			}
		},
		
		keyup : postData
	});
	
	$("input#url").attr("value", window.location.href.replace("http://", ""));
			
	$prompt = $("div.prompt");
	
	
	$("div#lock").on("click",
		function () {
			if (!$(this).hasClass("locked")) {
				$prompt.show();
			}
		}
	);

	$prompt.not("div#lock-prompt").on("click", function () {
		$prompt.hide();
	});
	
	$("div.prompt div.button.confirm").click( function () {
		var $newButton;
		if (!$(this).hasClass("locked")) {
			$.ajax(
				$("div#wrapper").data("listid") + "/lock/",
				{"csrfmiddlewaretoken" : $('input[name="csrfmiddlewaretoken"]').attr("value")}
			);
			$newButton = $(document.createElement("div"));
			$newButton.attr("class", "button locked active");
			$newButton.attr("id", "lock");
			$newButton.text("locked");
			$newButton.prepend($(document.createElement("i")).attr("class", "icon-lock"));
			$("div#lock").replaceWith($newButton);
			
			$("input#list-title").attr("disabled","disabled");
			$("div#list-input").attr("contenteditable", "false");
		}
	});
	
	$("div#help-button").click( function () {
		$(this).toggleClass("active");
	});
	
	preventXss = function (string) {
		string = string.replace(/eval\((.*)\)/g, "");
		string = string.replace(/[\"\'][\s]*javascript:(.*)[\"\']/g, "\"\"");
		string = string.replace(/script(.*)/g, "");
		string = string.replace('/([\x00-\x08,\x0b-\x0c,\x0e-\x19])/', '');
		return string;
	}
	
});