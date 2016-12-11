(function() {

	"use strict";

	$(document).ready(function() {

		var masterContainer = $(".configs-container");

		function successHandler(data, textStatus, jqueryXHR) {

			var configs = data.data.configurations;

			for(var idx = 0; idx < configs.length; idx++) {

				//create the domString to inject in parts
				var masterContainerStyles = "'position:relative; display:block;'";

				var setupStyles = {'position':'relative', 'display':'block', 'max-width':'30%', 'font-family': 'Verdana, sans-serif', 'font-size':'18px', 'background-color': '#FFF695', 'border':'1px solid black', 'border-radius':'5px', 'padding':'10px'};
				var setupStylesMargin = Object.assign({}, setupStyles);
				setupStylesMargin['margin-bottom'] = '20px';

				var domString = "<div class='setup-container'>";
				domString += "<div class='name'> Name: " + configs[idx].name + "</div>";
				domString += "<div class='hostname'>Hostname: " + configs[idx].hostname + "</div>";
				domString += "<div class='port'>Port: " + configs[idx].port + "</div>";
				domString += "<div class='username'>Username: " + configs[idx].username + "</div>";
				domString += "</div>";

				//wrap the dom string to be injected in a jquery object
				var setupContainer = $(domString);

				//inject styles
				if(idx === configs.length-1) {
					setupContainer.css(setupStyles);
				} else {
					setupContainer.css(setupStylesMargin);
				}

				//apend it into the DOM through jquery methods
				masterContainer.append(setupContainer);
			}
		}

		function errorHandler(jqueryXHR, textStatus, err) {
			console.log('error');
		}

		$.ajax({
			url: "../download/request?host=2",
			method:"GET",
			dataType:"json",
			success: successHandler,
			error: errorHandler
		});
	});

})();