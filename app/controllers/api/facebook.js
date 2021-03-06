
var FB = require("fb"),
	//http = require('http'),
	//https = require('https'),
	//querystring = require('querystring'),
	brisk = require('brisk'),
	//crypto = require('crypto'),
	Parent = brisk.getBaseController("data");


var config = {
	host: "graph.facebook.com",
	//version: "1.1",
	secure: true,
	ext: "json"
};

controller = Parent.extend({

	index: function(req, res){
		//
		this.rest(crud, req, res);
	}


});

var crud = {

	create: function(req, res){

	},

	read: function(req, res){

		var self = this;
		var api = req.site.config.api.facebook;
		var token = req.user.accounts.facebook.token;

		FB.setAccessToken(token.access);

		FB.api( uri( req.url ), function (result) {
			if(!result || result.error) {
				console.log(!res ? 'error occurred' : result.error);
				return res.end();
			}
			// use the data sub-element if available
			res.data = result.data || result;
			var json = JSON.stringify( ( res.data || {} ) );
			// validate the data before output...
			return res.send( json );
			//self.render(req, res);
		});

	},

	update: function(req, res){

	},

	del: function(req, res){

	},


}

// Helpers

function url( path ){
	// clean controller path
	path = path.replace("/api/facebook/", "");
	return ((config.secure) ? "https" : "http") +"://"+ config.host +"/"+ path;
}

function uri( path ){
	// clean controller path
	path = path.replace("/api/facebook/", "");
	//return "/"+ path +"."+ config.ext;
	return "/"+ path;
}

function callback(response) {
	var json = "";
	response.setEncoding('utf8');
	response.on('data', function (chunk) {
		json += chunk;
		console.log(chunk);
	});
	response.on('end', function () {
		console.log(json);
	});
}


module.exports = crud;