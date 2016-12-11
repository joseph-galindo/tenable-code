(function() {

	"use strict";

	//after the page's DOM has loaded, do some stuff
	document.addEventListener('DOMContentLoaded', function(event) {
		var ourReq = new XMLHttpRequest();

		ourReq.onreadystatechange = function() {
			if(ourReq.readyState == XMLHttpRequest.DONE) {

				var parentNode = document.getElementById('configs-container');

				if(ourReq.status === 200) {
					var response = JSON.parse(ourReq.responseText);
					var configs = response.data.configurations;

					for(var idx = 0; idx < configs.length; idx++) {
						//create the outer element to hold our backend call response
						var configNode = document.createElement('div');
						configNode.className = 'setup-container';

						//create elements with the actual backend content, to be placed within the outer
						var nameNode = document.createElement('div');
						nameNode.className = 'name';
						nameNode.innerHTML = 'Name: ' + configs[idx].name;

						var hostnameNode = document.createElement('div');
						hostnameNode.className = 'hostname';
						hostnameNode.innerHTML = 'Hostname: ' + configs[idx].hostname;

						var portNode = document.createElement('div');
						portNode.className = 'port';
						portNode.innerHTML = 'Port: ' + configs[idx].port;

						var usernameNode = document.createElement('div');
						usernameNode.className = 'username';
						usernameNode.innerHTML = 'Username: ' + configs[idx].username;

						//insert inner elements as children to the container we created
						configNode.appendChild(nameNode);
						configNode.appendChild(hostnameNode);
						configNode.appendChild(portNode);
						configNode.appendChild(usernameNode);

						//finally, insert that container as a child to the master container we laid out in the markup
						parentNode.appendChild(configNode);

						//add some visual separation between each set of configs
						if(idx !== configs.length-1) {
							var br = document.createElement('br');
							parentNode.appendChild(br);
						}
					}
				} else {

					var errorNode = document.createElement('div');
					errorNode.innerHTML = 'There was an error contacting the server, please try again later.';

					parentNode.appendChild(errorNode);
				}
			}
		};

		ourReq.open("GET", "../download/request?host=2", true);
		ourReq.send();

	});

})();