var express 	= require("express"),
request			= require("request");

var app = express();

//config
var username = "user35201532413883"
var password = "74198fd0-490f-4805-957b-657d3764592e";
var auth = new Buffer(username + ":" + password).toString("base64");

var sampleCardProductJson = {
														  "start_date": "2017-01-01",
														  "name": "Example Card Product",
														  "config": {
														    "fulfillment": {
														      "payment_instrument":"VIRTUAL_PAN"
														     },
														    "poi": {
														      "ecommerce": true
														    },
														    "card_life_cycle": {
														      "activate_upon_issue": true
														    }
														  }
														};

var sampleUserJson = {};

var sampleCardJson = {
											"user_token": "3ff5ee03-75a4-4e74-9d40-7d3e261eef93",
											"card_product_token": "c5b4d0c8-9f23-46d1-b710-e5189f058c49"
										 };														

function createCardProduct(cardProductJson, callback) {
	var options = {
		url: "https://shared-sandbox-api.marqeta.com/v3/cardproducts",
		headers: {
		"Authorization": "Basic " + auth
		},
		json: cardProductJson
	};

	console.log("/cardproduct post request sending");
	request.post(options, callback);
}

function grabCardProductToken(error, response, body) {
	if (error) {
		console.log("error:", error);
	}
	// if (!error && response.statusCode == 201) {
		console.log("body:", body);
		console.log("card_product_token is " + body.token);
	// }
}

// createCardProduct(sampleCardProductJson, grabCardProductToken);

function createUser(userJson, callback) {
		var options = {
		url: "https://shared-sandbox-api.marqeta.com/v3/users",
		headers: {
		"Authorization": "Basic " + auth
		},
		json: userJson
	};

	console.log("/users post request sending")
	request.post(options, callback);
}

function grabUserToken(error, response, body) {
	if (error) {
		console.log("error:", error);
	}
		console.log("body:", body);
		console.log("user_token is " + body.token);
	}

// createUser(sampleUserJson, grabUserToken);

function createCard(cardJson, callback) {
		var options = {
		url: "https://shared-sandbox-api.marqeta.com/v3/cards",
		headers: {
		"Authorization": "Basic " + auth
		},
		json: cardJson
	};
	request.post(options, callback);
}

createCardProduct(sampleCardProductJson, function(error, response, body) {
	if (error) {
		console.log("error:", error);
	}

	var card_product_token = body.token;
	createUser(sampleUserJson, function(error, response, body) {
	if (error) {
		console.log("error:", error);
	}
	var user_token = body.token;
	createCard({
							"user_token": user_token,
							"card_product_token": card_product_token
						 }, function(error, response, body) {
						 			if (error) {
						 				console.log("error:", error);
						 			}	
						 			console.log("card_token is " + body.token);
						 });
	});
});










