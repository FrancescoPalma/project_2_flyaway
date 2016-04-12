/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(7);
	__webpack_require__(9);
	var async = __webpack_require__(15);
	var changeBg = __webpack_require__(14);
	var getFlickrImagesByTag = __webpack_require__(12).getFlickrImagesByTag;
	var getFlightData = __webpack_require__(11).getFlightData;
	var getOutboundFlights = __webpack_require__(11).getOutboundFlights;
	var getFlightPrice = __webpack_require__(11).getFlightPrice;
	
	$(document).ready(function() {
	  function showElement(id) { $(id).show(); }
	  function hidePage() { $('.page').hide(); }
	
	  $('#slider').hide();
	  hidePage();
	  showElement('#home');
	
	  $('#get-started').click(function(e) {
	    e.preventDefault();
	    hidePage();
	    showElement('#where-to-go');
	  })
	
	  $('#destination-button').click(function(e) {
	    $('#video').hide();
	    getFlickrImagesByTag($('#destination-input').val(), changeBg);
	    $('#slider').show();
	  });
	
	    // getFlickrImagesByTag($('#destination-input').value);
	    // $('#video').hide();
	    // changeBg(imagesArray);
	    // $('#slider').show();
	    // showElement('#home');
	})


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	function getFlightData(origin, destination, departureDate) {
	  console.log("getFlights called");
	  var url = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=bX8HkNGmgrYd81Z9ne6OyMp4WhAiYoyS&origin=" + origin + "&destination=" + destination + "&departure_date=" + departureDate + "&currency=GBP&number_of_results=5";
	  // 2016-06-25
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	      var jsonString = xhr.responseText;
	      var data = JSON.parse(jsonString);
	      console.log("Data is ready.");
	    }
	  }
	  xhr.open("GET", url);
	  console.log("I'm calling the FlightsAPI");
	  xhr.send(null);
	}
	
	function breakBigObject(data) {
	  var array = [];
	  for(var object of data.results){
	    array.push(object);
	  }
	  return array;
	}
	
	function getOutboundFlights(data, index) {
	  return data.results[index].itineraries[0].outbound.flights
	}
	
	function getFlightPrice(data, index) {
	  return data.results[index].fare.total_price
	}
	
	module.exports = {
	  getFlightData: getFlightData,
	  breakBigObject: breakBigObject,
	  getOutboundFlights: getOutboundFlights,
	  getFlightPrice: getFlightPrice
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	
	var flickr = new Flickr({
	  api_key: "b6b35718f3c50d1c2c6d04ead7f016b2"
	});
	
	function getFlickrImagesByTag(tags, callback) {
	  console.log("called the get FlickerAPI with: ", tags);
	  flickr.photos.search({
	    text: tags,
	    privacy_filter: 1,
	    group_id: '41425956@N00',
	    per_page: 20,
	    page: 1,
	  }, function(err, result) {
	    if(err) { throw new Error(err); }
	    var data = result;
	    var imageURLS = getImagesUrl(data);
	    callback(imageURLS);
	  })
	}
	
	function getImagesUrl(data) {
	  var urls = [];
	  var photos = data.photos.photo
	  for(var photo of photos) {
	    var id = photo.id;
	    var farmId = photo.farm;
	    var serverId = photo.server;
	    var secret = photo.secret;
	    urls.push("https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + id + "_" + secret + "_h.jpg");
	  }
	  return urls;
	}
	
	module.exports = {
	  getFlickrImagesByTag: getFlickrImagesByTag
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	(function() {
	 var Utils = {};
	Utils.formQueryString = function (queryArguments) {
	    var args = [],
	        append = function(key) {
	          args.push(key + "=" + encodeURIComponent(queryArguments[key]));
	        };
	    Object.keys(queryArguments).sort().forEach(append);
	    return args.join("&");
	  };
	Utils.checkRequirements = function (method_name, required, callOptions, callback) {
	    required = required || [];
	    for(var r=0, last=required.length, arg; r<last; r++) {
	      arg = required[r];
	      if(arg.name === "api_key") continue;
	      if(!callOptions.hasOwnProperty(arg.name)) {
	        return callback(new Error("missing required argument '"+arg.name+"' in call to "+method_name));
	      }
	    }
	  };
	Utils.generateAPIFunction = function (method) {
	    return function(callOptions, callback) {
	      if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
	      var queryArguments = Utils.generateQueryArguments(method.name, this.flickrOptions, callOptions);
	      Utils.queryFlickr(queryArguments, this.flickrOptions, method.security, callback);
	    };
	  };
	Utils.generateAPIDevFunction = function (method) {
	    return function(callOptions, callback) {
	      if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
	      Utils.checkRequirements(method.name, method.required, callOptions, callback);
	      var queryArguments = Utils.generateQueryArguments(method.name, this.flickrOptions, callOptions);
	      Utils.queryFlickr(queryArguments, this.flickrOptions, method.security, callback, method.errors);
	    };
	  };
	Utils.generateQueryArguments = function (method_name, flickrOptions, callOptions) {
	    // set up authorized method access
	    var queryArguments = {
	      method: method_name,
	      format: "json",
	    };
	    if(flickrOptions.api_key) {
	      queryArguments.api_key = flickrOptions.api_key;
	    }
	    // set up bindings for method-specific args
	    Object.keys(callOptions).forEach(function(key) {
	      queryArguments[key] = callOptions[key];
	    });
	    return queryArguments;
	  };
	Utils.queryFlickr = function (queryArguments, flickrOptions, security, processResult) {
	    if(flickrOptions.endpoint) {
	      return this.queryProxyEndpoint(queryArguments, flickrOptions, processResult);
	    }
	    return this.queryFlickrAPI(queryArguments, flickrOptions, security, processResult);
	  };
	Utils.upload = function (uploadOptions, flickrOptions, processResult) {
	    return processResult(new Error("Uploading directly from the browser is not supported"));
	  };
	Utils.queryFlickrAPI = function (queryArguments, flickrOptions, security, processResult) {
	    var url = "https://api.flickr.com/services/rest/",
	        queryString = this.formQueryString(queryArguments),
	        flickrURL = url + "?" + queryString;
	    // Do we need special permissions? (read private, 1, write, 2, or delete, 3)?
	    // if so, those are currently not supported. Send an error-notification.
	    if(security.requiredperms > 0) {
	      return processResult(new Error("signed calls (write/delete) currently not supported"));
	    }
	    this.handleURLRequest("GET", flickrURL, processResult);
	  };
	Utils.queryProxyEndpoint = function (queryArguments, flickrOptions, processResult) {
	    var queryString = this.formQueryString(queryArguments),
	        url = flickrOptions.endpoint + "?" + queryString;
	    this.handleURLRequest("POST", url, processResult, queryArguments);
	  };
	Utils.handleURLRequest = function (verb, url, processResult, postdata) {
	    var xhr = new XMLHttpRequest();
	    xhr.open(verb, url, true);
	    if(postdata) {
	      xhr.setRequestHeader("Content-Type", "application/json");
	    }
	    xhr.onreadystatechange = function() {
	      if(xhr.readyState === 4) {
	        if(xhr.status == 200) {
	          var error = false,
	              body = xhr.responseText;
	          // we get a response, but there's no response body. That's a problem.
	          if(!body) {
	            error = "HTTP Error " + response.statusCode + " (" + statusCodes[response.statusCode] + ")";
	            return processResult(error);
	          }
	          // we get a response, and there were no errors
	          if(!error) {
	            try {
	              body = body.trim().replace(/^jsonFlickrApi\(/,'').replace(/\}\)$/,'}');
	              body = JSON.parse(body);
	              if(body.stat !== "ok") {
	                // There was a request error, and the JSON .stat property
	                // will tell us what that error was.
	                return processResult(body.message);
	              }
	            } catch (e) {
	              // general JSON error
	              return processResult("could not parse body as JSON");
	            }
	          }
	          // Some kind of other error occurred. Simply call the process
	          // handler blindly with both the error and error body.
	          processResult(error, body);
	        }
	        else { processResult("HTTP status not 200 (received "+xhr.status+")"); }
	      }
	    };
	    xhr.send(postdata ? JSON.stringify(postdata) : null);
	  };
	 Utils.errors = {
	    "96": {
	        "code": 96,
	        "message": "Invalid signature",
	        "_content": "The passed signature was invalid."
	    },
	    "97": {
	        "code": 97,
	        "message": "Missing signature",
	        "_content": "The call required signing but no signature was sent."
	    },
	    "98": {
	        "code": 98,
	        "message": "Login failed / Invalid auth token",
	        "_content": "The login details or auth token passed were invalid."
	    },
	    "99": {
	        "code": 99,
	        "message": "User not logged in / Insufficient permissions",
	        "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
	    },
	    "100": {
	        "code": 100,
	        "message": "Invalid API Key",
	        "_content": "The API key passed was not valid or has expired."
	    },
	    "105": {
	        "code": 105,
	        "message": "Service currently unavailable",
	        "_content": "The requested service is temporarily unavailable."
	    },
	    "106": {
	        "code": 106,
	        "message": "Write operation failed",
	        "_content": "The requested operation failed due to a temporary issue."
	    },
	    "108": {
	        "code": "108",
	        "message": "Invalid frob",
	        "_content": "The specified frob does not exist or has already been used."
	    },
	    "111": {
	        "code": 111,
	        "message": "Format \"xxx\" not found",
	        "_content": "The requested response format was not found."
	    },
	    "112": {
	        "code": 112,
	        "message": "Method \"xxx\" not found",
	        "_content": "The requested method was not found."
	    },
	    "114": {
	        "code": 114,
	        "message": "Invalid SOAP envelope",
	        "_content": "The SOAP envelope send in the request could not be parsed."
	    },
	    "115": {
	        "code": 115,
	        "message": "Invalid XML-RPC Method Call",
	        "_content": "The XML-RPC request document could not be parsed."
	    },
	    "116": {
	        "code": 116,
	        "message": "Bad URL found",
	        "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
	    }
	};
	 var Flickr = function (flickrOptions) {
	  this.bindOptions(flickrOptions);
	};
	 Flickr.prototype = {};
	 Flickr.methods = {
	 "flickr.activity.userComments": {
	  "optional": [
	   {
	    "name": "per_page",
	    "_content": "Number of items to return per page. If this argument is omitted, it defaults to 10. The maximum allowed value is 50."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.activity.userComments",
	  "url": "https://www.flickr.com/services/api/flickr.activity.userComments.html"
	 },
	 "flickr.activity.userPhotos": {
	  "optional": [
	   {
	    "name": "timeframe",
	    "_content": "The timeframe in which to return updates for. This can be specified in days (<code>'2d'</code>) or hours (<code>'4h'</code>). The default behavoir is to return changes since the beginning of the previous user session."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of items to return per page. If this argument is omitted, it defaults to 10. The maximum allowed value is 50."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.activity.userPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.activity.userPhotos.html"
	 },
	 "flickr.auth.checkToken": {
	  "required": [
	   {
	    "name": "auth_token",
	    "_content": "The authentication token to check."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.auth.checkToken",
	  "url": "https://www.flickr.com/services/api/flickr.auth.checkToken.html"
	 },
	 "flickr.auth.getFrob": {
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.auth.getFrob",
	  "url": "https://www.flickr.com/services/api/flickr.auth.getFrob.html"
	 },
	 "flickr.auth.getFullToken": {
	  "required": [
	   {
	    "name": "mini_token",
	    "_content": "The mini-token typed in by a user. It should be 9 digits long. It may optionally contain dashes."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Mini-token not found",
	    "_content": "The passed mini-token was not valid."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.auth.getFullToken",
	  "url": "https://www.flickr.com/services/api/flickr.auth.getFullToken.html"
	 },
	 "flickr.auth.getToken": {
	  "required": [
	   {
	    "name": "frob",
	    "_content": "The frob to check."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.auth.getToken",
	  "url": "https://www.flickr.com/services/api/flickr.auth.getToken.html"
	 },
	 "flickr.auth.oauth.checkToken": {
	  "required": [
	   {
	    "name": "oauth_token",
	    "_content": "The OAuth authentication token to check."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 1,
	   "requiredperms": 0
	  },
	  "name": "flickr.auth.oauth.checkToken",
	  "url": "https://www.flickr.com/services/api/flickr.auth.oauth.checkToken.html"
	 },
	 "flickr.auth.oauth.getAccessToken": {
	  "security": {
	   "needslogin": 0,
	   "needssigning": 1,
	   "requiredperms": 0
	  },
	  "name": "flickr.auth.oauth.getAccessToken",
	  "url": "https://www.flickr.com/services/api/flickr.auth.oauth.getAccessToken.html"
	 },
	 "flickr.blogs.getList": {
	  "optional": [
	   {
	    "name": "service",
	    "_content": "Optionally only return blogs for a given service id.  You can get a list of from <a href=\"/services/api/flickr.blogs.getServices.html\">flickr.blogs.getServices()</a>."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.blogs.getList",
	  "url": "https://www.flickr.com/services/api/flickr.blogs.getList.html"
	 },
	 "flickr.blogs.getServices": {
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.blogs.getServices",
	  "url": "https://www.flickr.com/services/api/flickr.blogs.getServices.html"
	 },
	 "flickr.blogs.postPhoto": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to blog"
	   },
	   {
	    "name": "title",
	    "_content": "The blog post title"
	   },
	   {
	    "name": "description",
	    "_content": "The blog post body"
	   }
	  ],
	  "optional": [
	   {
	    "name": "blog_id",
	    "_content": "The id of the blog to post to."
	   },
	   {
	    "name": "blog_password",
	    "_content": "The password for the blog (used when the blog does not have a stored password)."
	   },
	   {
	    "name": "service",
	    "_content": "A Flickr supported blogging service.  Instead of passing a blog id you can pass a service id and we'll post to the first blog of that service we find."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Blog not found",
	    "_content": "The blog id was not the id of a blog belonging to the calling user"
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "The photo id was not the id of a public photo"
	   },
	   {
	    "code": "3",
	    "message": "Password needed",
	    "_content": "A password is not stored for the blog and one was not passed with the request"
	   },
	   {
	    "code": "4",
	    "message": "Blog post failed",
	    "_content": "The blog posting failed (a blogging API failure of some sort)"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.blogs.postPhoto",
	  "url": "https://www.flickr.com/services/api/flickr.blogs.postPhoto.html"
	 },
	 "flickr.cameras.getBrandModels": {
	  "required": [
	   {
	    "name": "brand",
	    "_content": "The ID of the requested brand (as returned from flickr.cameras.getBrands)."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Brand not found",
	    "_content": "Unable to find the given brand ID."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.cameras.getBrandModels",
	  "url": "https://www.flickr.com/services/api/flickr.cameras.getBrandModels.html"
	 },
	 "flickr.cameras.getBrands": {
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.cameras.getBrands",
	  "url": "https://www.flickr.com/services/api/flickr.cameras.getBrands.html"
	 },
	 "flickr.collections.getInfo": {
	  "required": [
	   {
	    "name": "collection_id",
	    "_content": "The ID of the collection to fetch information for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "secure_image_embeds",
	    "_content": "This argument will secure the external image embeds in all the markup and return a secure<Field> back in addition to the <Field>"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Collection not found",
	    "_content": "The requested collection could not be found or is not visible to the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.collections.getInfo",
	  "url": "https://www.flickr.com/services/api/flickr.collections.getInfo.html"
	 },
	 "flickr.collections.getTree": {
	  "optional": [
	   {
	    "name": "collection_id",
	    "_content": "The ID of the collection to fetch a tree for, or zero to fetch the root collection. Defaults to zero."
	   },
	   {
	    "name": "user_id",
	    "_content": "The ID of the account to fetch the collection tree for. Deafults to the calling user."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The specified user could not be found."
	   },
	   {
	    "code": "2",
	    "message": "Collection not found",
	    "_content": "The specified collection does not exist."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.collections.getTree",
	  "url": "https://www.flickr.com/services/api/flickr.collections.getTree.html"
	 },
	 "flickr.commons.getInstitutions": {
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.commons.getInstitutions",
	  "url": "https://www.flickr.com/services/api/flickr.commons.getInstitutions.html"
	 },
	 "flickr.contacts.getList": {
	  "optional": [
	   {
	    "name": "filter",
	    "_content": "An optional filter of the results. The following values are valid:<br />\r\n&nbsp;\r\n<dl>\r\n\t<dt><b><code>friends</code></b></dt>\r\n\t<dl>Only contacts who are friends (and not family)</dl>\r\n\r\n\t<dt><b><code>family</code></b></dt>\r\n\t<dl>Only contacts who are family (and not friends)</dl>\r\n\r\n\t<dt><b><code>both</code></b></dt>\r\n\t<dl>Only contacts who are both friends and family</dl>\r\n\r\n\t<dt><b><code>neither</code></b></dt>\r\n\t<dl>Only contacts who are neither friends nor family</dl>\r\n</dl>"
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of photos to return per page. If this argument is omitted, it defaults to 1000. The maximum allowed value is 1000."
	   },
	   {
	    "name": "sort",
	    "_content": "The order in which to sort the returned contacts. Defaults to name. The possible values are: name and time."
	   },
	   {
	    "name": "fields",
	    "_content": "The fields can have the following args:\r\nrealname, friend, family,path_alias,location,public_photos_count,can_tag"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Invalid sort parameter.",
	    "_content": "The possible values are: name and time."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.contacts.getList",
	  "url": "https://www.flickr.com/services/api/flickr.contacts.getList.html"
	 },
	 "flickr.contacts.getListRecentlyUploaded": {
	  "optional": [
	   {
	    "name": "date_lastupload",
	    "_content": "Limits the resultset to contacts that have uploaded photos since this date. The date should be in the form of a Unix timestamp.\r\n\r\nThe default offset is (1) hour and the maximum (24) hours. "
	   },
	   {
	    "name": "filter",
	    "_content": "Limit the result set to all contacts or only those who are friends or family. Valid options are:\r\n\r\n<ul>\r\n<li><strong>ff</strong> friends and family</li>\r\n<li><strong>all</strong> all your contacts</li>\r\n</ul>\r\nDefault value is \"all\"."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.contacts.getListRecentlyUploaded",
	  "url": "https://www.flickr.com/services/api/flickr.contacts.getListRecentlyUploaded.html"
	 },
	 "flickr.contacts.getPublicList": {
	  "required": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to fetch the contact list for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of photos to return per page. If this argument is omitted, it defaults to 1000. The maximum allowed value is 1000."
	   },
	   {
	    "name": "show_more",
	    "_content": "Include additional information for each contact, such as realname, is_friend, is_family, path_alias and location."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The specified user NSID was not a valid user."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.contacts.getPublicList",
	  "url": "https://www.flickr.com/services/api/flickr.contacts.getPublicList.html"
	 },
	 "flickr.contacts.getTaggingSuggestions": {
	  "optional": [
	   {
	    "name": "include_self",
	    "_content": "Return calling user in the list of suggestions. Default: true."
	   },
	   {
	    "name": "include_address_book",
	    "_content": "Include suggestions from the user's address book. Default: false"
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of contacts to return per page. If this argument is omitted, all contacts will be returned."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.contacts.getTaggingSuggestions",
	  "url": "https://www.flickr.com/services/api/flickr.contacts.getTaggingSuggestions.html"
	 },
	 "flickr.favorites.add": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to add to the user's favorites."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id."
	   },
	   {
	    "code": "2",
	    "message": "Photo is owned by you",
	    "_content": "The photo belongs to the user and so cannot be added to their favorites."
	   },
	   {
	    "code": "3",
	    "message": "Photo is already in favorites",
	    "_content": "The photo is already in the user's list of favorites."
	   },
	   {
	    "code": "4",
	    "message": "User cannot see photo",
	    "_content": "The user does not have permission to add the photo to their favorites."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.favorites.add",
	  "url": "https://www.flickr.com/services/api/flickr.favorites.add.html"
	 },
	 "flickr.favorites.getContext": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to fetch the context for."
	   },
	   {
	    "name": "user_id",
	    "_content": "The user who counts the photo as a favorite."
	   }
	  ],
	  "optional": [
	   {
	    "name": "num_prev",
	    "_content": ""
	   },
	   {
	    "name": "num_next",
	    "_content": ""
	   },
	   {
	    "name": "extras",
	    "_content": "A comma-delimited list of extra information to fetch for each returned record. Currently supported fields are: description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_z, url_l, url_o"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id, or was the id of a photo that the calling user does not have permission to view."
	   },
	   {
	    "code": "2",
	    "message": "User not found",
	    "_content": "The specified user was not found."
	   },
	   {
	    "code": "3",
	    "message": "Photo not a favorite",
	    "_content": "The specified photo is not a favorite of the specified user."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.favorites.getContext",
	  "url": "https://www.flickr.com/services/api/flickr.favorites.getContext.html"
	 },
	 "flickr.favorites.getList": {
	  "optional": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to fetch the favorites list for. If this argument is omitted, the favorites list for the calling user is returned."
	   },
	   {
	    "name": "jump_to",
	    "_content": ""
	   },
	   {
	    "name": "min_fave_date",
	    "_content": "Minimum date that a photo was favorited on. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "max_fave_date",
	    "_content": "Maximum date that a photo was favorited on. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "get_user_info",
	    "_content": "Include info for the user who's favorites are being returned."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The specified user NSID was not a valid flickr user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.favorites.getList",
	  "url": "https://www.flickr.com/services/api/flickr.favorites.getList.html"
	 },
	 "flickr.favorites.getPublicList": {
	  "required": [
	   {
	    "name": "user_id",
	    "_content": "The user to fetch the favorites list for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "jump_to",
	    "_content": ""
	   },
	   {
	    "name": "min_fave_date",
	    "_content": "Minimum date that a photo was favorited on. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "max_fave_date",
	    "_content": "Maximum date that a photo was favorited on. The date should be in the form of a unix timestamp."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The specified user NSID was not a valid flickr user."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.favorites.getPublicList",
	  "url": "https://www.flickr.com/services/api/flickr.favorites.getPublicList.html"
	 },
	 "flickr.favorites.remove": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to remove from the user's favorites."
	   }
	  ],
	  "optional": [
	   {
	    "name": "user_id",
	    "_content": "NSID of the user whose favorites the photo should be removed from. This only works if the calling user owns the photo."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not in favorites",
	    "_content": "The photo id passed was not in the user's favorites."
	   },
	   {
	    "code": "2",
	    "message": "Cannot remove photo from that user's favorites",
	    "_content": "user_id was passed as an argument, but photo_id is not owned by the authenticated user."
	   },
	   {
	    "code": "3",
	    "message": "User not found",
	    "_content": "Invalid user_id argument."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.favorites.remove",
	  "url": "https://www.flickr.com/services/api/flickr.favorites.remove.html"
	 },
	 "flickr.galleries.addPhoto": {
	  "required": [
	   {
	    "name": "gallery_id",
	    "_content": "The ID of the gallery to add a photo to.  Note: this is the compound ID returned in methods like <a href=\"/services/api/flickr.galleries.getList.html\">flickr.galleries.getList</a>, and <a href=\"/services/api/flickr.galleries.getListForPhoto.html\">flickr.galleries.getListForPhoto</a>."
	   },
	   {
	    "name": "photo_id",
	    "_content": "The photo ID to add to the gallery"
	   }
	  ],
	  "optional": [
	   {
	    "name": "comment",
	    "_content": "A short comment or story to accompany the photo."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing",
	    "_content": "One or more required parameters was not included with your API call."
	   },
	   {
	    "code": "2",
	    "message": "Invalid gallery ID",
	    "_content": "That gallery could not be found."
	   },
	   {
	    "code": "3",
	    "message": "Invalid photo ID",
	    "_content": "The requested photo could not be found."
	   },
	   {
	    "code": "4",
	    "message": "Invalid comment",
	    "_content": "The comment body could not be validated."
	   },
	   {
	    "code": "5",
	    "message": "Failed to add photo",
	    "_content": "Unable to add the photo to the gallery."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.galleries.addPhoto",
	  "url": "https://www.flickr.com/services/api/flickr.galleries.addPhoto.html"
	 },
	 "flickr.galleries.create": {
	  "required": [
	   {
	    "name": "title",
	    "_content": "The name of the gallery"
	   },
	   {
	    "name": "description",
	    "_content": "A short description for the gallery"
	   }
	  ],
	  "optional": [
	   {
	    "name": "primary_photo_id",
	    "_content": "The first photo to add to your gallery"
	   },
	   {
	    "name": "full_result",
	    "_content": "Get the result in the same format as galleries.getList"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing",
	    "_content": "One or more of the required parameters was missing from your API call."
	   },
	   {
	    "code": "2",
	    "message": "Invalid title or description",
	    "_content": "The title or the description could not be validated."
	   },
	   {
	    "code": "3",
	    "message": "Failed to add gallery",
	    "_content": "There was a problem creating the gallery."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.galleries.create",
	  "url": "https://www.flickr.com/services/api/flickr.galleries.create.html"
	 },
	 "flickr.galleries.editMeta": {
	  "required": [
	   {
	    "name": "gallery_id",
	    "_content": "The gallery ID to update."
	   },
	   {
	    "name": "title",
	    "_content": "The new title for the gallery."
	   }
	  ],
	  "optional": [
	   {
	    "name": "description",
	    "_content": "The new description for the gallery."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing",
	    "_content": "One or more required parameters was missing from your request."
	   },
	   {
	    "code": "2",
	    "message": "Invalid title or description",
	    "_content": "The title or description arguments could not be validated."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.galleries.editMeta",
	  "url": "https://www.flickr.com/services/api/flickr.galleries.editMeta.html"
	 },
	 "flickr.galleries.editPhoto": {
	  "required": [
	   {
	    "name": "gallery_id",
	    "_content": "The ID of the gallery to add a photo to. Note: this is the compound ID returned in methods like flickr.galleries.getList, and flickr.galleries.getListForPhoto."
	   },
	   {
	    "name": "photo_id",
	    "_content": "The photo ID to add to the gallery."
	   },
	   {
	    "name": "comment",
	    "_content": "The updated comment the photo."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Invalid gallery ID",
	    "_content": "That gallery could not be found."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.galleries.editPhoto",
	  "url": "https://www.flickr.com/services/api/flickr.galleries.editPhoto.html"
	 },
	 "flickr.galleries.editPhotos": {
	  "required": [
	   {
	    "name": "gallery_id",
	    "_content": "The id of the gallery to modify. The gallery must belong to the calling user."
	   },
	   {
	    "name": "primary_photo_id",
	    "_content": "The id of the photo to use as the 'primary' photo for the gallery. This id must also be passed along in photo_ids list argument."
	   },
	   {
	    "name": "photo_ids",
	    "_content": "A comma-delimited list of photo ids to include in the gallery. They will appear in the set in the order sent. This list must contain the primary photo id. This list of photos replaces the existing list."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.galleries.editPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.galleries.editPhotos.html"
	 },
	 "flickr.galleries.getInfo": {
	  "required": [
	   {
	    "name": "gallery_id",
	    "_content": "The gallery ID you are requesting information for."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.galleries.getInfo",
	  "url": "https://www.flickr.com/services/api/flickr.galleries.getInfo.html"
	 },
	 "flickr.galleries.getList": {
	  "required": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to get a galleries list for. If none is specified, the calling user is assumed."
	   }
	  ],
	  "optional": [
	   {
	    "name": "per_page",
	    "_content": "Number of galleries to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   },
	   {
	    "name": "primary_photo_extras",
	    "_content": "A comma-delimited list of extra information to fetch for the primary photo. Currently supported fields are: license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_o"
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.galleries.getList",
	  "url": "https://www.flickr.com/services/api/flickr.galleries.getList.html"
	 },
	 "flickr.galleries.getListForPhoto": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The ID of the photo to fetch a list of galleries for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "per_page",
	    "_content": "Number of galleries to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.galleries.getListForPhoto",
	  "url": "https://www.flickr.com/services/api/flickr.galleries.getListForPhoto.html"
	 },
	 "flickr.galleries.getPhotos": {
	  "required": [
	   {
	    "name": "gallery_id",
	    "_content": "The ID of the gallery of photos to return"
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.galleries.getPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.galleries.getPhotos.html"
	 },
	 "flickr.groups.browse": {
	  "optional": [
	   {
	    "name": "cat_id",
	    "_content": "The category id to fetch a list of groups and sub-categories for. If not specified, it defaults to zero, the root of the category tree."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Category not found",
	    "_content": "The value passed for cat_id was not a valid category id."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.groups.browse",
	  "url": "https://www.flickr.com/services/api/flickr.groups.browse.html"
	 },
	 "flickr.groups.discuss.replies.add": {
	  "required": [
	   {
	    "name": "topic_id",
	    "_content": "The ID of the topic to post a comment to."
	   },
	   {
	    "name": "message",
	    "_content": "The message to post to the topic."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Topic not found",
	    "_content": "The topic_id is invalid."
	   },
	   {
	    "code": "2",
	    "message": "Cannot post to group",
	    "_content": "Either this account is not a member of the group, or discussion in this group is disabled.\r\n"
	   },
	   {
	    "code": "3",
	    "message": "Missing required arguments",
	    "_content": "The topic_id and message are required."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.groups.discuss.replies.add",
	  "url": "https://www.flickr.com/services/api/flickr.groups.discuss.replies.add.html"
	 },
	 "flickr.groups.discuss.replies.delete": {
	  "required": [
	   {
	    "name": "topic_id",
	    "_content": "The ID of the topic the post is in."
	   },
	   {
	    "name": "reply_id",
	    "_content": "The ID of the reply to delete."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Topic not found",
	    "_content": "The topic_id is invalid."
	   },
	   {
	    "code": "2",
	    "message": "Reply not found",
	    "_content": "The reply_id is invalid."
	   },
	   {
	    "code": "3",
	    "message": "Cannot delete reply",
	    "_content": "Replies can only be edited by their owner."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 3
	  },
	  "name": "flickr.groups.discuss.replies.delete",
	  "url": "https://www.flickr.com/services/api/flickr.groups.discuss.replies.delete.html"
	 },
	 "flickr.groups.discuss.replies.edit": {
	  "required": [
	   {
	    "name": "topic_id",
	    "_content": "The ID of the topic the post is in."
	   },
	   {
	    "name": "reply_id",
	    "_content": "The ID of the reply post to edit."
	   },
	   {
	    "name": "message",
	    "_content": "The message to edit the post with."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Topic not found",
	    "_content": "The topic_id is invalid"
	   },
	   {
	    "code": "2",
	    "message": "Reply not found",
	    "_content": "The reply_id is invalid."
	   },
	   {
	    "code": "3",
	    "message": "Missing required arguments",
	    "_content": "The topic_id and reply_id are required."
	   },
	   {
	    "code": "4",
	    "message": "Cannot edit reply",
	    "_content": "Replies can only be edited by their owner."
	   },
	   {
	    "code": "5",
	    "message": "Cannot post to group",
	    "_content": "Either this account is not a member of the group, or discussion in this group is disabled."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.groups.discuss.replies.edit",
	  "url": "https://www.flickr.com/services/api/flickr.groups.discuss.replies.edit.html"
	 },
	 "flickr.groups.discuss.replies.getInfo": {
	  "required": [
	   {
	    "name": "topic_id",
	    "_content": "The ID of the topic the post is in."
	   },
	   {
	    "name": "reply_id",
	    "_content": "The ID of the reply to fetch."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Topic not found",
	    "_content": "The topic_id is invalid"
	   },
	   {
	    "code": "2",
	    "message": "Reply not found",
	    "_content": "The reply_id is invalid"
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.groups.discuss.replies.getInfo",
	  "url": "https://www.flickr.com/services/api/flickr.groups.discuss.replies.getInfo.html"
	 },
	 "flickr.groups.discuss.replies.getList": {
	  "required": [
	   {
	    "name": "topic_id",
	    "_content": "The ID of the topic to fetch replies for."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of photos to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500."
	   }
	  ],
	  "optional": [
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Topic not found",
	    "_content": "The topic_id is invalid."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.groups.discuss.replies.getList",
	  "url": "https://www.flickr.com/services/api/flickr.groups.discuss.replies.getList.html"
	 },
	 "flickr.groups.discuss.topics.add": {
	  "required": [
	   {
	    "name": "group_id",
	    "_content": "The NSID of the group to add a topic to.\r\n"
	   },
	   {
	    "name": "subject",
	    "_content": "The topic subject."
	   },
	   {
	    "name": "message",
	    "_content": "The topic message."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Group not found",
	    "_content": "The group by that ID does not exist\r\n"
	   },
	   {
	    "code": "2",
	    "message": "Cannot post to group",
	    "_content": "Either this account is not a member of the group, or discussion in this group is disabled."
	   },
	   {
	    "code": "3",
	    "message": "Message is too long",
	    "_content": "The post message is too long."
	   },
	   {
	    "code": "4",
	    "message": "Missing required arguments",
	    "_content": "Subject and message are required."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.groups.discuss.topics.add",
	  "url": "https://www.flickr.com/services/api/flickr.groups.discuss.topics.add.html"
	 },
	 "flickr.groups.discuss.topics.getInfo": {
	  "required": [
	   {
	    "name": "topic_id",
	    "_content": "The ID for the topic to edit."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Topic not found",
	    "_content": "The topic_id is invalid"
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.groups.discuss.topics.getInfo",
	  "url": "https://www.flickr.com/services/api/flickr.groups.discuss.topics.getInfo.html"
	 },
	 "flickr.groups.discuss.topics.getList": {
	  "required": [
	   {
	    "name": "group_id",
	    "_content": "The NSID of the group to fetch information for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "per_page",
	    "_content": "Number of photos to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Group not found",
	    "_content": "The group_id is invalid"
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.groups.discuss.topics.getList",
	  "url": "https://www.flickr.com/services/api/flickr.groups.discuss.topics.getList.html"
	 },
	 "flickr.groups.getInfo": {
	  "required": [
	   {
	    "name": "group_id",
	    "_content": "The NSID of the group to fetch information for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "lang",
	    "_content": "The language of the group name and description to fetch.  If the language is not found, the primary language of the group will be returned.\r\n\r\nValid values are the same as <a href=\"/services/feeds/\">in feeds</a>."
	   },
	   {
	    "name": "secure_image_embeds",
	    "_content": "This argument will secure the external image embeds in all the markup and return a secure<Field> back in addition to the <Field>"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Group not found",
	    "_content": "The group NSID passed did not refer to a group that the calling user can see - either an invalid group is or a group that can't be seen by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.groups.getInfo",
	  "url": "https://www.flickr.com/services/api/flickr.groups.getInfo.html"
	 },
	 "flickr.groups.join": {
	  "required": [
	   {
	    "name": "group_id",
	    "_content": "The NSID of the Group in question"
	   }
	  ],
	  "optional": [
	   {
	    "name": "accept_rules",
	    "_content": "If the group has rules, they must be displayed to the user prior to joining. Passing a true value for this argument specifies that the application has displayed the group rules to the user, and that the user has agreed to them. (See flickr.groups.getInfo)."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required arguments missing",
	    "_content": "The group_id doesn't exist"
	   },
	   {
	    "code": "2",
	    "message": "Group does not exist",
	    "_content": "The Group does not exist"
	   },
	   {
	    "code": "3",
	    "message": "Group not availabie to the account",
	    "_content": "The authed account does not have permission to view/join the group."
	   },
	   {
	    "code": "4",
	    "message": "Account is already in that group",
	    "_content": "The authed account has previously joined this group"
	   },
	   {
	    "code": "5",
	    "message": "Membership in group is by invitation only.",
	    "_content": "Use flickr.groups.joinRequest to contact the administrations for an invitation."
	   },
	   {
	    "code": "6",
	    "message": "User must accept the group rules before joining",
	    "_content": "The user must read and accept the rules before joining. Please see the accept_rules argument for this method."
	   },
	   {
	    "code": "10",
	    "message": "Account in maximum number of groups",
	    "_content": "The account is a member of the maximum number of groups."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.groups.join",
	  "url": "https://www.flickr.com/services/api/flickr.groups.join.html"
	 },
	 "flickr.groups.joinRequest": {
	  "required": [
	   {
	    "name": "group_id",
	    "_content": "The NSID of the group to request joining."
	   },
	   {
	    "name": "message",
	    "_content": "Message to the administrators."
	   },
	   {
	    "name": "accept_rules",
	    "_content": "If the group has rules, they must be displayed to the user prior to joining. Passing a true value for this argument specifies that the application has displayed the group rules to the user, and that the user has agreed to them. (See flickr.groups.getInfo)."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required arguments missing",
	    "_content": "The group_id or message argument are missing."
	   },
	   {
	    "code": "2",
	    "message": "Group does not exist",
	    "_content": "The Group does not exist"
	   },
	   {
	    "code": "3",
	    "message": "Group not available to the account",
	    "_content": "The authed account does not have permission to view/join the group."
	   },
	   {
	    "code": "4",
	    "message": "Account is already in that group",
	    "_content": "The authed account has previously joined this group"
	   },
	   {
	    "code": "5",
	    "message": "Group is public and open",
	    "_content": "The group does not require an invitation to join, please use flickr.groups.join."
	   },
	   {
	    "code": "6",
	    "message": "User must accept the group rules before joining",
	    "_content": "The user must read and accept the rules before joining. Please see the accept_rules argument for this method."
	   },
	   {
	    "code": "7",
	    "message": "User has already requested to join that group",
	    "_content": "A request has already been sent and is pending approval."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.groups.joinRequest",
	  "url": "https://www.flickr.com/services/api/flickr.groups.joinRequest.html"
	 },
	 "flickr.groups.leave": {
	  "required": [
	   {
	    "name": "group_id",
	    "_content": "The NSID of the Group to leave"
	   }
	  ],
	  "optional": [
	   {
	    "name": "delete_photos",
	    "_content": "Delete all photos by this user from the group"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required arguments missing",
	    "_content": "The group_id doesn't exist"
	   },
	   {
	    "code": "2",
	    "message": "Group does not exist",
	    "_content": "The group by that ID does not exist"
	   },
	   {
	    "code": "3",
	    "message": "Account is not in that group",
	    "_content": "The user is not a member of the group that was specified"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 3
	  },
	  "name": "flickr.groups.leave",
	  "url": "https://www.flickr.com/services/api/flickr.groups.leave.html"
	 },
	 "flickr.groups.members.getList": {
	  "required": [
	   {
	    "name": "group_id",
	    "_content": "Return a list of members for this group.  The group must be viewable by the Flickr member on whose behalf the API call is made."
	   }
	  ],
	  "optional": [
	   {
	    "name": "membertypes",
	    "_content": "Comma separated list of member types\r\n<ul>\r\n<li>2: member</li>\r\n<li>3: moderator</li>\r\n<li>4: admin</li>\r\n</ul>\r\nBy default returns all types.  (Returning super rare member type \"1: narwhal\" isn't supported by this API method)"
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of members to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Group not found",
	    "_content": ""
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.groups.members.getList",
	  "url": "https://www.flickr.com/services/api/flickr.groups.members.getList.html"
	 },
	 "flickr.groups.pools.add": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to add to the group pool. The photo must belong to the calling user."
	   },
	   {
	    "name": "group_id",
	    "_content": "The NSID of the group who's pool the photo is to be added to."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not the id of a photo owned by the caling user."
	   },
	   {
	    "code": "2",
	    "message": "Group not found",
	    "_content": "The group id passed was not a valid id for a group the user is a member of."
	   },
	   {
	    "code": "3",
	    "message": "Photo already in pool",
	    "_content": "The specified photo is already in the pool for the specified group."
	   },
	   {
	    "code": "4",
	    "message": "Photo in maximum number of pools",
	    "_content": "The photo has already been added to the maximum allowed number of pools."
	   },
	   {
	    "code": "5",
	    "message": "Photo limit reached",
	    "_content": "The user has already added the maximum amount of allowed photos to the pool."
	   },
	   {
	    "code": "6",
	    "message": "Your Photo has been added to the Pending Queue for this Pool",
	    "_content": "The pool is moderated, and the photo has been added to the Pending Queue. If it is approved by a group administrator, it will be added to the pool."
	   },
	   {
	    "code": "7",
	    "message": "Your Photo has already been added to the Pending Queue for this Pool",
	    "_content": "The pool is moderated, and the photo has already been added to the Pending Queue."
	   },
	   {
	    "code": "8",
	    "message": "Content not allowed",
	    "_content": "The content has been disallowed from the pool by the group admin(s)."
	   },
	   {
	    "code": "10",
	    "message": "Maximum number of photos in Group Pool",
	    "_content": "A group pool has reached the upper limit for the number of photos allowed."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.groups.pools.add",
	  "url": "https://www.flickr.com/services/api/flickr.groups.pools.add.html"
	 },
	 "flickr.groups.pools.getContext": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to fetch the context for."
	   },
	   {
	    "name": "group_id",
	    "_content": "The nsid of the group who's pool to fetch the photo's context for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "num_prev",
	    "_content": ""
	   },
	   {
	    "name": "num_next",
	    "_content": ""
	   },
	   {
	    "name": "extras",
	    "_content": "A comma-delimited list of extra information to fetch for each returned record. Currently supported fields are: description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_z, url_l, url_o"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id, or was the id of a photo that the calling user does not have permission to view."
	   },
	   {
	    "code": "2",
	    "message": "Photo not in pool",
	    "_content": "The specified photo is not in the specified group's pool."
	   },
	   {
	    "code": "3",
	    "message": "Group not found",
	    "_content": "The specified group nsid was not a valid group or the caller does not have permission to view the group's pool."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.groups.pools.getContext",
	  "url": "https://www.flickr.com/services/api/flickr.groups.pools.getContext.html"
	 },
	 "flickr.groups.pools.getGroups": {
	  "optional": [
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of groups to return per page. If this argument is omitted, it defaults to 400. The maximum allowed value is 400."
	   },
	   {
	    "name": "extras",
	    "_content": "can take the value icon_urls_deep and return the various buddy icon sizes for the group. It can only be done by blessed APIs"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.groups.pools.getGroups",
	  "url": "https://www.flickr.com/services/api/flickr.groups.pools.getGroups.html"
	 },
	 "flickr.groups.pools.getPhotos": {
	  "required": [
	   {
	    "name": "group_id",
	    "_content": "The id of the group who's pool you which to get the photo list for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "tags",
	    "_content": "A tag to filter the pool with. At the moment only one tag at a time is supported."
	   },
	   {
	    "name": "user_id",
	    "_content": "The nsid of a user. Specifiying this parameter will retrieve for you only those photos that the user has contributed to the group pool."
	   },
	   {
	    "name": "safe_search",
	    "_content": "Safe search setting:\r\n<ul>\r\n<li>1 for safe.</li>\r\n<li>2 for moderate.</li>\r\n<li>3 for restricted.</li>\r\n</ul>"
	   },
	   {
	    "name": "jump_to",
	    "_content": ""
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Group not found",
	    "_content": "The group id passed was not a valid group id."
	   },
	   {
	    "code": "2",
	    "message": "You don't have permission to view this pool",
	    "_content": "The logged in user (if any) does not have permission to view the pool for this group."
	   },
	   {
	    "code": "3",
	    "message": "Unknown user",
	    "_content": "The user specified by user_id does not exist."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.groups.pools.getPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.groups.pools.getPhotos.html"
	 },
	 "flickr.groups.pools.remove": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to remove from the group pool. The photo must either be owned by the calling user of the calling user must be an administrator of the group."
	   },
	   {
	    "name": "group_id",
	    "_content": "The NSID of the group who's pool the photo is to removed from."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Group not found",
	    "_content": "The group_id passed did not refer to a valid group."
	   },
	   {
	    "code": "2",
	    "message": "Photo not in pool",
	    "_content": "The photo_id passed was not a valid id of a photo in the group pool."
	   },
	   {
	    "code": "3",
	    "message": "Insufficient permission to remove photo",
	    "_content": "The calling user doesn't own the photo and is not an administrator of the group, so may not remove the photo from the pool."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.groups.pools.remove",
	  "url": "https://www.flickr.com/services/api/flickr.groups.pools.remove.html"
	 },
	 "flickr.groups.search": {
	  "required": [
	   {
	    "name": "text",
	    "_content": "The text to search for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "per_page",
	    "_content": "Number of groups to return per page. If this argument is ommited, it defaults to 100. The maximum allowed value is 500."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is ommited, it defaults to 1. "
	   },
	   {
	    "name": "user_id",
	    "_content": "NSID of the user, if you want to restrict your search by the groups this user is a member of. NOTE : This is experimental, and only search within the currently signed in user's groups is supported. "
	   },
	   {
	    "name": "safe_search",
	    "_content": "safe_search =1 means only safe groups\r\nsafe_search =2 means all groups\r\nsafe_search =3 means only 18+ groups\r\nDefault is 1. \r\n"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "No text passed",
	    "_content": "The required text argument was ommited."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.groups.search",
	  "url": "https://www.flickr.com/services/api/flickr.groups.search.html"
	 },
	 "flickr.interestingness.getList": {
	  "optional": [
	   {
	    "name": "date",
	    "_content": "A specific date, formatted as YYYY-MM-DD, to return interesting photos for."
	   },
	   {
	    "name": "use_panda",
	    "_content": "Always ask the pandas for interesting photos. This is a temporary argument to allow developers to update their code."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Not a valid date string.",
	    "_content": "The date string passed did not validate. All dates must be formatted : YYYY-MM-DD"
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.interestingness.getList",
	  "url": "https://www.flickr.com/services/api/flickr.interestingness.getList.html"
	 },
	 "flickr.machinetags.getNamespaces": {
	  "optional": [
	   {
	    "name": "predicate",
	    "_content": "Limit the list of namespaces returned to those that have the following predicate."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of photos to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Not a valid predicate.",
	    "_content": "Missing or invalid predicate argument."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.machinetags.getNamespaces",
	  "url": "https://www.flickr.com/services/api/flickr.machinetags.getNamespaces.html"
	 },
	 "flickr.machinetags.getPairs": {
	  "optional": [
	   {
	    "name": "namespace",
	    "_content": "Limit the list of pairs returned to those that have the following namespace."
	   },
	   {
	    "name": "predicate",
	    "_content": "Limit the list of pairs returned to those that have the following predicate."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of photos to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Not a valid namespace",
	    "_content": "Missing or invalid namespace argument."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid predicate",
	    "_content": "Missing or invalid predicate argument."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.machinetags.getPairs",
	  "url": "https://www.flickr.com/services/api/flickr.machinetags.getPairs.html"
	 },
	 "flickr.machinetags.getPredicates": {
	  "optional": [
	   {
	    "name": "namespace",
	    "_content": "Limit the list of predicates returned to those that have the following namespace."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of photos to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Not a valid namespace",
	    "_content": "Missing or invalid namespace argument."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.machinetags.getPredicates",
	  "url": "https://www.flickr.com/services/api/flickr.machinetags.getPredicates.html"
	 },
	 "flickr.machinetags.getRecentValues": {
	  "optional": [
	   {
	    "name": "namespace",
	    "_content": "A namespace that all values should be restricted to."
	   },
	   {
	    "name": "predicate",
	    "_content": "A predicate that all values should be restricted to."
	   },
	   {
	    "name": "added_since",
	    "_content": "Only return machine tags values that have been added since this timestamp, in epoch seconds.  "
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.machinetags.getRecentValues",
	  "url": "https://www.flickr.com/services/api/flickr.machinetags.getRecentValues.html"
	 },
	 "flickr.machinetags.getValues": {
	  "required": [
	   {
	    "name": "namespace",
	    "_content": "The namespace that all values should be restricted to."
	   },
	   {
	    "name": "predicate",
	    "_content": "The predicate that all values should be restricted to."
	   }
	  ],
	  "optional": [
	   {
	    "name": "per_page",
	    "_content": "Number of photos to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   },
	   {
	    "name": "usage",
	    "_content": "Minimum usage count."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Not a valid namespace",
	    "_content": "Missing or invalid namespace argument."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid predicate",
	    "_content": "Missing or invalid predicate argument."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.machinetags.getValues",
	  "url": "https://www.flickr.com/services/api/flickr.machinetags.getValues.html"
	 },
	 "flickr.panda.getList": {
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.panda.getList",
	  "url": "https://www.flickr.com/services/api/flickr.panda.getList.html"
	 },
	 "flickr.panda.getPhotos": {
	  "required": [
	   {
	    "name": "panda_name",
	    "_content": "The name of the panda to ask for photos from. There are currently three pandas named:<br /><br />\r\n\r\n<ul>\r\n<li><strong><a href=\"http://flickr.com/photos/ucumari/126073203/\">ling ling</a></strong></li>\r\n<li><strong><a href=\"http://flickr.com/photos/lynnehicks/136407353\">hsing hsing</a></strong></li>\r\n<li><strong><a href=\"http://flickr.com/photos/perfectpandas/1597067182/\">wang wang</a></strong></li>\r\n</ul>\r\n\r\n<br />You can fetch a list of all the current pandas using the <a href=\"/services/api/flickr.panda.getList.html\">flickr.panda.getList</a> API method."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing.",
	    "_content": "One or more required parameters was not included with your request."
	   },
	   {
	    "code": "2",
	    "message": "Unknown panda",
	    "_content": "You requested a panda we haven't met yet."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.panda.getPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.panda.getPhotos.html"
	 },
	 "flickr.people.findByEmail": {
	  "required": [
	   {
	    "name": "find_email",
	    "_content": "The email address of the user to find  (may be primary or secondary)."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "No user with the supplied email address was found."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.people.findByEmail",
	  "url": "https://www.flickr.com/services/api/flickr.people.findByEmail.html"
	 },
	 "flickr.people.findByUsername": {
	  "required": [
	   {
	    "name": "username",
	    "_content": "The username of the user to lookup."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "No user with the supplied username was found."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.people.findByUsername",
	  "url": "https://www.flickr.com/services/api/flickr.people.findByUsername.html"
	 },
	 "flickr.people.getGroups": {
	  "required": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to fetch groups for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "extras",
	    "_content": "A comma-delimited list of extra information to fetch for each returned record. Currently supported fields are: <code>privacy</code>, <code>throttle</code>, <code>restrictions</code>"
	   },
	   {
	    "name": "page",
	    "_content": "Page number for the groups"
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of groups per page"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The user id passed did not match a Flickr user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.people.getGroups",
	  "url": "https://www.flickr.com/services/api/flickr.people.getGroups.html"
	 },
	 "flickr.people.getInfo": {
	  "required": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to fetch information about."
	   },
	   {
	    "name": "url",
	    "_content": "As an alternative to user_id, load a member based on URL, either photos or people URL."
	   }
	  ],
	  "optional": [
	   {
	    "name": "fb_connected",
	    "_content": "If set to 1, it checks if the user is connected to Facebook and returns that information back."
	   },
	   {
	    "name": "storage",
	    "_content": "If set to 1, it returns the storage information about the user, like the storage used and storage available."
	   },
	   {
	    "name": "datecreate",
	    "_content": "If set to 1, it returns the timestamp of the user's account creation, in MySQL DATETIME format."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The user id passed did not match a Flickr user."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.people.getInfo",
	  "url": "https://www.flickr.com/services/api/flickr.people.getInfo.html"
	 },
	 "flickr.people.getLimits": {
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.people.getLimits",
	  "url": "https://www.flickr.com/services/api/flickr.people.getLimits.html"
	 },
	 "flickr.people.getPhotos": {
	  "required": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user who's photos to return. A value of \"me\" will return the calling user's photos."
	   }
	  ],
	  "optional": [
	   {
	    "name": "safe_search",
	    "_content": "Safe search setting:\r\n\r\n<ul>\r\n<li>1 for safe.</li>\r\n<li>2 for moderate.</li>\r\n<li>3 for restricted.</li>\r\n</ul>\r\n\r\n(Please note: Un-authed calls can only see Safe content.)"
	   },
	   {
	    "name": "min_upload_date",
	    "_content": "Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "max_upload_date",
	    "_content": "Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "min_taken_date",
	    "_content": "Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   },
	   {
	    "name": "max_taken_date",
	    "_content": "Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   },
	   {
	    "name": "content_type",
	    "_content": "Content Type setting:\r\n<ul>\r\n<li>1 for photos only.</li>\r\n<li>2 for screenshots only.</li>\r\n<li>3 for 'other' only.</li>\r\n<li>4 for photos and screenshots.</li>\r\n<li>5 for screenshots and 'other'.</li>\r\n<li>6 for photos and 'other'.</li>\r\n<li>7 for photos, screenshots, and 'other' (all).</li>\r\n</ul>"
	   },
	   {
	    "name": "privacy_filter",
	    "_content": "Return photos only matching a certain privacy level. This only applies when making an authenticated call to view photos you own. Valid values are:\r\n<ul>\r\n<li>1 public photos</li>\r\n<li>2 private photos visible to friends</li>\r\n<li>3 private photos visible to family</li>\r\n<li>4 private photos visible to friends & family</li>\r\n<li>5 completely private photos</li>\r\n</ul>"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required arguments missing",
	    "_content": ""
	   },
	   {
	    "code": "2",
	    "message": "Unknown user",
	    "_content": "A user_id was passed which did not match a valid flickr user."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.people.getPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.people.getPhotos.html"
	 },
	 "flickr.people.getPhotosOf": {
	  "required": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user you want to find photos of. A value of \"me\" will search against photos of the calling user, for authenticated calls."
	   }
	  ],
	  "optional": [
	   {
	    "name": "owner_id",
	    "_content": "An NSID of a Flickr member. This will restrict the list of photos to those taken by that member."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found.",
	    "_content": "A user_id was passed which did not match a valid flickr user."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.people.getPhotosOf",
	  "url": "https://www.flickr.com/services/api/flickr.people.getPhotosOf.html"
	 },
	 "flickr.people.getPublicGroups": {
	  "required": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to fetch groups for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "invitation_only",
	    "_content": "Include public groups that require <a href=\"http://www.flickr.com/help/groups/#10\">an invitation</a> or administrator approval to join."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The user id passed did not match a Flickr user."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.people.getPublicGroups",
	  "url": "https://www.flickr.com/services/api/flickr.people.getPublicGroups.html"
	 },
	 "flickr.people.getPublicPhotos": {
	  "required": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user who's photos to return."
	   }
	  ],
	  "optional": [
	   {
	    "name": "safe_search",
	    "_content": "Safe search setting:\r\n\r\n<ul>\r\n<li>1 for safe.</li>\r\n<li>2 for moderate.</li>\r\n<li>3 for restricted.</li>\r\n</ul>\r\n\r\n(Please note: Un-authed calls can only see Safe content.)"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The user NSID passed was not a valid user NSID."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.people.getPublicPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.people.getPublicPhotos.html"
	 },
	 "flickr.people.getUploadStatus": {
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.people.getUploadStatus",
	  "url": "https://www.flickr.com/services/api/flickr.people.getUploadStatus.html"
	 },
	 "flickr.photos.addTags": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to add tags to."
	   },
	   {
	    "name": "tags",
	    "_content": "The tags to add to the photo."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not the id of a photo that the calling user can add tags to. It could be an invalid id, or the user may not have permission to add tags to it."
	   },
	   {
	    "code": "2",
	    "message": "Maximum number of tags reached",
	    "_content": "The maximum number of tags for the photo has been reached - no more tags can be added. If the current count is less than the maximum, but adding all of the tags for this request would go over the limit, the whole request is ignored. I.E. when you get this message, none of the requested tags have been added."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.addTags",
	  "url": "https://www.flickr.com/services/api/flickr.photos.addTags.html"
	 },
	 "flickr.photos.comments.addComment": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to add a comment to."
	   },
	   {
	    "name": "comment_text",
	    "_content": "Text of the comment"
	   }
	  ],
	  "optional": [
	   {
	    "name": "secure_image_embeds",
	    "_content": "This argument will secure the external image embeds in all the markup and return a secure<Field> back in addition to the <Field>"
	   },
	   {
	    "name": "expand_bbml",
	    "_content": "Expand bbml in response"
	   },
	   {
	    "name": "bbml_need_all_photo_sizes",
	    "_content": "If the API needs all photo sizes added as attributes to the bbml. Use this with expand_bbml, but dont use it with use_text_for_links. Also when you give this one, you can specify primary_photo_longest_dimension or a default of 240 will be assumed"
	   },
	   {
	    "name": "primary_photo_longest_dimension",
	    "_content": "When used with bbml_need_all_photo_sizes, it specifies the maximum dimension of width and height to be used as the <img src /> url"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found.",
	    "_content": "The photo id passed was not a valid photo id"
	   },
	   {
	    "code": "8",
	    "message": "Blank comment.",
	    "_content": "Comment text can not be blank"
	   },
	   {
	    "code": "9",
	    "message": "User is posting comments too fast.",
	    "_content": "The user has reached the limit for number of comments posted during a specific time period.  Wait a bit and try again."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.comments.addComment",
	  "url": "https://www.flickr.com/services/api/flickr.photos.comments.addComment.html"
	 },
	 "flickr.photos.comments.deleteComment": {
	  "required": [
	   {
	    "name": "comment_id",
	    "_content": "The id of the comment to edit."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found.",
	    "_content": "The requested comment is against a photo which no longer exists."
	   },
	   {
	    "code": "2",
	    "message": "Comment not found.",
	    "_content": "The comment id passed was not a valid comment id"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.comments.deleteComment",
	  "url": "https://www.flickr.com/services/api/flickr.photos.comments.deleteComment.html"
	 },
	 "flickr.photos.comments.editComment": {
	  "required": [
	   {
	    "name": "comment_id",
	    "_content": "The id of the comment to edit."
	   },
	   {
	    "name": "comment_text",
	    "_content": "Update the comment to this text."
	   }
	  ],
	  "optional": [
	   {
	    "name": "use_text_for_links",
	    "_content": "Use text for links"
	   },
	   {
	    "name": "expand_bbml",
	    "_content": "Expand bbml"
	   },
	   {
	    "name": "full_result",
	    "_content": "If the caller wants the full result to be returned (as flickr.photos.comments.getComment), then this parameter should be passed in as 1."
	   },
	   {
	    "name": "secure_image_embeds",
	    "_content": "This argument will secure the external image embeds in all the markup and return a secure<Field> back in addition to the <Field>"
	   },
	   {
	    "name": "bbml_need_all_photo_sizes",
	    "_content": "If the API needs all photo sizes added as attributes to the bbml. Use this with expand_bbml, but dont use it with use_text_for_links. Also when you give this one, you can specify primary_photo_longest_dimension or a default of 240 will be assumed"
	   },
	   {
	    "name": "primary_photo_longest_dimension",
	    "_content": "When used with bbml_need_all_photo_sizes, it specifies the maximum dimension of width and height to be used as the <img src /> url"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found.",
	    "_content": "The requested comment is against a photo which no longer exists."
	   },
	   {
	    "code": "2",
	    "message": "Comment not found.",
	    "_content": "The comment id passed was not a valid comment id"
	   },
	   {
	    "code": "8",
	    "message": "Blank comment.",
	    "_content": "Comment text can not be blank"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.comments.editComment",
	  "url": "https://www.flickr.com/services/api/flickr.photos.comments.editComment.html"
	 },
	 "flickr.photos.comments.getList": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to fetch comments for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "min_comment_date",
	    "_content": "Minimum date that a a comment was added. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "max_comment_date",
	    "_content": "Maximum date that a comment was added. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "page",
	    "_content": ""
	   },
	   {
	    "name": "per_page",
	    "_content": ""
	   },
	   {
	    "name": "include_faves",
	    "_content": ""
	   },
	   {
	    "name": "sort",
	    "_content": "Get the comments sorted. If value is date-posted-desc,  the comments are returned in reverse chronological order. The default is chronological."
	   },
	   {
	    "name": "secure_image_embeds",
	    "_content": "This argument will secure the external image embeds in all the markup and return a secure<Field> back in addition to the <Field>"
	   },
	   {
	    "name": "offset",
	    "_content": ""
	   },
	   {
	    "name": "limit",
	    "_content": ""
	   },
	   {
	    "name": "bbml_need_all_photo_sizes",
	    "_content": "If the API needs all photo sizes added as attributes to the bbml. Use this with expand_bbml, but dont use it with use_text_for_links. Also when you give this one, you can specify primary_photo_longest_dimension or a default of 240 will be assumed"
	   },
	   {
	    "name": "primary_photo_longest_dimension",
	    "_content": "When used with bbml_need_all_photo_sizes, it specifies the maximum dimension of width and height to be used as the <img src /> url"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.comments.getList",
	  "url": "https://www.flickr.com/services/api/flickr.photos.comments.getList.html"
	 },
	 "flickr.photos.comments.getRecentForContacts": {
	  "optional": [
	   {
	    "name": "date_lastcomment",
	    "_content": "Limits the resultset to photos that have been commented on since this date. The date should be in the form of a Unix timestamp.<br /><br />\r\nThe default, and maximum, offset is (1) hour.\r\n\r\n\r\n"
	   },
	   {
	    "name": "contacts_filter",
	    "_content": "A comma-separated list of contact NSIDs to limit the scope of the query to."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.comments.getRecentForContacts",
	  "url": "https://www.flickr.com/services/api/flickr.photos.comments.getRecentForContacts.html"
	 },
	 "flickr.photos.delete": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to delete."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id was not the id of a photo belonging to the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 3
	  },
	  "name": "flickr.photos.delete",
	  "url": "https://www.flickr.com/services/api/flickr.photos.delete.html"
	 },
	 "flickr.photos.geo.batchCorrectLocation": {
	  "required": [
	   {
	    "name": "lat",
	    "_content": "The latitude of the photos to be update whose valid range is -90 to 90. Anything more than 6 decimal places will be truncated."
	   },
	   {
	    "name": "lon",
	    "_content": "The longitude of the photos to be updated whose valid range is -180 to 180. Anything more than 6 decimal places will be truncated."
	   },
	   {
	    "name": "accuracy",
	    "_content": "Recorded accuracy level of the photos to be updated. World level is 1, Country is ~3, Region ~6, City ~11, Street ~16. Current range is 1-16. Defaults to 16 if not specified."
	   }
	  ],
	  "optional": [
	   {
	    "name": "place_id",
	    "_content": "A Flickr Places ID. (While optional, you must pass either a valid Places ID or a WOE ID.)"
	   },
	   {
	    "name": "woe_id",
	    "_content": "A Where On Earth (WOE) ID. (While optional, you must pass either a valid Places ID or a WOE ID.)"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required arguments missing",
	    "_content": "Some or all of the required arguments were not supplied."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid latitude",
	    "_content": "The latitude argument failed validation."
	   },
	   {
	    "code": "3",
	    "message": "Not a valid longitude",
	    "_content": "The longitude argument failed validation."
	   },
	   {
	    "code": "4",
	    "message": "Not a valid accuracy",
	    "_content": "The accuracy argument failed validation."
	   },
	   {
	    "code": "5",
	    "message": "Not a valid Places ID",
	    "_content": "An invalid Places (or WOE) ID was passed with the API call."
	   },
	   {
	    "code": "6",
	    "message": "No photos geotagged at that location",
	    "_content": "There were no geotagged photos found for the authed user at the supplied latitude, longitude and accuracy."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.geo.batchCorrectLocation",
	  "url": "https://www.flickr.com/services/api/flickr.photos.geo.batchCorrectLocation.html"
	 },
	 "flickr.photos.geo.correctLocation": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The ID of the photo whose WOE location is being corrected."
	   },
	   {
	    "name": "foursquare_id",
	    "_content": "The venue ID for a Foursquare location. (If not passed in with correction, any existing foursquare venue will be removed)."
	   }
	  ],
	  "optional": [
	   {
	    "name": "place_id",
	    "_content": "A Flickr Places ID. (While optional, you must pass either a valid Places ID or a WOE ID.)"
	   },
	   {
	    "name": "woe_id",
	    "_content": "A Where On Earth (WOE) ID. (While optional, you must pass either a valid Places ID or a WOE ID.)"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User has not configured default viewing settings for location data.",
	    "_content": "Before users may assign location data to a photo they must define who, by default, may view that information. Users can edit this preference at <a href=\"http://www.flickr.com/account/geo/privacy/\">http://www.flickr.com/account/geo/privacy/</a>"
	   },
	   {
	    "code": "2",
	    "message": "Missing place ID",
	    "_content": "No place ID was passed to the method"
	   },
	   {
	    "code": "3",
	    "message": "Not a valid place ID",
	    "_content": "The place ID passed to the method could not be identified"
	   },
	   {
	    "code": "4",
	    "message": "Server error correcting location.",
	    "_content": "There was an error trying to correct the location."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.geo.correctLocation",
	  "url": "https://www.flickr.com/services/api/flickr.photos.geo.correctLocation.html"
	 },
	 "flickr.photos.geo.getLocation": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo you want to retrieve location data for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "extras",
	    "_content": "Extra flags."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found.",
	    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Photo has no location information.",
	    "_content": "The photo requested has no location data or is not viewable by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.geo.getLocation",
	  "url": "https://www.flickr.com/services/api/flickr.photos.geo.getLocation.html"
	 },
	 "flickr.photos.geo.getPerms": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to get permissions for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Photo has no location information",
	    "_content": "The photo requested has no location data or is not viewable by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.geo.getPerms",
	  "url": "https://www.flickr.com/services/api/flickr.photos.geo.getPerms.html"
	 },
	 "flickr.photos.geo.photosForLocation": {
	  "required": [
	   {
	    "name": "lat",
	    "_content": "The latitude whose valid range is -90 to 90. Anything more than 6 decimal places will be truncated."
	   },
	   {
	    "name": "lon",
	    "_content": "The longitude whose valid range is -180 to 180. Anything more than 6 decimal places will be truncated."
	   }
	  ],
	  "optional": [
	   {
	    "name": "accuracy",
	    "_content": "Recorded accuracy level of the location information. World level is 1, Country is ~3, Region ~6, City ~11, Street ~16. Current range is 1-16. Defaults to 16 if not specified."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required arguments missing",
	    "_content": "One or more required arguments was missing from the method call."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid latitude",
	    "_content": "The latitude argument failed validation."
	   },
	   {
	    "code": "3",
	    "message": "Not a valid longitude",
	    "_content": "The longitude argument failed validation."
	   },
	   {
	    "code": "4",
	    "message": "Not a valid accuracy",
	    "_content": "The accuracy argument failed validation."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.geo.photosForLocation",
	  "url": "https://www.flickr.com/services/api/flickr.photos.geo.photosForLocation.html"
	 },
	 "flickr.photos.geo.removeLocation": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo you want to remove location data from."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Photo has no location information",
	    "_content": "The specified photo has not been geotagged - there is nothing to remove."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.geo.removeLocation",
	  "url": "https://www.flickr.com/services/api/flickr.photos.geo.removeLocation.html"
	 },
	 "flickr.photos.geo.setContext": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to set context data for."
	   },
	   {
	    "name": "context",
	    "_content": "Context is a numeric value representing the photo's geotagginess beyond latitude and longitude. For example, you may wish to indicate that a photo was taken \"indoors\" or \"outdoors\". <br /><br />\r\nThe current list of context IDs is :<br /><br/>\r\n<ul>\r\n<li><strong>0</strong>, not defined.</li>\r\n<li><strong>1</strong>, indoors.</li>\r\n<li><strong>2</strong>, outdoors.</li>\r\n</ul>"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid context",
	    "_content": "The context ID passed to the method is invalid."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.geo.setContext",
	  "url": "https://www.flickr.com/services/api/flickr.photos.geo.setContext.html"
	 },
	 "flickr.photos.geo.setLocation": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to set location data for."
	   },
	   {
	    "name": "lat",
	    "_content": "The latitude whose valid range is -90 to 90. Anything more than 6 decimal places will be truncated."
	   },
	   {
	    "name": "lon",
	    "_content": "The longitude whose valid range is -180 to 180. Anything more than 6 decimal places will be truncated."
	   }
	  ],
	  "optional": [
	   {
	    "name": "accuracy",
	    "_content": "Recorded accuracy level of the location information. World level is 1, Country is ~3, Region ~6, City ~11, Street ~16. Current range is 1-16. Defaults to 16 if not specified."
	   },
	   {
	    "name": "context",
	    "_content": "Context is a numeric value representing the photo's geotagginess beyond latitude and longitude. For example, you may wish to indicate that a photo was taken \"indoors\" or \"outdoors\". <br /><br />\r\nThe current list of context IDs is :<br /><br/>\r\n<ul>\r\n<li><strong>0</strong>, not defined.</li>\r\n<li><strong>1</strong>, indoors.</li>\r\n<li><strong>2</strong>, outdoors.</li>\r\n</ul><br />\r\nThe default context for geotagged photos is 0, or \"not defined\"\r\n"
	   },
	   {
	    "name": "bookmark_id",
	    "_content": "Associate a geo bookmark with this photo."
	   },
	   {
	    "name": "is_public",
	    "_content": ""
	   },
	   {
	    "name": "is_contact",
	    "_content": ""
	   },
	   {
	    "name": "is_friend",
	    "_content": ""
	   },
	   {
	    "name": "is_family",
	    "_content": ""
	   },
	   {
	    "name": "foursquare_id",
	    "_content": "The venue ID for a Foursquare location."
	   },
	   {
	    "name": "woeid",
	    "_content": "A Where On Earth (WOE) ID. (If passed in, will override the default venue based on the lat/lon.)"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Required arguments missing.",
	    "_content": "Some or all of the required arguments were not supplied."
	   },
	   {
	    "code": "3",
	    "message": "Not a valid latitude.",
	    "_content": "The latitude argument failed validation."
	   },
	   {
	    "code": "4",
	    "message": "Not a valid longitude.",
	    "_content": "The longitude argument failed validation."
	   },
	   {
	    "code": "5",
	    "message": "Not a valid accuracy.",
	    "_content": "The accuracy argument failed validation."
	   },
	   {
	    "code": "6",
	    "message": "Server error.",
	    "_content": "There was an unexpected problem setting location information to the photo."
	   },
	   {
	    "code": "7",
	    "message": "User has not configured default viewing settings for location data.",
	    "_content": "Before users may assign location data to a photo they must define who, by default, may view that information. Users can edit this preference at <a href=\"http://www.flickr.com/account/geo/privacy/\">http://www.flickr.com/account/geo/privacy/</a>"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.geo.setLocation",
	  "url": "https://www.flickr.com/services/api/flickr.photos.geo.setLocation.html"
	 },
	 "flickr.photos.geo.setPerms": {
	  "required": [
	   {
	    "name": "is_public",
	    "_content": "1 to set viewing permissions for the photo's location data to public, 0 to set it to private."
	   },
	   {
	    "name": "is_contact",
	    "_content": "1 to set viewing permissions for the photo's location data to contacts, 0 to set it to private."
	   },
	   {
	    "name": "is_friend",
	    "_content": "1 to set viewing permissions for the photo's location data to friends, 0 to set it to private."
	   },
	   {
	    "name": "is_family",
	    "_content": "1 to set viewing permissions for the photo's location data to family, 0 to set it to private."
	   },
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to get permissions for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Photo has no location information",
	    "_content": "The photo requested has no location data or is not viewable by the calling user."
	   },
	   {
	    "code": "3",
	    "message": "Required arguments missing.",
	    "_content": "Some or all of the required arguments were not supplied."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.geo.setPerms",
	  "url": "https://www.flickr.com/services/api/flickr.photos.geo.setPerms.html"
	 },
	 "flickr.photos.getAllContexts": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The photo to return information for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not the id of a valid photo."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.getAllContexts",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getAllContexts.html"
	 },
	 "flickr.photos.getContactsPhotos": {
	  "optional": [
	   {
	    "name": "count",
	    "_content": "Number of photos to return. Defaults to 10, maximum 50. This is only used if <code>single_photo</code> is not passed."
	   },
	   {
	    "name": "just_friends",
	    "_content": "set as 1 to only show photos from friends and family (excluding regular contacts)."
	   },
	   {
	    "name": "single_photo",
	    "_content": "Only fetch one photo (the latest) per contact, instead of all photos in chronological order."
	   },
	   {
	    "name": "include_self",
	    "_content": "Set to 1 to include photos from the calling user."
	   },
	   {
	    "name": "extras",
	    "_content": "A comma-delimited list of extra information to fetch for each returned record. Currently supported fields include: license, date_upload, date_taken, owner_name, icon_server, original_format, last_update. For more information see extras under <a href=\"/services/api/flickr.photos.search.html\">flickr.photos.search</a>."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.getContactsPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getContactsPhotos.html"
	 },
	 "flickr.photos.getContactsPublicPhotos": {
	  "required": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to fetch photos for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "count",
	    "_content": "Number of photos to return. Defaults to 10, maximum 50. This is only used if <code>single_photo</code> is not passed."
	   },
	   {
	    "name": "just_friends",
	    "_content": "set as 1 to only show photos from friends and family (excluding regular contacts)."
	   },
	   {
	    "name": "single_photo",
	    "_content": "Only fetch one photo (the latest) per contact, instead of all photos in chronological order."
	   },
	   {
	    "name": "include_self",
	    "_content": "Set to 1 to include photos from the user specified by user_id."
	   },
	   {
	    "name": "extras",
	    "_content": "A comma-delimited list of extra information to fetch for each returned record. Currently supported fields are: license, date_upload, date_taken, owner_name, icon_server, original_format, last_update."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The user NSID passed was not a valid user NSID."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.getContactsPublicPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getContactsPublicPhotos.html"
	 },
	 "flickr.photos.getContext": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to fetch the context for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "num_prev",
	    "_content": ""
	   },
	   {
	    "name": "num_next",
	    "_content": ""
	   },
	   {
	    "name": "extras",
	    "_content": "A comma-delimited list of extra information to fetch for each returned record. Currently supported fields are: <code>description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_z, url_l, url_o</code>"
	   },
	   {
	    "name": "order_by",
	    "_content": "Accepts <code>datetaken</code> or <code>dateposted</code> and returns results in the proper order."
	   },
	   {
	    "name": "view_as",
	    "_content": "Can take values public to indicate that the profile has to be viewed as public and returns context only in public setting"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id, or was the id of a photo that the calling user does not have permission to view."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.getContext",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getContext.html"
	 },
	 "flickr.photos.getCounts": {
	  "optional": [
	   {
	    "name": "dates",
	    "_content": "A comma delimited list of unix timestamps, denoting the periods to return counts for. They should be specified <b>smallest first</b>."
	   },
	   {
	    "name": "taken_dates",
	    "_content": "A comma delimited list of mysql datetimes, denoting the periods to return counts for. They should be specified <b>smallest first</b>."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "No dates specified",
	    "_content": "Neither dates nor taken_dates were specified."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.getCounts",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getCounts.html"
	 },
	 "flickr.photos.getExif": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to fetch information for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "secret",
	    "_content": "The secret for the photo. If the correct secret is passed then permissions checking is skipped. This enables the 'sharing' of individual photos by passing around the id and secret."
	   },
	   {
	    "name": "extras",
	    "_content": ""
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Permission denied",
	    "_content": "The owner of the photo does not want to share EXIF data."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.getExif",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getExif.html"
	 },
	 "flickr.photos.getFavorites": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The ID of the photo to fetch the favoriters list for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of usres to return per page. If this argument is omitted, it defaults to 10. The maximum allowed value is 50."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The specified photo does not exist, or the calling user does not have permission to view it."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.getFavorites",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getFavorites.html"
	 },
	 "flickr.photos.getInfo": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to get information for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "secret",
	    "_content": "The secret for the photo. If the correct secret is passed then permissions checking is skipped. This enables the 'sharing' of individual photos by passing around the id and secret."
	   },
	   {
	    "name": "humandates",
	    "_content": ""
	   },
	   {
	    "name": "privacy_filter",
	    "_content": ""
	   },
	   {
	    "name": "get_contexts",
	    "_content": ""
	   },
	   {
	    "name": "get_geofences",
	    "_content": "Return geofence information in the photo's location property"
	   },
	   {
	    "name": "datecreate",
	    "_content": "If set to 1, it returns the timestamp of the user's account creation, in MySQL DATETIME format.\r\n"
	   },
	   {
	    "name": "extras",
	    "_content": ""
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found.",
	    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.getInfo",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getInfo.html"
	 },
	 "flickr.photos.getNotInSet": {
	  "optional": [
	   {
	    "name": "max_upload_date",
	    "_content": "Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date can be in the form of a unix timestamp or mysql datetime."
	   },
	   {
	    "name": "min_taken_date",
	    "_content": "Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date can be in the form of a mysql datetime or unix timestamp."
	   },
	   {
	    "name": "max_taken_date",
	    "_content": "Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date can be in the form of a mysql datetime or unix timestamp."
	   },
	   {
	    "name": "privacy_filter",
	    "_content": "Return photos only matching a certain privacy level. Valid values are:\r\n<ul>\r\n<li>1 public photos</li>\r\n<li>2 private photos visible to friends</li>\r\n<li>3 private photos visible to family</li>\r\n<li>4 private photos visible to friends &amp; family</li>\r\n<li>5 completely private photos</li>\r\n</ul>\r\n"
	   },
	   {
	    "name": "media",
	    "_content": "Filter results by media type. Possible values are <code>all</code> (default), <code>photos</code> or <code>videos</code>"
	   },
	   {
	    "name": "min_upload_date",
	    "_content": "Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date can be in the form of a unix timestamp or mysql datetime."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.getNotInSet",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getNotInSet.html"
	 },
	 "flickr.photos.getPerms": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to get permissions for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id of a photo belonging to the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.getPerms",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getPerms.html"
	 },
	 "flickr.photos.getRecent": {
	  "optional": [
	   {
	    "name": "jump_to",
	    "_content": ""
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "bad value for jump_to, must be valid photo id.",
	    "_content": ""
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.getRecent",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getRecent.html"
	 },
	 "flickr.photos.getSizes": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to fetch size information for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id."
	   },
	   {
	    "code": "2",
	    "message": "Permission denied",
	    "_content": "The calling user does not have permission to view the photo."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.getSizes",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getSizes.html"
	 },
	 "flickr.photos.getUntagged": {
	  "optional": [
	   {
	    "name": "min_upload_date",
	    "_content": "Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date can be in the form of a unix timestamp or mysql datetime."
	   },
	   {
	    "name": "max_upload_date",
	    "_content": "Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date can be in the form of a unix timestamp or mysql datetime."
	   },
	   {
	    "name": "min_taken_date",
	    "_content": "Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date should be in the form of a mysql datetime or unix timestamp."
	   },
	   {
	    "name": "max_taken_date",
	    "_content": "Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date can be in the form of a mysql datetime or unix timestamp."
	   },
	   {
	    "name": "privacy_filter",
	    "_content": "Return photos only matching a certain privacy level. Valid values are:\r\n<ul>\r\n<li>1 public photos</li>\r\n<li>2 private photos visible to friends</li>\r\n<li>3 private photos visible to family</li>\r\n<li>4 private photos visible to friends &amp; family</li>\r\n<li>5 completely private photos</li>\r\n</ul>\r\n"
	   },
	   {
	    "name": "media",
	    "_content": "Filter results by media type. Possible values are <code>all</code> (default), <code>photos</code> or <code>videos</code>"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.getUntagged",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getUntagged.html"
	 },
	 "flickr.photos.getWithGeoData": {
	  "optional": [
	   {
	    "name": "min_upload_date",
	    "_content": "Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "max_upload_date",
	    "_content": "Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "min_taken_date",
	    "_content": "Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   },
	   {
	    "name": "max_taken_date",
	    "_content": "Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   },
	   {
	    "name": "privacy_filter",
	    "_content": "Return photos only matching a certain privacy level. Valid values are:\r\n<ul>\r\n<li>1 public photos</li>\r\n<li>2 private photos visible to friends</li>\r\n<li>3 private photos visible to family</li>\r\n<li>4 private photos visible to friends & family</li>\r\n<li>5 completely private photos</li>\r\n</ul>\r\n"
	   },
	   {
	    "name": "sort",
	    "_content": "The order in which to sort returned photos. Deafults to date-posted-desc. The possible values are: date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, and interestingness-asc."
	   },
	   {
	    "name": "media",
	    "_content": "Filter results by media type. Possible values are <code>all</code> (default), <code>photos</code> or <code>videos</code>"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.getWithGeoData",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getWithGeoData.html"
	 },
	 "flickr.photos.getWithoutGeoData": {
	  "optional": [
	   {
	    "name": "max_upload_date",
	    "_content": "Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "min_taken_date",
	    "_content": "Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date can be in the form of a mysql datetime or unix timestamp."
	   },
	   {
	    "name": "max_taken_date",
	    "_content": "Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date can be in the form of a mysql datetime or unix timestamp."
	   },
	   {
	    "name": "privacy_filter",
	    "_content": "Return photos only matching a certain privacy level. Valid values are:\r\n<ul>\r\n<li>1 public photos</li>\r\n<li>2 private photos visible to friends</li>\r\n<li>3 private photos visible to family</li>\r\n<li>4 private photos visible to friends &amp; family</li>\r\n<li>5 completely private photos</li>\r\n</ul>\r\n"
	   },
	   {
	    "name": "sort",
	    "_content": "The order in which to sort returned photos. Deafults to date-posted-desc. The possible values are: date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, and interestingness-asc."
	   },
	   {
	    "name": "media",
	    "_content": "Filter results by media type. Possible values are <code>all</code> (default), <code>photos</code> or <code>videos</code>"
	   },
	   {
	    "name": "min_upload_date",
	    "_content": "Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date can be in the form of a unix timestamp or mysql datetime."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.getWithoutGeoData",
	  "url": "https://www.flickr.com/services/api/flickr.photos.getWithoutGeoData.html"
	 },
	 "flickr.photos.licenses.getInfo": {
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.licenses.getInfo",
	  "url": "https://www.flickr.com/services/api/flickr.photos.licenses.getInfo.html"
	 },
	 "flickr.photos.licenses.setLicense": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The photo to update the license for."
	   },
	   {
	    "name": "license_id",
	    "_content": "The license to apply, or 0 (zero) to remove the current license. Note : as of this writing the \"no known copyright restrictions\" license (7) is not a valid argument."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The specified id was not the id of a valif photo owner by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "License not found",
	    "_content": "The license id was not valid."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.licenses.setLicense",
	  "url": "https://www.flickr.com/services/api/flickr.photos.licenses.setLicense.html"
	 },
	 "flickr.photos.notes.add": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to add a note to"
	   },
	   {
	    "name": "note_x",
	    "_content": "The left coordinate of the note"
	   },
	   {
	    "name": "note_y",
	    "_content": "The top coordinate of the note"
	   },
	   {
	    "name": "note_w",
	    "_content": "The width of the note"
	   },
	   {
	    "name": "note_h",
	    "_content": "The height of the note"
	   },
	   {
	    "name": "note_text",
	    "_content": "The description of the note"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id"
	   },
	   {
	    "code": "2",
	    "message": "User cannot add notes",
	    "_content": "The calling user does not have permission to add a note to this photo"
	   },
	   {
	    "code": "3",
	    "message": "Missing required arguments",
	    "_content": "One or more of the required arguments were not supplied."
	   },
	   {
	    "code": "4",
	    "message": "Maximum number of notes reached",
	    "_content": "The maximum number of notes for the photo has been reached."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.notes.add",
	  "url": "https://www.flickr.com/services/api/flickr.photos.notes.add.html"
	 },
	 "flickr.photos.notes.delete": {
	  "required": [
	   {
	    "name": "note_id",
	    "_content": "The id of the note to delete"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Note not found",
	    "_content": "The note id passed was not a valid note id"
	   },
	   {
	    "code": "2",
	    "message": "User cannot delete note",
	    "_content": "The calling user does not have permission to delete the specified note"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.notes.delete",
	  "url": "https://www.flickr.com/services/api/flickr.photos.notes.delete.html"
	 },
	 "flickr.photos.notes.edit": {
	  "required": [
	   {
	    "name": "note_id",
	    "_content": "The id of the note to edit"
	   },
	   {
	    "name": "note_x",
	    "_content": "The left coordinate of the note"
	   },
	   {
	    "name": "note_y",
	    "_content": "The top coordinate of the note"
	   },
	   {
	    "name": "note_w",
	    "_content": "The width of the note"
	   },
	   {
	    "name": "note_h",
	    "_content": "The height of the note"
	   },
	   {
	    "name": "note_text",
	    "_content": "The description of the note"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Note not found",
	    "_content": "The note id passed was not a valid note id"
	   },
	   {
	    "code": "2",
	    "message": "User cannot edit note",
	    "_content": "The calling user does not have permission to edit the specified note"
	   },
	   {
	    "code": "3",
	    "message": "Missing required arguments",
	    "_content": "One or more of the required arguments were not supplied."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.notes.edit",
	  "url": "https://www.flickr.com/services/api/flickr.photos.notes.edit.html"
	 },
	 "flickr.photos.people.add": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to add a person to."
	   },
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to add to the photo."
	   }
	  ],
	  "optional": [
	   {
	    "name": "person_x",
	    "_content": "The left-most pixel co-ordinate of the box around the person."
	   },
	   {
	    "name": "person_y",
	    "_content": "The top-most pixel co-ordinate of the box around the person."
	   },
	   {
	    "name": "person_w",
	    "_content": "The width (in pixels) of the box around the person."
	   },
	   {
	    "name": "person_h",
	    "_content": "The height (in pixels) of the box around the person."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Person not found",
	    "_content": "The NSID passed was not a valid user id."
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id."
	   },
	   {
	    "code": "3",
	    "message": "User cannot add this person to photos",
	    "_content": "The person being added to the photo does not allow the calling user to add them."
	   },
	   {
	    "code": "4",
	    "message": "User cannot add people to that photo",
	    "_content": "The owner of the photo doesn't allow the calling user to add people to their photos."
	   },
	   {
	    "code": "5",
	    "message": "Person can't be tagged in that photo",
	    "_content": "The person being added to the photo does not want to be identified in this photo."
	   },
	   {
	    "code": "6",
	    "message": "Some co-ordinate paramters were blank",
	    "_content": "Not all of the co-ordinate parameters (person_x, person_y, person_w, person_h) were passed with valid values."
	   },
	   {
	    "code": "7",
	    "message": "Can't add that person to a non-public photo",
	    "_content": "You can only add yourself to another member's non-public photos."
	   },
	   {
	    "code": "8",
	    "message": "Too many people in that photo",
	    "_content": "The maximum number of people has already been added to the photo."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.people.add",
	  "url": "https://www.flickr.com/services/api/flickr.photos.people.add.html"
	 },
	 "flickr.photos.people.delete": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to remove a person from."
	   },
	   {
	    "name": "user_id",
	    "_content": "The NSID of the person to remove from the photo."
	   }
	  ],
	  "optional": [
	   {
	    "name": "email",
	    "_content": "An email address for an invited user."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Person not found",
	    "_content": "The NSID passed was not a valid user id."
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id."
	   },
	   {
	    "code": "3",
	    "message": "User cannot remove that person",
	    "_content": "The calling user did not have permission to remove this person from this photo."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.people.delete",
	  "url": "https://www.flickr.com/services/api/flickr.photos.people.delete.html"
	 },
	 "flickr.photos.people.deleteCoords": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to edit a person in."
	   },
	   {
	    "name": "user_id",
	    "_content": "The NSID of the person whose bounding box you want to remove."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Person not found",
	    "_content": "The NSID passed was not a valid user id."
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id."
	   },
	   {
	    "code": "3",
	    "message": "User cannot edit that person in that photo",
	    "_content": "The calling user is neither the person depicted in the photo nor the person who added the bounding box."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.people.deleteCoords",
	  "url": "https://www.flickr.com/services/api/flickr.photos.people.deleteCoords.html"
	 },
	 "flickr.photos.people.editCoords": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to edit a person in."
	   },
	   {
	    "name": "user_id",
	    "_content": "The NSID of the person to edit in a photo."
	   },
	   {
	    "name": "person_x",
	    "_content": "The left-most pixel co-ordinate of the box around the person."
	   },
	   {
	    "name": "person_y",
	    "_content": "The top-most pixel co-ordinate of the box around the person."
	   },
	   {
	    "name": "person_w",
	    "_content": "The width (in pixels) of the box around the person."
	   },
	   {
	    "name": "person_h",
	    "_content": "The height (in pixels) of the box around the person."
	   }
	  ],
	  "optional": [
	   {
	    "name": "email",
	    "_content": "An email address for an 'invited' person in a photo"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Person not found",
	    "_content": "The NSID passed was not a valid user id."
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id."
	   },
	   {
	    "code": "3",
	    "message": "User cannot edit that person in that photo",
	    "_content": "The calling user did not originally add this person to the photo, and is not the person in question."
	   },
	   {
	    "code": "4",
	    "message": "Some co-ordinate paramters were blank",
	    "_content": "Not all of the co-ordinate parameters (person_x, person_y, person_w, person_h) were passed with valid values."
	   },
	   {
	    "code": "5",
	    "message": "No co-ordinates given",
	    "_content": "None of the co-ordinate parameters were valid."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.people.editCoords",
	  "url": "https://www.flickr.com/services/api/flickr.photos.people.editCoords.html"
	 },
	 "flickr.photos.people.getList": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to get a list of people for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "extras",
	    "_content": "Accepts the following extras: icon_urls, icon_urls_deep, paid_products\r\n\r\nicon_urls, icon_urls_deep: returns the persons buddy icon urls\r\npaid_products: returns if the person is pro or has a add on."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.people.getList",
	  "url": "https://www.flickr.com/services/api/flickr.photos.people.getList.html"
	 },
	 "flickr.photos.recentlyUpdated": {
	  "required": [
	   {
	    "name": "min_date",
	    "_content": "A Unix timestamp or any English textual datetime description indicating the date from which modifications should be compared."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required argument missing.",
	    "_content": "Some or all of the required arguments were not supplied."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid date",
	    "_content": "The date argument did not pass validation."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.recentlyUpdated",
	  "url": "https://www.flickr.com/services/api/flickr.photos.recentlyUpdated.html"
	 },
	 "flickr.photos.removeTag": {
	  "required": [
	   {
	    "name": "tag_id",
	    "_content": "The tag to remove from the photo. This parameter should contain a tag id, as returned by <a href=\"/services/api/flickr.photos.getInfo.html\">flickr.photos.getInfo</a>."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Tag not found",
	    "_content": "The calling user doesn't have permission to delete the specified tag. This could mean it belongs to someone else, or doesn't exist."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.removeTag",
	  "url": "https://www.flickr.com/services/api/flickr.photos.removeTag.html"
	 },
	 "flickr.photos.search": {
	  "optional": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user who's photo to search. If this parameter isn't passed then everybody's public photos will be searched. A value of \"me\" will search against the calling user's photos for authenticated calls."
	   },
	   {
	    "name": "tags",
	    "_content": "A comma-delimited list of tags. Photos with one or more of the tags listed will be returned. You can exclude results that match a term by prepending it with a - character."
	   },
	   {
	    "name": "tag_mode",
	    "_content": "Either 'any' for an OR combination of tags, or 'all' for an AND combination. Defaults to 'any' if not specified."
	   },
	   {
	    "name": "text",
	    "_content": "A free text search. Photos who's title, description or tags contain the text will be returned. You can exclude results that match a term by prepending it with a - character."
	   },
	   {
	    "name": "min_upload_date",
	    "_content": "Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date can be in the form of a unix timestamp or mysql datetime."
	   },
	   {
	    "name": "max_upload_date",
	    "_content": "Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date can be in the form of a unix timestamp or mysql datetime."
	   },
	   {
	    "name": "min_taken_date",
	    "_content": "Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date can be in the form of a mysql datetime or unix timestamp."
	   },
	   {
	    "name": "max_taken_date",
	    "_content": "Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date can be in the form of a mysql datetime or unix timestamp."
	   },
	   {
	    "name": "license",
	    "_content": "The license id for photos (for possible values see the flickr.photos.licenses.getInfo method). Multiple licenses may be comma-separated."
	   },
	   {
	    "name": "sort",
	    "_content": "The order in which to sort returned photos. Deafults to date-posted-desc (unless you are doing a radial geo query, in which case the default sorting is by ascending distance from the point specified). The possible values are: date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, interestingness-asc, and relevance."
	   },
	   {
	    "name": "privacy_filter",
	    "_content": "Return photos only matching a certain privacy level. This only applies when making an authenticated call to view photos you own. Valid values are:\r\n<ul>\r\n<li>1 public photos</li>\r\n<li>2 private photos visible to friends</li>\r\n<li>3 private photos visible to family</li>\r\n<li>4 private photos visible to friends & family</li>\r\n<li>5 completely private photos</li>\r\n</ul>\r\n"
	   },
	   {
	    "name": "bbox",
	    "_content": "A comma-delimited list of 4 values defining the Bounding Box of the area that will be searched.\r\n<br /><br />\r\nThe 4 values represent the bottom-left corner of the box and the top-right corner, minimum_longitude, minimum_latitude, maximum_longitude, maximum_latitude.\r\n<br /><br />\r\nLongitude has a range of -180 to 180 , latitude of -90 to 90. Defaults to -180, -90, 180, 90 if not specified.\r\n<br /><br />\r\nUnlike standard photo queries, geo (or bounding box) queries will only return 250 results per page.\r\n<br /><br />\r\nGeo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against \"parameterless searches\" for queries without a geo component.\r\n<br /><br />\r\nA tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters &#8212; If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future)."
	   },
	   {
	    "name": "accuracy",
	    "_content": "Recorded accuracy level of the location information.  Current range is 1-16 : \r\n\r\n<ul>\r\n<li>World level is 1</li>\r\n<li>Country is ~3</li>\r\n<li>Region is ~6</li>\r\n<li>City is ~11</li>\r\n<li>Street is ~16</li>\r\n</ul>\r\n\r\nDefaults to maximum value if not specified."
	   },
	   {
	    "name": "safe_search",
	    "_content": "Safe search setting:\r\n\r\n<ul>\r\n<li>1 for safe.</li>\r\n<li>2 for moderate.</li>\r\n<li>3 for restricted.</li>\r\n</ul>\r\n\r\n(Please note: Un-authed calls can only see Safe content.)"
	   },
	   {
	    "name": "content_type",
	    "_content": "Content Type setting:\r\n<ul>\r\n<li>1 for photos only.</li>\r\n<li>2 for screenshots only.</li>\r\n<li>3 for 'other' only.</li>\r\n<li>4 for photos and screenshots.</li>\r\n<li>5 for screenshots and 'other'.</li>\r\n<li>6 for photos and 'other'.</li>\r\n<li>7 for photos, screenshots, and 'other' (all).</li>\r\n</ul>"
	   },
	   {
	    "name": "machine_tags",
	    "_content": "Aside from passing in a fully formed machine tag, there is a special syntax for searching on specific properties :\r\n\r\n<ul>\r\n  <li>Find photos using the 'dc' namespace :    <code>\"machine_tags\" => \"dc:\"</code></li>\r\n\r\n  <li> Find photos with a title in the 'dc' namespace : <code>\"machine_tags\" => \"dc:title=\"</code></li>\r\n\r\n  <li>Find photos titled \"mr. camera\" in the 'dc' namespace : <code>\"machine_tags\" => \"dc:title=\\\"mr. camera\\\"</code></li>\r\n\r\n  <li>Find photos whose value is \"mr. camera\" : <code>\"machine_tags\" => \"*:*=\\\"mr. camera\\\"\"</code></li>\r\n\r\n  <li>Find photos that have a title, in any namespace : <code>\"machine_tags\" => \"*:title=\"</code></li>\r\n\r\n  <li>Find photos that have a title, in any namespace, whose value is \"mr. camera\" : <code>\"machine_tags\" => \"*:title=\\\"mr. camera\\\"\"</code></li>\r\n\r\n  <li>Find photos, in the 'dc' namespace whose value is \"mr. camera\" : <code>\"machine_tags\" => \"dc:*=\\\"mr. camera\\\"\"</code></li>\r\n\r\n </ul>\r\n\r\nMultiple machine tags may be queried by passing a comma-separated list. The number of machine tags you can pass in a single query depends on the tag mode (AND or OR) that you are querying with. \"AND\" queries are limited to (16) machine tags. \"OR\" queries are limited\r\nto (8)."
	   },
	   {
	    "name": "machine_tag_mode",
	    "_content": "Either 'any' for an OR combination of tags, or 'all' for an AND combination. Defaults to 'any' if not specified."
	   },
	   {
	    "name": "group_id",
	    "_content": "The id of a group who's pool to search.  If specified, only matching photos posted to the group's pool will be returned."
	   },
	   {
	    "name": "faves",
	    "_content": "boolean. Pass faves=1 along with your user_id to search within your favorites"
	   },
	   {
	    "name": "camera",
	    "_content": "Limit results by camera.  Camera names must be in the <a href=\"http://www.flickr.com/cameras\">Camera Finder</a> normalized form.  <a href=\"http://flickr.com/services/api/flickr.cameras.getList\">flickr.cameras.getList()</a> returns a list of searchable cameras."
	   },
	   {
	    "name": "jump_to",
	    "_content": "Jump, jump!"
	   },
	   {
	    "name": "contacts",
	    "_content": "Search your contacts. Either 'all' or 'ff' for just friends and family. (Experimental)"
	   },
	   {
	    "name": "woe_id",
	    "_content": "A 32-bit identifier that uniquely represents spatial entities. (not used if bbox argument is present). \r\n<br /><br />\r\nGeo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against \"parameterless searches\" for queries without a geo component.\r\n<br /><br />\r\nA tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters &mdash; If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future)."
	   },
	   {
	    "name": "place_id",
	    "_content": "A Flickr place id.  (not used if bbox argument is present).\r\n<br /><br />\r\nGeo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against \"parameterless searches\" for queries without a geo component.\r\n<br /><br />\r\nA tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters &mdash; If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future)."
	   },
	   {
	    "name": "media",
	    "_content": "Filter results by media type. Possible values are <code>all</code> (default), <code>photos</code> or <code>videos</code>"
	   },
	   {
	    "name": "has_geo",
	    "_content": "Any photo that has been geotagged, or if the value is \"0\" any photo that has <i>not</i> been geotagged.\r\n<br /><br />\r\nGeo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against \"parameterless searches\" for queries without a geo component.\r\n<br /><br />\r\nA tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters &mdash; If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future)."
	   },
	   {
	    "name": "geo_context",
	    "_content": "Geo context is a numeric value representing the photo's geotagginess beyond latitude and longitude. For example, you may wish to search for photos that were taken \"indoors\" or \"outdoors\". <br /><br />\r\nThe current list of context IDs is :<br /><br/>\r\n<ul>\r\n<li><strong>0</strong>, not defined.</li>\r\n<li><strong>1</strong>, indoors.</li>\r\n<li><strong>2</strong>, outdoors.</li>\r\n</ul>\r\n<br /><br />\r\nGeo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against \"parameterless searches\" for queries without a geo component.\r\n<br /><br />\r\nA tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters &mdash; If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future)."
	   },
	   {
	    "name": "lat",
	    "_content": "A valid latitude, in decimal format, for doing radial geo queries.\r\n<br /><br />\r\nGeo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against \"parameterless searches\" for queries without a geo component.\r\n<br /><br />\r\nA tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters &mdash; If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future)."
	   },
	   {
	    "name": "lon",
	    "_content": "A valid longitude, in decimal format, for doing radial geo queries.\r\n<br /><br />\r\nGeo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against \"parameterless searches\" for queries without a geo component.\r\n<br /><br />\r\nA tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters &mdash; If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future)."
	   },
	   {
	    "name": "radius",
	    "_content": "A valid radius used for geo queries, greater than zero and less than 20 miles (or 32 kilometers), for use with point-based geo queries. The default value is 5 (km)."
	   },
	   {
	    "name": "radius_units",
	    "_content": "The unit of measure when doing radial geo queries. Valid options are \"mi\" (miles) and \"km\" (kilometers). The default is \"km\"."
	   },
	   {
	    "name": "is_commons",
	    "_content": "Limit the scope of the search to only photos that are part of the <a href=\"http://flickr.com/commons\">Flickr Commons project</a>. Default is false."
	   },
	   {
	    "name": "in_gallery",
	    "_content": "Limit the scope of the search to only photos that are in a <a href=\"http://www.flickr.com/help/galleries/\">gallery</a>?  Default is false, search all photos."
	   },
	   {
	    "name": "person_id",
	    "_content": "The id of a user.  Will return photos where the user has been people tagged.  A call signed as the person_id in question will return *all* photos the user in, otherwise returns public photos."
	   },
	   {
	    "name": "is_getty",
	    "_content": "Limit the scope of the search to only photos that are for sale on Getty. Default is false."
	   },
	   {
	    "name": "username",
	    "_content": "username/character name of the person whose photos you want to search. "
	   },
	   {
	    "name": "exif_min_exposure",
	    "_content": ""
	   },
	   {
	    "name": "exif_max_exposure",
	    "_content": ""
	   },
	   {
	    "name": "exif_min_aperture",
	    "_content": ""
	   },
	   {
	    "name": "exif_max_aperture",
	    "_content": ""
	   },
	   {
	    "name": "exif_min_focallen",
	    "_content": ""
	   },
	   {
	    "name": "exif_max_focallen",
	    "_content": ""
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Too many tags in ALL query",
	    "_content": "When performing an 'all tags' search, you may not specify more than 20 tags to join together."
	   },
	   {
	    "code": "2",
	    "message": "Unknown user",
	    "_content": "A user_id was passed which did not match a valid flickr user."
	   },
	   {
	    "code": "3",
	    "message": "Parameterless searches have been disabled",
	    "_content": "To perform a search with no parameters (to get the latest public photos, please use flickr.photos.getRecent instead)."
	   },
	   {
	    "code": "4",
	    "message": "You don't have permission to view this pool",
	    "_content": "The logged in user (if any) does not have permission to view the pool for this group."
	   },
	   {
	    "code": "10",
	    "message": "Sorry, the Flickr search API is not currently available.",
	    "_content": "The Flickr API search databases are temporarily unavailable."
	   },
	   {
	    "code": "11",
	    "message": "No valid machine tags",
	    "_content": "The query styntax for the machine_tags argument did not validate."
	   },
	   {
	    "code": "12",
	    "message": "Exceeded maximum allowable machine tags",
	    "_content": "The maximum number of machine tags in a single query was exceeded."
	   },
	   {
	    "code": "13",
	    "message": "jump_to not avaiable for this query",
	    "_content": "jump_to only supported for some query types."
	   },
	   {
	    "code": "14",
	    "message": "Bad value for jump_to",
	    "_content": "jump_to must be valid photo ID."
	   },
	   {
	    "code": "15",
	    "message": "Photo not found",
	    "_content": ""
	   },
	   {
	    "code": "16",
	    "message": "You can only search within your own favorites",
	    "_content": ""
	   },
	   {
	    "code": "17",
	    "message": "You can only search within your own contacts",
	    "_content": "The call tried to use the contacts parameter with no user ID or a user ID other than that of the authenticated user."
	   },
	   {
	    "code": "18",
	    "message": "Illogical arguments",
	    "_content": "The request contained contradictory arguments."
	   },
	   {
	    "code": "20",
	    "message": "Excessive photo offset in search",
	    "_content": "The search requested photos beyond an allowable offset. Reduce the page number or number of results per page for this search."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.search",
	  "url": "https://www.flickr.com/services/api/flickr.photos.search.html"
	 },
	 "flickr.photos.setContentType": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to set the adultness of."
	   },
	   {
	    "name": "content_type",
	    "_content": "The content type of the photo. Must be one of: 1 for Photo, 2 for Screenshot, and 3 for Other."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id of a photo belonging to the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Required arguments missing",
	    "_content": "Some or all of the required arguments were not supplied."
	   },
	   {
	    "code": "3",
	    "message": "Change not allowed",
	    "_content": "Changing the content type of this photo is not allowed."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.setContentType",
	  "url": "https://www.flickr.com/services/api/flickr.photos.setContentType.html"
	 },
	 "flickr.photos.setDates": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to edit dates for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "date_posted",
	    "_content": "The date the photo was uploaded to flickr (see the <a href=\"/services/api/misc.dates.html\">dates documentation</a>)"
	   },
	   {
	    "name": "date_taken",
	    "_content": "The date the photo was taken (see the <a href=\"/services/api/misc.dates.html\">dates documentation</a>)"
	   },
	   {
	    "name": "date_taken_granularity",
	    "_content": "The granularity of the date the photo was taken (see the <a href=\"/services/api/misc.dates.html\">dates documentation</a>)"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id was not the id of a valid photo belonging to the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Not enough arguments",
	    "_content": "No dates were specified to be changed."
	   },
	   {
	    "code": "3",
	    "message": "Invalid granularity",
	    "_content": "The value passed for 'granularity' was not a valid flickr date granularity."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.setDates",
	  "url": "https://www.flickr.com/services/api/flickr.photos.setDates.html"
	 },
	 "flickr.photos.setMeta": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to set information for."
	   },
	   {
	    "name": "title",
	    "_content": "The title for the photo."
	   },
	   {
	    "name": "description",
	    "_content": "The description for the photo."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not the id of a photo belonging to the calling user. It might be an invalid id, or the photo might be owned by another user. "
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.setMeta",
	  "url": "https://www.flickr.com/services/api/flickr.photos.setMeta.html"
	 },
	 "flickr.photos.setPerms": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to set permissions for."
	   },
	   {
	    "name": "is_public",
	    "_content": "1 to set the photo to public, 0 to set it to private."
	   },
	   {
	    "name": "is_friend",
	    "_content": "1 to make the photo visible to friends when private, 0 to not."
	   },
	   {
	    "name": "is_family",
	    "_content": "1 to make the photo visible to family when private, 0 to not."
	   },
	   {
	    "name": "perm_comment",
	    "_content": "who can add comments to the photo and it's notes. one of:<br />\r\n<code>0</code>: nobody<br />\r\n<code>1</code>: friends &amp; family<br />\r\n<code>2</code>: contacts<br />\r\n<code>3</code>: everybody"
	   },
	   {
	    "name": "perm_addmeta",
	    "_content": "who can add notes and tags to the photo. one of:<br />\r\n<code>0</code>: nobody / just the owner<br />\r\n<code>1</code>: friends &amp; family<br />\r\n<code>2</code>: contacts<br />\r\n<code>3</code>: everybody\r\n"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id of a photo belonging to the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Required arguments missing",
	    "_content": "Some or all of the required arguments were not supplied."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.setPerms",
	  "url": "https://www.flickr.com/services/api/flickr.photos.setPerms.html"
	 },
	 "flickr.photos.setSafetyLevel": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to set the adultness of."
	   }
	  ],
	  "optional": [
	   {
	    "name": "safety_level",
	    "_content": "The safety level of the photo.  Must be one of:\r\n\r\n1 for Safe, 2 for Moderate, and 3 for Restricted."
	   },
	   {
	    "name": "hidden",
	    "_content": "Whether or not to additionally hide the photo from public searches.  Must be either 1 for Yes or 0 for No."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id of a photo belonging to the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Invalid or missing arguments",
	    "_content": "Neither a valid safety level nor a hidden value were passed."
	   },
	   {
	    "code": "3",
	    "message": "Change not allowed",
	    "_content": "Changing the safety level of this photo is not allowed."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.setSafetyLevel",
	  "url": "https://www.flickr.com/services/api/flickr.photos.setSafetyLevel.html"
	 },
	 "flickr.photos.setTags": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to set tags for.\r\n"
	   },
	   {
	    "name": "tags",
	    "_content": "All tags for the photo (as a single space-delimited string)."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not the id of a photo belonging to the calling user. It might be an invalid id, or the photo might be owned by another user. "
	   },
	   {
	    "code": "2",
	    "message": "Maximum number of tags reached",
	    "_content": "The number of tags specified exceeds the limit for the photo. No tags were modified."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.setTags",
	  "url": "https://www.flickr.com/services/api/flickr.photos.setTags.html"
	 },
	 "flickr.photos.suggestions.approveSuggestion": {
	  "required": [
	   {
	    "name": "suggestion_id",
	    "_content": "The unique ID for the location suggestion to approve."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.suggestions.approveSuggestion",
	  "url": "https://www.flickr.com/services/api/flickr.photos.suggestions.approveSuggestion.html"
	 },
	 "flickr.photos.suggestions.getList": {
	  "optional": [
	   {
	    "name": "photo_id",
	    "_content": "Only show suggestions for a single photo."
	   },
	   {
	    "name": "status_id",
	    "_content": "Only show suggestions with a given status.\r\n\r\n<ul>\r\n<li><strong>0</strong>, pending</li>\r\n<li><strong>1</strong>, approved</li>\r\n<li><strong>2</strong>, rejected</li>\r\n</ul>\r\n\r\nThe default is pending (or \"0\")."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.photos.suggestions.getList",
	  "url": "https://www.flickr.com/services/api/flickr.photos.suggestions.getList.html"
	 },
	 "flickr.photos.suggestions.rejectSuggestion": {
	  "required": [
	   {
	    "name": "suggestion_id",
	    "_content": "The unique ID of the suggestion to reject."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.suggestions.rejectSuggestion",
	  "url": "https://www.flickr.com/services/api/flickr.photos.suggestions.rejectSuggestion.html"
	 },
	 "flickr.photos.suggestions.removeSuggestion": {
	  "required": [
	   {
	    "name": "suggestion_id",
	    "_content": "The unique ID for the location suggestion to approve."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.suggestions.removeSuggestion",
	  "url": "https://www.flickr.com/services/api/flickr.photos.suggestions.removeSuggestion.html"
	 },
	 "flickr.photos.suggestions.suggestLocation": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The photo whose location you are suggesting."
	   },
	   {
	    "name": "lat",
	    "_content": "The latitude whose valid range is -90 to 90. Anything more than 6 decimal places will be truncated."
	   },
	   {
	    "name": "lon",
	    "_content": "The longitude whose valid range is -180 to 180. Anything more than 6 decimal places will be truncated."
	   }
	  ],
	  "optional": [
	   {
	    "name": "accuracy",
	    "_content": "Recorded accuracy level of the location information. World level is 1, Country is ~3, Region ~6, City ~11, Street ~16. Current range is 1-16. Defaults to 16 if not specified."
	   },
	   {
	    "name": "woe_id",
	    "_content": "The WOE ID of the location used to build the location hierarchy for the photo."
	   },
	   {
	    "name": "place_id",
	    "_content": "The Flickr Places ID of the location used to build the location hierarchy for the photo."
	   },
	   {
	    "name": "note",
	    "_content": "A short note or history to include with the suggestion."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.suggestions.suggestLocation",
	  "url": "https://www.flickr.com/services/api/flickr.photos.suggestions.suggestLocation.html"
	 },
	 "flickr.photos.transform.rotate": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to rotate."
	   },
	   {
	    "name": "degrees",
	    "_content": "The amount of degrees by which to rotate the photo (clockwise) from it's current orientation. Valid values are 90, 180 and 270."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id was invalid or did not belong to the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Invalid rotation",
	    "_content": "The rotation degrees were an invalid value."
	   },
	   {
	    "code": "3",
	    "message": "Temporary failure",
	    "_content": "There was a problem either rotating the image or storing the rotated versions."
	   },
	   {
	    "code": "4",
	    "message": "Rotation disabled",
	    "_content": "The rotation service is currently disabled."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photos.transform.rotate",
	  "url": "https://www.flickr.com/services/api/flickr.photos.transform.rotate.html"
	 },
	 "flickr.photos.upload.checkTickets": {
	  "required": [
	   {
	    "name": "tickets",
	    "_content": "A comma-delimited list of ticket ids"
	   }
	  ],
	  "optional": [
	   {
	    "name": "batch_id",
	    "_content": ""
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photos.upload.checkTickets",
	  "url": "https://www.flickr.com/services/api/flickr.photos.upload.checkTickets.html"
	 },
	 "flickr.photosets.addPhoto": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to add a photo to."
	   },
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to add to the set."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found",
	    "_content": "The photoset id passed was not the id of avalid photoset owned by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not the id of a valid photo owned by the calling user."
	   },
	   {
	    "code": "3",
	    "message": "Photo already in set",
	    "_content": "The photo is already a member of the photoset."
	   },
	   {
	    "code": "10",
	    "message": "Maximum number of photos in set",
	    "_content": "A set has reached the upper limit for the number of photos allowed."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.addPhoto",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.addPhoto.html"
	 },
	 "flickr.photosets.comments.addComment": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to add a comment to."
	   },
	   {
	    "name": "comment_text",
	    "_content": "Text of the comment"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found",
	    "_content": ""
	   },
	   {
	    "code": "8",
	    "message": "Blank comment",
	    "_content": ""
	   },
	   {
	    "code": "9",
	    "message": "User is posting comments too fast.",
	    "_content": "The user has reached the limit for number of comments posted during a specific time period. Wait a bit and try again."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.comments.addComment",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.comments.addComment.html"
	 },
	 "flickr.photosets.comments.deleteComment": {
	  "required": [
	   {
	    "name": "comment_id",
	    "_content": "The id of the comment to delete from a photoset."
	   }
	  ],
	  "errors": [
	   {
	    "code": "2",
	    "message": "Comment not found.",
	    "_content": "The comment id passed was not a valid comment id"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.comments.deleteComment",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.comments.deleteComment.html"
	 },
	 "flickr.photosets.comments.editComment": {
	  "required": [
	   {
	    "name": "comment_id",
	    "_content": "The id of the comment to edit."
	   },
	   {
	    "name": "comment_text",
	    "_content": "Update the comment to this text."
	   }
	  ],
	  "errors": [
	   {
	    "code": "2",
	    "message": "Comment not found.",
	    "_content": "The comment id passed was not a valid comment id."
	   },
	   {
	    "code": "8",
	    "message": "Blank comment.",
	    "_content": "Comment text can't be blank."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.comments.editComment",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.comments.editComment.html"
	 },
	 "flickr.photosets.comments.getList": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to fetch comments for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found.",
	    "_content": "The photoset id was invalid."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photosets.comments.getList",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.comments.getList.html"
	 },
	 "flickr.photosets.create": {
	  "required": [
	   {
	    "name": "title",
	    "_content": "A title for the photoset."
	   },
	   {
	    "name": "primary_photo_id",
	    "_content": "The id of the photo to represent this set. The photo must belong to the calling user."
	   }
	  ],
	  "optional": [
	   {
	    "name": "description",
	    "_content": "A description of the photoset. May contain limited html."
	   },
	   {
	    "name": "full_result",
	    "_content": "If this is set, we get the same result as a getList API would give, along with extras: url_sq,url_t,url_s,url_m"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "No title specified",
	    "_content": "No title parameter was passed in the request."
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "The primary photo id passed was not a valid photo id or does not belong to the calling user."
	   },
	   {
	    "code": "3",
	    "message": "Can't create any more sets",
	    "_content": "The user has reached their maximum number of photosets limit."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.create",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.create.html"
	 },
	 "flickr.photosets.delete": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to delete. It must be owned by the calling user."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found",
	    "_content": "The photoset id passed was not a valid photoset id or did not belong to the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.delete",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.delete.html"
	 },
	 "flickr.photosets.editMeta": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to modify."
	   },
	   {
	    "name": "title",
	    "_content": "The new title for the photoset."
	   }
	  ],
	  "optional": [
	   {
	    "name": "description",
	    "_content": "A description of the photoset. May contain limited html."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found",
	    "_content": "The photoset id passed was not a valid photoset id or did not belong to the calling user."
	   },
	   {
	    "code": "2",
	    "message": "No title specified",
	    "_content": "No title parameter was passed in the request. "
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.editMeta",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.editMeta.html"
	 },
	 "flickr.photosets.editPhotos": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to modify. The photoset must belong to the calling user."
	   },
	   {
	    "name": "primary_photo_id",
	    "_content": "The id of the photo to use as the 'primary' photo for the set. This id must also be passed along in photo_ids list argument."
	   },
	   {
	    "name": "photo_ids",
	    "_content": "A comma-delimited list of photo ids to include in the set. They will appear in the set in the order sent. This list <b>must</b> contain the primary photo id. All photos must belong to the owner of the set. This list of photos replaces the existing list. Call flickr.photosets.addPhoto to append a photo to a set."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found",
	    "_content": "The photoset id passed was not a valid photoset id or did not belong to the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "One or more of the photo ids passed was not a valid photo id or does not belong to the calling user."
	   },
	   {
	    "code": "3",
	    "message": "Primary photo not found",
	    "_content": "The primary photo id passed was not a valid photo id or does not belong to the calling user."
	   },
	   {
	    "code": "4",
	    "message": "Primary photo not in list",
	    "_content": "The primary photo id passed did not appear in the photo id list."
	   },
	   {
	    "code": "5",
	    "message": "Empty photos list",
	    "_content": "No photo ids were passed."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.editPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.editPhotos.html"
	 },
	 "flickr.photosets.getContext": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to fetch the context for."
	   },
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset for which to fetch the photo's context."
	   }
	  ],
	  "optional": [
	   {
	    "name": "num_prev",
	    "_content": ""
	   },
	   {
	    "name": "num_next",
	    "_content": ""
	   },
	   {
	    "name": "extras",
	    "_content": "A comma-delimited list of extra information to fetch for each returned record. Currently supported fields are: description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_z, url_l, url_o"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id, or was the id of a photo that the calling user does not have permission to view."
	   },
	   {
	    "code": "2",
	    "message": "Photo not in set",
	    "_content": "The specified photo is not in the specified set."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photosets.getContext",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.getContext.html"
	 },
	 "flickr.photosets.getInfo": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The ID of the photoset to fetch information for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found",
	    "_content": "The photoset id was not valid."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photosets.getInfo",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.getInfo.html"
	 },
	 "flickr.photosets.getList": {
	  "optional": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to get a photoset list for. If none is specified, the calling user is assumed."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to get. Currently, if this is not provided, all sets are returned, but this behaviour may change in future."
	   },
	   {
	    "name": "per_page",
	    "_content": "The number of sets to get per page. If paging is enabled, the maximum number of sets per page is 500."
	   },
	   {
	    "name": "primary_photo_extras",
	    "_content": "A comma-delimited list of extra information to fetch for the primary photo. Currently supported fields are: license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_o"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The user NSID passed was not a valid user NSID and the calling user was not logged in.\r\n"
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photosets.getList",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.getList.html"
	 },
	 "flickr.photosets.getPhotos": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to return the photos for."
	   }
	  ],
	  "optional": [
	   {
	    "name": "extras",
	    "_content": "A comma-delimited list of extra information to fetch for each returned record. Currently supported fields are: license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_o"
	   },
	   {
	    "name": "privacy_filter",
	    "_content": "Return photos only matching a certain privacy level. This only applies when making an authenticated call to view a photoset you own. Valid values are:\r\n<ul>\r\n<li>1 public photos</li>\r\n<li>2 private photos visible to friends</li>\r\n<li>3 private photos visible to family</li>\r\n<li>4 private photos visible to friends &amp; family</li>\r\n<li>5 completely private photos</li>\r\n</ul>\r\n"
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of photos to return per page. If this argument is omitted, it defaults to 500. The maximum allowed value is 500."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   },
	   {
	    "name": "media",
	    "_content": "Filter results by media type. Possible values are <code>all</code> (default), <code>photos</code> or <code>videos</code>"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found",
	    "_content": "The photoset id passed was not a valid photoset id."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.photosets.getPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.getPhotos.html"
	 },
	 "flickr.photosets.orderSets": {
	  "required": [
	   {
	    "name": "photoset_ids",
	    "_content": "A comma delimited list of photoset IDs, ordered with the set to show first, first in the list. Any set IDs not given in the list will be set to appear at the end of the list, ordered by their IDs."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Set not found",
	    "_content": "One of the photoset ids passed was not the id of a valid photoset belonging to the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.orderSets",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.orderSets.html"
	 },
	 "flickr.photosets.removePhoto": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to remove a photo from."
	   },
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to remove from the set."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found",
	    "_content": "The photoset id passed was not the id of avalid photoset owned by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not the id of a valid photo belonging to the calling user."
	   },
	   {
	    "code": "3",
	    "message": "Photo not in set",
	    "_content": "The photo is not a member of the photoset."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.removePhoto",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.removePhoto.html"
	 },
	 "flickr.photosets.removePhotos": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to remove photos from."
	   },
	   {
	    "name": "photo_ids",
	    "_content": "Comma-delimited list of photo ids to remove from the photoset."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found",
	    "_content": "The photoset id passed was not the id of available photosets owned by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not the id of a valid photo belonging to the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.removePhotos",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.removePhotos.html"
	 },
	 "flickr.photosets.reorderPhotos": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to reorder. The photoset must belong to the calling user."
	   },
	   {
	    "name": "photo_ids",
	    "_content": "Ordered, comma-delimited list of photo ids. Photos that are not in the list will keep their original order"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found",
	    "_content": "The photoset id passed was not a valid photoset id or did not belong to the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "One or more of the photo ids passed was not a valid photo id or does not belong to the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.reorderPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.reorderPhotos.html"
	 },
	 "flickr.photosets.setPrimaryPhoto": {
	  "required": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to set primary photo to."
	   },
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to set as primary."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photoset not found",
	    "_content": "The photoset id passed was not the id of avalid photoset owned by the calling user."
	   },
	   {
	    "code": "2",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not the id of a valid photo owned by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 2
	  },
	  "name": "flickr.photosets.setPrimaryPhoto",
	  "url": "https://www.flickr.com/services/api/flickr.photosets.setPrimaryPhoto.html"
	 },
	 "flickr.places.find": {
	  "required": [
	   {
	    "name": "query",
	    "_content": "The query string to use for place ID lookups"
	   }
	  ],
	  "optional": [
	   {
	    "name": "bbox",
	    "_content": "A bounding box for limiting the area to query."
	   },
	   {
	    "name": "extras",
	    "_content": "Secret sauce."
	   },
	   {
	    "name": "safe",
	    "_content": "Do we want sexy time words in our venue results?"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing",
	    "_content": "One or more required parameters was not included with the API call."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.find",
	  "url": "https://www.flickr.com/services/api/flickr.places.find.html"
	 },
	 "flickr.places.findByLatLon": {
	  "required": [
	   {
	    "name": "lat",
	    "_content": "The latitude whose valid range is -90 to 90. Anything more than 4 decimal places will be truncated."
	   },
	   {
	    "name": "lon",
	    "_content": "The longitude whose valid range is -180 to 180. Anything more than 4 decimal places will be truncated."
	   }
	  ],
	  "optional": [
	   {
	    "name": "accuracy",
	    "_content": "Recorded accuracy level of the location information. World level is 1, Country is ~3, Region ~6, City ~11, Street ~16. Current range is 1-16. The default is 16."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required arguments missing",
	    "_content": "One or more required parameters was not included with the API request."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid latitude",
	    "_content": "The latitude argument failed validation."
	   },
	   {
	    "code": "3",
	    "message": "Not a valid longitude",
	    "_content": "The longitude argument failed validation."
	   },
	   {
	    "code": "4",
	    "message": "Not a valid accuracy",
	    "_content": "The accuracy argument failed validation."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.findByLatLon",
	  "url": "https://www.flickr.com/services/api/flickr.places.findByLatLon.html"
	 },
	 "flickr.places.getChildrenWithPhotosPublic": {
	  "optional": [
	   {
	    "name": "place_id",
	    "_content": "A Flickr Places ID. (While optional, you must pass either a valid Places ID or a WOE ID.)"
	   },
	   {
	    "name": "woe_id",
	    "_content": "A Where On Earth (WOE) ID. (While optional, you must pass either a valid Places ID or a WOE ID.)"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing",
	    "_content": "One or more required parameter is missing from the API call."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid Places ID",
	    "_content": "An invalid Places (or WOE) ID was passed with the API call."
	   },
	   {
	    "code": "3",
	    "message": "Place not found",
	    "_content": "No place could be found for the Places (or WOE) ID passed to the API call."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.getChildrenWithPhotosPublic",
	  "url": "https://www.flickr.com/services/api/flickr.places.getChildrenWithPhotosPublic.html"
	 },
	 "flickr.places.getInfo": {
	  "optional": [
	   {
	    "name": "place_id",
	    "_content": "A Flickr Places ID. <span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   },
	   {
	    "name": "woe_id",
	    "_content": "A Where On Earth (WOE) ID. <span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing",
	    "_content": "One or more required parameter is missing from the API call."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid Places ID",
	    "_content": "An invalid Places (or WOE) ID was passed with the API call."
	   },
	   {
	    "code": "3",
	    "message": "Place not found",
	    "_content": "No place could be found for the Places (or WOE) ID passed to the API call."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.getInfo",
	  "url": "https://www.flickr.com/services/api/flickr.places.getInfo.html"
	 },
	 "flickr.places.getInfoByUrl": {
	  "required": [
	   {
	    "name": "url",
	    "_content": "A flickr.com/places URL in the form of /country/region/city. For example: /Canada/Quebec/Montreal"
	   }
	  ],
	  "errors": [
	   {
	    "code": "2",
	    "message": "Place URL required.",
	    "_content": "The flickr.com/places URL was not passed with the API method."
	   },
	   {
	    "code": "3",
	    "message": "Place not found.",
	    "_content": "Unable to find a valid place for the places URL."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.getInfoByUrl",
	  "url": "https://www.flickr.com/services/api/flickr.places.getInfoByUrl.html"
	 },
	 "flickr.places.getPlaceTypes": {
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.getPlaceTypes",
	  "url": "https://www.flickr.com/services/api/flickr.places.getPlaceTypes.html"
	 },
	 "flickr.places.getShapeHistory": {
	  "optional": [
	   {
	    "name": "place_id",
	    "_content": "A Flickr Places ID. <span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   },
	   {
	    "name": "woe_id",
	    "_content": "A Where On Earth (WOE) ID. <span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing",
	    "_content": "One or more required parameter is missing from the API call."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid Places ID",
	    "_content": "An invalid Places (or WOE) ID was passed with the API call."
	   },
	   {
	    "code": "3",
	    "message": "Place not found",
	    "_content": "No place could be found for the Places (or WOE) ID passed to the API call."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.getShapeHistory",
	  "url": "https://www.flickr.com/services/api/flickr.places.getShapeHistory.html"
	 },
	 "flickr.places.getTopPlacesList": {
	  "required": [
	   {
	    "name": "place_type_id",
	    "_content": "The numeric ID for a specific place type to cluster photos by. <br /><br />\r\n\r\nValid place type IDs are :\r\n\r\n<ul>\r\n<li><strong>22</strong>: neighbourhood</li>\r\n<li><strong>7</strong>: locality</li>\r\n<li><strong>8</strong>: region</li>\r\n<li><strong>12</strong>: country</li>\r\n<li><strong>29</strong>: continent</li>\r\n</ul>"
	   }
	  ],
	  "optional": [
	   {
	    "name": "date",
	    "_content": "A valid date in YYYY-MM-DD format. The default is yesterday."
	   },
	   {
	    "name": "woe_id",
	    "_content": "Limit your query to only those top places belonging to a specific Where on Earth (WOE) identifier."
	   },
	   {
	    "name": "place_id",
	    "_content": "Limit your query to only those top places belonging to a specific Flickr Places identifier."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing",
	    "_content": "One or more required parameters with missing from your request."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid place type.",
	    "_content": "An unknown or unsupported place type ID was passed with your request."
	   },
	   {
	    "code": "3",
	    "message": "Not a valid date.",
	    "_content": "The date argument passed with your request is invalid."
	   },
	   {
	    "code": "4",
	    "message": "Not a valid Place ID",
	    "_content": "An invalid Places (or WOE) identifier was included with your request."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.getTopPlacesList",
	  "url": "https://www.flickr.com/services/api/flickr.places.getTopPlacesList.html"
	 },
	 "flickr.places.placesForBoundingBox": {
	  "required": [
	   {
	    "name": "bbox",
	    "_content": "A comma-delimited list of 4 values defining the Bounding Box of the area that will be searched. The 4 values represent the bottom-left corner of the box and the top-right corner, minimum_longitude, minimum_latitude, maximum_longitude, maximum_latitude."
	   }
	  ],
	  "optional": [
	   {
	    "name": "place_type",
	    "_content": "The name of place type to using as the starting point to search for places in a bounding box. Valid placetypes are:\r\n\r\n<ul>\r\n<li>neighbourhood</li>\r\n<li>locality</li>\r\n<li>county</li>\r\n<li>region</li>\r\n<li>country</li>\r\n<li>continent</li>\r\n</ul>\r\n<br />\r\n<span style=\"font-style:italic;\">The \"place_type\" argument has been deprecated in favor of the \"place_type_id\" argument. It won't go away but it will not be added to new methods. A complete list of place type IDs is available using the <a href=\"http://www.flickr.com/services/api/flickr.places.getPlaceTypes.html\">flickr.places.getPlaceTypes</a> method. (While optional, you must pass either a valid place type or place type ID.)</span>"
	   },
	   {
	    "name": "place_type_id",
	    "_content": "The numeric ID for a specific place type to cluster photos by. <br /><br />\r\n\r\nValid place type IDs are :\r\n\r\n<ul>\r\n<li><strong>22</strong>: neighbourhood</li>\r\n<li><strong>7</strong>: locality</li>\r\n<li><strong>8</strong>: region</li>\r\n<li><strong>12</strong>: country</li>\r\n<li><strong>29</strong>: continent</li>\r\n</ul>\r\n<br /><span style=\"font-style:italic;\">(While optional, you must pass either a valid place type or place type ID.)</span>\r\n"
	   },
	   {
	    "name": "recursive",
	    "_content": "Perform a recursive place type search. For example, if you search for neighbourhoods in a given bounding box but there are no results the method will also query for localities and so on until one or more valid places are found.<br /<br /> \r\nRecursive searches do not change the bounding box size restrictions for the initial place type passed to the method."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameters missing",
	    "_content": "One or more required parameter is missing from the API call."
	   },
	   {
	    "code": "2",
	    "message": "Not a valid bbox",
	    "_content": "The bbox argument was incomplete or incorrectly formatted"
	   },
	   {
	    "code": "3",
	    "message": "Not a valid place type",
	    "_content": "An invalid place type was included with your request."
	   },
	   {
	    "code": "4",
	    "message": "Bounding box exceeds maximum allowable size for place type",
	    "_content": "The bounding box passed along with your request was too large for the request place type."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.placesForBoundingBox",
	  "url": "https://www.flickr.com/services/api/flickr.places.placesForBoundingBox.html"
	 },
	 "flickr.places.placesForContacts": {
	  "optional": [
	   {
	    "name": "place_type",
	    "_content": "A specific place type to cluster photos by. <br /><br />\r\n\r\nValid place types are :\r\n\r\n<ul>\r\n<li><strong>neighbourhood</strong> (and neighborhood)</li>\r\n<li><strong>locality</strong></li>\r\n<li><strong>region</strong></li>\r\n<li><strong>country</strong></li>\r\n<li><strong>continent</strong></li>\r\n</ul>\r\n<br />\r\n<span style=\"font-style:italic;\">The \"place_type\" argument has been deprecated in favor of the \"place_type_id\" argument. It won't go away but it will not be added to new methods. A complete list of place type IDs is available using the <a href=\"http://www.flickr.com/services/api/flickr.places.getPlaceTypes.html\">flickr.places.getPlaceTypes</a> method. (While optional, you must pass either a valid place type or place type ID.)</span>"
	   },
	   {
	    "name": "place_type_id",
	    "_content": "The numeric ID for a specific place type to cluster photos by. <br /><br />\r\n\r\nValid place type IDs are :\r\n\r\n<ul>\r\n<li><strong>22</strong>: neighbourhood</li>\r\n<li><strong>7</strong>: locality</li>\r\n<li><strong>8</strong>: region</li>\r\n<li><strong>12</strong>: country</li>\r\n<li><strong>29</strong>: continent</li>\r\n</ul>\r\n<br /><span style=\"font-style:italic;\">(While optional, you must pass either a valid place type or place type ID.)</span>"
	   },
	   {
	    "name": "woe_id",
	    "_content": "A Where on Earth identifier to use to filter photo clusters. For example all the photos clustered by <strong>locality</strong> in the United States (WOE ID <strong>23424977</strong>).<br /><br />\r\n<span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   },
	   {
	    "name": "place_id",
	    "_content": "A Flickr Places identifier to use to filter photo clusters. For example all the photos clustered by <strong>locality</strong> in the United States (Place ID <strong>4KO02SibApitvSBieQ</strong>).\r\n<br /><br />\r\n<span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   },
	   {
	    "name": "threshold",
	    "_content": "The minimum number of photos that a place type must have to be included. If the number of photos is lowered then the parent place type for that place will be used.<br /><br />\r\n\r\nFor example if your contacts only have <strong>3</strong> photos taken in the locality of Montreal</strong> (WOE ID 3534) but your threshold is set to <strong>5</strong> then those photos will be \"rolled up\" and included instead with a place record for the region of Quebec (WOE ID 2344924)."
	   },
	   {
	    "name": "contacts",
	    "_content": "Search your contacts. Either 'all' or 'ff' for just friends and family. (Default is all)"
	   },
	   {
	    "name": "min_upload_date",
	    "_content": "Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "max_upload_date",
	    "_content": "Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "min_taken_date",
	    "_content": "Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   },
	   {
	    "name": "max_taken_date",
	    "_content": "Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Places for contacts are not available at this time",
	    "_content": "Places for contacts have been disabled or are otherwise not available."
	   },
	   {
	    "code": "2",
	    "message": "Required parameter missing",
	    "_content": "One or more of the required parameters was not included with your request."
	   },
	   {
	    "code": "3",
	    "message": "Not a valid place type.",
	    "_content": "An invalid place type was included with your request."
	   },
	   {
	    "code": "4",
	    "message": "Not a valid Place ID",
	    "_content": "An invalid Places (or WOE) identifier was included with your request."
	   },
	   {
	    "code": "5",
	    "message": "Not a valid threshold",
	    "_content": "The threshold passed was invalid. "
	   },
	   {
	    "code": "6",
	    "message": "Not a valid contacts type",
	    "_content": "Contacts must be either \"all\" or \"ff\" (friends and family)."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.places.placesForContacts",
	  "url": "https://www.flickr.com/services/api/flickr.places.placesForContacts.html"
	 },
	 "flickr.places.placesForTags": {
	  "required": [
	   {
	    "name": "place_type_id",
	    "_content": "The numeric ID for a specific place type to cluster photos by. <br /><br />\r\n\r\nValid place type IDs are :\r\n\r\n<ul>\r\n<li><strong>22</strong>: neighbourhood</li>\r\n<li><strong>7</strong>: locality</li>\r\n<li><strong>8</strong>: region</li>\r\n<li><strong>12</strong>: country</li>\r\n<li><strong>29</strong>: continent</li>\r\n</ul>"
	   }
	  ],
	  "optional": [
	   {
	    "name": "woe_id",
	    "_content": "A Where on Earth identifier to use to filter photo clusters. For example all the photos clustered by <strong>locality</strong> in the United States (WOE ID <strong>23424977</strong>).\r\n<br /><br />\r\n<span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   },
	   {
	    "name": "place_id",
	    "_content": "A Flickr Places identifier to use to filter photo clusters. For example all the photos clustered by <strong>locality</strong> in the United States (Place ID <strong>4KO02SibApitvSBieQ</strong>).\r\n<br /><br />\r\n<span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   },
	   {
	    "name": "threshold",
	    "_content": "The minimum number of photos that a place type must have to be included. If the number of photos is lowered then the parent place type for that place will be used.<br /><br />\r\n\r\nFor example if you only have <strong>3</strong> photos taken in the locality of Montreal</strong> (WOE ID 3534) but your threshold is set to <strong>5</strong> then those photos will be \"rolled up\" and included instead with a place record for the region of Quebec (WOE ID 2344924)."
	   },
	   {
	    "name": "tags",
	    "_content": "A comma-delimited list of tags. Photos with one or more of the tags listed will be returned."
	   },
	   {
	    "name": "tag_mode",
	    "_content": "Either 'any' for an OR combination of tags, or 'all' for an AND combination. Defaults to 'any' if not specified."
	   },
	   {
	    "name": "machine_tags",
	    "_content": "Aside from passing in a fully formed machine tag, there is a special syntax for searching on specific properties :\r\n\r\n<ul>\r\n  <li>Find photos using the 'dc' namespace :    <code>\"machine_tags\" => \"dc:\"</code></li>\r\n\r\n  <li> Find photos with a title in the 'dc' namespace : <code>\"machine_tags\" => \"dc:title=\"</code></li>\r\n\r\n  <li>Find photos titled \"mr. camera\" in the 'dc' namespace : <code>\"machine_tags\" => \"dc:title=\\\"mr. camera\\\"</code></li>\r\n\r\n  <li>Find photos whose value is \"mr. camera\" : <code>\"machine_tags\" => \"*:*=\\\"mr. camera\\\"\"</code></li>\r\n\r\n  <li>Find photos that have a title, in any namespace : <code>\"machine_tags\" => \"*:title=\"</code></li>\r\n\r\n  <li>Find photos that have a title, in any namespace, whose value is \"mr. camera\" : <code>\"machine_tags\" => \"*:title=\\\"mr. camera\\\"\"</code></li>\r\n\r\n  <li>Find photos, in the 'dc' namespace whose value is \"mr. camera\" : <code>\"machine_tags\" => \"dc:*=\\\"mr. camera\\\"\"</code></li>\r\n\r\n </ul>\r\n\r\nMultiple machine tags may be queried by passing a comma-separated list. The number of machine tags you can pass in a single query depends on the tag mode (AND or OR) that you are querying with. \"AND\" queries are limited to (16) machine tags. \"OR\" queries are limited\r\nto (8)."
	   },
	   {
	    "name": "machine_tag_mode",
	    "_content": "Either 'any' for an OR combination of tags, or 'all' for an AND combination. Defaults to 'any' if not specified."
	   },
	   {
	    "name": "min_upload_date",
	    "_content": "Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "max_upload_date",
	    "_content": "Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "min_taken_date",
	    "_content": "Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   },
	   {
	    "name": "max_taken_date",
	    "_content": "Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.placesForTags",
	  "url": "https://www.flickr.com/services/api/flickr.places.placesForTags.html"
	 },
	 "flickr.places.placesForUser": {
	  "optional": [
	   {
	    "name": "place_type_id",
	    "_content": "The numeric ID for a specific place type to cluster photos by. <br /><br />\r\n\r\nValid place type IDs are :\r\n\r\n<ul>\r\n<li><strong>22</strong>: neighbourhood</li>\r\n<li><strong>7</strong>: locality</li>\r\n<li><strong>8</strong>: region</li>\r\n<li><strong>12</strong>: country</li>\r\n<li><strong>29</strong>: continent</li>\r\n</ul>\r\n<br />\r\n<span style=\"font-style:italic;\">The \"place_type\" argument has been deprecated in favor of the \"place_type_id\" argument. It won't go away but it will not be added to new methods. A complete list of place type IDs is available using the <a href=\"http://www.flickr.com/services/api/flickr.places.getPlaceTypes.html\">flickr.places.getPlaceTypes</a> method. (While optional, you must pass either a valid place type or place type ID.)</span>"
	   },
	   {
	    "name": "place_type",
	    "_content": "A specific place type to cluster photos by. <br /><br />\r\n\r\nValid place types are :\r\n\r\n<ul>\r\n<li><strong>neighbourhood</strong> (and neighborhood)</li>\r\n<li><strong>locality</strong></li>\r\n<li><strong>region</strong></li>\r\n<li><strong>country</strong></li>\r\n<li><strong>continent</strong></li>\r\n</ul>\r\n<br /><span style=\"font-style:italic;\">(While optional, you must pass either a valid place type or place type ID.)</span>"
	   },
	   {
	    "name": "woe_id",
	    "_content": "A Where on Earth identifier to use to filter photo clusters. For example all the photos clustered by <strong>locality</strong> in the United States (WOE ID <strong>23424977</strong>).<br /><br />\r\n<span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   },
	   {
	    "name": "place_id",
	    "_content": "A Flickr Places identifier to use to filter photo clusters. For example all the photos clustered by <strong>locality</strong> in the United States (Place ID <strong>4KO02SibApitvSBieQ</strong>).<br /><br />\r\n<span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   },
	   {
	    "name": "threshold",
	    "_content": "The minimum number of photos that a place type must have to be included. If the number of photos is lowered then the parent place type for that place will be used.<br /><br />\r\n\r\nFor example if you only have <strong>3</strong> photos taken in the locality of Montreal</strong> (WOE ID 3534) but your threshold is set to <strong>5</strong> then those photos will be \"rolled up\" and included instead with a place record for the region of Quebec (WOE ID 2344924)."
	   },
	   {
	    "name": "min_upload_date",
	    "_content": "Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "max_upload_date",
	    "_content": "Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "min_taken_date",
	    "_content": "Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   },
	   {
	    "name": "max_taken_date",
	    "_content": "Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Places for user are not available at this time",
	    "_content": "Places for user have been disabled or are otherwise not available."
	   },
	   {
	    "code": "2",
	    "message": "Required parameter missing",
	    "_content": "One or more of the required parameters was not included with your request."
	   },
	   {
	    "code": "3",
	    "message": "Not a valid place type",
	    "_content": "An invalid place type was included with your request."
	   },
	   {
	    "code": "4",
	    "message": "Not a valid Place ID",
	    "_content": "An invalid Places (or WOE) identifier was included with your request."
	   },
	   {
	    "code": "5",
	    "message": "Not a valid threshold",
	    "_content": "The threshold passed was invalid. "
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.places.placesForUser",
	  "url": "https://www.flickr.com/services/api/flickr.places.placesForUser.html"
	 },
	 "flickr.places.resolvePlaceId": {
	  "required": [
	   {
	    "name": "place_id",
	    "_content": "A Flickr Places ID"
	   }
	  ],
	  "errors": [
	   {
	    "code": "2",
	    "message": "Place ID required.",
	    "_content": ""
	   },
	   {
	    "code": "3",
	    "message": "Place not found.",
	    "_content": ""
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.resolvePlaceId",
	  "url": "https://www.flickr.com/services/api/flickr.places.resolvePlaceId.html"
	 },
	 "flickr.places.resolvePlaceURL": {
	  "required": [
	   {
	    "name": "url",
	    "_content": "A Flickr Places URL.  \r\n<br /><br />\r\nFlickr Place URLs are of the form /country/region/city"
	   }
	  ],
	  "errors": [
	   {
	    "code": "2",
	    "message": "Place URL required.",
	    "_content": ""
	   },
	   {
	    "code": "3",
	    "message": "Place not found.",
	    "_content": ""
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.resolvePlaceURL",
	  "url": "https://www.flickr.com/services/api/flickr.places.resolvePlaceURL.html"
	 },
	 "flickr.places.tagsForPlace": {
	  "optional": [
	   {
	    "name": "woe_id",
	    "_content": "A Where on Earth identifier to use to filter photo clusters.<br /><br />\r\n<span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   },
	   {
	    "name": "place_id",
	    "_content": "A Flickr Places identifier to use to filter photo clusters.<br /><br />\r\n<span style=\"font-style:italic;\">(While optional, you must pass either a valid Places ID or a WOE ID.)</span>"
	   },
	   {
	    "name": "min_upload_date",
	    "_content": "Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "max_upload_date",
	    "_content": "Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date should be in the form of a unix timestamp."
	   },
	   {
	    "name": "min_taken_date",
	    "_content": "Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   },
	   {
	    "name": "max_taken_date",
	    "_content": "Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date should be in the form of a mysql datetime."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing",
	    "_content": "One or more parameters was not included with the API request"
	   },
	   {
	    "code": "2",
	    "message": "Not a valid Places ID",
	    "_content": "An invalid Places (or WOE) identifier was included with your request."
	   },
	   {
	    "code": "3",
	    "message": "Place not found",
	    "_content": "An invalid Places (or WOE) identifier was included with your request."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.places.tagsForPlace",
	  "url": "https://www.flickr.com/services/api/flickr.places.tagsForPlace.html"
	 },
	 "flickr.prefs.getContentType": {
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.prefs.getContentType",
	  "url": "https://www.flickr.com/services/api/flickr.prefs.getContentType.html"
	 },
	 "flickr.prefs.getGeoPerms": {
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.prefs.getGeoPerms",
	  "url": "https://www.flickr.com/services/api/flickr.prefs.getGeoPerms.html"
	 },
	 "flickr.prefs.getHidden": {
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.prefs.getHidden",
	  "url": "https://www.flickr.com/services/api/flickr.prefs.getHidden.html"
	 },
	 "flickr.prefs.getPrivacy": {
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.prefs.getPrivacy",
	  "url": "https://www.flickr.com/services/api/flickr.prefs.getPrivacy.html"
	 },
	 "flickr.prefs.getSafetyLevel": {
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.prefs.getSafetyLevel",
	  "url": "https://www.flickr.com/services/api/flickr.prefs.getSafetyLevel.html"
	 },
	 "flickr.push.getSubscriptions": {
	  "errors": [
	   {
	    "code": "5",
	    "message": "Service currently available only to pro accounts",
	    "_content": "PuSH subscriptions are currently restricted to Pro account holders."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.push.getSubscriptions",
	  "url": "https://www.flickr.com/services/api/flickr.push.getSubscriptions.html"
	 },
	 "flickr.push.getTopics": {
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.push.getTopics",
	  "url": "https://www.flickr.com/services/api/flickr.push.getTopics.html"
	 },
	 "flickr.push.subscribe": {
	  "required": [
	   {
	    "name": "topic",
	    "_content": "The type of subscription. See <a href=\"http://www.flickr.com/services/api/flickr.push.getTopics.htm\">flickr.push.getTopics</a>."
	   },
	   {
	    "name": "callback",
	    "_content": "The url for the subscription endpoint. Limited to 255 bytes, and must be unique for this user, i.e. no two subscriptions for a given user may use the same callback url."
	   },
	   {
	    "name": "verify",
	    "_content": "The verification mode, either <code>sync</code> or <code>async</code>. See the <a href=\"http://pubsubhubbub.googlecode.com/svn/trunk/pubsubhubbub-core-0.3.html#subscribingl\">Google PubSubHubbub spec</a> for details."
	   }
	  ],
	  "optional": [
	   {
	    "name": "verify_token",
	    "_content": "The verification token to be echoed back to the subscriber during the verification callback, as per the <a href=\"http://pubsubhubbub.googlecode.com/svn/trunk/pubsubhubbub-core-0.3.html#subscribing\">Google PubSubHubbub spec</a>. Limited to 200 bytes."
	   },
	   {
	    "name": "lease_seconds",
	    "_content": "Number of seconds for which the subscription will be valid. Legal values are 60 to 86400 (1 minute to 1 day). If not present, the subscription will be auto-renewing."
	   },
	   {
	    "name": "woe_ids",
	    "_content": "A 32-bit integer for a <a href=\"http://developer.yahoo.com/geo/geoplanet/\">Where on Earth ID</a>. Only valid if <code>topic</code> is <code>geo</code>.\r\n<br/><br/>\r\nThe order of precedence for geo subscriptions is : woe ids, place ids, radial i.e. the <code>lat, lon</code> parameters will be ignored if <code>place_ids</code> is present, which will be ignored if <code>woe_ids</code> is present."
	   },
	   {
	    "name": "place_ids",
	    "_content": "A comma-separated list of Flickr place IDs. Only valid if <code>topic</code> is <code>geo</code>.\r\n<br/><br/>\r\nThe order of precedence for geo subscriptions is : woe ids, place ids, radial i.e. the <code>lat, lon</code> parameters will be ignored if <code>place_ids</code> is present, which will be ignored if <code>woe_ids</code> is present."
	   },
	   {
	    "name": "lat",
	    "_content": "A latitude value, in decimal format. Only valid if <code>topic</code> is <code>geo</code>. Defines the latitude for a radial query centered around (lat, lon).\r\n<br/><br/>\r\nThe order of precedence for geo subscriptions is : woe ids, place ids, radial i.e. the <code>lat, lon</code> parameters will be ignored if <code>place_ids</code> is present, which will be ignored if <code>woe_ids</code> is present."
	   },
	   {
	    "name": "lon",
	    "_content": "A longitude value, in decimal format. Only valid if <code>topic</code> is <code>geo</code>. Defines the longitude for a radial query centered around (lat, lon).\r\n<br/><br/>\r\nThe order of precedence for geo subscriptions is : woe ids, place ids, radial i.e. the <code>lat, lon</code> parameters will be ignored if <code>place_ids</code> is present, which will be ignored if <code>woe_ids</code> is present."
	   },
	   {
	    "name": "radius",
	    "_content": "A radius value, in the units defined by radius_units. Only valid if <code>topic</code> is <code>geo</code>. Defines the radius of a circle for a radial query centered around (lat, lon). Default is 5 km.\r\n<br/><br/>\r\nThe order of precedence for geo subscriptions is : woe ids, place ids, radial i.e. the <code>lat, lon</code> parameters will be ignored if <code>place_ids</code> is present, which will be ignored if <code>woe_ids</code> is present."
	   },
	   {
	    "name": "radius_units",
	    "_content": "Defines the units for the radius parameter. Only valid if <code>topic</code> is <code>geo</code>. Options are <code>mi</code> and <code>km</code>. Default is <code>km</code>.\r\n<br/><br/>\r\nThe order of precedence for geo subscriptions is : woe ids, place ids, radial i.e. the <code>lat, lon</code> parameters will be ignored if <code>place_ids</code> is present, which will be ignored if <code>woe_ids</code> is present."
	   },
	   {
	    "name": "accuracy",
	    "_content": "Defines the minimum accuracy required for photos to be included in a subscription. Only valid if <code>topic</code> is <code>geo</code> Legal values are 1-16, default is 1 (i.e. any accuracy level).\r\n<ul>\r\n<li>World level is 1</li>\r\n<li>Country is ~3</li>\r\n<li>Region is ~6</li>\r\n<li>City is ~11</li>\r\n<li>Street is ~16</li>\r\n</ul>"
	   },
	   {
	    "name": "nsids",
	    "_content": "A comma-separated list of nsids representing Flickr Commons institutions (see <a href=\"http://www.flickr.com/services/api/flickr.commons.getInstitutions.html\">flickr.commons.getInstitutions</a>). Only valid if <code>topic</code> is <code>commons</code>. If not present this argument defaults to all Flickr Commons institutions."
	   },
	   {
	    "name": "tags",
	    "_content": "A comma-separated list of strings to be used for tag subscriptions. Photos with one or more of the tags listed will be included in the subscription. Only valid if the <code>topic</code> is <code>tags</code>."
	   },
	   {
	    "name": "machine_tags",
	    "_content": "A comma-separated list of strings to be used for machine tag subscriptions. Photos with one or more of the machine tags listed will be included in the subscription. Currently the format must be <code>namespace:tag_name=value</code> Only valid if the <code>topic</code> is <code>tags</code>."
	   },
	   {
	    "name": "update_type",
	    "_content": ""
	   },
	   {
	    "name": "output_format",
	    "_content": ""
	   },
	   {
	    "name": "mailto",
	    "_content": ""
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing",
	    "_content": "One of the required arguments for the method was not provided."
	   },
	   {
	    "code": "2",
	    "message": "Invalid parameter value",
	    "_content": "One of the arguments was specified with an illegal value."
	   },
	   {
	    "code": "3",
	    "message": "Callback URL already in use for a different subscription",
	    "_content": "A different subscription already exists that uses the same callback URL."
	   },
	   {
	    "code": "4",
	    "message": "Callback failed or invalid response",
	    "_content": "The verification callback failed, or failed to return the expected response to confirm the subscription."
	   },
	   {
	    "code": "5",
	    "message": "Service currently available only to pro accounts",
	    "_content": "PuSH subscriptions are currently restricted to Pro account holders."
	   },
	   {
	    "code": "6",
	    "message": "Subscription awaiting verification callback response - try again later",
	    "_content": "A subscription with those details exists already, but it is in a pending (non-verified) state. Please wait a bit for the verification callback to complete before attempting to update the subscription."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.push.subscribe",
	  "url": "https://www.flickr.com/services/api/flickr.push.subscribe.html"
	 },
	 "flickr.push.unsubscribe": {
	  "required": [
	   {
	    "name": "topic",
	    "_content": "The type of subscription. See <a href=\"http://www.flickr.com/services/api/flickr.push.getTopics.htm\">flickr.push.getTopics</a>."
	   },
	   {
	    "name": "callback",
	    "_content": "The url for the subscription endpoint (must be the same url as was used when creating the subscription)."
	   },
	   {
	    "name": "verify",
	    "_content": "The verification mode, either 'sync' or 'async'. See the <a href=\"http://pubsubhubbub.googlecode.com/svn/trunk/pubsubhubbub-core-0.3.html#subscribingl\">Google PubSubHubbub spec</a> for details."
	   }
	  ],
	  "optional": [
	   {
	    "name": "verify_token",
	    "_content": "The verification token to be echoed back to the subscriber during the verification callback, as per the <a href=\"http://pubsubhubbub.googlecode.com/svn/trunk/pubsubhubbub-core-0.3.html#subscribing\">Google PubSubHubbub spec</a>. Limited to 200 bytes."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Required parameter missing",
	    "_content": "One of the required arguments for the method was not provided."
	   },
	   {
	    "code": "2",
	    "message": "Invalid parameter value",
	    "_content": "One of the arguments was specified with an illegal value."
	   },
	   {
	    "code": "4",
	    "message": "Callback failed or invalid response",
	    "_content": "The verification callback failed, or failed to return the expected response to confirm the un-subscription."
	   },
	   {
	    "code": "6",
	    "message": "Subscription awaiting verification callback response - try again later",
	    "_content": "A subscription with those details exists already, but it is in a pending (non-verified) state. Please wait a bit for the verification callback to complete before attempting to update the subscription."
	   },
	   {
	    "code": "7",
	    "message": "Subscription not found",
	    "_content": "No subscription matching the provided details for this user could be found."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.push.unsubscribe",
	  "url": "https://www.flickr.com/services/api/flickr.push.unsubscribe.html"
	 },
	 "flickr.reflection.getMethodInfo": {
	  "required": [
	   {
	    "name": "method_name",
	    "_content": "The name of the method to fetch information for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Method not found",
	    "_content": "The requested method was not found."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.reflection.getMethodInfo",
	  "url": "https://www.flickr.com/services/api/flickr.reflection.getMethodInfo.html"
	 },
	 "flickr.reflection.getMethods": {
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.reflection.getMethods",
	  "url": "https://www.flickr.com/services/api/flickr.reflection.getMethods.html"
	 },
	 "flickr.stats.getCollectionDomains": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   }
	  ],
	  "optional": [
	   {
	    "name": "collection_id",
	    "_content": "The id of the collection to get stats for. If not provided, stats for all collections will be returned."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of domains to return per page. If this argument is omitted, it defaults to 25. The maximum allowed value is 100."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   },
	   {
	    "code": "4",
	    "message": "Collection not found",
	    "_content": "The collection id was either invalid or was for a collection not owned by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getCollectionDomains",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getCollectionDomains.html"
	 },
	 "flickr.stats.getCollectionReferrers": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format. \r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   },
	   {
	    "name": "domain",
	    "_content": "The domain to return referrers for. This should be a hostname (eg: \"flickr.com\") with no protocol or pathname."
	   }
	  ],
	  "optional": [
	   {
	    "name": "collection_id",
	    "_content": "The id of the collection to get stats for. If not provided, stats for all collections will be returned."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of referrers to return per page. If this argument is omitted, it defaults to 25. The maximum allowed value is 100."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   },
	   {
	    "code": "4",
	    "message": "Collection not found",
	    "_content": "The collection id was either invalid or was for a collection not owned by the calling user."
	   },
	   {
	    "code": "5",
	    "message": "Invalid domain",
	    "_content": "The domain provided is not in the expected format."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getCollectionReferrers",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getCollectionReferrers.html"
	 },
	 "flickr.stats.getCollectionStats": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   },
	   {
	    "name": "collection_id",
	    "_content": "The id of the collection to get stats for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   },
	   {
	    "code": "4",
	    "message": "Collection not found",
	    "_content": "The collection id was either invalid or was for a collection not owned by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getCollectionStats",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getCollectionStats.html"
	 },
	 "flickr.stats.getCSVFiles": {
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getCSVFiles",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getCSVFiles.html"
	 },
	 "flickr.stats.getPhotoDomains": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   }
	  ],
	  "optional": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to get stats for. If not provided, stats for all photos will be returned."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of domains to return per page. If this argument is omitted, it defaults to 25. The maximum allowed value is 100."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   },
	   {
	    "code": "4",
	    "message": "Photo not found",
	    "_content": "The photo id was either invalid or was for a photo not owned by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getPhotoDomains",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getPhotoDomains.html"
	 },
	 "flickr.stats.getPhotoReferrers": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   },
	   {
	    "name": "domain",
	    "_content": "The domain to return referrers for. This should be a hostname (eg: \"flickr.com\") with no protocol or pathname."
	   }
	  ],
	  "optional": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to get stats for. If not provided, stats for all photos will be returned."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of referrers to return per page. If this argument is omitted, it defaults to 25. The maximum allowed value is 100."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   },
	   {
	    "code": "4",
	    "message": "Photo not found",
	    "_content": "The photo id was either invalid or was for a photo not owned by the calling user."
	   },
	   {
	    "code": "5",
	    "message": "Invalid domain",
	    "_content": "The domain provided is not in the expected format."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getPhotoReferrers",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getPhotoReferrers.html"
	 },
	 "flickr.stats.getPhotosetDomains": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   }
	  ],
	  "optional": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to get stats for. If not provided, stats for all sets will be returned."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of domains to return per page. If this argument is omitted, it defaults to 25. The maximum allowed value is 100."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   },
	   {
	    "code": "4",
	    "message": "Photoset not found",
	    "_content": "The photoset id was either invalid or was for a set not owned by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getPhotosetDomains",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getPhotosetDomains.html"
	 },
	 "flickr.stats.getPhotosetReferrers": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format. \r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   },
	   {
	    "name": "domain",
	    "_content": "The domain to return referrers for. This should be a hostname (eg: \"flickr.com\") with no protocol or pathname."
	   }
	  ],
	  "optional": [
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to get stats for. If not provided, stats for all sets will be returned."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of referrers to return per page. If this argument is omitted, it defaults to 25. The maximum allowed value is 100."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   },
	   {
	    "code": "4",
	    "message": "Photoset not found",
	    "_content": "The photoset id was either invalid or was for a set not owned by the calling user."
	   },
	   {
	    "code": "5",
	    "message": "Invalid domain",
	    "_content": "The domain provided is not in the expected format."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getPhotosetReferrers",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getPhotosetReferrers.html"
	 },
	 "flickr.stats.getPhotosetStats": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   },
	   {
	    "name": "photoset_id",
	    "_content": "The id of the photoset to get stats for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   },
	   {
	    "code": "4",
	    "message": "Photoset not found",
	    "_content": "The photoset id was either invalid or was for a set not owned by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getPhotosetStats",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getPhotosetStats.html"
	 },
	 "flickr.stats.getPhotoStats": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   },
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to get stats for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   },
	   {
	    "code": "4",
	    "message": "Photo not found",
	    "_content": "The photo id was either invalid or was for a photo not owned by the calling user."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getPhotoStats",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getPhotoStats.html"
	 },
	 "flickr.stats.getPhotostreamDomains": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   }
	  ],
	  "optional": [
	   {
	    "name": "per_page",
	    "_content": "Number of domains to return per page. If this argument is omitted, it defaults to 25. The maximum allowed value is 100"
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getPhotostreamDomains",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getPhotostreamDomains.html"
	 },
	 "flickr.stats.getPhotostreamReferrers": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format. \r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   },
	   {
	    "name": "domain",
	    "_content": "The domain to return referrers for. This should be a hostname (eg: \"flickr.com\") with no protocol or pathname."
	   }
	  ],
	  "optional": [
	   {
	    "name": "per_page",
	    "_content": "Number of referrers to return per page. If this argument is omitted, it defaults to 25. The maximum allowed value is 100."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   },
	   {
	    "code": "5",
	    "message": "Invalid domain",
	    "_content": "The domain provided is not in the expected format."
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getPhotostreamReferrers",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getPhotostreamReferrers.html"
	 },
	 "flickr.stats.getPhotostreamStats": {
	  "required": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getPhotostreamStats",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getPhotostreamStats.html"
	 },
	 "flickr.stats.getPopularPhotos": {
	  "optional": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format. \r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day.\r\n\r\nIf no date is provided, all time view counts will be returned."
	   },
	   {
	    "name": "sort",
	    "_content": "The order in which to sort returned photos. Defaults to views. The possible values are views, comments and favorites. \r\n\r\nOther sort options are available through <a href=\"/services/api/flickr.photos.search.html\">flickr.photos.search</a>."
	   },
	   {
	    "name": "per_page",
	    "_content": "Number of referrers to return per page. If this argument is omitted, it defaults to 25. The maximum allowed value is 100."
	   },
	   {
	    "name": "page",
	    "_content": "The page of results to return. If this argument is omitted, it defaults to 1."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   },
	   {
	    "code": "5",
	    "message": "Invalid sort",
	    "_content": "The sort provided is not valid"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getPopularPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getPopularPhotos.html"
	 },
	 "flickr.stats.getTotalViews": {
	  "optional": [
	   {
	    "name": "date",
	    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day.\r\n\r\nIf no date is provided, all time view counts will be returned."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User does not have stats",
	    "_content": "The user you have requested stats has not enabled stats on their account."
	   },
	   {
	    "code": "2",
	    "message": "No stats for that date",
	    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
	   },
	   {
	    "code": "3",
	    "message": "Invalid date",
	    "_content": "The date provided could not be parsed"
	   }
	  ],
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.stats.getTotalViews",
	  "url": "https://www.flickr.com/services/api/flickr.stats.getTotalViews.html"
	 },
	 "flickr.tags.getClusterPhotos": {
	  "required": [
	   {
	    "name": "tag",
	    "_content": "The tag that this cluster belongs to."
	   },
	   {
	    "name": "cluster_id",
	    "_content": "The top three tags for the cluster, separated by dashes (just like the url)."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.tags.getClusterPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.tags.getClusterPhotos.html"
	 },
	 "flickr.tags.getClusters": {
	  "required": [
	   {
	    "name": "tag",
	    "_content": "The tag to fetch clusters for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Tag cluster not found",
	    "_content": "The tag was invalid or no cluster exists for that tag."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.tags.getClusters",
	  "url": "https://www.flickr.com/services/api/flickr.tags.getClusters.html"
	 },
	 "flickr.tags.getHotList": {
	  "optional": [
	   {
	    "name": "period",
	    "_content": "The period for which to fetch hot tags. Valid values are <code>day</code> and <code>week</code> (defaults to <code>day</code>)."
	   },
	   {
	    "name": "count",
	    "_content": "The number of tags to return. Defaults to 20. Maximum allowed value is 200."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Invalid period",
	    "_content": "The specified period was not understood."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.tags.getHotList",
	  "url": "https://www.flickr.com/services/api/flickr.tags.getHotList.html"
	 },
	 "flickr.tags.getListPhoto": {
	  "required": [
	   {
	    "name": "photo_id",
	    "_content": "The id of the photo to return tags for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Photo not found",
	    "_content": "The photo id passed was not a valid photo id."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.tags.getListPhoto",
	  "url": "https://www.flickr.com/services/api/flickr.tags.getListPhoto.html"
	 },
	 "flickr.tags.getListUser": {
	  "optional": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to fetch the tag list for. If this argument is not specified, the currently logged in user (if any) is assumed."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The user NSID passed was not a valid user NSID and the calling user was not logged in.\r\n"
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.tags.getListUser",
	  "url": "https://www.flickr.com/services/api/flickr.tags.getListUser.html"
	 },
	 "flickr.tags.getListUserPopular": {
	  "optional": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to fetch the tag list for. If this argument is not specified, the currently logged in user (if any) is assumed."
	   },
	   {
	    "name": "count",
	    "_content": "Number of popular tags to return. defaults to 10 when this argument is not present."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The user NSID passed was not a valid user NSID and the calling user was not logged in.\r\n"
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.tags.getListUserPopular",
	  "url": "https://www.flickr.com/services/api/flickr.tags.getListUserPopular.html"
	 },
	 "flickr.tags.getListUserRaw": {
	  "optional": [
	   {
	    "name": "tag",
	    "_content": "The tag you want to retrieve all raw versions for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The calling user was not logged in."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.tags.getListUserRaw",
	  "url": "https://www.flickr.com/services/api/flickr.tags.getListUserRaw.html"
	 },
	 "flickr.tags.getMostFrequentlyUsed": {
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.tags.getMostFrequentlyUsed",
	  "url": "https://www.flickr.com/services/api/flickr.tags.getMostFrequentlyUsed.html"
	 },
	 "flickr.tags.getRelated": {
	  "required": [
	   {
	    "name": "tag",
	    "_content": "The tag to fetch related tags for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Tag not found",
	    "_content": "The tag argument was missing."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.tags.getRelated",
	  "url": "https://www.flickr.com/services/api/flickr.tags.getRelated.html"
	 },
	 "flickr.test.echo": {
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.test.echo",
	  "url": "https://www.flickr.com/services/api/flickr.test.echo.html"
	 },
	 "flickr.test.login": {
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.test.login",
	  "url": "https://www.flickr.com/services/api/flickr.test.login.html"
	 },
	 "flickr.test.null": {
	  "security": {
	   "needslogin": 1,
	   "needssigning": 1,
	   "requiredperms": 1
	  },
	  "name": "flickr.test.null",
	  "url": "https://www.flickr.com/services/api/flickr.test.null.html"
	 },
	 "flickr.urls.getGroup": {
	  "required": [
	   {
	    "name": "group_id",
	    "_content": "The NSID of the group to fetch the url for."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Group not found",
	    "_content": "The NSID specified was not a valid group."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.urls.getGroup",
	  "url": "https://www.flickr.com/services/api/flickr.urls.getGroup.html"
	 },
	 "flickr.urls.getUserPhotos": {
	  "optional": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to fetch the url for. If omitted, the calling user is assumed."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The NSID specified was not a valid user."
	   },
	   {
	    "code": "2",
	    "message": "No user specified",
	    "_content": "No user_id was passed and the calling user was not logged in."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.urls.getUserPhotos",
	  "url": "https://www.flickr.com/services/api/flickr.urls.getUserPhotos.html"
	 },
	 "flickr.urls.getUserProfile": {
	  "optional": [
	   {
	    "name": "user_id",
	    "_content": "The NSID of the user to fetch the url for. If omitted, the calling user is assumed."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The NSID specified was not a valid user."
	   },
	   {
	    "code": "2",
	    "message": "No user specified",
	    "_content": "No user_id was passed and the calling user was not logged in."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.urls.getUserProfile",
	  "url": "https://www.flickr.com/services/api/flickr.urls.getUserProfile.html"
	 },
	 "flickr.urls.lookupGallery": {
	  "required": [
	   {
	    "name": "url",
	    "_content": "The gallery's URL."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.urls.lookupGallery",
	  "url": "https://www.flickr.com/services/api/flickr.urls.lookupGallery.html"
	 },
	 "flickr.urls.lookupGroup": {
	  "required": [
	   {
	    "name": "url",
	    "_content": "The url to the group's page or photo pool."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "Group not found",
	    "_content": "The passed URL was not a valid group page or photo pool url."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.urls.lookupGroup",
	  "url": "https://www.flickr.com/services/api/flickr.urls.lookupGroup.html"
	 },
	 "flickr.urls.lookupUser": {
	  "required": [
	   {
	    "name": "url",
	    "_content": "The url to the user's profile or photos page."
	   }
	  ],
	  "errors": [
	   {
	    "code": "1",
	    "message": "User not found",
	    "_content": "The passed URL was not a valid user profile or photos url."
	   }
	  ],
	  "security": {
	   "needslogin": 0,
	   "needssigning": 0,
	   "requiredperms": 0
	  },
	  "name": "flickr.urls.lookupUser",
	  "url": "https://www.flickr.com/services/api/flickr.urls.lookupUser.html"
	 }
	};
	
	(function () {
	  Object.keys(Flickr.methods).forEach(function(method) {
	    var level = method.split(".").slice(1);
	    var e = Flickr.prototype, key;
	    while(level.length > 1) {
	      key = level.splice(0,1)[0];
	      if(!e[key]) { e[key] = {}; }
	      e = e[key];
	    }
	    e[level] = Utils.generateAPIDevFunction(Flickr.methods[method]);
	  });
	}());
	
	 Flickr.prototype.bindOptions = function (flickrOptions) {
	  this.flickrOptions = flickrOptions;
	  (function bindOptions(obj, props) {
	    Object.keys(props).forEach(function(key) {
	      if (key === "flickrOptions") return;
	      if (typeof obj[key] === "object") {
	        bindOptions(obj[key], props[key]);
	        obj[key].flickrOptions = flickrOptions;
	      }
	    });
	  }(this, Flickr.prototype));
	};
	
	 window.Flickr = Flickr;
	}());


/***/ },
/* 14 */
/***/ function(module, exports) {

	function changeBg(imageArray) {
	  var imgCount = 0;
	  var img_array = imageArray;
	    _nxtIndex = 0,
	    _curIndex = 0,
	    interval = 5000;
	
	  function nextIndex() {
	    _nxtIndex = (_nxtIndex + 1) % img_array.length;
	    return _nxtIndex;
	  };
	
	  function shiftIndexes() {
	    _curIndex = _nxtIndex;
	    nextIndex();
	  }
	
	  function createImgTags(){
	      imgCount = img_array.length;
	      var html = '';
	      var slider = document.getElementById('slider');
	      console.log(slider);
	      for(var i=0; i<imgCount;i++){
	          html +='<div id="background-slide'+i+'" class="background-slider"></div>';
	      }
	      console.log(html);
	      $(slider).html(html);
	  }
	  function assignBackgrounds() {
	    imgCount = img_array.length;
	    for (var i = 0; i < imgCount; i++) {
	
	      jQuery('#background-slide' + i).css('backgroundImage', function() {
	        return 'url(' + img_array[nextIndex()] + ')';
	      });
	      if (i == 0) {
	        jQuery('#background-slide' + i).css('opacity', 1);
	      } else {
	        jQuery('#background-slide' + i).css('opacity', 0);
	      }
	    }
	  }
	
	  function startBackgroundOpacityToggle() {
	    //console.log("in startBackgroundOpacityToggle. _curIndex = "+_curIndex);
	    elem = jQuery('#background-slide' + _curIndex);
	    elem.animate({
	      opacity: (elem.css('opacity') == 0) ? 1 : 0
	    }, {
	      duration: 3500,
	      start: finishBackgroundOpacityToggle
	    });
	  };
	
	  function finishBackgroundOpacityToggle() {
	    //console.log("in finishBackgroundOpacity. _nxtIndex = "+_nxtIndex);
	    elem = jQuery('#background-slide' + _nxtIndex);
	    elem.animate({
	      opacity: (elem.css('opacity') == 0) ? 1 : 0
	    }, {
	      duration: 3500,
	      complete: runSlider
	    });
	
	  };
	
	  function runSlider() {
	    shiftIndexes();
	    setTimeout(startBackgroundOpacityToggle, interval);
	  }
	
	  createImgTags();
	  assignBackgrounds();
	  runSlider();
	};
	
	  module.exports = changeBg;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global, setImmediate, process) {(function (global, factory) {
	     true ? factory(exports) :
	    typeof define === 'function' && define.amd ? define(['exports'], factory) :
	    (factory((global.async = global.async || {})));
	}(this, function (exports) { 'use strict';
	
	    /**
	     * A faster alternative to `Function#apply`, this function invokes `func`
	     * with the `this` binding of `thisArg` and the arguments of `args`.
	     *
	     * @private
	     * @param {Function} func The function to invoke.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {...*} args The arguments to invoke `func` with.
	     * @returns {*} Returns the result of `func`.
	     */
	    function apply(func, thisArg, args) {
	      var length = args.length;
	      switch (length) {
	        case 0: return func.call(thisArg);
	        case 1: return func.call(thisArg, args[0]);
	        case 2: return func.call(thisArg, args[0], args[1]);
	        case 3: return func.call(thisArg, args[0], args[1], args[2]);
	      }
	      return func.apply(thisArg, args);
	    }
	
	    /**
	     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(_.noop);
	     * // => true
	     *
	     * _.isObject(null);
	     * // => false
	     */
	    function isObject(value) {
	      var type = typeof value;
	      return !!value && (type == 'object' || type == 'function');
	    }
	
	    var funcTag = '[object Function]';
	    var genTag = '[object GeneratorFunction]';
	    /** Used for built-in method references. */
	    var objectProto = Object.prototype;
	
	    /**
	     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	     * of values.
	     */
	    var objectToString = objectProto.toString;
	
	    /**
	     * Checks if `value` is classified as a `Function` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified,
	     *  else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     *
	     * _.isFunction(/abc/);
	     * // => false
	     */
	    function isFunction(value) {
	      // The use of `Object#toString` avoids issues with the `typeof` operator
	      // in Safari 8 which returns 'object' for typed array and weak map constructors,
	      // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	      var tag = isObject(value) ? objectToString.call(value) : '';
	      return tag == funcTag || tag == genTag;
	    }
	
	    /**
	     * Checks if `value` is object-like. A value is object-like if it's not `null`
	     * and has a `typeof` result of "object".
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	     * @example
	     *
	     * _.isObjectLike({});
	     * // => true
	     *
	     * _.isObjectLike([1, 2, 3]);
	     * // => true
	     *
	     * _.isObjectLike(_.noop);
	     * // => false
	     *
	     * _.isObjectLike(null);
	     * // => false
	     */
	    function isObjectLike(value) {
	      return !!value && typeof value == 'object';
	    }
	
	    /** `Object#toString` result references. */
	    var symbolTag = '[object Symbol]';
	
	    /** Used for built-in method references. */
	    var objectProto$1 = Object.prototype;
	
	    /**
	     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	     * of values.
	     */
	    var objectToString$1 = objectProto$1.toString;
	
	    /**
	     * Checks if `value` is classified as a `Symbol` primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified,
	     *  else `false`.
	     * @example
	     *
	     * _.isSymbol(Symbol.iterator);
	     * // => true
	     *
	     * _.isSymbol('abc');
	     * // => false
	     */
	    function isSymbol(value) {
	      return typeof value == 'symbol' ||
	        (isObjectLike(value) && objectToString$1.call(value) == symbolTag);
	    }
	
	    /** Used as references for various `Number` constants. */
	    var NAN = 0 / 0;
	
	    /** Used to match leading and trailing whitespace. */
	    var reTrim = /^\s+|\s+$/g;
	
	    /** Used to detect bad signed hexadecimal string values. */
	    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	    /** Used to detect binary string values. */
	    var reIsBinary = /^0b[01]+$/i;
	
	    /** Used to detect octal string values. */
	    var reIsOctal = /^0o[0-7]+$/i;
	
	    /** Built-in method references without a dependency on `root`. */
	    var freeParseInt = parseInt;
	
	    /**
	     * Converts `value` to a number.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to process.
	     * @returns {number} Returns the number.
	     * @example
	     *
	     * _.toNumber(3);
	     * // => 3
	     *
	     * _.toNumber(Number.MIN_VALUE);
	     * // => 5e-324
	     *
	     * _.toNumber(Infinity);
	     * // => Infinity
	     *
	     * _.toNumber('3');
	     * // => 3
	     */
	    function toNumber(value) {
	      if (typeof value == 'number') {
	        return value;
	      }
	      if (isSymbol(value)) {
	        return NAN;
	      }
	      if (isObject(value)) {
	        var other = isFunction(value.valueOf) ? value.valueOf() : value;
	        value = isObject(other) ? (other + '') : other;
	      }
	      if (typeof value != 'string') {
	        return value === 0 ?  value : +value;
	      }
	      value = value.replace(reTrim, '');
	      var isBinary = reIsBinary.test(value);
	      return (isBinary || reIsOctal.test(value))
	        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	        : (reIsBadHex.test(value) ? NAN : +value);
	    }
	
	    var INFINITY = 1 / 0;
	    var MAX_INTEGER = 1.7976931348623157e+308;
	    /**
	     * Converts `value` to an integer.
	     *
	     * **Note:** This function is loosely based on
	     * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.toInteger(3);
	     * // => 3
	     *
	     * _.toInteger(Number.MIN_VALUE);
	     * // => 0
	     *
	     * _.toInteger(Infinity);
	     * // => 1.7976931348623157e+308
	     *
	     * _.toInteger('3');
	     * // => 3
	     */
	    function toInteger(value) {
	      if (!value) {
	        return value === 0 ? value : 0;
	      }
	      value = toNumber(value);
	      if (value === INFINITY || value === -INFINITY) {
	        var sign = (value < 0 ? -1 : 1);
	        return sign * MAX_INTEGER;
	      }
	      var remainder = value % 1;
	      return value === value ? (remainder ? value - remainder : value) : 0;
	    }
	
	    /** Used as the `TypeError` message for "Functions" methods. */
	    var FUNC_ERROR_TEXT = 'Expected a function';
	
	    /* Built-in method references for those with the same name as other `lodash` methods. */
	    var nativeMax = Math.max;
	
	    /**
	     * Creates a function that invokes `func` with the `this` binding of the
	     * created function and arguments from `start` and beyond provided as
	     * an array.
	     *
	     * **Note:** This method is based on the
	     * [rest parameter](https://mdn.io/rest_parameters).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Function
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.rest(function(what, names) {
	     *   return what + ' ' + _.initial(names).join(', ') +
	     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	     * });
	     *
	     * say('hello', 'fred', 'barney', 'pebbles');
	     * // => 'hello fred, barney, & pebbles'
	     */
	    function rest(func, start) {
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	      return function() {
	        var args = arguments,
	            index = -1,
	            length = nativeMax(args.length - start, 0),
	            array = Array(length);
	
	        while (++index < length) {
	          array[index] = args[start + index];
	        }
	        switch (start) {
	          case 0: return func.call(this, array);
	          case 1: return func.call(this, args[0], array);
	          case 2: return func.call(this, args[0], args[1], array);
	        }
	        var otherArgs = Array(start + 1);
	        index = -1;
	        while (++index < start) {
	          otherArgs[index] = args[index];
	        }
	        otherArgs[start] = array;
	        return apply(func, this, otherArgs);
	      };
	    }
	
	    function initialParams (fn) {
	        return rest(function (args /*..., callback*/) {
	            var callback = args.pop();
	            fn.call(this, args, callback);
	        });
	    }
	
	    function applyEach$1(eachfn) {
	        return rest(function (fns, args) {
	            var go = initialParams(function (args, callback) {
	                var that = this;
	                return eachfn(fns, function (fn, cb) {
	                    fn.apply(that, args.concat([cb]));
	                }, callback);
	            });
	            if (args.length) {
	                return go.apply(this, args);
	            } else {
	                return go;
	            }
	        });
	    }
	
	    /**
	     * A no-operation function that returns `undefined` regardless of the
	     * arguments it receives.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.3.0
	     * @category Util
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.noop(object) === undefined;
	     * // => true
	     */
	    function noop() {
	      // No operation performed.
	    }
	
	    function once(fn) {
	        return function () {
	            if (fn === null) return;
	            fn.apply(this, arguments);
	            fn = null;
	        };
	    }
	
	    /**
	     * The base implementation of `_.property` without support for deep paths.
	     *
	     * @private
	     * @param {string} key The key of the property to get.
	     * @returns {Function} Returns the new function.
	     */
	    function baseProperty(key) {
	      return function(object) {
	        return object == null ? undefined : object[key];
	      };
	    }
	
	    /**
	     * Gets the "length" property value of `object`.
	     *
	     * **Note:** This function is used to avoid a
	     * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	     * Safari on at least iOS 8.1-8.3 ARM64.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {*} Returns the "length" value.
	     */
	    var getLength = baseProperty('length');
	
	    /** Used as references for various `Number` constants. */
	    var MAX_SAFE_INTEGER = 9007199254740991;
	
	    /**
	     * Checks if `value` is a valid array-like length.
	     *
	     * **Note:** This function is loosely based on
	     * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a valid length,
	     *  else `false`.
	     * @example
	     *
	     * _.isLength(3);
	     * // => true
	     *
	     * _.isLength(Number.MIN_VALUE);
	     * // => false
	     *
	     * _.isLength(Infinity);
	     * // => false
	     *
	     * _.isLength('3');
	     * // => false
	     */
	    function isLength(value) {
	      return typeof value == 'number' &&
	        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	    }
	
	    /**
	     * Checks if `value` is array-like. A value is considered array-like if it's
	     * not a function and has a `value.length` that's an integer greater than or
	     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	     * @example
	     *
	     * _.isArrayLike([1, 2, 3]);
	     * // => true
	     *
	     * _.isArrayLike(document.body.children);
	     * // => true
	     *
	     * _.isArrayLike('abc');
	     * // => true
	     *
	     * _.isArrayLike(_.noop);
	     * // => false
	     */
	    function isArrayLike(value) {
	      return value != null && isLength(getLength(value)) && !isFunction(value);
	    }
	
	    var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;
	
	    function getIterator (coll) {
	        return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
	    }
	
	    /* Built-in method references for those with the same name as other `lodash` methods. */
	    var nativeGetPrototype = Object.getPrototypeOf;
	
	    /**
	     * Gets the `[[Prototype]]` of `value`.
	     *
	     * @private
	     * @param {*} value The value to query.
	     * @returns {null|Object} Returns the `[[Prototype]]`.
	     */
	    function getPrototype(value) {
	      return nativeGetPrototype(Object(value));
	    }
	
	    /** Used for built-in method references. */
	    var objectProto$2 = Object.prototype;
	
	    /** Used to check objects for own properties. */
	    var hasOwnProperty = objectProto$2.hasOwnProperty;
	
	    /**
	     * The base implementation of `_.has` without support for deep paths.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} key The key to check.
	     * @returns {boolean} Returns `true` if `key` exists, else `false`.
	     */
	    function baseHas(object, key) {
	      // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	      // that are composed entirely of index properties, return `false` for
	      // `hasOwnProperty` checks of them.
	      return hasOwnProperty.call(object, key) ||
	        (typeof object == 'object' && key in object && getPrototype(object) === null);
	    }
	
	    /* Built-in method references for those with the same name as other `lodash` methods. */
	    var nativeKeys = Object.keys;
	
	    /**
	     * The base implementation of `_.keys` which doesn't skip the constructor
	     * property of prototypes or treat sparse arrays as dense.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */
	    function baseKeys(object) {
	      return nativeKeys(Object(object));
	    }
	
	    /**
	     * The base implementation of `_.times` without support for iteratee shorthands
	     * or max array length checks.
	     *
	     * @private
	     * @param {number} n The number of times to invoke `iteratee`.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the array of results.
	     */
	    function baseTimes(n, iteratee) {
	      var index = -1,
	          result = Array(n);
	
	      while (++index < n) {
	        result[index] = iteratee(index);
	      }
	      return result;
	    }
	
	    /**
	     * This method is like `_.isArrayLike` except that it also checks if `value`
	     * is an object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an array-like object,
	     *  else `false`.
	     * @example
	     *
	     * _.isArrayLikeObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isArrayLikeObject(document.body.children);
	     * // => true
	     *
	     * _.isArrayLikeObject('abc');
	     * // => false
	     *
	     * _.isArrayLikeObject(_.noop);
	     * // => false
	     */
	    function isArrayLikeObject(value) {
	      return isObjectLike(value) && isArrayLike(value);
	    }
	
	    /** `Object#toString` result references. */
	    var argsTag = '[object Arguments]';
	
	    /** Used for built-in method references. */
	    var objectProto$3 = Object.prototype;
	
	    /** Used to check objects for own properties. */
	    var hasOwnProperty$1 = objectProto$3.hasOwnProperty;
	
	    /**
	     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	     * of values.
	     */
	    var objectToString$2 = objectProto$3.toString;
	
	    /** Built-in value references. */
	    var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
	
	    /**
	     * Checks if `value` is likely an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified,
	     *  else `false`.
	     * @example
	     *
	     * _.isArguments(function() { return arguments; }());
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */
	    function isArguments(value) {
	      // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	      return isArrayLikeObject(value) && hasOwnProperty$1.call(value, 'callee') &&
	        (!propertyIsEnumerable.call(value, 'callee') || objectToString$2.call(value) == argsTag);
	    }
	
	    /**
	     * Checks if `value` is classified as an `Array` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @type {Function}
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified,
	     *  else `false`.
	     * @example
	     *
	     * _.isArray([1, 2, 3]);
	     * // => true
	     *
	     * _.isArray(document.body.children);
	     * // => false
	     *
	     * _.isArray('abc');
	     * // => false
	     *
	     * _.isArray(_.noop);
	     * // => false
	     */
	    var isArray = Array.isArray;
	
	    /** `Object#toString` result references. */
	    var stringTag = '[object String]';
	
	    /** Used for built-in method references. */
	    var objectProto$4 = Object.prototype;
	
	    /**
	     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	     * of values.
	     */
	    var objectToString$3 = objectProto$4.toString;
	
	    /**
	     * Checks if `value` is classified as a `String` primitive or object.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified,
	     *  else `false`.
	     * @example
	     *
	     * _.isString('abc');
	     * // => true
	     *
	     * _.isString(1);
	     * // => false
	     */
	    function isString(value) {
	      return typeof value == 'string' ||
	        (!isArray(value) && isObjectLike(value) && objectToString$3.call(value) == stringTag);
	    }
	
	    /**
	     * Creates an array of index keys for `object` values of arrays,
	     * `arguments` objects, and strings, otherwise `null` is returned.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array|null} Returns index keys, else `null`.
	     */
	    function indexKeys(object) {
	      var length = object ? object.length : undefined;
	      if (isLength(length) &&
	          (isArray(object) || isString(object) || isArguments(object))) {
	        return baseTimes(length, String);
	      }
	      return null;
	    }
	
	    /** Used as references for various `Number` constants. */
	    var MAX_SAFE_INTEGER$1 = 9007199254740991;
	
	    /** Used to detect unsigned integer values. */
	    var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	    /**
	     * Checks if `value` is a valid array-like index.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	     */
	    function isIndex(value, length) {
	      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	      length = length == null ? MAX_SAFE_INTEGER$1 : length;
	      return value > -1 && value % 1 == 0 && value < length;
	    }
	
	    /** Used for built-in method references. */
	    var objectProto$5 = Object.prototype;
	
	    /**
	     * Checks if `value` is likely a prototype object.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	     */
	    function isPrototype(value) {
	      var Ctor = value && value.constructor,
	          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;
	
	      return value === proto;
	    }
	
	    /**
	     * Creates an array of the own enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects. See the
	     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	     * for more details.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keys(new Foo);
	     * // => ['a', 'b'] (iteration order is not guaranteed)
	     *
	     * _.keys('hi');
	     * // => ['0', '1']
	     */
	    function keys(object) {
	      var isProto = isPrototype(object);
	      if (!(isProto || isArrayLike(object))) {
	        return baseKeys(object);
	      }
	      var indexes = indexKeys(object),
	          skipIndexes = !!indexes,
	          result = indexes || [],
	          length = result.length;
	
	      for (var key in object) {
	        if (baseHas(object, key) &&
	            !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	            !(isProto && key == 'constructor')) {
	          result.push(key);
	        }
	      }
	      return result;
	    }
	
	    function iterator(coll) {
	        var i = -1;
	        var len;
	        if (isArrayLike(coll)) {
	            len = coll.length;
	            return function next() {
	                i++;
	                return i < len ? { value: coll[i], key: i } : null;
	            };
	        }
	
	        var iterate = getIterator(coll);
	        if (iterate) {
	            return function next() {
	                var item = iterate.next();
	                if (item.done) return null;
	                i++;
	                return { value: item.value, key: i };
	            };
	        }
	
	        var okeys = keys(coll);
	        len = okeys.length;
	        return function next() {
	            i++;
	            var key = okeys[i];
	            return i < len ? { value: coll[key], key: key } : null;
	        };
	    }
	
	    function onlyOnce(fn) {
	        return function () {
	            if (fn === null) throw new Error("Callback was already called.");
	            fn.apply(this, arguments);
	            fn = null;
	        };
	    }
	
	    function _eachOfLimit(limit) {
	        return function (obj, iteratee, callback) {
	            callback = once(callback || noop);
	            obj = obj || [];
	            var nextElem = iterator(obj);
	            if (limit <= 0) {
	                return callback(null);
	            }
	            var done = false;
	            var running = 0;
	            var errored = false;
	
	            (function replenish() {
	                if (done && running <= 0) {
	                    return callback(null);
	                }
	
	                while (running < limit && !errored) {
	                    var elem = nextElem();
	                    if (elem === null) {
	                        done = true;
	                        if (running <= 0) {
	                            callback(null);
	                        }
	                        return;
	                    }
	                    running += 1;
	                    iteratee(elem.value, elem.key, onlyOnce(function (err) {
	                        running -= 1;
	                        if (err) {
	                            callback(err);
	                            errored = true;
	                        } else {
	                            replenish();
	                        }
	                    }));
	                }
	            })();
	        };
	    }
	
	    function doParallelLimit(fn) {
	        return function (obj, limit, iteratee, callback) {
	            return fn(_eachOfLimit(limit), obj, iteratee, callback);
	        };
	    }
	
	    function _asyncMap(eachfn, arr, iteratee, callback) {
	        callback = once(callback || noop);
	        arr = arr || [];
	        var results = isArrayLike(arr) || getIterator(arr) ? [] : {};
	        eachfn(arr, function (value, index, callback) {
	            iteratee(value, function (err, v) {
	                results[index] = v;
	                callback(err);
	            });
	        }, function (err) {
	            callback(err, results);
	        });
	    }
	
	    var mapLimit = doParallelLimit(_asyncMap);
	
	    function doLimit(fn, limit) {
	        return function (iterable, iteratee, callback) {
	            return fn(iterable, limit, iteratee, callback);
	        };
	    }
	
	    var map = doLimit(mapLimit, Infinity);
	
	    var applyEach = applyEach$1(map);
	
	    var mapSeries = doLimit(mapLimit, 1);
	
	    var applyEachSeries = applyEach$1(mapSeries);
	
	    var apply$1 = rest(function (fn, args) {
	        return rest(function (callArgs) {
	            return fn.apply(null, args.concat(callArgs));
	        });
	    });
	
	    function asyncify(func) {
	        return initialParams(function (args, callback) {
	            var result;
	            try {
	                result = func.apply(this, args);
	            } catch (e) {
	                return callback(e);
	            }
	            // if result is Promise object
	            if (isObject(result) && typeof result.then === 'function') {
	                result.then(function (value) {
	                    callback(null, value);
	                })['catch'](function (err) {
	                    callback(err.message ? err : new Error(err));
	                });
	            } else {
	                callback(null, result);
	            }
	        });
	    }
	
	    /**
	     * A specialized version of `_.forEach` for arrays without support for
	     * iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns `array`.
	     */
	    function arrayEach(array, iteratee) {
	      var index = -1,
	          length = array.length;
	
	      while (++index < length) {
	        if (iteratee(array[index], index, array) === false) {
	          break;
	        }
	      }
	      return array;
	    }
	
	    /**
	     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
	    function createBaseFor(fromRight) {
	      return function(object, iteratee, keysFunc) {
	        var index = -1,
	            iterable = Object(object),
	            props = keysFunc(object),
	            length = props.length;
	
	        while (length--) {
	          var key = props[fromRight ? length : ++index];
	          if (iteratee(iterable[key], key, iterable) === false) {
	            break;
	          }
	        }
	        return object;
	      };
	    }
	
	    /**
	     * The base implementation of `baseForOwn` which iterates over `object`
	     * properties returned by `keysFunc` invoking `iteratee` for each property.
	     * Iteratee functions may exit iteration early by explicitly returning `false`.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */
	    var baseFor = createBaseFor();
	
	    /**
	     * The base implementation of `_.forOwn` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForOwn(object, iteratee) {
	      return object && baseFor(object, iteratee, keys);
	    }
	
	    /**
	     * Removes all key-value entries from the stack.
	     *
	     * @private
	     * @name clear
	     * @memberOf Stack
	     */
	    function stackClear() {
	      this.__data__ = { 'array': [], 'map': null };
	    }
	
	    /**
	     * Performs a
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * comparison between two values to determine if they are equivalent.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'fred' };
	     *
	     * _.eq(object, object);
	     * // => true
	     *
	     * _.eq(object, other);
	     * // => false
	     *
	     * _.eq('a', 'a');
	     * // => true
	     *
	     * _.eq('a', Object('a'));
	     * // => false
	     *
	     * _.eq(NaN, NaN);
	     * // => true
	     */
	    function eq(value, other) {
	      return value === other || (value !== value && other !== other);
	    }
	
	    /**
	     * Gets the index at which the `key` is found in `array` of key-value pairs.
	     *
	     * @private
	     * @param {Array} array The array to search.
	     * @param {*} key The key to search for.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     */
	    function assocIndexOf(array, key) {
	      var length = array.length;
	      while (length--) {
	        if (eq(array[length][0], key)) {
	          return length;
	        }
	      }
	      return -1;
	    }
	
	    /** Used for built-in method references. */
	    var arrayProto = Array.prototype;
	
	    /** Built-in value references. */
	    var splice = arrayProto.splice;
	
	    /**
	     * Removes `key` and its value from the associative array.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
	    function assocDelete(array, key) {
	      var index = assocIndexOf(array, key);
	      if (index < 0) {
	        return false;
	      }
	      var lastIndex = array.length - 1;
	      if (index == lastIndex) {
	        array.pop();
	      } else {
	        splice.call(array, index, 1);
	      }
	      return true;
	    }
	
	    /**
	     * Removes `key` and its value from the stack.
	     *
	     * @private
	     * @name delete
	     * @memberOf Stack
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
	    function stackDelete(key) {
	      var data = this.__data__,
	          array = data.array;
	
	      return array ? assocDelete(array, key) : data.map['delete'](key);
	    }
	
	    /**
	     * Gets the associative array value for `key`.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
	    function assocGet(array, key) {
	      var index = assocIndexOf(array, key);
	      return index < 0 ? undefined : array[index][1];
	    }
	
	    /**
	     * Gets the stack value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf Stack
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
	    function stackGet(key) {
	      var data = this.__data__,
	          array = data.array;
	
	      return array ? assocGet(array, key) : data.map.get(key);
	    }
	
	    /**
	     * Checks if an associative array value for `key` exists.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
	    function assocHas(array, key) {
	      return assocIndexOf(array, key) > -1;
	    }
	
	    /**
	     * Checks if a stack value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf Stack
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
	    function stackHas(key) {
	      var data = this.__data__,
	          array = data.array;
	
	      return array ? assocHas(array, key) : data.map.has(key);
	    }
	
	    /**
	     * Checks if `value` is a host object in IE < 9.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	     */
	    function isHostObject(value) {
	      // Many host objects are `Object` objects that can coerce to strings
	      // despite having improperly defined `toString` methods.
	      var result = false;
	      if (value != null && typeof value.toString != 'function') {
	        try {
	          result = !!(value + '');
	        } catch (e) {}
	      }
	      return result;
	    }
	
	    /** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	    /** Used to detect host constructors (Safari). */
	    var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	    /** Used for built-in method references. */
	    var objectProto$7 = Object.prototype;
	
	    /** Used to resolve the decompiled source of functions. */
	    var funcToString = Function.prototype.toString;
	
	    /** Used to check objects for own properties. */
	    var hasOwnProperty$2 = objectProto$7.hasOwnProperty;
	
	    /** Used to detect if a method is native. */
	    var reIsNative = RegExp('^' +
	      funcToString.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
	      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	    );
	
	    /**
	     * Checks if `value` is a native function.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a native function,
	     *  else `false`.
	     * @example
	     *
	     * _.isNative(Array.prototype.push);
	     * // => true
	     *
	     * _.isNative(_);
	     * // => false
	     */
	    function isNative(value) {
	      if (value == null) {
	        return false;
	      }
	      if (isFunction(value)) {
	        return reIsNative.test(funcToString.call(value));
	      }
	      return isObjectLike(value) &&
	        (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	    }
	
	    /**
	     * Gets the native function at `key` of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {string} key The key of the method to get.
	     * @returns {*} Returns the function if it's native, else `undefined`.
	     */
	    function getNative(object, key) {
	      var value = object[key];
	      return isNative(value) ? value : undefined;
	    }
	
	    /* Built-in method references that are verified to be native. */
	    var nativeCreate = getNative(Object, 'create');
	
	    /** Used for built-in method references. */
	    var objectProto$6 = Object.prototype;
	
	    /**
	     * Creates an hash object.
	     *
	     * @private
	     * @constructor
	     * @returns {Object} Returns the new hash object.
	     */
	    function Hash() {}
	
	    // Avoid inheriting from `Object.prototype` when possible.
	    Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto$6;
	
	    /**
	     * Checks if `value` is a global object.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	     */
	    function checkGlobal(value) {
	      return (value && value.Object === Object) ? value : null;
	    }
	
	    /** Used to determine if values are of the language type `Object`. */
	    var objectTypes = {
	      'function': true,
	      'object': true
	    };
	
	    /** Detect free variable `exports`. */
	    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	      ? exports
	      : undefined;
	
	    /** Detect free variable `module`. */
	    var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	      ? module
	      : undefined;
	
	    /** Detect free variable `global` from Node.js. */
	    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
	
	    /** Detect free variable `self`. */
	    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	
	    /** Detect free variable `window`. */
	    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	
	    /** Detect `this` as the global object. */
	    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	
	    /**
	     * Used as a reference to the global object.
	     *
	     * The `this` value is used if it's the global object to avoid Greasemonkey's
	     * restricted `window` object, otherwise the `window` object is used.
	     */
	    var root = freeGlobal ||
	      ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	        freeSelf || thisGlobal || Function('return this')();
	
	    /* Built-in method references that are verified to be native. */
	    var Map = getNative(root, 'Map');
	
	    /**
	     * Removes all key-value entries from the map.
	     *
	     * @private
	     * @name clear
	     * @memberOf MapCache
	     */
	    function mapClear() {
	      this.__data__ = {
	        'hash': new Hash,
	        'map': Map ? new Map : [],
	        'string': new Hash
	      };
	    }
	
	    /** Used for built-in method references. */
	    var objectProto$8 = Object.prototype;
	
	    /** Used to check objects for own properties. */
	    var hasOwnProperty$3 = objectProto$8.hasOwnProperty;
	
	    /**
	     * Checks if a hash value for `key` exists.
	     *
	     * @private
	     * @param {Object} hash The hash to query.
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
	    function hashHas(hash, key) {
	      return nativeCreate ? hash[key] !== undefined : hasOwnProperty$3.call(hash, key);
	    }
	
	    /**
	     * Removes `key` and its value from the hash.
	     *
	     * @private
	     * @param {Object} hash The hash to modify.
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
	    function hashDelete(hash, key) {
	      return hashHas(hash, key) && delete hash[key];
	    }
	
	    /**
	     * Checks if `value` is suitable for use as unique object key.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	     */
	    function isKeyable(value) {
	      var type = typeof value;
	      return type == 'number' || type == 'boolean' ||
	        (type == 'string' && value != '__proto__') || value == null;
	    }
	
	    /**
	     * Removes `key` and its value from the map.
	     *
	     * @private
	     * @name delete
	     * @memberOf MapCache
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
	    function mapDelete(key) {
	      var data = this.__data__;
	      if (isKeyable(key)) {
	        return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	      }
	      return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	    }
	
	    /** Used to stand-in for `undefined` hash values. */
	    var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	    /** Used for built-in method references. */
	    var objectProto$9 = Object.prototype;
	
	    /** Used to check objects for own properties. */
	    var hasOwnProperty$4 = objectProto$9.hasOwnProperty;
	
	    /**
	     * Gets the hash value for `key`.
	     *
	     * @private
	     * @param {Object} hash The hash to query.
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
	    function hashGet(hash, key) {
	      if (nativeCreate) {
	        var result = hash[key];
	        return result === HASH_UNDEFINED ? undefined : result;
	      }
	      return hasOwnProperty$4.call(hash, key) ? hash[key] : undefined;
	    }
	
	    /**
	     * Gets the map value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf MapCache
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
	    function mapGet(key) {
	      var data = this.__data__;
	      if (isKeyable(key)) {
	        return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	      }
	      return Map ? data.map.get(key) : assocGet(data.map, key);
	    }
	
	    /**
	     * Checks if a map value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf MapCache
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
	    function mapHas(key) {
	      var data = this.__data__;
	      if (isKeyable(key)) {
	        return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	      }
	      return Map ? data.map.has(key) : assocHas(data.map, key);
	    }
	
	    /**
	     * Sets the associative array `key` to `value`.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     */
	    function assocSet(array, key, value) {
	      var index = assocIndexOf(array, key);
	      if (index < 0) {
	        array.push([key, value]);
	      } else {
	        array[index][1] = value;
	      }
	    }
	
	    /** Used to stand-in for `undefined` hash values. */
	    var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
	
	    /**
	     * Sets the hash `key` to `value`.
	     *
	     * @private
	     * @param {Object} hash The hash to modify.
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     */
	    function hashSet(hash, key, value) {
	      hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
	    }
	
	    /**
	     * Sets the map `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf MapCache
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the map cache instance.
	     */
	    function mapSet(key, value) {
	      var data = this.__data__;
	      if (isKeyable(key)) {
	        hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	      } else if (Map) {
	        data.map.set(key, value);
	      } else {
	        assocSet(data.map, key, value);
	      }
	      return this;
	    }
	
	    /**
	     * Creates a map cache object to store key-value pairs.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [values] The values to cache.
	     */
	    function MapCache(values) {
	      var index = -1,
	          length = values ? values.length : 0;
	
	      this.clear();
	      while (++index < length) {
	        var entry = values[index];
	        this.set(entry[0], entry[1]);
	      }
	    }
	
	    // Add methods to `MapCache`.
	    MapCache.prototype.clear = mapClear;
	    MapCache.prototype['delete'] = mapDelete;
	    MapCache.prototype.get = mapGet;
	    MapCache.prototype.has = mapHas;
	    MapCache.prototype.set = mapSet;
	
	    /** Used as the size to enable large array optimizations. */
	    var LARGE_ARRAY_SIZE = 200;
	
	    /**
	     * Sets the stack `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf Stack
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the stack cache instance.
	     */
	    function stackSet(key, value) {
	      var data = this.__data__,
	          array = data.array;
	
	      if (array) {
	        if (array.length < (LARGE_ARRAY_SIZE - 1)) {
	          assocSet(array, key, value);
	        } else {
	          data.array = null;
	          data.map = new MapCache(array);
	        }
	      }
	      var map = data.map;
	      if (map) {
	        map.set(key, value);
	      }
	      return this;
	    }
	
	    /**
	     * Creates a stack cache object to store key-value pairs.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [values] The values to cache.
	     */
	    function Stack(values) {
	      var index = -1,
	          length = values ? values.length : 0;
	
	      this.clear();
	      while (++index < length) {
	        var entry = values[index];
	        this.set(entry[0], entry[1]);
	      }
	    }
	
	    // Add methods to `Stack`.
	    Stack.prototype.clear = stackClear;
	    Stack.prototype['delete'] = stackDelete;
	    Stack.prototype.get = stackGet;
	    Stack.prototype.has = stackHas;
	    Stack.prototype.set = stackSet;
	
	    /**
	     * A specialized version of `_.some` for arrays without support for iteratee
	     * shorthands.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */
	    function arraySome(array, predicate) {
	      var index = -1,
	          length = array.length;
	
	      while (++index < length) {
	        if (predicate(array[index], index, array)) {
	          return true;
	        }
	      }
	      return false;
	    }
	
	    var UNORDERED_COMPARE_FLAG$1 = 1;
	    var PARTIAL_COMPARE_FLAG$2 = 2;
	    /**
	     * A specialized version of `baseIsEqualDeep` for arrays with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Array} array The array to compare.
	     * @param {Array} other The other array to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} customizer The function to customize comparisons.
	     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	     *  for more details.
	     * @param {Object} stack Tracks traversed `array` and `other` objects.
	     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	     */
	    function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	      var index = -1,
	          isPartial = bitmask & PARTIAL_COMPARE_FLAG$2,
	          isUnordered = bitmask & UNORDERED_COMPARE_FLAG$1,
	          arrLength = array.length,
	          othLength = other.length;
	
	      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(array);
	      if (stacked) {
	        return stacked == other;
	      }
	      var result = true;
	      stack.set(array, other);
	
	      // Ignore non-index properties.
	      while (++index < arrLength) {
	        var arrValue = array[index],
	            othValue = other[index];
	
	        if (customizer) {
	          var compared = isPartial
	            ? customizer(othValue, arrValue, index, other, array, stack)
	            : customizer(arrValue, othValue, index, array, other, stack);
	        }
	        if (compared !== undefined) {
	          if (compared) {
	            continue;
	          }
	          result = false;
	          break;
	        }
	        // Recursively compare arrays (susceptible to call stack limits).
	        if (isUnordered) {
	          if (!arraySome(other, function(othValue) {
	                return arrValue === othValue ||
	                  equalFunc(arrValue, othValue, customizer, bitmask, stack);
	              })) {
	            result = false;
	            break;
	          }
	        } else if (!(
	              arrValue === othValue ||
	                equalFunc(arrValue, othValue, customizer, bitmask, stack)
	            )) {
	          result = false;
	          break;
	        }
	      }
	      stack['delete'](array);
	      return result;
	    }
	
	    /** Built-in value references. */
	    var Symbol$1 = root.Symbol;
	
	    /** Built-in value references. */
	    var Uint8Array = root.Uint8Array;
	
	    /**
	     * Converts `map` to an array.
	     *
	     * @private
	     * @param {Object} map The map to convert.
	     * @returns {Array} Returns the converted array.
	     */
	    function mapToArray(map) {
	      var index = -1,
	          result = Array(map.size);
	
	      map.forEach(function(value, key) {
	        result[++index] = [key, value];
	      });
	      return result;
	    }
	
	    /**
	     * Converts `set` to an array.
	     *
	     * @private
	     * @param {Object} set The set to convert.
	     * @returns {Array} Returns the converted array.
	     */
	    function setToArray(set) {
	      var index = -1,
	          result = Array(set.size);
	
	      set.forEach(function(value) {
	        result[++index] = value;
	      });
	      return result;
	    }
	
	    var UNORDERED_COMPARE_FLAG$2 = 1;
	    var PARTIAL_COMPARE_FLAG$3 = 2;
	    var boolTag = '[object Boolean]';
	    var dateTag = '[object Date]';
	    var errorTag = '[object Error]';
	    var mapTag = '[object Map]';
	    var numberTag = '[object Number]';
	    var regexpTag = '[object RegExp]';
	    var setTag = '[object Set]';
	    var stringTag$1 = '[object String]';
	    var symbolTag$1 = '[object Symbol]';
	    var arrayBufferTag = '[object ArrayBuffer]';
	    var dataViewTag = '[object DataView]';
	    var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
	    var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	    /**
	     * A specialized version of `baseIsEqualDeep` for comparing objects of
	     * the same `toStringTag`.
	     *
	     * **Note:** This function only supports comparing values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {string} tag The `toStringTag` of the objects to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} customizer The function to customize comparisons.
	     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	     *  for more details.
	     * @param {Object} stack Tracks traversed `object` and `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	      switch (tag) {
	        case dataViewTag:
	          if ((object.byteLength != other.byteLength) ||
	              (object.byteOffset != other.byteOffset)) {
	            return false;
	          }
	          object = object.buffer;
	          other = other.buffer;
	
	        case arrayBufferTag:
	          if ((object.byteLength != other.byteLength) ||
	              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	            return false;
	          }
	          return true;
	
	        case boolTag:
	        case dateTag:
	          // Coerce dates and booleans to numbers, dates to milliseconds and
	          // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	          // not equal.
	          return +object == +other;
	
	        case errorTag:
	          return object.name == other.name && object.message == other.message;
	
	        case numberTag:
	          // Treat `NaN` vs. `NaN` as equal.
	          return (object != +object) ? other != +other : object == +other;
	
	        case regexpTag:
	        case stringTag$1:
	          // Coerce regexes to strings and treat strings, primitives and objects,
	          // as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	          return object == (other + '');
	
	        case mapTag:
	          var convert = mapToArray;
	
	        case setTag:
	          var isPartial = bitmask & PARTIAL_COMPARE_FLAG$3;
	          convert || (convert = setToArray);
	
	          if (object.size != other.size && !isPartial) {
	            return false;
	          }
	          // Assume cyclic values are equal.
	          var stacked = stack.get(object);
	          if (stacked) {
	            return stacked == other;
	          }
	          bitmask |= UNORDERED_COMPARE_FLAG$2;
	          stack.set(object, other);
	
	          // Recursively compare objects (susceptible to call stack limits).
	          return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	
	        case symbolTag$1:
	          if (symbolValueOf) {
	            return symbolValueOf.call(object) == symbolValueOf.call(other);
	          }
	      }
	      return false;
	    }
	
	    /** Used to compose bitmasks for comparison styles. */
	    var PARTIAL_COMPARE_FLAG$4 = 2;
	
	    /**
	     * A specialized version of `baseIsEqualDeep` for objects with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} customizer The function to customize comparisons.
	     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	     *  for more details.
	     * @param {Object} stack Tracks traversed `object` and `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG$4,
	          objProps = keys(object),
	          objLength = objProps.length,
	          othProps = keys(other),
	          othLength = othProps.length;
	
	      if (objLength != othLength && !isPartial) {
	        return false;
	      }
	      var index = objLength;
	      while (index--) {
	        var key = objProps[index];
	        if (!(isPartial ? key in other : baseHas(other, key))) {
	          return false;
	        }
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      var result = true;
	      stack.set(object, other);
	
	      var skipCtor = isPartial;
	      while (++index < objLength) {
	        key = objProps[index];
	        var objValue = object[key],
	            othValue = other[key];
	
	        if (customizer) {
	          var compared = isPartial
	            ? customizer(othValue, objValue, key, other, object, stack)
	            : customizer(objValue, othValue, key, object, other, stack);
	        }
	        // Recursively compare objects (susceptible to call stack limits).
	        if (!(compared === undefined
	              ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	              : compared
	            )) {
	          result = false;
	          break;
	        }
	        skipCtor || (skipCtor = key == 'constructor');
	      }
	      if (result && !skipCtor) {
	        var objCtor = object.constructor,
	            othCtor = other.constructor;
	
	        // Non `Object` object instances with different constructors are not equal.
	        if (objCtor != othCtor &&
	            ('constructor' in object && 'constructor' in other) &&
	            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	          result = false;
	        }
	      }
	      stack['delete'](object);
	      return result;
	    }
	
	    /* Built-in method references that are verified to be native. */
	    var DataView = getNative(root, 'DataView');
	
	    /* Built-in method references that are verified to be native. */
	    var Promise = getNative(root, 'Promise');
	
	    /* Built-in method references that are verified to be native. */
	    var Set = getNative(root, 'Set');
	
	    /* Built-in method references that are verified to be native. */
	    var WeakMap = getNative(root, 'WeakMap');
	
	    var mapTag$1 = '[object Map]';
	    var objectTag$1 = '[object Object]';
	    var promiseTag = '[object Promise]';
	    var setTag$1 = '[object Set]';
	    var weakMapTag = '[object WeakMap]';
	    var dataViewTag$1 = '[object DataView]';
	
	    /** Used for built-in method references. */
	    var objectProto$11 = Object.prototype;
	
	    /** Used to resolve the decompiled source of functions. */
	    var funcToString$1 = Function.prototype.toString;
	
	    /**
	     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	     * of values.
	     */
	    var objectToString$4 = objectProto$11.toString;
	
	    /** Used to detect maps, sets, and weakmaps. */
	    var dataViewCtorString = DataView ? (DataView + '') : '';
	    var mapCtorString = Map ? funcToString$1.call(Map) : '';
	    var promiseCtorString = Promise ? funcToString$1.call(Promise) : '';
	    var setCtorString = Set ? funcToString$1.call(Set) : '';
	    var weakMapCtorString = WeakMap ? funcToString$1.call(WeakMap) : '';
	    /**
	     * Gets the `toStringTag` of `value`.
	     *
	     * @private
	     * @param {*} value The value to query.
	     * @returns {string} Returns the `toStringTag`.
	     */
	    function getTag(value) {
	      return objectToString$4.call(value);
	    }
	
	    // Fallback for data views, maps, sets, and weak maps in IE 11,
	    // for data views in Edge, and promises in Node.js.
	    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
	        (Map && getTag(new Map) != mapTag$1) ||
	        (Promise && getTag(Promise.resolve()) != promiseTag) ||
	        (Set && getTag(new Set) != setTag$1) ||
	        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	      getTag = function(value) {
	        var result = objectToString$4.call(value),
	            Ctor = result == objectTag$1 ? value.constructor : null,
	            ctorString = typeof Ctor == 'function' ? funcToString$1.call(Ctor) : '';
	
	        if (ctorString) {
	          switch (ctorString) {
	            case dataViewCtorString: return dataViewTag$1;
	            case mapCtorString: return mapTag$1;
	            case promiseCtorString: return promiseTag;
	            case setCtorString: return setTag$1;
	            case weakMapCtorString: return weakMapTag;
	          }
	        }
	        return result;
	      };
	    }
	
	    var getTag$1 = getTag;
	
	    var argsTag$2 = '[object Arguments]';
	    var arrayTag$1 = '[object Array]';
	    var boolTag$1 = '[object Boolean]';
	    var dateTag$1 = '[object Date]';
	    var errorTag$1 = '[object Error]';
	    var funcTag$1 = '[object Function]';
	    var mapTag$2 = '[object Map]';
	    var numberTag$1 = '[object Number]';
	    var objectTag$2 = '[object Object]';
	    var regexpTag$1 = '[object RegExp]';
	    var setTag$2 = '[object Set]';
	    var stringTag$2 = '[object String]';
	    var weakMapTag$1 = '[object WeakMap]';
	    var arrayBufferTag$1 = '[object ArrayBuffer]';
	    var dataViewTag$2 = '[object DataView]';
	    var float32Tag = '[object Float32Array]';
	    var float64Tag = '[object Float64Array]';
	    var int8Tag = '[object Int8Array]';
	    var int16Tag = '[object Int16Array]';
	    var int32Tag = '[object Int32Array]';
	    var uint8Tag = '[object Uint8Array]';
	    var uint8ClampedTag = '[object Uint8ClampedArray]';
	    var uint16Tag = '[object Uint16Array]';
	    var uint32Tag = '[object Uint32Array]';
	    /** Used to identify `toStringTag` values of typed arrays. */
	    var typedArrayTags = {};
	    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	    typedArrayTags[uint32Tag] = true;
	    typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$1] =
	    typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
	    typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] =
	    typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
	    typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] =
	    typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] =
	    typedArrayTags[setTag$2] = typedArrayTags[stringTag$2] =
	    typedArrayTags[weakMapTag$1] = false;
	
	    /** Used for built-in method references. */
	    var objectProto$12 = Object.prototype;
	
	    /**
	     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	     * of values.
	     */
	    var objectToString$5 = objectProto$12.toString;
	
	    /**
	     * Checks if `value` is classified as a typed array.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified,
	     *  else `false`.
	     * @example
	     *
	     * _.isTypedArray(new Uint8Array);
	     * // => true
	     *
	     * _.isTypedArray([]);
	     * // => false
	     */
	    function isTypedArray(value) {
	      return isObjectLike(value) &&
	        isLength(value.length) && !!typedArrayTags[objectToString$5.call(value)];
	    }
	
	    /** Used to compose bitmasks for comparison styles. */
	    var PARTIAL_COMPARE_FLAG$1 = 2;
	
	    /** `Object#toString` result references. */
	    var argsTag$1 = '[object Arguments]';
	    var arrayTag = '[object Array]';
	    var objectTag = '[object Object]';
	    /** Used for built-in method references. */
	    var objectProto$10 = Object.prototype;
	
	    /** Used to check objects for own properties. */
	    var hasOwnProperty$5 = objectProto$10.hasOwnProperty;
	
	    /**
	     * A specialized version of `baseIsEqual` for arrays and objects which performs
	     * deep comparisons and tracks traversed objects enabling objects with circular
	     * references to be compared.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	     *  for more details.
	     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	      var objIsArr = isArray(object),
	          othIsArr = isArray(other),
	          objTag = arrayTag,
	          othTag = arrayTag;
	
	      if (!objIsArr) {
	        objTag = getTag$1(object);
	        objTag = objTag == argsTag$1 ? objectTag : objTag;
	      }
	      if (!othIsArr) {
	        othTag = getTag$1(other);
	        othTag = othTag == argsTag$1 ? objectTag : othTag;
	      }
	      var objIsObj = objTag == objectTag && !isHostObject(object),
	          othIsObj = othTag == objectTag && !isHostObject(other),
	          isSameTag = objTag == othTag;
	
	      if (isSameTag && !objIsObj) {
	        stack || (stack = new Stack);
	        return (objIsArr || isTypedArray(object))
	          ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	          : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	      }
	      if (!(bitmask & PARTIAL_COMPARE_FLAG$1)) {
	        var objIsWrapped = objIsObj && hasOwnProperty$5.call(object, '__wrapped__'),
	            othIsWrapped = othIsObj && hasOwnProperty$5.call(other, '__wrapped__');
	
	        if (objIsWrapped || othIsWrapped) {
	          var objUnwrapped = objIsWrapped ? object.value() : object,
	              othUnwrapped = othIsWrapped ? other.value() : other;
	
	          stack || (stack = new Stack);
	          return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	        }
	      }
	      if (!isSameTag) {
	        return false;
	      }
	      stack || (stack = new Stack);
	      return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	    }
	
	    /**
	     * The base implementation of `_.isEqual` which supports partial comparisons
	     * and tracks traversed objects.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @param {boolean} [bitmask] The bitmask of comparison flags.
	     *  The bitmask may be composed of the following flags:
	     *     1 - Unordered comparison
	     *     2 - Partial comparison
	     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */
	    function baseIsEqual(value, other, customizer, bitmask, stack) {
	      if (value === other) {
	        return true;
	      }
	      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	        return value !== value && other !== other;
	      }
	      return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	    }
	
	    var UNORDERED_COMPARE_FLAG = 1;
	    var PARTIAL_COMPARE_FLAG = 2;
	    /**
	     * The base implementation of `_.isMatch` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Array} matchData The property names, values, and compare flags to match.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     */
	    function baseIsMatch(object, source, matchData, customizer) {
	      var index = matchData.length,
	          length = index,
	          noCustomizer = !customizer;
	
	      if (object == null) {
	        return !length;
	      }
	      object = Object(object);
	      while (index--) {
	        var data = matchData[index];
	        if ((noCustomizer && data[2])
	              ? data[1] !== object[data[0]]
	              : !(data[0] in object)
	            ) {
	          return false;
	        }
	      }
	      while (++index < length) {
	        data = matchData[index];
	        var key = data[0],
	            objValue = object[key],
	            srcValue = data[1];
	
	        if (noCustomizer && data[2]) {
	          if (objValue === undefined && !(key in object)) {
	            return false;
	          }
	        } else {
	          var stack = new Stack;
	          if (customizer) {
	            var result = customizer(objValue, srcValue, key, object, source, stack);
	          }
	          if (!(result === undefined
	                ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	                : result
	              )) {
	            return false;
	          }
	        }
	      }
	      return true;
	    }
	
	    /**
	     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` if suitable for strict
	     *  equality comparisons, else `false`.
	     */
	    function isStrictComparable(value) {
	      return value === value && !isObject(value);
	    }
	
	    /**
	     * A specialized version of `_.map` for arrays without support for iteratee
	     * shorthands.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */
	    function arrayMap(array, iteratee) {
	      var index = -1,
	          length = array.length,
	          result = Array(length);
	
	      while (++index < length) {
	        result[index] = iteratee(array[index], index, array);
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	     * of key-value pairs for `object` corresponding to the property names of `props`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} props The property names to get values for.
	     * @returns {Object} Returns the new array of key-value pairs.
	     */
	    function baseToPairs(object, props) {
	      return arrayMap(props, function(key) {
	        return [key, object[key]];
	      });
	    }
	
	    /**
	     * Creates an array of own enumerable string keyed-value pairs for `object`
	     * which can be consumed by `_.fromPairs`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @alias entries
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the new array of key-value pairs.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.toPairs(new Foo);
	     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	     */
	    function toPairs(object) {
	      return baseToPairs(object, keys(object));
	    }
	
	    /**
	     * Gets the property names, values, and compare flags of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the match data of `object`.
	     */
	    function getMatchData(object) {
	      var result = toPairs(object),
	          length = result.length;
	
	      while (length--) {
	        result[length][2] = isStrictComparable(result[length][1]);
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.matches` which doesn't clone `source`.
	     *
	     * @private
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     */
	    function baseMatches(source) {
	      var matchData = getMatchData(source);
	      if (matchData.length == 1 && matchData[0][2]) {
	        var key = matchData[0][0],
	            value = matchData[0][1];
	
	        return function(object) {
	          if (object == null) {
	            return false;
	          }
	          return object[key] === value &&
	            (value !== undefined || (key in Object(object)));
	        };
	      }
	      return function(object) {
	        return object === source || baseIsMatch(object, source, matchData);
	      };
	    }
	
	    /** Used as the `TypeError` message for "Functions" methods. */
	    var FUNC_ERROR_TEXT$1 = 'Expected a function';
	
	    /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided it determines the cache key for storing the result based on the
	     * arguments provided to the memoized function. By default, the first argument
	     * provided to the memoized function is used as the map cache key. The `func`
	     * is invoked with the `this` binding of the memoized function.
	     *
	     * **Note:** The cache is exposed as the `cache` property on the memoized
	     * function. Its creation may be customized by replacing the `_.memoize.Cache`
	     * constructor with one whose instances implement the
	     * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	     * method interface of `delete`, `get`, `has`, and `set`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] The function to resolve the cache key.
	     * @returns {Function} Returns the new memoizing function.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2 };
	     * var other = { 'c': 3, 'd': 4 };
	     *
	     * var values = _.memoize(_.values);
	     * values(object);
	     * // => [1, 2]
	     *
	     * values(other);
	     * // => [3, 4]
	     *
	     * object.a = 2;
	     * values(object);
	     * // => [1, 2]
	     *
	     * // Modify the result cache.
	     * values.cache.set(object, ['a', 'b']);
	     * values(object);
	     * // => ['a', 'b']
	     *
	     * // Replace `_.memoize.Cache`.
	     * _.memoize.Cache = WeakMap;
	     */
	    function memoize(func, resolver) {
	      if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	        throw new TypeError(FUNC_ERROR_TEXT$1);
	      }
	      var memoized = function() {
	        var args = arguments,
	            key = resolver ? resolver.apply(this, args) : args[0],
	            cache = memoized.cache;
	
	        if (cache.has(key)) {
	          return cache.get(key);
	        }
	        var result = func.apply(this, args);
	        memoized.cache = cache.set(key, result);
	        return result;
	      };
	      memoized.cache = new (memoize.Cache || MapCache);
	      return memoized;
	    }
	
	    // Assign cache to `_.memoize`.
	    memoize.Cache = MapCache;
	
	    /** Used as references for various `Number` constants. */
	    var INFINITY$1 = 1 / 0;
	
	    /** Used to convert symbols to primitives and strings. */
	    var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined;
	    var symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;
	    /**
	     * Converts `value` to a string if it's not one. An empty string is returned
	     * for `null` and `undefined` values. The sign of `-0` is preserved.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to process.
	     * @returns {string} Returns the string.
	     * @example
	     *
	     * _.toString(null);
	     * // => ''
	     *
	     * _.toString(-0);
	     * // => '-0'
	     *
	     * _.toString([1, 2, 3]);
	     * // => '1,2,3'
	     */
	    function toString(value) {
	      // Exit early for strings to avoid a performance hit in some environments.
	      if (typeof value == 'string') {
	        return value;
	      }
	      if (value == null) {
	        return '';
	      }
	      if (isSymbol(value)) {
	        return symbolToString ? symbolToString.call(value) : '';
	      }
	      var result = (value + '');
	      return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
	    }
	
	    /** Used to match property names within property paths. */
	    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;
	
	    /** Used to match backslashes in property paths. */
	    var reEscapeChar = /\\(\\)?/g;
	
	    /**
	     * Converts `string` to a property path array.
	     *
	     * @private
	     * @param {string} string The string to convert.
	     * @returns {Array} Returns the property path array.
	     */
	    var stringToPath = memoize(function(string) {
	      var result = [];
	      toString(string).replace(rePropName, function(match, number, quote, string) {
	        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	      });
	      return result;
	    });
	
	    /**
	     * Casts `value` to a path array if it's not one.
	     *
	     * @private
	     * @param {*} value The value to inspect.
	     * @returns {Array} Returns the cast property path array.
	     */
	    function baseCastPath(value) {
	      return isArray(value) ? value : stringToPath(value);
	    }
	
	    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
	    var reIsPlainProp = /^\w*$/;
	    /**
	     * Checks if `value` is a property name and not a property path.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {Object} [object] The object to query keys on.
	     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	     */
	    function isKey(value, object) {
	      var type = typeof value;
	      if (type == 'number' || type == 'symbol') {
	        return true;
	      }
	      return !isArray(value) &&
	        (isSymbol(value) || reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	          (object != null && value in Object(object)));
	    }
	
	    /**
	     * The base implementation of `_.get` without support for default values.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @returns {*} Returns the resolved value.
	     */
	    function baseGet(object, path) {
	      path = isKey(path, object) ? [path] : baseCastPath(path);
	
	      var index = 0,
	          length = path.length;
	
	      while (object != null && index < length) {
	        object = object[path[index++]];
	      }
	      return (index && index == length) ? object : undefined;
	    }
	
	    /**
	     * Gets the value at `path` of `object`. If the resolved value is
	     * `undefined` the `defaultValue` is used in its place.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.7.0
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.get(object, 'a[0].b.c');
	     * // => 3
	     *
	     * _.get(object, ['a', '0', 'b', 'c']);
	     * // => 3
	     *
	     * _.get(object, 'a.b.c', 'default');
	     * // => 'default'
	     */
	    function get(object, path, defaultValue) {
	      var result = object == null ? undefined : baseGet(object, path);
	      return result === undefined ? defaultValue : result;
	    }
	
	    /**
	     * The base implementation of `_.hasIn` without support for deep paths.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} key The key to check.
	     * @returns {boolean} Returns `true` if `key` exists, else `false`.
	     */
	    function baseHasIn(object, key) {
	      return key in Object(object);
	    }
	
	    /**
	     * Checks if `path` exists on `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @param {Function} hasFunc The function to check properties.
	     * @returns {boolean} Returns `true` if `path` exists, else `false`.
	     */
	    function hasPath(object, path, hasFunc) {
	      if (object == null) {
	        return false;
	      }
	      var result = hasFunc(object, path);
	      if (!result && !isKey(path)) {
	        path = baseCastPath(path);
	
	        var index = -1,
	            length = path.length;
	
	        while (object != null && ++index < length) {
	          var key = path[index];
	          if (!(result = hasFunc(object, key))) {
	            break;
	          }
	          object = object[key];
	        }
	      }
	      var length = object ? object.length : undefined;
	      return result || (
	        !!length && isLength(length) && isIndex(path, length) &&
	        (isArray(object) || isString(object) || isArguments(object))
	      );
	    }
	
	    /**
	     * Checks if `path` is a direct or inherited property of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @returns {boolean} Returns `true` if `path` exists, else `false`.
	     * @example
	     *
	     * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	     *
	     * _.hasIn(object, 'a');
	     * // => true
	     *
	     * _.hasIn(object, 'a.b.c');
	     * // => true
	     *
	     * _.hasIn(object, ['a', 'b', 'c']);
	     * // => true
	     *
	     * _.hasIn(object, 'b');
	     * // => false
	     */
	    function hasIn(object, path) {
	      return hasPath(object, path, baseHasIn);
	    }
	
	    var UNORDERED_COMPARE_FLAG$3 = 1;
	    var PARTIAL_COMPARE_FLAG$5 = 2;
	    /**
	     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	     *
	     * @private
	     * @param {string} path The path of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new function.
	     */
	    function baseMatchesProperty(path, srcValue) {
	      return function(object) {
	        var objValue = get(object, path);
	        return (objValue === undefined && objValue === srcValue)
	          ? hasIn(object, path)
	          : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG$3 | PARTIAL_COMPARE_FLAG$5);
	      };
	    }
	
	    /**
	     * This method returns the first argument given to it.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.identity(object) === object;
	     * // => true
	     */
	    function identity(value) {
	      return value;
	    }
	
	    /**
	     * A specialized version of `baseProperty` which supports deep paths.
	     *
	     * @private
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     */
	    function basePropertyDeep(path) {
	      return function(object) {
	        return baseGet(object, path);
	      };
	    }
	
	    /**
	     * Creates a function that returns the value at `path` of a given object.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.4.0
	     * @category Util
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': { 'c': 2 } } },
	     *   { 'a': { 'b': { 'c': 1 } } }
	     * ];
	     *
	     * _.map(objects, _.property('a.b.c'));
	     * // => [2, 1]
	     *
	     * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	     * // => [1, 2]
	     */
	    function property(path) {
	      return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	    }
	
	    /**
	     * The base implementation of `_.iteratee`.
	     *
	     * @private
	     * @param {*} [value=_.identity] The value to convert to an iteratee.
	     * @returns {Function} Returns the iteratee.
	     */
	    function baseIteratee(value) {
	      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	      if (typeof value == 'function') {
	        return value;
	      }
	      if (value == null) {
	        return identity;
	      }
	      if (typeof value == 'object') {
	        return isArray(value)
	          ? baseMatchesProperty(value[0], value[1])
	          : baseMatches(value);
	      }
	      return property(value);
	    }
	
	    /**
	     * Iterates over own enumerable string keyed properties of an object invoking
	     * `iteratee` for each property. The iteratee is invoked with three arguments:
	     * (value, key, object). Iteratee functions may exit iteration early by
	     * explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.3.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	     */
	    function forOwn(object, iteratee) {
	      return object && baseForOwn(object, baseIteratee(iteratee));
	    }
	
	    /**
	     * Gets the index at which the first occurrence of `NaN` is found in `array`.
	     *
	     * @private
	     * @param {Array} array The array to search.
	     * @param {number} fromIndex The index to search from.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	     */
	    function indexOfNaN(array, fromIndex, fromRight) {
	      var length = array.length,
	          index = fromIndex + (fromRight ? 0 : -1);
	
	      while ((fromRight ? index-- : ++index < length)) {
	        var other = array[index];
	        if (other !== other) {
	          return index;
	        }
	      }
	      return -1;
	    }
	
	    /**
	     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	     *
	     * @private
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {number} fromIndex The index to search from.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     */
	    function baseIndexOf(array, value, fromIndex) {
	      if (value !== value) {
	        return indexOfNaN(array, fromIndex);
	      }
	      var index = fromIndex - 1,
	          length = array.length;
	
	      while (++index < length) {
	        if (array[index] === value) {
	          return index;
	        }
	      }
	      return -1;
	    }
	
	    function auto (tasks, concurrency, callback) {
	        if (typeof concurrency === 'function') {
	            // concurrency is optional, shift the args.
	            callback = concurrency;
	            concurrency = null;
	        }
	        callback = once(callback || noop);
	        var keys$$ = keys(tasks);
	        var numTasks = keys$$.length;
	        if (!numTasks) {
	            return callback(null);
	        }
	        if (!concurrency) {
	            concurrency = numTasks;
	        }
	
	        var results = {};
	        var runningTasks = 0;
	        var hasError = false;
	
	        var listeners = {};
	
	        var readyTasks = [];
	
	        forOwn(tasks, function (task, key) {
	            if (!isArray(task)) {
	                // no dependencies
	                enqueueTask(key, [task]);
	                return;
	            }
	
	            var dependencies = task.slice(0, task.length - 1);
	            var remainingDependencies = dependencies.length;
	
	            checkForDeadlocks();
	
	            function checkForDeadlocks() {
	                var len = dependencies.length;
	                var dep;
	                while (len--) {
	                    if (!(dep = tasks[dependencies[len]])) {
	                        throw new Error('async.auto task `' + key + '` has non-existent dependency in ' + dependencies.join(', '));
	                    }
	                    if (isArray(dep) && baseIndexOf(dep, key, 0) >= 0) {
	                        throw new Error('async.auto task `' + key + '`Has cyclic dependencies');
	                    }
	                }
	            }
	
	            arrayEach(dependencies, function (dependencyName) {
	                addListener(dependencyName, function () {
	                    remainingDependencies--;
	                    if (remainingDependencies === 0) {
	                        enqueueTask(key, task);
	                    }
	                });
	            });
	        });
	
	        processQueue();
	
	        function enqueueTask(key, task) {
	            readyTasks.push(function () {
	                runTask(key, task);
	            });
	        }
	
	        function processQueue() {
	            if (readyTasks.length === 0 && runningTasks === 0) {
	                return callback(null, results);
	            }
	            while (readyTasks.length && runningTasks < concurrency) {
	                var run = readyTasks.shift();
	                run();
	            }
	        }
	
	        function addListener(taskName, fn) {
	            var taskListeners = listeners[taskName];
	            if (!taskListeners) {
	                taskListeners = listeners[taskName] = [];
	            }
	
	            taskListeners.push(fn);
	        }
	
	        function taskComplete(taskName) {
	            var taskListeners = listeners[taskName] || [];
	            arrayEach(taskListeners, function (fn) {
	                fn();
	            });
	            processQueue();
	        }
	
	        function runTask(key, task) {
	            if (hasError) return;
	
	            var taskCallback = onlyOnce(rest(function (err, args) {
	                runningTasks--;
	                if (args.length <= 1) {
	                    args = args[0];
	                }
	                if (err) {
	                    var safeResults = {};
	                    forOwn(results, function (val, rkey) {
	                        safeResults[rkey] = val;
	                    });
	                    safeResults[key] = args;
	                    hasError = true;
	                    listeners = [];
	
	                    callback(err, safeResults);
	                } else {
	                    results[key] = args;
	                    taskComplete(key);
	                }
	            }));
	
	            runningTasks++;
	            var taskFn = task[task.length - 1];
	            if (task.length > 1) {
	                taskFn(results, taskCallback);
	            } else {
	                taskFn(taskCallback);
	            }
	        }
	    }
	
	    /**
	     * Copies the values of `source` to `array`.
	     *
	     * @private
	     * @param {Array} source The array to copy values from.
	     * @param {Array} [array=[]] The array to copy values to.
	     * @returns {Array} Returns `array`.
	     */
	    function copyArray(source, array) {
	      var index = -1,
	          length = source.length;
	
	      array || (array = Array(length));
	      while (++index < length) {
	        array[index] = source[index];
	      }
	      return array;
	    }
	
	    var argsRegex = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	
	    function parseParams(func) {
	        return func.toString().match(argsRegex)[1].split(/\s*\,\s*/);
	    }
	
	    function autoInject(tasks, callback) {
	        var newTasks = {};
	
	        forOwn(tasks, function (taskFn, key) {
	            var params;
	
	            if (isArray(taskFn)) {
	                params = copyArray(taskFn);
	                taskFn = params.pop();
	
	                newTasks[key] = params.concat(newTask);
	            } else if (taskFn.length === 0) {
	                throw new Error("autoInject task functions require explicit parameters.");
	            } else if (taskFn.length === 1) {
	                // no dependencies, use the function as-is
	                newTasks[key] = taskFn;
	            } else {
	                params = parseParams(taskFn);
	                params.pop();
	
	                newTasks[key] = params.concat(newTask);
	            }
	
	            function newTask(results, taskCb) {
	                var newArgs = arrayMap(params, function (name) {
	                    return results[name];
	                });
	                newArgs.push(taskCb);
	                taskFn.apply(null, newArgs);
	            }
	        });
	
	        auto(newTasks, function (err, results) {
	            var params;
	            if (isArray(callback)) {
	                params = copyArray(callback);
	                callback = params.pop();
	            } else {
	                params = parseParams(callback);
	                params.shift();
	            }
	
	            params = arrayMap(params, function (name) {
	                return results[name];
	            });
	
	            params.unshift(err);
	            callback.apply(null, params);
	        });
	    }
	
	    var _setImmediate = typeof setImmediate === 'function' && setImmediate;
	
	    var _defer;
	    if (_setImmediate) {
	        _defer = _setImmediate;
	    } else if (typeof process === 'object' && typeof process.nextTick === 'function') {
	        _defer = process.nextTick;
	    } else {
	        _defer = function (fn) {
	            setTimeout(fn, 0);
	        };
	    }
	
	    var setImmediate$1 = rest(function (fn, args) {
	        _defer(function () {
	            fn.apply(null, args);
	        });
	    });
	
	    function queue(worker, concurrency, payload) {
	        if (concurrency == null) {
	            concurrency = 1;
	        } else if (concurrency === 0) {
	            throw new Error('Concurrency must not be zero');
	        }
	        function _insert(q, data, pos, callback) {
	            if (callback != null && typeof callback !== 'function') {
	                throw new Error('task callback must be a function');
	            }
	            q.started = true;
	            if (!isArray(data)) {
	                data = [data];
	            }
	            if (data.length === 0 && q.idle()) {
	                // call drain immediately if there are no tasks
	                return setImmediate$1(function () {
	                    q.drain();
	                });
	            }
	            arrayEach(data, function (task) {
	                var item = {
	                    data: task,
	                    callback: callback || noop
	                };
	
	                if (pos) {
	                    q.tasks.unshift(item);
	                } else {
	                    q.tasks.push(item);
	                }
	            });
	            setImmediate$1(q.process);
	        }
	        function _next(q, tasks) {
	            return function () {
	                workers -= 1;
	
	                var removed = false;
	                var args = arguments;
	                arrayEach(tasks, function (task) {
	                    arrayEach(workersList, function (worker, index) {
	                        if (worker === task && !removed) {
	                            workersList.splice(index, 1);
	                            removed = true;
	                        }
	                    });
	
	                    task.callback.apply(task, args);
	                });
	
	                if (workers <= q.concurrency - q.buffer) {
	                    q.unsaturated();
	                }
	
	                if (q.tasks.length + workers === 0) {
	                    q.drain();
	                }
	                q.process();
	            };
	        }
	
	        var workers = 0;
	        var workersList = [];
	        var q = {
	            tasks: [],
	            concurrency: concurrency,
	            payload: payload,
	            saturated: noop,
	            unsaturated: noop,
	            buffer: concurrency / 4,
	            empty: noop,
	            drain: noop,
	            started: false,
	            paused: false,
	            push: function (data, callback) {
	                _insert(q, data, false, callback);
	            },
	            kill: function () {
	                q.drain = noop;
	                q.tasks = [];
	            },
	            unshift: function (data, callback) {
	                _insert(q, data, true, callback);
	            },
	            process: function () {
	                while (!q.paused && workers < q.concurrency && q.tasks.length) {
	
	                    var tasks = q.payload ? q.tasks.splice(0, q.payload) : q.tasks.splice(0, q.tasks.length);
	
	                    var data = arrayMap(tasks, baseProperty('data'));
	
	                    if (q.tasks.length === 0) {
	                        q.empty();
	                    }
	                    workers += 1;
	                    workersList.push(tasks[0]);
	
	                    if (workers === q.concurrency) {
	                        q.saturated();
	                    }
	
	                    var cb = onlyOnce(_next(q, tasks));
	                    worker(data, cb);
	                }
	            },
	            length: function () {
	                return q.tasks.length;
	            },
	            running: function () {
	                return workers;
	            },
	            workersList: function () {
	                return workersList;
	            },
	            idle: function () {
	                return q.tasks.length + workers === 0;
	            },
	            pause: function () {
	                q.paused = true;
	            },
	            resume: function () {
	                if (q.paused === false) {
	                    return;
	                }
	                q.paused = false;
	                var resumeCount = Math.min(q.concurrency, q.tasks.length);
	                // Need to call q.process once per concurrent
	                // worker to preserve full concurrency after pause
	                for (var w = 1; w <= resumeCount; w++) {
	                    setImmediate$1(q.process);
	                }
	            }
	        };
	        return q;
	    }
	
	    function cargo(worker, payload) {
	        return queue(worker, 1, payload);
	    }
	
	    function eachOfLimit(obj, limit, iteratee, cb) {
	        _eachOfLimit(limit)(obj, iteratee, cb);
	    }
	
	    var eachOfSeries = doLimit(eachOfLimit, 1);
	
	    function reduce(arr, memo, iteratee, cb) {
	        eachOfSeries(arr, function (x, i, cb) {
	            iteratee(memo, x, function (err, v) {
	                memo = v;
	                cb(err);
	            });
	        }, function (err) {
	            cb(err, memo);
	        });
	    }
	
	    function seq() /* functions... */{
	        var fns = arguments;
	        return rest(function (args) {
	            var that = this;
	
	            var cb = args[args.length - 1];
	            if (typeof cb == 'function') {
	                args.pop();
	            } else {
	                cb = noop;
	            }
	
	            reduce(fns, args, function (newargs, fn, cb) {
	                fn.apply(that, newargs.concat([rest(function (err, nextargs) {
	                    cb(err, nextargs);
	                })]));
	            }, function (err, results) {
	                cb.apply(that, [err].concat(results));
	            });
	        });
	    }
	
	    var reverse = Array.prototype.reverse;
	
	    function compose() /* functions... */{
	        return seq.apply(null, reverse.call(arguments));
	    }
	
	    function concat$1(eachfn, arr, fn, callback) {
	        var result = [];
	        eachfn(arr, function (x, index, cb) {
	            fn(x, function (err, y) {
	                result = result.concat(y || []);
	                cb(err);
	            });
	        }, function (err) {
	            callback(err, result);
	        });
	    }
	
	    var eachOf = doLimit(eachOfLimit, Infinity);
	
	    function doParallel(fn) {
	        return function (obj, iteratee, callback) {
	            return fn(eachOf, obj, iteratee, callback);
	        };
	    }
	
	    var concat = doParallel(concat$1);
	
	    function doSeries(fn) {
	        return function (obj, iteratee, callback) {
	            return fn(eachOfSeries, obj, iteratee, callback);
	        };
	    }
	
	    var concatSeries = doSeries(concat$1);
	
	    var constant = rest(function (values) {
	        var args = [null].concat(values);
	        return initialParams(function (ignoredArgs, callback) {
	            return callback.apply(this, args);
	        });
	    });
	
	    function _createTester(eachfn, check, getResult) {
	        return function (arr, limit, iteratee, cb) {
	            function done(err) {
	                if (cb) {
	                    if (err) {
	                        cb(err);
	                    } else {
	                        cb(null, getResult(false));
	                    }
	                }
	            }
	            function wrappedIteratee(x, _, callback) {
	                if (!cb) return callback();
	                iteratee(x, function (err, v) {
	                    if (cb) {
	                        if (err) {
	                            cb(err);
	                            cb = iteratee = false;
	                        } else if (check(v)) {
	                            cb(null, getResult(true, x));
	                            cb = iteratee = false;
	                        }
	                    }
	                    callback();
	                });
	            }
	            if (arguments.length > 3) {
	                cb = cb || noop;
	                eachfn(arr, limit, wrappedIteratee, done);
	            } else {
	                cb = iteratee;
	                cb = cb || noop;
	                iteratee = limit;
	                eachfn(arr, wrappedIteratee, done);
	            }
	        };
	    }
	
	    function _findGetResult(v, x) {
	        return x;
	    }
	
	    var detect = _createTester(eachOf, identity, _findGetResult);
	
	    var detectLimit = _createTester(eachOfLimit, identity, _findGetResult);
	
	    var detectSeries = _createTester(eachOfSeries, identity, _findGetResult);
	
	    function consoleFunc(name) {
	        return rest(function (fn, args) {
	            fn.apply(null, args.concat([rest(function (err, args) {
	                if (typeof console === 'object') {
	                    if (err) {
	                        if (console.error) {
	                            console.error(err);
	                        }
	                    } else if (console[name]) {
	                        arrayEach(args, function (x) {
	                            console[name](x);
	                        });
	                    }
	                }
	            })]));
	        });
	    }
	
	    var dir = consoleFunc('dir');
	
	    function during(test, iteratee, cb) {
	        cb = cb || noop;
	
	        var next = rest(function (err, args) {
	            if (err) {
	                cb(err);
	            } else {
	                args.push(check);
	                test.apply(this, args);
	            }
	        });
	
	        var check = function (err, truth) {
	            if (err) return cb(err);
	            if (!truth) return cb(null);
	            iteratee(next);
	        };
	
	        test(check);
	    }
	
	    function doDuring(iteratee, test, cb) {
	        var calls = 0;
	
	        during(function (next) {
	            if (calls++ < 1) return next(null, true);
	            test.apply(this, arguments);
	        }, iteratee, cb);
	    }
	
	    function whilst(test, iteratee, cb) {
	        cb = cb || noop;
	        if (!test()) return cb(null);
	        var next = rest(function (err, args) {
	            if (err) return cb(err);
	            if (test.apply(this, args)) return iteratee(next);
	            cb.apply(null, [null].concat(args));
	        });
	        iteratee(next);
	    }
	
	    function doWhilst(iteratee, test, cb) {
	        var calls = 0;
	        return whilst(function () {
	            return ++calls <= 1 || test.apply(this, arguments);
	        }, iteratee, cb);
	    }
	
	    function doUntil(iteratee, test, cb) {
	        return doWhilst(iteratee, function () {
	            return !test.apply(this, arguments);
	        }, cb);
	    }
	
	    function _withoutIndex(iteratee) {
	        return function (value, index, callback) {
	            return iteratee(value, callback);
	        };
	    }
	
	    function eachLimit(arr, limit, iteratee, cb) {
	        return _eachOfLimit(limit)(arr, _withoutIndex(iteratee), cb);
	    }
	
	    var each = doLimit(eachLimit, Infinity);
	
	    var eachSeries = doLimit(eachLimit, 1);
	
	    function ensureAsync(fn) {
	        return initialParams(function (args, callback) {
	            var sync = true;
	            args.push(function () {
	                var innerArgs = arguments;
	                if (sync) {
	                    setImmediate$1(function () {
	                        callback.apply(null, innerArgs);
	                    });
	                } else {
	                    callback.apply(null, innerArgs);
	                }
	            });
	            fn.apply(this, args);
	            sync = false;
	        });
	    }
	
	    function notId(v) {
	        return !v;
	    }
	
	    var everyLimit = _createTester(eachOfLimit, notId, notId);
	
	    var every = doLimit(everyLimit, Infinity);
	
	    var everySeries = doLimit(everyLimit, 1);
	
	    function _filter(eachfn, arr, iteratee, callback) {
	        var results = [];
	        eachfn(arr, function (x, index, callback) {
	            iteratee(x, function (err, v) {
	                if (err) {
	                    callback(err);
	                } else {
	                    if (v) {
	                        results.push({ index: index, value: x });
	                    }
	                    callback();
	                }
	            });
	        }, function (err) {
	            if (err) {
	                callback(err);
	            } else {
	                callback(null, arrayMap(results.sort(function (a, b) {
	                    return a.index - b.index;
	                }), baseProperty('value')));
	            }
	        });
	    }
	
	    var filterLimit = doParallelLimit(_filter);
	
	    var filter = doLimit(filterLimit, Infinity);
	
	    var filterSeries = doLimit(filterLimit, 1);
	
	    function forever(fn, cb) {
	        var done = onlyOnce(cb || noop);
	        var task = ensureAsync(fn);
	
	        function next(err) {
	            if (err) return done(err);
	            task(next);
	        }
	        next();
	    }
	
	    function iterator$1 (tasks) {
	        function makeCallback(index) {
	            function fn() {
	                if (tasks.length) {
	                    tasks[index].apply(null, arguments);
	                }
	                return fn.next();
	            }
	            fn.next = function () {
	                return index < tasks.length - 1 ? makeCallback(index + 1) : null;
	            };
	            return fn;
	        }
	        return makeCallback(0);
	    }
	
	    var log = consoleFunc('log');
	
	    function has(obj, key) {
	        return key in obj;
	    }
	
	    function memoize$1(fn, hasher) {
	        var memo = Object.create(null);
	        var queues = Object.create(null);
	        hasher = hasher || identity;
	        var memoized = initialParams(function memoized(args, callback) {
	            var key = hasher.apply(null, args);
	            if (has(memo, key)) {
	                setImmediate$1(function () {
	                    callback.apply(null, memo[key]);
	                });
	            } else if (has(queues, key)) {
	                queues[key].push(callback);
	            } else {
	                queues[key] = [callback];
	                fn.apply(null, args.concat([rest(function (args) {
	                    memo[key] = args;
	                    var q = queues[key];
	                    delete queues[key];
	                    for (var i = 0, l = q.length; i < l; i++) {
	                        q[i].apply(null, args);
	                    }
	                })]));
	            }
	        });
	        memoized.memo = memo;
	        memoized.unmemoized = fn;
	        return memoized;
	    }
	
	    function _parallel(eachfn, tasks, callback) {
	        callback = callback || noop;
	        var results = isArrayLike(tasks) ? [] : {};
	
	        eachfn(tasks, function (task, key, callback) {
	            task(rest(function (err, args) {
	                if (args.length <= 1) {
	                    args = args[0];
	                }
	                results[key] = args;
	                callback(err);
	            }));
	        }, function (err) {
	            callback(err, results);
	        });
	    }
	
	    function parallelLimit(tasks, limit, cb) {
	        return _parallel(_eachOfLimit(limit), tasks, cb);
	    }
	
	    var parallel = doLimit(parallelLimit, Infinity);
	
	    function queue$1 (worker, concurrency) {
	        return queue(function (items, cb) {
	            worker(items[0], cb);
	        }, concurrency, 1);
	    }
	
	    function priorityQueue (worker, concurrency) {
	        function _compareTasks(a, b) {
	            return a.priority - b.priority;
	        }
	
	        function _binarySearch(sequence, item, compare) {
	            var beg = -1,
	                end = sequence.length - 1;
	            while (beg < end) {
	                var mid = beg + (end - beg + 1 >>> 1);
	                if (compare(item, sequence[mid]) >= 0) {
	                    beg = mid;
	                } else {
	                    end = mid - 1;
	                }
	            }
	            return beg;
	        }
	
	        function _insert(q, data, priority, callback) {
	            if (callback != null && typeof callback !== 'function') {
	                throw new Error('task callback must be a function');
	            }
	            q.started = true;
	            if (!isArray(data)) {
	                data = [data];
	            }
	            if (data.length === 0) {
	                // call drain immediately if there are no tasks
	                return setImmediate$1(function () {
	                    q.drain();
	                });
	            }
	            arrayEach(data, function (task) {
	                var item = {
	                    data: task,
	                    priority: priority,
	                    callback: typeof callback === 'function' ? callback : noop
	                };
	
	                q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);
	
	                if (q.tasks.length === q.concurrency) {
	                    q.saturated();
	                }
	                if (q.tasks.length <= q.concurrency - q.buffer) {
	                    q.unsaturated();
	                }
	                setImmediate$1(q.process);
	            });
	        }
	
	        // Start with a normal queue
	        var q = queue$1(worker, concurrency);
	
	        // Override push to accept second parameter representing priority
	        q.push = function (data, priority, callback) {
	            _insert(q, data, priority, callback);
	        };
	
	        // Remove unshift function
	        delete q.unshift;
	
	        return q;
	    }
	
	    /**
	     * Creates a `baseEach` or `baseEachRight` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
	    function createBaseEach(eachFunc, fromRight) {
	      return function(collection, iteratee) {
	        if (collection == null) {
	          return collection;
	        }
	        if (!isArrayLike(collection)) {
	          return eachFunc(collection, iteratee);
	        }
	        var length = collection.length,
	            index = fromRight ? length : -1,
	            iterable = Object(collection);
	
	        while ((fromRight ? index-- : ++index < length)) {
	          if (iteratee(iterable[index], index, iterable) === false) {
	            break;
	          }
	        }
	        return collection;
	      };
	    }
	
	    /**
	     * The base implementation of `_.forEach` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object} Returns `collection`.
	     */
	    var baseEach = createBaseEach(baseForOwn);
	
	    /**
	     * Iterates over elements of `collection` invoking `iteratee` for each element.
	     * The iteratee is invoked with three arguments: (value, index|key, collection).
	     * Iteratee functions may exit iteration early by explicitly returning `false`.
	     *
	     * **Note:** As with other "Collections" methods, objects with a "length"
	     * property are iterated like arrays. To avoid this behavior use `_.forIn`
	     * or `_.forOwn` for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @alias each
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array|Object} Returns `collection`.
	     * @example
	     *
	     * _([1, 2]).forEach(function(value) {
	     *   console.log(value);
	     * });
	     * // => Logs `1` then `2`.
	     *
	     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	     */
	    function forEach(collection, iteratee) {
	      return (typeof iteratee == 'function' && isArray(collection))
	        ? arrayEach(collection, iteratee)
	        : baseEach(collection, baseIteratee(iteratee));
	    }
	
	    function race(tasks, cb) {
	        cb = once(cb || noop);
	        if (!isArray(tasks)) return cb(new TypeError('First argument to race must be an array of functions'));
	        if (!tasks.length) return cb();
	        forEach(tasks, function (task) {
	            task(cb);
	        });
	    }
	
	    var slice = Array.prototype.slice;
	
	    function reduceRight(arr, memo, iteratee, cb) {
	        var reversed = slice.call(arr).reverse();
	        reduce(reversed, memo, iteratee, cb);
	    }
	
	    function reflect(fn) {
	        return initialParams(function reflectOn(args, reflectCallback) {
	            args.push(rest(function callback(err, cbArgs) {
	                if (err) {
	                    reflectCallback(null, {
	                        error: err
	                    });
	                } else {
	                    var value = null;
	                    if (cbArgs.length === 1) {
	                        value = cbArgs[0];
	                    } else if (cbArgs.length > 1) {
	                        value = cbArgs;
	                    }
	                    reflectCallback(null, {
	                        value: value
	                    });
	                }
	            }));
	
	            return fn.apply(this, args);
	        });
	    }
	
	    function reject$1(eachfn, arr, iteratee, callback) {
	        _filter(eachfn, arr, function (value, cb) {
	            iteratee(value, function (err, v) {
	                if (err) {
	                    cb(err);
	                } else {
	                    cb(null, !v);
	                }
	            });
	        }, callback);
	    }
	
	    var rejectLimit = doParallelLimit(reject$1);
	
	    var reject = doLimit(rejectLimit, Infinity);
	
	    function reflectAll(tasks) {
	        return tasks.map(reflect);
	    }
	
	    var rejectSeries = doLimit(rejectLimit, 1);
	
	    function series(tasks, cb) {
	        return _parallel(eachOfSeries, tasks, cb);
	    }
	
	    function retry(times, task, callback) {
	        var DEFAULT_TIMES = 5;
	        var DEFAULT_INTERVAL = 0;
	
	        var opts = {
	            times: DEFAULT_TIMES,
	            interval: DEFAULT_INTERVAL
	        };
	
	        function parseTimes(acc, t) {
	            if (typeof t === 'object') {
	                acc.times = +t.times || DEFAULT_TIMES;
	                acc.interval = +t.interval || DEFAULT_INTERVAL;
	            } else if (typeof t === 'number' || typeof t === 'string') {
	                acc.times = +t || DEFAULT_TIMES;
	            } else {
	                throw new Error("Invalid arguments for async.retry");
	            }
	        }
	
	        if (arguments.length < 3 && typeof times === 'function') {
	            callback = task || noop;
	            task = times;
	        } else {
	            parseTimes(opts, times);
	            callback = callback || noop;
	        }
	
	        if (typeof task !== 'function') {
	            throw new Error("Invalid arguments for async.retry");
	        }
	
	        var attempts = [];
	        while (opts.times) {
	            var isFinalAttempt = !(opts.times -= 1);
	            attempts.push(retryAttempt(isFinalAttempt));
	            if (!isFinalAttempt && opts.interval > 0) {
	                attempts.push(retryInterval(opts.interval));
	            }
	        }
	
	        series(attempts, function (done, data) {
	            data = data[data.length - 1];
	            callback(data.err, data.result);
	        });
	
	        function retryAttempt(isFinalAttempt) {
	            return function (seriesCallback) {
	                task(function (err, result) {
	                    seriesCallback(!err || isFinalAttempt, {
	                        err: err,
	                        result: result
	                    });
	                });
	            };
	        }
	
	        function retryInterval(interval) {
	            return function (seriesCallback) {
	                setTimeout(function () {
	                    seriesCallback(null);
	                }, interval);
	            };
	        }
	    }
	
	    function retryable (opts, task) {
	        if (!task) {
	            task = opts;
	            opts = null;
	        }
	        return initialParams(function (args, callback) {
	            function taskFn(cb) {
	                task.apply(null, args.concat([cb]));
	            }
	
	            if (opts) retry(opts, taskFn, callback);else retry(taskFn, callback);
	        });
	    }
	
	    var someLimit = _createTester(eachOfLimit, Boolean, identity);
	
	    var some = doLimit(someLimit, Infinity);
	
	    var someSeries = doLimit(someLimit, 1);
	
	    function sortBy(arr, iteratee, cb) {
	        map(arr, function (x, cb) {
	            iteratee(x, function (err, criteria) {
	                if (err) return cb(err);
	                cb(null, { value: x, criteria: criteria });
	            });
	        }, function (err, results) {
	            if (err) return cb(err);
	            cb(null, arrayMap(results.sort(comparator), baseProperty('value')));
	        });
	
	        function comparator(left, right) {
	            var a = left.criteria,
	                b = right.criteria;
	            return a < b ? -1 : a > b ? 1 : 0;
	        }
	    }
	
	    function timeout(asyncFn, miliseconds, info) {
	        var originalCallback, timer;
	        var timedOut = false;
	
	        function injectedCallback() {
	            if (!timedOut) {
	                originalCallback.apply(null, arguments);
	                clearTimeout(timer);
	            }
	        }
	
	        function timeoutCallback() {
	            var name = asyncFn.name || 'anonymous';
	            var error = new Error('Callback function "' + name + '" timed out.');
	            error.code = 'ETIMEDOUT';
	            if (info) {
	                error.info = info;
	            }
	            timedOut = true;
	            originalCallback(error);
	        }
	
	        return initialParams(function (args, origCallback) {
	            originalCallback = origCallback;
	            // setup timer and call original function
	            timer = setTimeout(timeoutCallback, miliseconds);
	            asyncFn.apply(null, args.concat(injectedCallback));
	        });
	    }
	
	    /* Built-in method references for those with the same name as other `lodash` methods. */
	    var nativeCeil = Math.ceil;
	    var nativeMax$1 = Math.max;
	    /**
	     * The base implementation of `_.range` and `_.rangeRight` which doesn't
	     * coerce arguments to numbers.
	     *
	     * @private
	     * @param {number} start The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} step The value to increment or decrement by.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Array} Returns the new array of numbers.
	     */
	    function baseRange(start, end, step, fromRight) {
	      var index = -1,
	          length = nativeMax$1(nativeCeil((end - start) / (step || 1)), 0),
	          result = Array(length);
	
	      while (length--) {
	        result[fromRight ? length : ++index] = start;
	        start += step;
	      }
	      return result;
	    }
	
	    function timeLimit(count, limit, iteratee, cb) {
	        return mapLimit(baseRange(0, count, 1), limit, iteratee, cb);
	    }
	
	    var times = doLimit(timeLimit, Infinity);
	
	    var timesSeries = doLimit(timeLimit, 1);
	
	    function transform(arr, memo, iteratee, callback) {
	        if (arguments.length === 3) {
	            callback = iteratee;
	            iteratee = memo;
	            memo = isArray(arr) ? [] : {};
	        }
	
	        eachOf(arr, function (v, k, cb) {
	            iteratee(memo, v, k, cb);
	        }, function (err) {
	            callback(err, memo);
	        });
	    }
	
	    function unmemoize(fn) {
	        return function () {
	            return (fn.unmemoized || fn).apply(null, arguments);
	        };
	    }
	
	    function until(test, iteratee, cb) {
	        return whilst(function () {
	            return !test.apply(this, arguments);
	        }, iteratee, cb);
	    }
	
	    function waterfall (tasks, cb) {
	        cb = once(cb || noop);
	        if (!isArray(tasks)) return cb(new Error('First argument to waterfall must be an array of functions'));
	        if (!tasks.length) return cb();
	        var taskIndex = 0;
	
	        function nextTask(args) {
	            if (taskIndex === tasks.length) {
	                return cb.apply(null, [null].concat(args));
	            }
	
	            var taskCallback = onlyOnce(rest(function (err, args) {
	                if (err) {
	                    return cb.apply(null, [err].concat(args));
	                }
	                nextTask(args);
	            }));
	
	            args.push(taskCallback);
	
	            var task = tasks[taskIndex++];
	            task.apply(null, args);
	        }
	
	        nextTask([]);
	    }
	
	    var index = {
	        applyEach: applyEach,
	        applyEachSeries: applyEachSeries,
	        apply: apply$1,
	        asyncify: asyncify,
	        auto: auto,
	        autoInject: autoInject,
	        cargo: cargo,
	        compose: compose,
	        concat: concat,
	        concatSeries: concatSeries,
	        constant: constant,
	        detect: detect,
	        detectLimit: detectLimit,
	        detectSeries: detectSeries,
	        dir: dir,
	        doDuring: doDuring,
	        doUntil: doUntil,
	        doWhilst: doWhilst,
	        during: during,
	        each: each,
	        eachLimit: eachLimit,
	        eachOf: eachOf,
	        eachOfLimit: eachOfLimit,
	        eachOfSeries: eachOfSeries,
	        eachSeries: eachSeries,
	        ensureAsync: ensureAsync,
	        every: every,
	        everyLimit: everyLimit,
	        everySeries: everySeries,
	        filter: filter,
	        filterLimit: filterLimit,
	        filterSeries: filterSeries,
	        forever: forever,
	        iterator: iterator$1,
	        log: log,
	        map: map,
	        mapLimit: mapLimit,
	        mapSeries: mapSeries,
	        memoize: memoize$1,
	        nextTick: setImmediate$1,
	        parallel: parallel,
	        parallelLimit: parallelLimit,
	        priorityQueue: priorityQueue,
	        queue: queue$1,
	        race: race,
	        reduce: reduce,
	        reduceRight: reduceRight,
	        reflect: reflect,
	        reflectAll: reflectAll,
	        reject: reject,
	        rejectLimit: rejectLimit,
	        rejectSeries: rejectSeries,
	        retry: retry,
	        retryable: retryable,
	        seq: seq,
	        series: series,
	        setImmediate: setImmediate$1,
	        some: some,
	        someLimit: someLimit,
	        someSeries: someSeries,
	        sortBy: sortBy,
	        timeout: timeout,
	        times: times,
	        timesLimit: timeLimit,
	        timesSeries: timesSeries,
	        transform: transform,
	        unmemoize: unmemoize,
	        until: until,
	        waterfall: waterfall,
	        whilst: whilst,
	
	        // aliases
	        all: every,
	        any: some,
	        forEach: each,
	        forEachSeries: eachSeries,
	        forEachLimit: eachLimit,
	        forEachOf: eachOf,
	        forEachOfSeries: eachOfSeries,
	        forEachOfLimit: eachOfLimit,
	        inject: reduce,
	        foldl: reduce,
	        foldr: reduceRight,
	        select: filter,
	        selectLimit: filterLimit,
	        selectSeries: filterSeries,
	        wrapSync: asyncify
	    };
	
	    exports['default'] = index;
	    exports.applyEach = applyEach;
	    exports.applyEachSeries = applyEachSeries;
	    exports.apply = apply$1;
	    exports.asyncify = asyncify;
	    exports.auto = auto;
	    exports.autoInject = autoInject;
	    exports.cargo = cargo;
	    exports.compose = compose;
	    exports.concat = concat;
	    exports.concatSeries = concatSeries;
	    exports.constant = constant;
	    exports.detect = detect;
	    exports.detectLimit = detectLimit;
	    exports.detectSeries = detectSeries;
	    exports.dir = dir;
	    exports.doDuring = doDuring;
	    exports.doUntil = doUntil;
	    exports.doWhilst = doWhilst;
	    exports.during = during;
	    exports.each = each;
	    exports.eachLimit = eachLimit;
	    exports.eachOf = eachOf;
	    exports.eachOfLimit = eachOfLimit;
	    exports.eachOfSeries = eachOfSeries;
	    exports.eachSeries = eachSeries;
	    exports.ensureAsync = ensureAsync;
	    exports.every = every;
	    exports.everyLimit = everyLimit;
	    exports.everySeries = everySeries;
	    exports.filter = filter;
	    exports.filterLimit = filterLimit;
	    exports.filterSeries = filterSeries;
	    exports.forever = forever;
	    exports.iterator = iterator$1;
	    exports.log = log;
	    exports.map = map;
	    exports.mapLimit = mapLimit;
	    exports.mapSeries = mapSeries;
	    exports.memoize = memoize$1;
	    exports.nextTick = setImmediate$1;
	    exports.parallel = parallel;
	    exports.parallelLimit = parallelLimit;
	    exports.priorityQueue = priorityQueue;
	    exports.queue = queue$1;
	    exports.race = race;
	    exports.reduce = reduce;
	    exports.reduceRight = reduceRight;
	    exports.reflect = reflect;
	    exports.reflectAll = reflectAll;
	    exports.reject = reject;
	    exports.rejectLimit = rejectLimit;
	    exports.rejectSeries = rejectSeries;
	    exports.retry = retry;
	    exports.retryable = retryable;
	    exports.seq = seq;
	    exports.series = series;
	    exports.setImmediate = setImmediate$1;
	    exports.some = some;
	    exports.someLimit = someLimit;
	    exports.someSeries = someSeries;
	    exports.sortBy = sortBy;
	    exports.timeout = timeout;
	    exports.times = times;
	    exports.timesLimit = timeLimit;
	    exports.timesSeries = timesSeries;
	    exports.transform = transform;
	    exports.unmemoize = unmemoize;
	    exports.until = until;
	    exports.waterfall = waterfall;
	    exports.whilst = whilst;
	    exports.all = every;
	    exports.allLimit = everyLimit;
	    exports.allSeries = everySeries;
	    exports.any = some;
	    exports.anyLimit = someLimit;
	    exports.anySeries = someSeries;
	    exports.find = detect;
	    exports.findLimit = detectLimit;
	    exports.findSeries = detectSeries;
	    exports.forEach = each;
	    exports.forEachSeries = eachSeries;
	    exports.forEachLimit = eachLimit;
	    exports.forEachOf = eachOf;
	    exports.forEachOfSeries = eachOfSeries;
	    exports.forEachOfLimit = eachOfLimit;
	    exports.inject = reduce;
	    exports.foldl = reduce;
	    exports.foldr = reduceRight;
	    exports.select = filter;
	    exports.selectLimit = filterLimit;
	    exports.selectSeries = filterSeries;
	    exports.wrapSync = asyncify;
	
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module), (function() { return this; }()), __webpack_require__(17).setImmediate, __webpack_require__(18)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(18).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17).setImmediate, __webpack_require__(17).clearImmediate))

/***/ },
/* 18 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map