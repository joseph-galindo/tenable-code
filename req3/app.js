(function() {

	"use strict";

	$(document).ready(function() {

		var masterContainer = $(".configs-container");

		function successHandler(data, textStatus, jqueryXHR) {

			var configs = data.data.configurations;

			for(var idx = 0; idx < configs.length; idx++) {

				//create the domString to inject in parts
				var domString = "<div class='setup-container'>";
				domString += "<div class='name'> Name: " + configs[idx].name + "</div>";
				domString += "<div class='hostname'>Hostname: " + configs[idx].hostname + "</div>";
				domString += "<div class='port'>Port: " + configs[idx].port + "</div>";
				domString += "<div class='username'>Username: " + configs[idx].username + "</div>";
				domString += "</div>";

				//wrap the dom string to be injected in a jquery object
				var setupContainer = $(domString);

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