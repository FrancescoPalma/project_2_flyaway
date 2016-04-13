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
	__webpack_require__(118);
	__webpack_require__(119);
	
	var getFlightData = __webpack_require__(11).getFlightData;
	var populateFlightsView = __webpack_require__(112).populateFlightsView;
	var changeBg = __webpack_require__(113);
	var getFlickrImagesByTag = __webpack_require__(114).getFlickrImagesByTag;
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
	    getFlightData('EDI', 'PAR', '2016-07-04', populateFlightsView);
	    showElement('#flight-results');
	  })
	
	  var datepicker = new Datepickk();
	  console.log(datepicker);
	
	  var datePickerButton = document.querySelector('.date-picker-btn');
	  datePickerButton.onclick = function(e) {
	    e.preventDefault();
	    datepicker.show();
	
	    datepicker.onSelect = function() {
	      datepicker.range = true;
	      var getFirstDate = this.toLocaleDateString();
	      var formatDate = getFirstDate.split('/');
	      var day = formatDate[1];
	      var month = formatDate[0];
	      var year = formatDate[2];
	      var formattedDate = year + "-" + month + "-" + day;
	
	      var displayFirstDate = document.getElementById('first-date');
	      displayFirstDate.innerHTML = formattedDate;
	
	      datepicker.onSelect = function() {
	        var getSecondDate = this.toLocaleDateString();
	        var formatDate = getSecondDate.split('/');
	        var day = formatDate[1];
	        var month = formatDate[0];
	        var year = formatDate[2];
	        var formattedDate = year + "-" + month + "-" + day;
	        var displayDate = document.getElementById('second-date');
	        displayDate.innerHTML = formattedDate;
	      }
	    }
	  }
	
	  $('#destination-button').click(function(e) {
	    $('#video').hide();
	    getFlickrImagesByTag($('#destination-input').val(), changeBg);
	    $('#slider').show();
	    hidePage();
	    showElement('#trip-details');
	  });
	
	  var departingFromBox = document.getElementById('search-box-origin');
	  var goingToBox = document.getElementById('search-box-destination');
	
	  goingToBox.onlick = function(e) {
	    e.preventDefault();
	    console.log("hello form ric");
	  }
	
	  // $('#show-flight-details-button').click(function(e) {
	  //   hidePage();
	  //   showElement('#flight-results');
	  // })
	});


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
/***/ function(module, exports, __webpack_require__) {

	var moment = __webpack_require__(12);
	function getFlightData(origin, destination, departureDate, callback) {
	
	  var url = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=bX8HkNGmgrYd81Z9ne6OyMp4WhAiYoyS&origin=" + origin + "&destination=" + destination + "&departure_date=" + departureDate + "&currency=GBP&number_of_results=6";
	
	  var xhr = new XMLHttpRequest();
	  console.log("getFlights has been called");
	  xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	      var jsonString = xhr.responseText;
	      var data = JSON.parse(jsonString);
	      console.log("data is ready");
	      callback(data);
	    }
	  }
	  xhr.open("GET", url);
	  console.log("Sent get request");
	  xhr.send(null);
	}
	
	function breakBigObject(data) {
	  var array = [];
	  for(var object of data.results){
	    array.push(object);
	  }
	  return array;
	}
	
	function singleFlight(data, index) {
	  return (data.results[index].itineraries[0].outbound.flights.length === 1)
	}
	
	function getFlightDetails(data, index) {
	  return data.results[index].itineraries[0].outbound.flights
	}
	
	function getTotalFlightPrice(data, index) {
	  return data.results[index].fare.total_price
	}
	
	function getOriginIata(data, index) {
	  return data.results[index].itineraries[0].outbound.flights[0].origin.airport
	}
	
	function getDestinationIata(data, index) {
	  if (singleFlight(data, index) === true) {
	    return data.results[index].itineraries[0].outbound.flights[0].destination.airport;
	  } else {
	    var size = data.results[index].itineraries[0].outbound.flights.length;
	    return data.results[index].itineraries[0].outbound.flights[size - 1].destination.airport;
	  }
	}
	
	function getFlightDuration(data, index) {
	  var time1 = moment(data.results[index].itineraries[0].outbound.flights[0].departs_at);
	  var time2;
	  if (singleFlight === true) {
	    time2 = moment(data.results[index].itineraries[0].outbound.flights[0].arrives_at);
	  } else {
	    var size = data.results[index].itineraries[0].outbound.flights.length;
	    time2 = moment(data.results[index].itineraries[0].outbound.flights[size - 1].arrives_at);
	  }
	  return time2.diff(time1, 'hours');
	}
	
	function getNumberOfStopovers(data, index) {
	  return data.results[index].itineraries[0].outbound.flights.length - 1;
	}
	
	module.exports = {
	  getFlightData: getFlightData,
	  breakBigObject: breakBigObject,
	  getFlightDetails: getFlightDetails,
	  getTotalFlightPrice: getTotalFlightPrice,
	  getOriginIata: getOriginIata,
	  getDestinationIata: getDestinationIata,
	  getFlightDuration: getFlightDuration,
	  getNumberOfStopovers: getNumberOfStopovers
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.12.0
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com
	
	;(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, function () { 'use strict';
	
	    var hookCallback;
	
	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }
	
	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }
	
	    function isArray(input) {
	        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	    }
	
	    function isDate(input) {
	        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }
	
	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }
	
	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }
	
	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }
	
	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }
	
	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }
	
	        return a;
	    }
	
	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }
	
	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false
	        };
	    }
	
	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }
	
	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m);
	            m._isValid = !isNaN(m._d.getTime()) &&
	                flags.overflow < 0 &&
	                !flags.empty &&
	                !flags.invalidMonth &&
	                !flags.invalidWeekday &&
	                !flags.nullInput &&
	                !flags.invalidFormat &&
	                !flags.userInvalidated;
	
	            if (m._strict) {
	                m._isValid = m._isValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }
	        }
	        return m._isValid;
	    }
	
	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        }
	        else {
	            getParsingFlags(m).userInvalidated = true;
	        }
	
	        return m;
	    }
	
	    function isUndefined(input) {
	        return input === void 0;
	    }
	
	    // Plugins that add properties should also add the key here (null value),
	    // so we can properly clone ourselves.
	    var momentProperties = utils_hooks__hooks.momentProperties = [];
	
	    function copyConfig(to, from) {
	        var i, prop, val;
	
	        if (!isUndefined(from._isAMomentObject)) {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (!isUndefined(from._i)) {
	            to._i = from._i;
	        }
	        if (!isUndefined(from._f)) {
	            to._f = from._f;
	        }
	        if (!isUndefined(from._l)) {
	            to._l = from._l;
	        }
	        if (!isUndefined(from._strict)) {
	            to._strict = from._strict;
	        }
	        if (!isUndefined(from._tzm)) {
	            to._tzm = from._tzm;
	        }
	        if (!isUndefined(from._isUTC)) {
	            to._isUTC = from._isUTC;
	        }
	        if (!isUndefined(from._offset)) {
	            to._offset = from._offset;
	        }
	        if (!isUndefined(from._pf)) {
	            to._pf = getParsingFlags(from);
	        }
	        if (!isUndefined(from._locale)) {
	            to._locale = from._locale;
	        }
	
	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (!isUndefined(val)) {
	                    to[prop] = val;
	                }
	            }
	        }
	
	        return to;
	    }
	
	    var updateInProgress = false;
	
	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }
	
	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	    }
	
	    function absFloor (number) {
	        if (number < 0) {
	            return Math.ceil(number);
	        } else {
	            return Math.floor(number);
	        }
	    }
	
	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;
	
	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }
	
	        return value;
	    }
	
	    // compare two arrays, return the number of differences
	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }
	
	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
	                (typeof console !==  'undefined') && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }
	
	    function deprecate(msg, fn) {
	        var firstTime = true;
	
	        return extend(function () {
	            if (firstTime) {
	                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }
	
	    var deprecations = {};
	
	    function deprecateSimple(name, msg) {
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }
	
	    utils_hooks__hooks.suppressDeprecationWarnings = false;
	
	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }
	
	    function isObject(input) {
	        return Object.prototype.toString.call(input) === '[object Object]';
	    }
	
	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (isFunction(prop)) {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        this._config = config;
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	    }
	
	    function mergeConfigs(parentConfig, childConfig) {
	        var res = extend({}, parentConfig), prop;
	        for (prop in childConfig) {
	            if (hasOwnProp(childConfig, prop)) {
	                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                    res[prop] = {};
	                    extend(res[prop], parentConfig[prop]);
	                    extend(res[prop], childConfig[prop]);
	                } else if (childConfig[prop] != null) {
	                    res[prop] = childConfig[prop];
	                } else {
	                    delete res[prop];
	                }
	            }
	        }
	        return res;
	    }
	
	    function Locale(config) {
	        if (config != null) {
	            this.set(config);
	        }
	    }
	
	    // internal storage for locale config files
	    var locales = {};
	    var globalLocale;
	
	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }
	
	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;
	
	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }
	
	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && (typeof module !== 'undefined') &&
	                module && module.exports) {
	            try {
	                oldLocale = globalLocale._abbr;
	                __webpack_require__(14)("./" + name);
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }
	
	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (isUndefined(values)) {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }
	
	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }
	
	        return globalLocale._abbr;
	    }
	
	    function defineLocale (name, config) {
	        if (config !== null) {
	            config.abbr = name;
	            if (locales[name] != null) {
	                deprecateSimple('defineLocaleOverride',
	                        'use moment.updateLocale(localeName, config) to change ' +
	                        'an existing locale. moment.defineLocale(localeName, ' +
	                        'config) should only be used for creating a new locale');
	                config = mergeConfigs(locales[name]._config, config);
	            } else if (config.parentLocale != null) {
	                if (locales[config.parentLocale] != null) {
	                    config = mergeConfigs(locales[config.parentLocale]._config, config);
	                } else {
	                    // treat as if there is no base config
	                    deprecateSimple('parentLocaleUndefined',
	                            'specified parentLocale is not defined yet');
	                }
	            }
	            locales[name] = new Locale(config);
	
	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);
	
	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }
	
	    function updateLocale(name, config) {
	        if (config != null) {
	            var locale;
	            if (locales[name] != null) {
	                config = mergeConfigs(locales[name]._config, config);
	            }
	            locale = new Locale(config);
	            locale.parentLocale = locales[name];
	            locales[name] = locale;
	
	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);
	        } else {
	            // pass null for config to unupdate, useful for tests
	            if (locales[name] != null) {
	                if (locales[name].parentLocale != null) {
	                    locales[name] = locales[name].parentLocale;
	                } else if (locales[name] != null) {
	                    delete locales[name];
	                }
	            }
	        }
	        return locales[name];
	    }
	
	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;
	
	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }
	
	        if (!key) {
	            return globalLocale;
	        }
	
	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }
	
	        return chooseLocale(key);
	    }
	
	    function locale_locales__listLocales() {
	        return Object.keys(locales);
	    }
	
	    var aliases = {};
	
	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }
	
	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }
	
	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;
	
	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }
	
	        return normalizedInput;
	    }
	
	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }
	
	    function get_set__get (mom, unit) {
	        return mom.isValid() ?
	            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	    }
	
	    function get_set__set (mom, unit, value) {
	        if (mom.isValid()) {
	            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	        }
	    }
	
	    // MOMENTS
	
	    function getSet (units, value) {
	        var unit;
	        if (typeof units === 'object') {
	            for (unit in units) {
	                this.set(unit, units[unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (isFunction(this[units])) {
	                return this[units](value);
	            }
	        }
	        return this;
	    }
	
	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }
	
	    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
	
	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
	
	    var formatFunctions = {};
	
	    var formatTokenFunctions = {};
	
	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }
	
	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }
	
	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;
	
	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }
	
	        return function (mom) {
	            var output = '';
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }
	
	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }
	
	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
	
	        return formatFunctions[format](m);
	    }
	
	    function expandFormat(format, locale) {
	        var i = 5;
	
	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }
	
	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }
	
	        return format;
	    }
	
	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999
	
	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf
	
	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z
	
	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
	
	    // any word (or two) characters or numbers including two/three word month in arabic.
	    // includes scottish gaelic two word and hyphenated months
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
	
	
	    var regexes = {};
	
	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }
	
	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }
	
	        return regexes[token](config._strict, config._locale);
	    }
	
	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }));
	    }
	
	    function regexEscape(s) {
	        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }
	
	    var tokens = {};
	
	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }
	
	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }
	
	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }
	
	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;
	    var WEEK = 7;
	    var WEEKDAY = 8;
	
	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }
	
	    // FORMATTING
	
	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });
	
	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });
	
	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });
	
	    // ALIASES
	
	    addUnitAlias('month', 'M');
	
	    // PARSING
	
	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  function (isStrict, locale) {
	        return locale.monthsShortRegex(isStrict);
	    });
	    addRegexToken('MMMM', function (isStrict, locale) {
	        return locale.monthsRegex(isStrict);
	    });
	
	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });
	
	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });
	
	    // LOCALES
	
	    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m, format) {
	        return isArray(this._months) ? this._months[m.month()] :
	            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }
	
	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m, format) {
	        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }
	
	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;
	
	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }
	
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }
	
	    // MOMENTS
	
	    function setMonth (mom, value) {
	        var dayOfMonth;
	
	        if (!mom.isValid()) {
	            // No op
	            return mom;
	        }
	
	        if (typeof value === 'string') {
	            if (/^\d+$/.test(value)) {
	                value = toInt(value);
	            } else {
	                value = mom.localeData().monthsParse(value);
	                // TODO: Another silent failure?
	                if (typeof value !== 'number') {
	                    return mom;
	                }
	            }
	        }
	
	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }
	
	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }
	
	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }
	
	    var defaultMonthsShortRegex = matchWord;
	    function monthsShortRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsShortStrictRegex;
	            } else {
	                return this._monthsShortRegex;
	            }
	        } else {
	            return this._monthsShortStrictRegex && isStrict ?
	                this._monthsShortStrictRegex : this._monthsShortRegex;
	        }
	    }
	
	    var defaultMonthsRegex = matchWord;
	    function monthsRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsStrictRegex;
	            } else {
	                return this._monthsRegex;
	            }
	        } else {
	            return this._monthsStrictRegex && isStrict ?
	                this._monthsStrictRegex : this._monthsRegex;
	        }
	    }
	
	    function computeMonthsParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }
	
	        var shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom;
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            shortPieces.push(this.monthsShort(mom, ''));
	            longPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.monthsShort(mom, ''));
	        }
	        // Sorting makes sure if one month (or abbr) is a prefix of another it
	        // will match the longer piece.
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 12; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }
	
	        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._monthsShortRegex = this._monthsRegex;
	        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')$', 'i');
	        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')$', 'i');
	    }
	
	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;
	
	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;
	
	            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }
	            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	                overflow = WEEK;
	            }
	            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	                overflow = WEEKDAY;
	            }
	
	            getParsingFlags(m).overflow = overflow;
	        }
	
	        return m;
	    }
	
	    // iso 8601 regex
	    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
	    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
	
	    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
	
	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	        ['YYYY-DDD', /\d{4}-\d{3}/],
	        ['YYYY-MM', /\d{4}-\d\d/, false],
	        ['YYYYYYMMDD', /[+-]\d{10}/],
	        ['YYYYMMDD', /\d{8}/],
	        // YYYYMM is NOT allowed by the standard
	        ['GGGG[W]WWE', /\d{4}W\d{3}/],
	        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	        ['YYYYDDD', /\d{7}/]
	    ];
	
	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	        ['HH:mm', /\d\d:\d\d/],
	        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	        ['HHmmss', /\d\d\d\d\d\d/],
	        ['HHmm', /\d\d\d\d/],
	        ['HH', /\d\d/]
	    ];
	
	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
	
	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	            allowTime, dateFormat, timeFormat, tzFormat;
	
	        if (match) {
	            getParsingFlags(config).iso = true;
	
	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(match[1])) {
	                    dateFormat = isoDates[i][0];
	                    allowTime = isoDates[i][2] !== false;
	                    break;
	                }
	            }
	            if (dateFormat == null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[3]) {
	                for (i = 0, l = isoTimes.length; i < l; i++) {
	                    if (isoTimes[i][1].exec(match[3])) {
	                        // match[2] should be 'T' or space
	                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                        break;
	                    }
	                }
	                if (timeFormat == null) {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            if (!allowTime && timeFormat != null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[4]) {
	                if (tzRegex.exec(match[4])) {
	                    tzFormat = 'Z';
	                } else {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }
	
	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);
	
	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }
	
	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }
	
	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'moment construction falls back to js Date. This is ' +
	        'discouraged and will be removed in upcoming major ' +
	        'release. Please refer to ' +
	        'https://github.com/moment/moment/issues/1407 for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );
	
	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);
	
	        //the date constructor remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	            date.setFullYear(y);
	        }
	        return date;
	    }
	
	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));
	
	        //the Date.UTC function remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }
	
	    // FORMATTING
	
	    addFormatToken('Y', 0, 0, function () {
	        var y = this.year();
	        return y <= 9999 ? '' + y : '+' + y;
	    });
	
	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });
	
	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');
	
	    // ALIASES
	
	    addUnitAlias('year', 'y');
	
	    // PARSING
	
	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);
	
	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	    addParseToken('Y', function (input, array) {
	        array[YEAR] = parseInt(input, 10);
	    });
	
	    // HELPERS
	
	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }
	
	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }
	
	    // HOOKS
	
	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };
	
	    // MOMENTS
	
	    var getSetYear = makeGetSet('FullYear', false);
	
	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }
	
	    // start-of-first-week - start-of-year
	    function firstWeekOffset(year, dow, doy) {
	        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	            fwd = 7 + dow - doy,
	            // first-week day local weekday -- which local weekday is fwd
	            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
	
	        return -fwdlw + fwd - 1;
	    }
	
	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	        var localWeekday = (7 + weekday - dow) % 7,
	            weekOffset = firstWeekOffset(year, dow, doy),
	            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	            resYear, resDayOfYear;
	
	        if (dayOfYear <= 0) {
	            resYear = year - 1;
	            resDayOfYear = daysInYear(resYear) + dayOfYear;
	        } else if (dayOfYear > daysInYear(year)) {
	            resYear = year + 1;
	            resDayOfYear = dayOfYear - daysInYear(year);
	        } else {
	            resYear = year;
	            resDayOfYear = dayOfYear;
	        }
	
	        return {
	            year: resYear,
	            dayOfYear: resDayOfYear
	        };
	    }
	
	    function weekOfYear(mom, dow, doy) {
	        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	            resWeek, resYear;
	
	        if (week < 1) {
	            resYear = mom.year() - 1;
	            resWeek = week + weeksInYear(resYear, dow, doy);
	        } else if (week > weeksInYear(mom.year(), dow, doy)) {
	            resWeek = week - weeksInYear(mom.year(), dow, doy);
	            resYear = mom.year() + 1;
	        } else {
	            resYear = mom.year();
	            resWeek = week;
	        }
	
	        return {
	            week: resWeek,
	            year: resYear
	        };
	    }
	
	    function weeksInYear(year, dow, doy) {
	        var weekOffset = firstWeekOffset(year, dow, doy),
	            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	    }
	
	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }
	
	    function currentDateArray(config) {
	        // hooks is actually the exported moment object
	        var nowValue = new Date(utils_hooks__hooks.now());
	        if (config._useUTC) {
	            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	        }
	        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	    }
	
	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;
	
	        if (config._d) {
	            return;
	        }
	
	        currentDate = currentDateArray(config);
	
	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }
	
	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
	
	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }
	
	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }
	
	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }
	
	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }
	
	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }
	
	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }
	
	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }
	
	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
	
	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;
	
	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	            if (weekday < 1 || weekday > 7) {
	                weekdayOverflow = true;
	            }
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;
	
	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);
	
	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < 0 || weekday > 6) {
	                    weekdayOverflow = true;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	                if (w.e < 0 || w.e > 6) {
	                    weekdayOverflow = true;
	                }
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	            getParsingFlags(config)._overflowWeeks = true;
	        } else if (weekdayOverflow != null) {
	            getParsingFlags(config)._overflowWeekday = true;
	        } else {
	            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	            config._a[YEAR] = temp.year;
	            config._dayOfYear = temp.dayOfYear;
	        }
	    }
	
	    // constant that refers to the ISO standard
	    utils_hooks__hooks.ISO_8601 = function () {};
	
	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }
	
	        config._a = [];
	        getParsingFlags(config).empty = true;
	
	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;
	
	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
	
	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            // console.log('token', token, 'parsedInput', parsedInput,
	            //         'regex', getParseRegexForToken(token, config));
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                }
	                else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }
	
	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }
	
	        // clear _12h flag if hour is <= 12
	        if (getParsingFlags(config).bigHour === true &&
	                config._a[HOUR] <= 12 &&
	                config._a[HOUR] > 0) {
	            getParsingFlags(config).bigHour = undefined;
	        }
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
	
	        configFromArray(config);
	        checkOverflow(config);
	    }
	
	
	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;
	
	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }
	
	    // date from string and array of format strings
	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,
	
	            scoreToBeat,
	            i,
	            currentScore;
	
	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }
	
	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);
	
	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }
	
	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;
	
	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
	
	            getParsingFlags(tempConfig).score = currentScore;
	
	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }
	
	        extend(config, bestMoment || tempConfig);
	    }
	
	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }
	
	        var i = normalizeObjectUnits(config._i);
	        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	            return obj && parseInt(obj, 10);
	        });
	
	        configFromArray(config);
	    }
	
	    function createFromConfig (config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }
	
	        return res;
	    }
	
	    function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;
	
	        config._locale = config._locale || locale_locales__getLocale(config._l);
	
	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }
	
	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }
	
	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (format) {
	            configFromStringAndFormat(config);
	        } else if (isDate(input)) {
	            config._d = input;
	        } else {
	            configFromInput(config);
	        }
	
	        if (!valid__isValid(config)) {
	            config._d = null;
	        }
	
	        return config;
	    }
	
	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date(utils_hooks__hooks.now());
	        } else if (isDate(input)) {
	            config._d = new Date(+input);
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }
	
	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};
	
	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;
	
	        return createFromConfig(c);
	    }
	
	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }
	
	    var prototypeMin = deprecate(
	         'moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
	         function () {
	             var other = local__createLocal.apply(null, arguments);
	             if (this.isValid() && other.isValid()) {
	                 return other < this ? this : other;
	             } else {
	                 return valid__createInvalid();
	             }
	         }
	     );
	
	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other > this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );
	
	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }
	
	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);
	
	        return pickBy('isBefore', args);
	    }
	
	    function max () {
	        var args = [].slice.call(arguments, 0);
	
	        return pickBy('isAfter', args);
	    }
	
	    var now = function () {
	        return Date.now ? Date.now() : +(new Date());
	    };
	
	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;
	
	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 36e5; // 1000 * 60 * 60
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;
	
	        this._data = {};
	
	        this._locale = locale_locales__getLocale();
	
	        this._bubble();
	    }
	
	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }
	
	    // FORMATTING
	
	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }
	
	    offset('Z', ':');
	    offset('ZZ', '');
	
	    // PARSING
	
	    addRegexToken('Z',  matchShortOffset);
	    addRegexToken('ZZ', matchShortOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(matchShortOffset, input);
	    });
	
	    // HELPERS
	
	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;
	
	    function offsetFromString(matcher, string) {
	        var matches = ((string || '').match(matcher) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);
	
	        return parts[0] === '+' ? minutes : -minutes;
	    }
	
	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(+res._d + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	    }
	
	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }
	
	    // HOOKS
	
	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};
	
	    // MOMENTS
	
	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(matchShortOffset, input);
	            } else if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }
	
	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }
	
	            this.utcOffset(input, keepLocalTime);
	
	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }
	
	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }
	
	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;
	
	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }
	
	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            this.utcOffset(offsetFromString(matchOffset, this._i));
	        }
	        return this;
	    }
	
	    function hasAlignedHourOffset (input) {
	        if (!this.isValid()) {
	            return false;
	        }
	        input = input ? local__createLocal(input).utcOffset() : 0;
	
	        return (this.utcOffset() - input) % 60 === 0;
	    }
	
	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }
	
	    function isDaylightSavingTimeShifted () {
	        if (!isUndefined(this._isDSTShifted)) {
	            return this._isDSTShifted;
	        }
	
	        var c = {};
	
	        copyConfig(c, this);
	        c = prepareConfig(c);
	
	        if (c._a) {
	            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
	            this._isDSTShifted = this.isValid() &&
	                compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }
	
	        return this._isDSTShifted;
	    }
	
	    function isLocal () {
	        return this.isValid() ? !this._isUTC : false;
	    }
	
	    function isUtcOffset () {
	        return this.isValid() ? this._isUTC : false;
	    }
	
	    function isUtc () {
	        return this.isValid() ? this._isUTC && this._offset === 0 : false;
	    }
	
	    // ASP.NET json date format regex
	    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;
	
	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    // and further modified to allow for strings containing both week and day
	    var isoRegex = /^(-)?P(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)W)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?$/;
	
	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;
	
	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])        * sign,
	                h  : toInt(match[HOUR])        * sign,
	                m  : toInt(match[MINUTE])      * sign,
	                s  : toInt(match[SECOND])      * sign,
	                ms : toInt(match[MILLISECOND]) * sign
	            };
	        } else if (!!(match = isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                w : parseIso(match[4], sign),
	                d : parseIso(match[5], sign),
	                h : parseIso(match[6], sign),
	                m : parseIso(match[7], sign),
	                s : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));
	
	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }
	
	        ret = new Duration(duration);
	
	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }
	
	        return ret;
	    }
	
	    create__createDuration.fn = Duration.prototype;
	
	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }
	
	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};
	
	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }
	
	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
	
	        return res;
	    }
	
	    function momentsDifference(base, other) {
	        var res;
	        if (!(base.isValid() && other.isValid())) {
	            return {milliseconds: 0, months: 0};
	        }
	
	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }
	
	        return res;
	    }
	
	    function absRound (number) {
	        if (number < 0) {
	            return Math.round(-1 * number) * -1;
	        } else {
	            return Math.round(number);
	        }
	    }
	
	    // TODO: remove 'name' arg after deprecation is removed
	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
	                tmp = val; val = period; period = tmp;
	            }
	
	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }
	
	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = absRound(duration._days),
	            months = absRound(duration._months);
	
	        if (!mom.isValid()) {
	            // No op
	            return;
	        }
	
	        updateOffset = updateOffset == null ? true : updateOffset;
	
	        if (milliseconds) {
	            mom._d.setTime(+mom._d + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }
	
	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');
	
	    function moment_calendar__calendar (time, formats) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            diff = this.diff(sod, 'days', true),
	            format = diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';
	
	        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);
	
	        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
	    }
	
	    function clone () {
	        return new Moment(this);
	    }
	
	    function isAfter (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return +this > +localInput;
	        } else {
	            return +localInput < +this.clone().startOf(units);
	        }
	    }
	
	    function isBefore (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return +this < +localInput;
	        } else {
	            return +this.clone().endOf(units) < +localInput;
	        }
	    }
	
	    function isBetween (from, to, units) {
	        return this.isAfter(from, units) && this.isBefore(to, units);
	    }
	
	    function isSame (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input),
	            inputMs;
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            return +this === +localInput;
	        } else {
	            inputMs = +localInput;
	            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
	        }
	    }
	
	    function isSameOrAfter (input, units) {
	        return this.isSame(input, units) || this.isAfter(input,units);
	    }
	
	    function isSameOrBefore (input, units) {
	        return this.isSame(input, units) || this.isBefore(input,units);
	    }
	
	    function diff (input, units, asFloat) {
	        var that,
	            zoneDelta,
	            delta, output;
	
	        if (!this.isValid()) {
	            return NaN;
	        }
	
	        that = cloneWithOffset(input, this);
	
	        if (!that.isValid()) {
	            return NaN;
	        }
	
	        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
	
	        units = normalizeUnits(units);
	
	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }
	
	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;
	
	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }
	
	        return -(wholeMonthDiff + adjust);
	    }
	
	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	
	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }
	
	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if (isFunction(Date.prototype.toISOString)) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }
	
	    function format (inputString) {
	        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
	        return this.localeData().postformat(output);
	    }
	
	    function from (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }
	
	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }
	
	    function to (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }
	
	    function toNow (withoutSuffix) {
	        return this.to(local__createLocal(), withoutSuffix);
	    }
	
	    // If passed a locale key, it will set the locale for this
	    // instance.  Otherwise, it will return the locale configuration
	    // variables for this instance.
	    function locale (key) {
	        var newLocaleData;
	
	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }
	
	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );
	
	    function localeData () {
	        return this._locale;
	    }
	
	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	        case 'year':
	            this.month(0);
	            /* falls through */
	        case 'quarter':
	        case 'month':
	            this.date(1);
	            /* falls through */
	        case 'week':
	        case 'isoWeek':
	        case 'day':
	            this.hours(0);
	            /* falls through */
	        case 'hour':
	            this.minutes(0);
	            /* falls through */
	        case 'minute':
	            this.seconds(0);
	            /* falls through */
	        case 'second':
	            this.milliseconds(0);
	        }
	
	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }
	
	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }
	
	        return this;
	    }
	
	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }
	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }
	
	    function to_type__valueOf () {
	        return +this._d - ((this._offset || 0) * 60000);
	    }
	
	    function unix () {
	        return Math.floor(+this / 1000);
	    }
	
	    function toDate () {
	        return this._offset ? new Date(+this) : this._d;
	    }
	
	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }
	
	    function toObject () {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds()
	        };
	    }
	
	    function toJSON () {
	        // new Date(NaN).toJSON() === null
	        return this.isValid() ? this.toISOString() : null;
	    }
	
	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }
	
	    function parsingFlags () {
	        return extend({}, getParsingFlags(this));
	    }
	
	    function invalidAt () {
	        return getParsingFlags(this).overflow;
	    }
	
	    function creationData() {
	        return {
	            input: this._i,
	            format: this._f,
	            locale: this._locale,
	            isUTC: this._isUTC,
	            strict: this._strict
	        };
	    }
	
	    // FORMATTING
	
	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });
	
	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });
	
	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }
	
	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');
	
	    // ALIASES
	
	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');
	
	    // PARSING
	
	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);
	
	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });
	
	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	
	    // MOMENTS
	
	    function getSetWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input,
	                this.week(),
	                this.weekday(),
	                this.localeData()._week.dow,
	                this.localeData()._week.doy);
	    }
	
	    function getSetISOWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input, this.isoWeek(), this.isoWeekday(), 1, 4);
	    }
	
	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }
	
	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }
	
	    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	        var weeksTarget;
	        if (input == null) {
	            return weekOfYear(this, dow, doy).year;
	        } else {
	            weeksTarget = weeksInYear(input, dow, doy);
	            if (week > weeksTarget) {
	                week = weeksTarget;
	            }
	            return setWeekAll.call(this, input, week, weekday, dow, doy);
	        }
	    }
	
	    function setWeekAll(weekYear, week, weekday, dow, doy) {
	        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
	
	        this.year(date.getUTCFullYear());
	        this.month(date.getUTCMonth());
	        this.date(date.getUTCDate());
	        return this;
	    }
	
	    // FORMATTING
	
	    addFormatToken('Q', 0, 'Qo', 'quarter');
	
	    // ALIASES
	
	    addUnitAlias('quarter', 'Q');
	
	    // PARSING
	
	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });
	
	    // MOMENTS
	
	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }
	
	    // FORMATTING
	
	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');
	
	    // ALIASES
	
	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');
	
	    // PARSING
	
	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);
	
	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });
	
	    // HELPERS
	
	    // LOCALES
	
	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }
	
	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };
	
	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }
	
	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }
	
	    // MOMENTS
	
	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }
	
	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }
	
	    // FORMATTING
	
	    addFormatToken('D', ['DD', 2], 'Do', 'date');
	
	    // ALIASES
	
	    addUnitAlias('date', 'D');
	
	    // PARSING
	
	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });
	
	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });
	
	    // MOMENTS
	
	    var getSetDayOfMonth = makeGetSet('Date', true);
	
	    // FORMATTING
	
	    addFormatToken('d', 0, 'do', 'day');
	
	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });
	
	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });
	
	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });
	
	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');
	
	    // ALIASES
	
	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');
	
	    // PARSING
	
	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   matchWord);
	    addRegexToken('ddd',  matchWord);
	    addRegexToken('dddd', matchWord);
	
	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	        var weekday = config._locale.weekdaysParse(input, token, config._strict);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });
	
	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });
	
	    // HELPERS
	
	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }
	
	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }
	
	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }
	
	        return null;
	    }
	
	    // LOCALES
	
	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m, format) {
	        return isArray(this._weekdays) ? this._weekdays[m.day()] :
	            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	    }
	
	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return this._weekdaysShort[m.day()];
	    }
	
	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return this._weekdaysMin[m.day()];
	    }
	
	    function localeWeekdaysParse (weekdayName, format, strict) {
	        var i, mom, regex;
	
	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._minWeekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._fullWeekdaysParse = [];
	        }
	
	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	
	            mom = local__createLocal([2000, 1]).day(i);
	            if (strict && !this._fullWeekdaysParse[i]) {
	                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	            }
	            if (!this._weekdaysParse[i]) {
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }
	
	    // MOMENTS
	
	    function getSetDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }
	
	    function getSetLocaleDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }
	
	    function getSetISODayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.
	        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
	    }
	
	    // FORMATTING
	
	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
	
	    // ALIASES
	
	    addUnitAlias('dayOfYear', 'DDD');
	
	    // PARSING
	
	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });
	
	    // HELPERS
	
	    // MOMENTS
	
	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }
	
	    // FORMATTING
	
	    function hFormat() {
	        return this.hours() % 12 || 12;
	    }
	
	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, hFormat);
	
	    addFormatToken('hmm', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	    });
	
	    addFormatToken('hmmss', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });
	
	    addFormatToken('Hmm', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2);
	    });
	
	    addFormatToken('Hmmss', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });
	
	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }
	
	    meridiem('a', true);
	    meridiem('A', false);
	
	    // ALIASES
	
	    addUnitAlias('hour', 'h');
	
	    // PARSING
	
	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }
	
	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);
	
	    addRegexToken('hmm', match3to4);
	    addRegexToken('hmmss', match5to6);
	    addRegexToken('Hmm', match3to4);
	    addRegexToken('Hmmss', match5to6);
	
	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('Hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	    });
	    addParseToken('Hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	    });
	
	    // LOCALES
	
	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }
	
	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }
	
	
	    // MOMENTS
	
	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);
	
	    // FORMATTING
	
	    addFormatToken('m', ['mm', 2], 0, 'minute');
	
	    // ALIASES
	
	    addUnitAlias('minute', 'm');
	
	    // PARSING
	
	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);
	
	    // MOMENTS
	
	    var getSetMinute = makeGetSet('Minutes', false);
	
	    // FORMATTING
	
	    addFormatToken('s', ['ss', 2], 0, 'second');
	
	    // ALIASES
	
	    addUnitAlias('second', 's');
	
	    // PARSING
	
	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);
	
	    // MOMENTS
	
	    var getSetSecond = makeGetSet('Seconds', false);
	
	    // FORMATTING
	
	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });
	
	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });
	
	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });
	
	
	    // ALIASES
	
	    addUnitAlias('millisecond', 'ms');
	
	    // PARSING
	
	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);
	
	    var token;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }
	
	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }
	
	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }
	    // MOMENTS
	
	    var getSetMillisecond = makeGetSet('Milliseconds', false);
	
	    // FORMATTING
	
	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');
	
	    // MOMENTS
	
	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }
	
	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }
	
	    var momentPrototype__proto = Moment.prototype;
	
	    momentPrototype__proto.add               = add_subtract__add;
	    momentPrototype__proto.calendar          = moment_calendar__calendar;
	    momentPrototype__proto.clone             = clone;
	    momentPrototype__proto.diff              = diff;
	    momentPrototype__proto.endOf             = endOf;
	    momentPrototype__proto.format            = format;
	    momentPrototype__proto.from              = from;
	    momentPrototype__proto.fromNow           = fromNow;
	    momentPrototype__proto.to                = to;
	    momentPrototype__proto.toNow             = toNow;
	    momentPrototype__proto.get               = getSet;
	    momentPrototype__proto.invalidAt         = invalidAt;
	    momentPrototype__proto.isAfter           = isAfter;
	    momentPrototype__proto.isBefore          = isBefore;
	    momentPrototype__proto.isBetween         = isBetween;
	    momentPrototype__proto.isSame            = isSame;
	    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
	    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
	    momentPrototype__proto.isValid           = moment_valid__isValid;
	    momentPrototype__proto.lang              = lang;
	    momentPrototype__proto.locale            = locale;
	    momentPrototype__proto.localeData        = localeData;
	    momentPrototype__proto.max               = prototypeMax;
	    momentPrototype__proto.min               = prototypeMin;
	    momentPrototype__proto.parsingFlags      = parsingFlags;
	    momentPrototype__proto.set               = getSet;
	    momentPrototype__proto.startOf           = startOf;
	    momentPrototype__proto.subtract          = add_subtract__subtract;
	    momentPrototype__proto.toArray           = toArray;
	    momentPrototype__proto.toObject          = toObject;
	    momentPrototype__proto.toDate            = toDate;
	    momentPrototype__proto.toISOString       = moment_format__toISOString;
	    momentPrototype__proto.toJSON            = toJSON;
	    momentPrototype__proto.toString          = toString;
	    momentPrototype__proto.unix              = unix;
	    momentPrototype__proto.valueOf           = to_type__valueOf;
	    momentPrototype__proto.creationData      = creationData;
	
	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;
	
	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;
	
	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;
	
	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;
	
	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;
	
	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;
	
	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;
	
	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;
	
	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;
	
	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;
	
	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;
	
	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;
	
	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);
	
	    var momentPrototype = momentPrototype__proto;
	
	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }
	
	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }
	
	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };
	
	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key];
	        return isFunction(output) ? output.call(mom, now) : output;
	    }
	
	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    };
	
	    function longDateFormat (key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];
	
	        if (format || !formatUpper) {
	            return format;
	        }
	
	        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	            return val.slice(1);
	        });
	
	        return this._longDateFormat[key];
	    }
	
	    var defaultInvalidDate = 'Invalid date';
	
	    function invalidDate () {
	        return this._invalidDate;
	    }
	
	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;
	
	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }
	
	    function preParsePostFormat (string) {
	        return string;
	    }
	
	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };
	
	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (isFunction(output)) ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }
	
	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	    }
	
	    var prototype__proto = Locale.prototype;
	
	    prototype__proto._calendar       = defaultCalendar;
	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto._longDateFormat = defaultLongDateFormat;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto._invalidDate    = defaultInvalidDate;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto._ordinal        = defaultOrdinal;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto._ordinalParse   = defaultOrdinalParse;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto._relativeTime   = defaultRelativeTime;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;
	
	    // Month
	    prototype__proto.months            =        localeMonths;
	    prototype__proto._months           = defaultLocaleMonths;
	    prototype__proto.monthsShort       =        localeMonthsShort;
	    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
	    prototype__proto.monthsParse       =        localeMonthsParse;
	    prototype__proto._monthsRegex      = defaultMonthsRegex;
	    prototype__proto.monthsRegex       = monthsRegex;
	    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
	    prototype__proto.monthsShortRegex  = monthsShortRegex;
	
	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto._week = defaultLocaleWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;
	
	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto._weekdays      = defaultLocaleWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;
	
	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
	    prototype__proto.meridiem = localeMeridiem;
	
	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }
	
	    function list (format, index, field, count, setter) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }
	
	        format = format || '';
	
	        if (index != null) {
	            return lists__get(format, index, field, setter);
	        }
	
	        var i;
	        var out = [];
	        for (i = 0; i < count; i++) {
	            out[i] = lists__get(format, i, field, setter);
	        }
	        return out;
	    }
	
	    function lists__listMonths (format, index) {
	        return list(format, index, 'months', 12, 'month');
	    }
	
	    function lists__listMonthsShort (format, index) {
	        return list(format, index, 'monthsShort', 12, 'month');
	    }
	
	    function lists__listWeekdays (format, index) {
	        return list(format, index, 'weekdays', 7, 'day');
	    }
	
	    function lists__listWeekdaysShort (format, index) {
	        return list(format, index, 'weekdaysShort', 7, 'day');
	    }
	
	    function lists__listWeekdaysMin (format, index) {
	        return list(format, index, 'weekdaysMin', 7, 'day');
	    }
	
	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });
	
	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);
	
	    var mathAbs = Math.abs;
	
	    function duration_abs__abs () {
	        var data           = this._data;
	
	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);
	
	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);
	
	        return this;
	    }
	
	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);
	
	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;
	
	        return duration._bubble();
	    }
	
	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }
	
	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }
	
	    function absCeil (number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }
	
	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years, monthsFromDays;
	
	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0))) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }
	
	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;
	
	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;
	
	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;
	
	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;
	
	        days += absFloor(hours / 24);
	
	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));
	
	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;
	
	        data.days   = days;
	        data.months = months;
	        data.years  = years;
	
	        return this;
	    }
	
	    function daysToMonths (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return days * 4800 / 146097;
	    }
	
	    function monthsToDays (months) {
	        // the reverse of daysToMonths
	        return months * 146097 / 4800;
	    }
	
	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;
	
	        units = normalizeUnits(units);
	
	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week'   : return days / 7     + milliseconds / 6048e5;
	                case 'day'    : return days         + milliseconds / 864e5;
	                case 'hour'   : return days * 24    + milliseconds / 36e5;
	                case 'minute' : return days * 1440  + milliseconds / 6e4;
	                case 'second' : return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }
	
	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }
	
	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }
	
	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');
	
	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }
	
	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }
	
	    var milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');
	
	    function weeks () {
	        return absFloor(this.days() / 7);
	    }
	
	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };
	
	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }
	
	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));
	
	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes <= 1           && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   <= 1           && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    <= 1           && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  <= 1           && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   <= 1           && ['y']           || ['yy', years];
	
	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }
	
	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }
	
	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);
	
	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }
	
	        return locale.postformat(output);
	    }
	
	    var iso_string__abs = Math.abs;
	
	    function iso_string__toISOString() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        var seconds = iso_string__abs(this._milliseconds) / 1000;
	        var days         = iso_string__abs(this._days);
	        var months       = iso_string__abs(this._months);
	        var minutes, hours, years;
	
	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes           = absFloor(seconds / 60);
	        hours             = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;
	
	        // 12 months -> 1 year
	        years  = absFloor(months / 12);
	        months %= 12;
	
	
	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = years;
	        var M = months;
	        var D = days;
	        var h = hours;
	        var m = minutes;
	        var s = seconds;
	        var total = this.asSeconds();
	
	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }
	
	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }
	
	    var duration_prototype__proto = Duration.prototype;
	
	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;
	
	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;
	
	    // Side effect imports
	
	    // FORMATTING
	
	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');
	
	    // PARSING
	
	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });
	
	    // Side effect imports
	
	
	    utils_hooks__hooks.version = '2.12.0';
	
	    setHookCallback(local__createLocal);
	
	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.now                   = now;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.updateLocale          = updateLocale;
	    utils_hooks__hooks.locales               = locale_locales__listLocales;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
	    utils_hooks__hooks.prototype             = momentPrototype;
	
	    var _moment = utils_hooks__hooks;
	
	    return _moment;
	
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)(module)))

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 15,
		"./af.js": 15,
		"./ar": 16,
		"./ar-ma": 17,
		"./ar-ma.js": 17,
		"./ar-sa": 18,
		"./ar-sa.js": 18,
		"./ar-tn": 19,
		"./ar-tn.js": 19,
		"./ar.js": 16,
		"./az": 20,
		"./az.js": 20,
		"./be": 21,
		"./be.js": 21,
		"./bg": 22,
		"./bg.js": 22,
		"./bn": 23,
		"./bn.js": 23,
		"./bo": 24,
		"./bo.js": 24,
		"./br": 25,
		"./br.js": 25,
		"./bs": 26,
		"./bs.js": 26,
		"./ca": 27,
		"./ca.js": 27,
		"./cs": 28,
		"./cs.js": 28,
		"./cv": 29,
		"./cv.js": 29,
		"./cy": 30,
		"./cy.js": 30,
		"./da": 31,
		"./da.js": 31,
		"./de": 32,
		"./de-at": 33,
		"./de-at.js": 33,
		"./de.js": 32,
		"./dv": 34,
		"./dv.js": 34,
		"./el": 35,
		"./el.js": 35,
		"./en-au": 36,
		"./en-au.js": 36,
		"./en-ca": 37,
		"./en-ca.js": 37,
		"./en-gb": 38,
		"./en-gb.js": 38,
		"./en-ie": 39,
		"./en-ie.js": 39,
		"./en-nz": 40,
		"./en-nz.js": 40,
		"./eo": 41,
		"./eo.js": 41,
		"./es": 42,
		"./es.js": 42,
		"./et": 43,
		"./et.js": 43,
		"./eu": 44,
		"./eu.js": 44,
		"./fa": 45,
		"./fa.js": 45,
		"./fi": 46,
		"./fi.js": 46,
		"./fo": 47,
		"./fo.js": 47,
		"./fr": 48,
		"./fr-ca": 49,
		"./fr-ca.js": 49,
		"./fr-ch": 50,
		"./fr-ch.js": 50,
		"./fr.js": 48,
		"./fy": 51,
		"./fy.js": 51,
		"./gd": 52,
		"./gd.js": 52,
		"./gl": 53,
		"./gl.js": 53,
		"./he": 54,
		"./he.js": 54,
		"./hi": 55,
		"./hi.js": 55,
		"./hr": 56,
		"./hr.js": 56,
		"./hu": 57,
		"./hu.js": 57,
		"./hy-am": 58,
		"./hy-am.js": 58,
		"./id": 59,
		"./id.js": 59,
		"./is": 60,
		"./is.js": 60,
		"./it": 61,
		"./it.js": 61,
		"./ja": 62,
		"./ja.js": 62,
		"./jv": 63,
		"./jv.js": 63,
		"./ka": 64,
		"./ka.js": 64,
		"./kk": 65,
		"./kk.js": 65,
		"./km": 66,
		"./km.js": 66,
		"./ko": 67,
		"./ko.js": 67,
		"./lb": 68,
		"./lb.js": 68,
		"./lo": 69,
		"./lo.js": 69,
		"./lt": 70,
		"./lt.js": 70,
		"./lv": 71,
		"./lv.js": 71,
		"./me": 72,
		"./me.js": 72,
		"./mk": 73,
		"./mk.js": 73,
		"./ml": 74,
		"./ml.js": 74,
		"./mr": 75,
		"./mr.js": 75,
		"./ms": 76,
		"./ms-my": 77,
		"./ms-my.js": 77,
		"./ms.js": 76,
		"./my": 78,
		"./my.js": 78,
		"./nb": 79,
		"./nb.js": 79,
		"./ne": 80,
		"./ne.js": 80,
		"./nl": 81,
		"./nl.js": 81,
		"./nn": 82,
		"./nn.js": 82,
		"./pa-in": 83,
		"./pa-in.js": 83,
		"./pl": 84,
		"./pl.js": 84,
		"./pt": 85,
		"./pt-br": 86,
		"./pt-br.js": 86,
		"./pt.js": 85,
		"./ro": 87,
		"./ro.js": 87,
		"./ru": 88,
		"./ru.js": 88,
		"./se": 89,
		"./se.js": 89,
		"./si": 90,
		"./si.js": 90,
		"./sk": 91,
		"./sk.js": 91,
		"./sl": 92,
		"./sl.js": 92,
		"./sq": 93,
		"./sq.js": 93,
		"./sr": 94,
		"./sr-cyrl": 95,
		"./sr-cyrl.js": 95,
		"./sr.js": 94,
		"./sv": 96,
		"./sv.js": 96,
		"./sw": 97,
		"./sw.js": 97,
		"./ta": 98,
		"./ta.js": 98,
		"./te": 99,
		"./te.js": 99,
		"./th": 100,
		"./th.js": 100,
		"./tl-ph": 101,
		"./tl-ph.js": 101,
		"./tlh": 102,
		"./tlh.js": 102,
		"./tr": 103,
		"./tr.js": 103,
		"./tzl": 104,
		"./tzl.js": 104,
		"./tzm": 105,
		"./tzm-latn": 106,
		"./tzm-latn.js": 106,
		"./tzm.js": 105,
		"./uk": 107,
		"./uk.js": 107,
		"./uz": 108,
		"./uz.js": 108,
		"./vi": 109,
		"./vi.js": 109,
		"./zh-cn": 110,
		"./zh-cn.js": 110,
		"./zh-tw": 111,
		"./zh-tw.js": 111
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 14;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : afrikaans (af)
	//! author : Werner Mollentze : https://github.com/wernerm
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var af = moment.defineLocale('af', {
	        months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
	        weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
	        weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
	        meridiemParse: /vm|nm/i,
	        isPM : function (input) {
	            return /^nm$/i.test(input);
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower ? 'vm' : 'VM';
	            } else {
	                return isLower ? 'nm' : 'NM';
	            }
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Vandag om] LT',
	            nextDay : '[Môre om] LT',
	            nextWeek : 'dddd [om] LT',
	            lastDay : '[Gister om] LT',
	            lastWeek : '[Laas] dddd [om] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'oor %s',
	            past : '%s gelede',
	            s : '\'n paar sekondes',
	            m : '\'n minuut',
	            mm : '%d minute',
	            h : '\'n uur',
	            hh : '%d ure',
	            d : '\'n dag',
	            dd : '%d dae',
	            M : '\'n maand',
	            MM : '%d maande',
	            y : '\'n jaar',
	            yy : '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
	        },
	        week : {
	            dow : 1, // Maandag is die eerste dag van die week.
	            doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
	        }
	    });
	
	    return af;
	
	}));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! Locale: Arabic (ar)
	//! Author: Abdel Said: https://github.com/abdelsaid
	//! Changes in months, weekdays: Ahmed Elkhatib
	//! Native plural forms: forabi https://github.com/forabi
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    }, numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    }, pluralForm = function (n) {
	        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
	    }, plurals = {
	        s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
	        m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
	        h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
	        d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
	        M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
	        y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
	    }, pluralize = function (u) {
	        return function (number, withoutSuffix, string, isFuture) {
	            var f = pluralForm(number),
	                str = plurals[u][pluralForm(number)];
	            if (f === 2) {
	                str = str[withoutSuffix ? 0 : 1];
	            }
	            return str.replace(/%d/i, number);
	        };
	    }, months = [
	        'كانون الثاني يناير',
	        'شباط فبراير',
	        'آذار مارس',
	        'نيسان أبريل',
	        'أيار مايو',
	        'حزيران يونيو',
	        'تموز يوليو',
	        'آب أغسطس',
	        'أيلول سبتمبر',
	        'تشرين الأول أكتوبر',
	        'تشرين الثاني نوفمبر',
	        'كانون الأول ديسمبر'
	    ];
	
	    var ar = moment.defineLocale('ar', {
	        months : months,
	        monthsShort : months,
	        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'D/\u200FM/\u200FYYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ص|م/,
	        isPM : function (input) {
	            return 'م' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar : {
	            sameDay: '[اليوم عند الساعة] LT',
	            nextDay: '[غدًا عند الساعة] LT',
	            nextWeek: 'dddd [عند الساعة] LT',
	            lastDay: '[أمس عند الساعة] LT',
	            lastWeek: 'dddd [عند الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'بعد %s',
	            past : 'منذ %s',
	            s : pluralize('s'),
	            m : pluralize('m'),
	            mm : pluralize('m'),
	            h : pluralize('h'),
	            hh : pluralize('h'),
	            d : pluralize('d'),
	            dd : pluralize('d'),
	            M : pluralize('M'),
	            MM : pluralize('M'),
	            y : pluralize('y'),
	            yy : pluralize('y')
	        },
	        preparse: function (string) {
	            return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ar;
	
	}));

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Moroccan Arabic (ar-ma)
	//! author : ElFadili Yassine : https://github.com/ElFadiliY
	//! author : Abdel Said : https://github.com/abdelsaid
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ar_ma = moment.defineLocale('ar-ma', {
	        months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'في %s',
	            past : 'منذ %s',
	            s : 'ثوان',
	            m : 'دقيقة',
	            mm : '%d دقائق',
	            h : 'ساعة',
	            hh : '%d ساعات',
	            d : 'يوم',
	            dd : '%d أيام',
	            M : 'شهر',
	            MM : '%d أشهر',
	            y : 'سنة',
	            yy : '%d سنوات'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ar_ma;
	
	}));

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic Saudi Arabia (ar-sa)
	//! author : Suhail Alkowaileet : https://github.com/xsoh
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    }, numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    };
	
	    var ar_sa = moment.defineLocale('ar-sa', {
	        months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ص|م/,
	        isPM : function (input) {
	            return 'م' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar : {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'في %s',
	            past : 'منذ %s',
	            s : 'ثوان',
	            m : 'دقيقة',
	            mm : '%d دقائق',
	            h : 'ساعة',
	            hh : '%d ساعات',
	            d : 'يوم',
	            dd : '%d أيام',
	            M : 'شهر',
	            MM : '%d أشهر',
	            y : 'سنة',
	            yy : '%d سنوات'
	        },
	        preparse: function (string) {
	            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ar_sa;
	
	}));

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale  : Tunisian Arabic (ar-tn)
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ar_tn = moment.defineLocale('ar-tn', {
	        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'في %s',
	            past: 'منذ %s',
	            s: 'ثوان',
	            m: 'دقيقة',
	            mm: '%d دقائق',
	            h: 'ساعة',
	            hh: '%d ساعات',
	            d: 'يوم',
	            dd: '%d أيام',
	            M: 'شهر',
	            MM: '%d أشهر',
	            y: 'سنة',
	            yy: '%d سنوات'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return ar_tn;
	
	}));

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : azerbaijani (az)
	//! author : topchiyev : https://github.com/topchiyev
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var suffixes = {
	        1: '-inci',
	        5: '-inci',
	        8: '-inci',
	        70: '-inci',
	        80: '-inci',
	        2: '-nci',
	        7: '-nci',
	        20: '-nci',
	        50: '-nci',
	        3: '-üncü',
	        4: '-üncü',
	        100: '-üncü',
	        6: '-ncı',
	        9: '-uncu',
	        10: '-uncu',
	        30: '-uncu',
	        60: '-ıncı',
	        90: '-ıncı'
	    };
	
	    var az = moment.defineLocale('az', {
	        months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
	        monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
	        weekdays : 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
	        weekdaysShort : 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
	        weekdaysMin : 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[bugün saat] LT',
	            nextDay : '[sabah saat] LT',
	            nextWeek : '[gələn həftə] dddd [saat] LT',
	            lastDay : '[dünən] LT',
	            lastWeek : '[keçən həftə] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s sonra',
	            past : '%s əvvəl',
	            s : 'birneçə saniyyə',
	            m : 'bir dəqiqə',
	            mm : '%d dəqiqə',
	            h : 'bir saat',
	            hh : '%d saat',
	            d : 'bir gün',
	            dd : '%d gün',
	            M : 'bir ay',
	            MM : '%d ay',
	            y : 'bir il',
	            yy : '%d il'
	        },
	        meridiemParse: /gecə|səhər|gündüz|axşam/,
	        isPM : function (input) {
	            return /^(gündüz|axşam)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'gecə';
	            } else if (hour < 12) {
	                return 'səhər';
	            } else if (hour < 17) {
	                return 'gündüz';
	            } else {
	                return 'axşam';
	            }
	        },
	        ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
	        ordinal : function (number) {
	            if (number === 0) {  // special case for zero
	                return number + '-ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return az;
	
	}));

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : belarusian (be)
	//! author : Dmitry Demidov : https://github.com/demidov91
	//! author: Praleska: http://praleska.pro/
	//! Author : Menelion Elensúle : https://github.com/Oire
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
	            'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
	            'dd': 'дзень_дні_дзён',
	            'MM': 'месяц_месяцы_месяцаў',
	            'yy': 'год_гады_гадоў'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвіліна' : 'хвіліну';
	        }
	        else if (key === 'h') {
	            return withoutSuffix ? 'гадзіна' : 'гадзіну';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	
	    var be = moment.defineLocale('be', {
	        months : {
	            format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
	            standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
	        },
	        monthsShort : 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
	        weekdays : {
	            format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
	            standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
	            isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
	        },
	        weekdaysShort : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        weekdaysMin : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY г.',
	            LLL : 'D MMMM YYYY г., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	        },
	        calendar : {
	            sameDay: '[Сёння ў] LT',
	            nextDay: '[Заўтра ў] LT',
	            lastDay: '[Учора ў] LT',
	            nextWeek: function () {
	                return '[У] dddd [ў] LT';
	            },
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return '[У мінулую] dddd [ў] LT';
	                case 1:
	                case 2:
	                case 4:
	                    return '[У мінулы] dddd [ў] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'праз %s',
	            past : '%s таму',
	            s : 'некалькі секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : relativeTimeWithPlural,
	            hh : relativeTimeWithPlural,
	            d : 'дзень',
	            dd : relativeTimeWithPlural,
	            M : 'месяц',
	            MM : relativeTimeWithPlural,
	            y : 'год',
	            yy : relativeTimeWithPlural
	        },
	        meridiemParse: /ночы|раніцы|дня|вечара/,
	        isPM : function (input) {
	            return /^(дня|вечара)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночы';
	            } else if (hour < 12) {
	                return 'раніцы';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечара';
	            }
	        },
	        ordinalParse: /\d{1,2}-(і|ы|га)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + '-і' : number + '-ы';
	            case 'D':
	                return number + '-га';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return be;
	
	}));

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : bulgarian (bg)
	//! author : Krasen Borisov : https://github.com/kraz
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var bg = moment.defineLocale('bg', {
	        months : 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort : 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays : 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
	        weekdaysShort : 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
	        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'D.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : '[Днес в] LT',
	            nextDay : '[Утре в] LT',
	            nextWeek : 'dddd [в] LT',
	            lastDay : '[Вчера в] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[В изминалата] dddd [в] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[В изминалия] dddd [в] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'след %s',
	            past : 'преди %s',
	            s : 'няколко секунди',
	            m : 'минута',
	            mm : '%d минути',
	            h : 'час',
	            hh : '%d часа',
	            d : 'ден',
	            dd : '%d дни',
	            M : 'месец',
	            MM : '%d месеца',
	            y : 'година',
	            yy : '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal : function (number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return bg;
	
	}));

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bengali (bn)
	//! author : Kaushik Gandhi : https://github.com/kaushikgandhi
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '১',
	        '2': '২',
	        '3': '৩',
	        '4': '৪',
	        '5': '৫',
	        '6': '৬',
	        '7': '৭',
	        '8': '৮',
	        '9': '৯',
	        '0': '০'
	    },
	    numberMap = {
	        '১': '1',
	        '২': '2',
	        '৩': '3',
	        '৪': '4',
	        '৫': '5',
	        '৬': '6',
	        '৭': '7',
	        '৮': '8',
	        '৯': '9',
	        '০': '0'
	    };
	
	    var bn = moment.defineLocale('bn', {
	        months : 'জানুয়ারী_ফেবুয়ারী_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
	        monthsShort : 'জানু_ফেব_মার্চ_এপর_মে_জুন_জুল_অগ_সেপ্ট_অক্টো_নভ_ডিসেম্'.split('_'),
	        weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পত্তিবার_শুক্রবার_শনিবার'.split('_'),
	        weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পত্তি_শুক্র_শনি'.split('_'),
	        weekdaysMin : 'রব_সম_মঙ্গ_বু_ব্রিহ_শু_শনি'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm সময়',
	            LTS : 'A h:mm:ss সময়',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm সময়',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm সময়'
	        },
	        calendar : {
	            sameDay : '[আজ] LT',
	            nextDay : '[আগামীকাল] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[গতকাল] LT',
	            lastWeek : '[গত] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s পরে',
	            past : '%s আগে',
	            s : 'কয়েক সেকেন্ড',
	            m : 'এক মিনিট',
	            mm : '%d মিনিট',
	            h : 'এক ঘন্টা',
	            hh : '%d ঘন্টা',
	            d : 'এক দিন',
	            dd : '%d দিন',
	            M : 'এক মাস',
	            MM : '%d মাস',
	            y : 'এক বছর',
	            yy : '%d বছর'
	        },
	        preparse: function (string) {
	            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'রাত' && hour >= 4) ||
	                    (meridiem === 'দুপুর' && hour < 5) ||
	                    meridiem === 'বিকাল') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'রাত';
	            } else if (hour < 10) {
	                return 'সকাল';
	            } else if (hour < 17) {
	                return 'দুপুর';
	            } else if (hour < 20) {
	                return 'বিকাল';
	            } else {
	                return 'রাত';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return bn;
	
	}));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : tibetan (bo)
	//! author : Thupten N. Chakrishar : https://github.com/vajradog
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '༡',
	        '2': '༢',
	        '3': '༣',
	        '4': '༤',
	        '5': '༥',
	        '6': '༦',
	        '7': '༧',
	        '8': '༨',
	        '9': '༩',
	        '0': '༠'
	    },
	    numberMap = {
	        '༡': '1',
	        '༢': '2',
	        '༣': '3',
	        '༤': '4',
	        '༥': '5',
	        '༦': '6',
	        '༧': '7',
	        '༨': '8',
	        '༩': '9',
	        '༠': '0'
	    };
	
	    var bo = moment.defineLocale('bo', {
	        months : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        monthsShort : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        weekdays : 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
	        weekdaysShort : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        weekdaysMin : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm',
	            LTS : 'A h:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm'
	        },
	        calendar : {
	            sameDay : '[དི་རིང] LT',
	            nextDay : '[སང་ཉིན] LT',
	            nextWeek : '[བདུན་ཕྲག་རྗེས་མ], LT',
	            lastDay : '[ཁ་སང] LT',
	            lastWeek : '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ལ་',
	            past : '%s སྔན་ལ',
	            s : 'ལམ་སང',
	            m : 'སྐར་མ་གཅིག',
	            mm : '%d སྐར་མ',
	            h : 'ཆུ་ཚོད་གཅིག',
	            hh : '%d ཆུ་ཚོད',
	            d : 'ཉིན་གཅིག',
	            dd : '%d ཉིན་',
	            M : 'ཟླ་བ་གཅིག',
	            MM : '%d ཟླ་བ',
	            y : 'ལོ་གཅིག',
	            yy : '%d ལོ'
	        },
	        preparse: function (string) {
	            return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'མཚན་མོ' && hour >= 4) ||
	                    (meridiem === 'ཉིན་གུང' && hour < 5) ||
	                    meridiem === 'དགོང་དག') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'མཚན་མོ';
	            } else if (hour < 10) {
	                return 'ཞོགས་ཀས';
	            } else if (hour < 17) {
	                return 'ཉིན་གུང';
	            } else if (hour < 20) {
	                return 'དགོང་དག';
	            } else {
	                return 'མཚན་མོ';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return bo;
	
	}));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : breton (br)
	//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function relativeTimeWithMutation(number, withoutSuffix, key) {
	        var format = {
	            'mm': 'munutenn',
	            'MM': 'miz',
	            'dd': 'devezh'
	        };
	        return number + ' ' + mutation(format[key], number);
	    }
	    function specialMutationForYears(number) {
	        switch (lastNumber(number)) {
	        case 1:
	        case 3:
	        case 4:
	        case 5:
	        case 9:
	            return number + ' bloaz';
	        default:
	            return number + ' vloaz';
	        }
	    }
	    function lastNumber(number) {
	        if (number > 9) {
	            return lastNumber(number % 10);
	        }
	        return number;
	    }
	    function mutation(text, number) {
	        if (number === 2) {
	            return softMutation(text);
	        }
	        return text;
	    }
	    function softMutation(text) {
	        var mutationTable = {
	            'm': 'v',
	            'b': 'v',
	            'd': 'z'
	        };
	        if (mutationTable[text.charAt(0)] === undefined) {
	            return text;
	        }
	        return mutationTable[text.charAt(0)] + text.substring(1);
	    }
	
	    var br = moment.defineLocale('br', {
	        months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
	        monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
	        weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
	        weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
	        weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h[e]mm A',
	            LTS : 'h[e]mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D [a viz] MMMM YYYY',
	            LLL : 'D [a viz] MMMM YYYY h[e]mm A',
	            LLLL : 'dddd, D [a viz] MMMM YYYY h[e]mm A'
	        },
	        calendar : {
	            sameDay : '[Hiziv da] LT',
	            nextDay : '[Warc\'hoazh da] LT',
	            nextWeek : 'dddd [da] LT',
	            lastDay : '[Dec\'h da] LT',
	            lastWeek : 'dddd [paset da] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'a-benn %s',
	            past : '%s \'zo',
	            s : 'un nebeud segondennoù',
	            m : 'ur vunutenn',
	            mm : relativeTimeWithMutation,
	            h : 'un eur',
	            hh : '%d eur',
	            d : 'un devezh',
	            dd : relativeTimeWithMutation,
	            M : 'ur miz',
	            MM : relativeTimeWithMutation,
	            y : 'ur bloaz',
	            yy : specialMutationForYears
	        },
	        ordinalParse: /\d{1,2}(añ|vet)/,
	        ordinal : function (number) {
	            var output = (number === 1) ? 'añ' : 'vet';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return br;
	
	}));

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : bosnian (bs)
	//! author : Nedim Cholich : https://github.com/frontyard
	//! based on (hr) translation by Bojan Marković
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	        }
	    }
	
	    var bs = moment.defineLocale('bs', {
	        months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danas u] LT',
	            nextDay  : '[sutra u] LT',
	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[jučer u] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'par sekundi',
	            m      : translate,
	            mm     : translate,
	            h      : translate,
	            hh     : translate,
	            d      : 'dan',
	            dd     : translate,
	            M      : 'mjesec',
	            MM     : translate,
	            y      : 'godinu',
	            yy     : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return bs;
	
	}));

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : catalan (ca)
	//! author : Juan G. Hurtado : https://github.com/juanghurtado
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ca = moment.defineLocale('ca', {
	        months : 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
	        monthsShort : 'gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.'.split('_'),
	        weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
	        weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
	        weekdaysMin : 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            nextDay : function () {
	                return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            lastDay : function () {
	                return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            lastWeek : function () {
	                return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'en %s',
	            past : 'fa %s',
	            s : 'uns segons',
	            m : 'un minut',
	            mm : '%d minuts',
	            h : 'una hora',
	            hh : '%d hores',
	            d : 'un dia',
	            dd : '%d dies',
	            M : 'un mes',
	            MM : '%d mesos',
	            y : 'un any',
	            yy : '%d anys'
	        },
	        ordinalParse: /\d{1,2}(r|n|t|è|a)/,
	        ordinal : function (number, period) {
	            var output = (number === 1) ? 'r' :
	                (number === 2) ? 'n' :
	                (number === 3) ? 'r' :
	                (number === 4) ? 't' : 'è';
	            if (period === 'w' || period === 'W') {
	                output = 'a';
	            }
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return ca;
	
	}));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : czech (cs)
	//! author : petrbela : https://github.com/petrbela
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_'),
	        monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
	    function plural(n) {
	        return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minuty' : 'minut');
	            } else {
	                return result + 'minutami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodin');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'den' : 'dnem';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dny' : 'dní');
	            } else {
	                return result + 'dny';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'měsíce' : 'měsíců');
	            } else {
	                return result + 'měsíci';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'let');
	            } else {
	                return result + 'lety';
	            }
	            break;
	        }
	    }
	
	    var cs = moment.defineLocale('cs', {
	        months : months,
	        monthsShort : monthsShort,
	        monthsParse : (function (months, monthsShort) {
	            var i, _monthsParse = [];
	            for (i = 0; i < 12; i++) {
	                // use custom parser to solve problem with July (červenec)
	                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
	            }
	            return _monthsParse;
	        }(months, monthsShort)),
	        shortMonthsParse : (function (monthsShort) {
	            var i, _shortMonthsParse = [];
	            for (i = 0; i < 12; i++) {
	                _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
	            }
	            return _shortMonthsParse;
	        }(monthsShort)),
	        longMonthsParse : (function (months) {
	            var i, _longMonthsParse = [];
	            for (i = 0; i < 12; i++) {
	                _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
	            }
	            return _longMonthsParse;
	        }(months)),
	        weekdays : 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
	        weekdaysShort : 'ne_po_út_st_čt_pá_so'.split('_'),
	        weekdaysMin : 'ne_po_út_st_čt_pá_so'.split('_'),
	        longDateFormat : {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[dnes v] LT',
	            nextDay: '[zítra v] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v neděli v] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [v] LT';
	                case 3:
	                    return '[ve středu v] LT';
	                case 4:
	                    return '[ve čtvrtek v] LT';
	                case 5:
	                    return '[v pátek v] LT';
	                case 6:
	                    return '[v sobotu v] LT';
	                }
	            },
	            lastDay: '[včera v] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[minulou neděli v] LT';
	                case 1:
	                case 2:
	                    return '[minulé] dddd [v] LT';
	                case 3:
	                    return '[minulou středu v] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [v] LT';
	                case 6:
	                    return '[minulou sobotu v] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : 'před %s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse : /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return cs;
	
	}));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : chuvash (cv)
	//! author : Anatoly Mironov : https://github.com/mirontoli
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var cv = moment.defineLocale('cv', {
	        months : 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
	        monthsShort : 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
	        weekdays : 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
	        weekdaysShort : 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
	        weekdaysMin : 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
	            LLL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
	            LLLL : 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
	        },
	        calendar : {
	            sameDay: '[Паян] LT [сехетре]',
	            nextDay: '[Ыран] LT [сехетре]',
	            lastDay: '[Ӗнер] LT [сехетре]',
	            nextWeek: '[Ҫитес] dddd LT [сехетре]',
	            lastWeek: '[Иртнӗ] dddd LT [сехетре]',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : function (output) {
	                var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
	                return output + affix;
	            },
	            past : '%s каялла',
	            s : 'пӗр-ик ҫеккунт',
	            m : 'пӗр минут',
	            mm : '%d минут',
	            h : 'пӗр сехет',
	            hh : '%d сехет',
	            d : 'пӗр кун',
	            dd : '%d кун',
	            M : 'пӗр уйӑх',
	            MM : '%d уйӑх',
	            y : 'пӗр ҫул',
	            yy : '%d ҫул'
	        },
	        ordinalParse: /\d{1,2}-мӗш/,
	        ordinal : '%d-мӗш',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return cv;
	
	}));

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Welsh (cy)
	//! author : Robert Allen
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var cy = moment.defineLocale('cy', {
	        months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
	        monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
	        weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
	        weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
	        weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
	        // time formats are the same as en-gb
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Heddiw am] LT',
	            nextDay: '[Yfory am] LT',
	            nextWeek: 'dddd [am] LT',
	            lastDay: '[Ddoe am] LT',
	            lastWeek: 'dddd [diwethaf am] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'mewn %s',
	            past: '%s yn ôl',
	            s: 'ychydig eiliadau',
	            m: 'munud',
	            mm: '%d munud',
	            h: 'awr',
	            hh: '%d awr',
	            d: 'diwrnod',
	            dd: '%d diwrnod',
	            M: 'mis',
	            MM: '%d mis',
	            y: 'blwyddyn',
	            yy: '%d flynedd'
	        },
	        ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
	        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
	        ordinal: function (number) {
	            var b = number,
	                output = '',
	                lookup = [
	                    '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
	                    'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
	                ];
	            if (b > 20) {
	                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
	                    output = 'fed'; // not 30ain, 70ain or 90ain
	                } else {
	                    output = 'ain';
	                }
	            } else if (b > 0) {
	                output = lookup[b];
	            }
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return cy;
	
	}));

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : danish (da)
	//! author : Ulrik Nielsen : https://github.com/mrbase
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var da = moment.defineLocale('da', {
	        months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort : 'søn_man_tir_ons_tor_fre_lør'.split('_'),
	        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd [d.] D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[I dag kl.] LT',
	            nextDay : '[I morgen kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[I går kl.] LT',
	            lastWeek : '[sidste] dddd [kl] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : '%s siden',
	            s : 'få sekunder',
	            m : 'et minut',
	            mm : '%d minutter',
	            h : 'en time',
	            hh : '%d timer',
	            d : 'en dag',
	            dd : '%d dage',
	            M : 'en måned',
	            MM : '%d måneder',
	            y : 'et år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return da;
	
	}));

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : german (de)
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Mikolaj Dadela : https://github.com/mik01aj
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }
	
	    var de = moment.defineLocale('de', {
	        months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort : 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd, D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : 'vor %s',
	            s : 'ein paar Sekunden',
	            m : processRelativeTime,
	            mm : '%d Minuten',
	            h : processRelativeTime,
	            hh : '%d Stunden',
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return de;
	
	}));

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : austrian german (de-at)
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Martin Groller : https://github.com/MadMG
	//! author : Mikolaj Dadela : https://github.com/mik01aj
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }
	
	    var de_at = moment.defineLocale('de-at', {
	        months : 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort : 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd, D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : 'vor %s',
	            s : 'ein paar Sekunden',
	            m : processRelativeTime,
	            mm : '%d Minuten',
	            h : processRelativeTime,
	            hh : '%d Stunden',
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return de_at;
	
	}));

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : dhivehi (dv)
	//! author : Jawish Hameed : https://github.com/jawish
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var months = [
	        'ޖެނުއަރީ',
	        'ފެބްރުއަރީ',
	        'މާރިޗު',
	        'އޭޕްރީލު',
	        'މޭ',
	        'ޖޫން',
	        'ޖުލައި',
	        'އޯގަސްޓު',
	        'ސެޕްޓެމްބަރު',
	        'އޮކްޓޯބަރު',
	        'ނޮވެމްބަރު',
	        'ޑިސެމްބަރު'
	    ], weekdays = [
	        'އާދިއްތަ',
	        'ހޯމަ',
	        'އަންގާރަ',
	        'ބުދަ',
	        'ބުރާސްފަތި',
	        'ހުކުރު',
	        'ހޮނިހިރު'
	    ];
	
	    var dv = moment.defineLocale('dv', {
	        months : months,
	        monthsShort : months,
	        weekdays : weekdays,
	        weekdaysShort : weekdays,
	        weekdaysMin : 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
	        longDateFormat : {
	
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'D/M/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /މކ|މފ/,
	        isPM : function (input) {
	            return 'މފ' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'މކ';
	            } else {
	                return 'މފ';
	            }
	        },
	        calendar : {
	            sameDay : '[މިއަދު] LT',
	            nextDay : '[މާދަމާ] LT',
	            nextWeek : 'dddd LT',
	            lastDay : '[އިއްޔެ] LT',
	            lastWeek : '[ފާއިތުވި] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ތެރޭގައި %s',
	            past : 'ކުރިން %s',
	            s : 'ސިކުންތުކޮޅެއް',
	            m : 'މިނިޓެއް',
	            mm : 'މިނިޓު %d',
	            h : 'ގަޑިއިރެއް',
	            hh : 'ގަޑިއިރު %d',
	            d : 'ދުވަހެއް',
	            dd : 'ދުވަސް %d',
	            M : 'މަހެއް',
	            MM : 'މަސް %d',
	            y : 'އަހަރެއް',
	            yy : 'އަހަރު %d'
	        },
	        preparse: function (string) {
	            return string.replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/,/g, '،');
	        },
	        week : {
	            dow : 7,  // Sunday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return dv;
	
	}));

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : modern greek (el)
	//! author : Aggelos Karalias : https://github.com/mehiel
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }
	
	
	    var el = moment.defineLocale('el', {
	        monthsNominativeEl : 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
	        monthsGenitiveEl : 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
	        months : function (momentToFormat, format) {
	            if (/D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
	                return this._monthsGenitiveEl[momentToFormat.month()];
	            } else {
	                return this._monthsNominativeEl[momentToFormat.month()];
	            }
	        },
	        monthsShort : 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
	        weekdays : 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
	        weekdaysShort : 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
	        weekdaysMin : 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'μμ' : 'ΜΜ';
	            } else {
	                return isLower ? 'πμ' : 'ΠΜ';
	            }
	        },
	        isPM : function (input) {
	            return ((input + '').toLowerCase()[0] === 'μ');
	        },
	        meridiemParse : /[ΠΜ]\.?Μ?\.?/i,
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendarEl : {
	            sameDay : '[Σήμερα {}] LT',
	            nextDay : '[Αύριο {}] LT',
	            nextWeek : 'dddd [{}] LT',
	            lastDay : '[Χθες {}] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                    case 6:
	                        return '[το προηγούμενο] dddd [{}] LT';
	                    default:
	                        return '[την προηγούμενη] dddd [{}] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        calendar : function (key, mom) {
	            var output = this._calendarEl[key],
	                hours = mom && mom.hours();
	            if (isFunction(output)) {
	                output = output.apply(mom);
	            }
	            return output.replace('{}', (hours % 12 === 1 ? 'στη' : 'στις'));
	        },
	        relativeTime : {
	            future : 'σε %s',
	            past : '%s πριν',
	            s : 'λίγα δευτερόλεπτα',
	            m : 'ένα λεπτό',
	            mm : '%d λεπτά',
	            h : 'μία ώρα',
	            hh : '%d ώρες',
	            d : 'μία μέρα',
	            dd : '%d μέρες',
	            M : 'ένας μήνας',
	            MM : '%d μήνες',
	            y : 'ένας χρόνος',
	            yy : '%d χρόνια'
	        },
	        ordinalParse: /\d{1,2}η/,
	        ordinal: '%dη',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4st is the first week of the year.
	        }
	    });
	
	    return el;
	
	}));

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : australian english (en-au)
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var en_au = moment.defineLocale('en-au', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return en_au;
	
	}));

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : canadian english (en-ca)
	//! author : Jonathan Abourbih : https://github.com/jonbca
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var en_ca = moment.defineLocale('en-ca', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'YYYY-MM-DD',
	            LL : 'MMMM D, YYYY',
	            LLL : 'MMMM D, YYYY h:mm A',
	            LLLL : 'dddd, MMMM D, YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });
	
	    return en_ca;
	
	}));

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : great britain english (en-gb)
	//! author : Chris Gedrim : https://github.com/chrisgedrim
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var en_gb = moment.defineLocale('en-gb', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return en_gb;
	
	}));

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Irish english (en-ie)
	//! author : Chris Cartlidge : https://github.com/chriscartlidge
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var en_ie = moment.defineLocale('en-ie', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return en_ie;
	
	}));

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : New Zealand english (en-nz)
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var en_nz = moment.defineLocale('en-nz', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return en_nz;
	
	}));

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : esperanto (eo)
	//! author : Colin Dean : https://github.com/colindean
	//! komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
	//!          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var eo = moment.defineLocale('eo', {
	        months : 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
	        weekdays : 'Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato'.split('_'),
	        weekdaysShort : 'Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Ĵa_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D[-an de] MMMM, YYYY',
	            LLL : 'D[-an de] MMMM, YYYY HH:mm',
	            LLLL : 'dddd, [la] D[-an de] MMMM, YYYY HH:mm'
	        },
	        meridiemParse: /[ap]\.t\.m/i,
	        isPM: function (input) {
	            return input.charAt(0).toLowerCase() === 'p';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'p.t.m.' : 'P.T.M.';
	            } else {
	                return isLower ? 'a.t.m.' : 'A.T.M.';
	            }
	        },
	        calendar : {
	            sameDay : '[Hodiaŭ je] LT',
	            nextDay : '[Morgaŭ je] LT',
	            nextWeek : 'dddd [je] LT',
	            lastDay : '[Hieraŭ je] LT',
	            lastWeek : '[pasinta] dddd [je] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'je %s',
	            past : 'antaŭ %s',
	            s : 'sekundoj',
	            m : 'minuto',
	            mm : '%d minutoj',
	            h : 'horo',
	            hh : '%d horoj',
	            d : 'tago',//ne 'diurno', ĉar estas uzita por proksimumo
	            dd : '%d tagoj',
	            M : 'monato',
	            MM : '%d monatoj',
	            y : 'jaro',
	            yy : '%d jaroj'
	        },
	        ordinalParse: /\d{1,2}a/,
	        ordinal : '%da',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return eo;
	
	}));

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : spanish (es)
	//! author : Julio Napurí : https://github.com/julionc
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
	        monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
	
	    var es = moment.defineLocale('es', {
	        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShort[m.month()];
	            } else {
	                return monthsShortDot[m.month()];
	            }
	        },
	        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
	        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
	        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY H:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextDay : function () {
	                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastDay : function () {
	                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastWeek : function () {
	                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'en %s',
	            past : 'hace %s',
	            s : 'unos segundos',
	            m : 'un minuto',
	            mm : '%d minutos',
	            h : 'una hora',
	            hh : '%d horas',
	            d : 'un día',
	            dd : '%d días',
	            M : 'un mes',
	            MM : '%d meses',
	            y : 'un año',
	            yy : '%d años'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return es;
	
	}));

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : estonian (et)
	//! author : Henry Kehlmann : https://github.com/madhenry
	//! improvements : Illimar Tambek : https://github.com/ragulka
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
	            'm' : ['ühe minuti', 'üks minut'],
	            'mm': [number + ' minuti', number + ' minutit'],
	            'h' : ['ühe tunni', 'tund aega', 'üks tund'],
	            'hh': [number + ' tunni', number + ' tundi'],
	            'd' : ['ühe päeva', 'üks päev'],
	            'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
	            'MM': [number + ' kuu', number + ' kuud'],
	            'y' : ['ühe aasta', 'aasta', 'üks aasta'],
	            'yy': [number + ' aasta', number + ' aastat']
	        };
	        if (withoutSuffix) {
	            return format[key][2] ? format[key][2] : format[key][1];
	        }
	        return isFuture ? format[key][0] : format[key][1];
	    }
	
	    var et = moment.defineLocale('et', {
	        months        : 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
	        monthsShort   : 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
	        weekdays      : 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
	        weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
	        weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
	        longDateFormat : {
	            LT   : 'H:mm',
	            LTS : 'H:mm:ss',
	            L    : 'DD.MM.YYYY',
	            LL   : 'D. MMMM YYYY',
	            LLL  : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[Täna,] LT',
	            nextDay  : '[Homme,] LT',
	            nextWeek : '[Järgmine] dddd LT',
	            lastDay  : '[Eile,] LT',
	            lastWeek : '[Eelmine] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s pärast',
	            past   : '%s tagasi',
	            s      : processRelativeTime,
	            m      : processRelativeTime,
	            mm     : processRelativeTime,
	            h      : processRelativeTime,
	            hh     : processRelativeTime,
	            d      : processRelativeTime,
	            dd     : '%d päeva',
	            M      : processRelativeTime,
	            MM     : processRelativeTime,
	            y      : processRelativeTime,
	            yy     : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return et;
	
	}));

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : euskara (eu)
	//! author : Eneko Illarramendi : https://github.com/eillarra
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var eu = moment.defineLocale('eu', {
	        months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
	        monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
	        weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
	        weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
	        weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY[ko] MMMM[ren] D[a]',
	            LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
	            LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
	            l : 'YYYY-M-D',
	            ll : 'YYYY[ko] MMM D[a]',
	            lll : 'YYYY[ko] MMM D[a] HH:mm',
	            llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
	        },
	        calendar : {
	            sameDay : '[gaur] LT[etan]',
	            nextDay : '[bihar] LT[etan]',
	            nextWeek : 'dddd LT[etan]',
	            lastDay : '[atzo] LT[etan]',
	            lastWeek : '[aurreko] dddd LT[etan]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s barru',
	            past : 'duela %s',
	            s : 'segundo batzuk',
	            m : 'minutu bat',
	            mm : '%d minutu',
	            h : 'ordu bat',
	            hh : '%d ordu',
	            d : 'egun bat',
	            dd : '%d egun',
	            M : 'hilabete bat',
	            MM : '%d hilabete',
	            y : 'urte bat',
	            yy : '%d urte'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return eu;
	
	}));

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Persian (fa)
	//! author : Ebrahim Byagowi : https://github.com/ebraminio
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '۱',
	        '2': '۲',
	        '3': '۳',
	        '4': '۴',
	        '5': '۵',
	        '6': '۶',
	        '7': '۷',
	        '8': '۸',
	        '9': '۹',
	        '0': '۰'
	    }, numberMap = {
	        '۱': '1',
	        '۲': '2',
	        '۳': '3',
	        '۴': '4',
	        '۵': '5',
	        '۶': '6',
	        '۷': '7',
	        '۸': '8',
	        '۹': '9',
	        '۰': '0'
	    };
	
	    var fa = moment.defineLocale('fa', {
	        months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	        weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	        weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /قبل از ظهر|بعد از ظهر/,
	        isPM: function (input) {
	            return /بعد از ظهر/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'قبل از ظهر';
	            } else {
	                return 'بعد از ظهر';
	            }
	        },
	        calendar : {
	            sameDay : '[امروز ساعت] LT',
	            nextDay : '[فردا ساعت] LT',
	            nextWeek : 'dddd [ساعت] LT',
	            lastDay : '[دیروز ساعت] LT',
	            lastWeek : 'dddd [پیش] [ساعت] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'در %s',
	            past : '%s پیش',
	            s : 'چندین ثانیه',
	            m : 'یک دقیقه',
	            mm : '%d دقیقه',
	            h : 'یک ساعت',
	            hh : '%d ساعت',
	            d : 'یک روز',
	            dd : '%d روز',
	            M : 'یک ماه',
	            MM : '%d ماه',
	            y : 'یک سال',
	            yy : '%d سال'
	        },
	        preparse: function (string) {
	            return string.replace(/[۰-۹]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        ordinalParse: /\d{1,2}م/,
	        ordinal : '%dم',
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return fa;
	
	}));

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : finnish (fi)
	//! author : Tarmo Aidantausta : https://github.com/bleadof
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '),
	        numbersFuture = [
	            'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
	            numbersPast[7], numbersPast[8], numbersPast[9]
	        ];
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = '';
	        switch (key) {
	        case 's':
	            return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
	        case 'm':
	            return isFuture ? 'minuutin' : 'minuutti';
	        case 'mm':
	            result = isFuture ? 'minuutin' : 'minuuttia';
	            break;
	        case 'h':
	            return isFuture ? 'tunnin' : 'tunti';
	        case 'hh':
	            result = isFuture ? 'tunnin' : 'tuntia';
	            break;
	        case 'd':
	            return isFuture ? 'päivän' : 'päivä';
	        case 'dd':
	            result = isFuture ? 'päivän' : 'päivää';
	            break;
	        case 'M':
	            return isFuture ? 'kuukauden' : 'kuukausi';
	        case 'MM':
	            result = isFuture ? 'kuukauden' : 'kuukautta';
	            break;
	        case 'y':
	            return isFuture ? 'vuoden' : 'vuosi';
	        case 'yy':
	            result = isFuture ? 'vuoden' : 'vuotta';
	            break;
	        }
	        result = verbalNumber(number, isFuture) + ' ' + result;
	        return result;
	    }
	    function verbalNumber(number, isFuture) {
	        return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
	    }
	
	    var fi = moment.defineLocale('fi', {
	        months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
	        monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
	        weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
	        weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
	        weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD.MM.YYYY',
	            LL : 'Do MMMM[ta] YYYY',
	            LLL : 'Do MMMM[ta] YYYY, [klo] HH.mm',
	            LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
	            l : 'D.M.YYYY',
	            ll : 'Do MMM YYYY',
	            lll : 'Do MMM YYYY, [klo] HH.mm',
	            llll : 'ddd, Do MMM YYYY, [klo] HH.mm'
	        },
	        calendar : {
	            sameDay : '[tänään] [klo] LT',
	            nextDay : '[huomenna] [klo] LT',
	            nextWeek : 'dddd [klo] LT',
	            lastDay : '[eilen] [klo] LT',
	            lastWeek : '[viime] dddd[na] [klo] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s päästä',
	            past : '%s sitten',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return fi;
	
	}));

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : faroese (fo)
	//! author : Ragnar Johannesen : https://github.com/ragnar123
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var fo = moment.defineLocale('fo', {
	        months : 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays : 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
	        weekdaysShort : 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
	        weekdaysMin : 'su_má_tý_mi_hó_fr_le'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D. MMMM, YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Í dag kl.] LT',
	            nextDay : '[Í morgin kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[Í gjár kl.] LT',
	            lastWeek : '[síðstu] dddd [kl] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'um %s',
	            past : '%s síðani',
	            s : 'fá sekund',
	            m : 'ein minutt',
	            mm : '%d minuttir',
	            h : 'ein tími',
	            hh : '%d tímar',
	            d : 'ein dagur',
	            dd : '%d dagar',
	            M : 'ein mánaði',
	            MM : '%d mánaðir',
	            y : 'eitt ár',
	            yy : '%d ár'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return fo;
	
	}));

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : french (fr)
	//! author : John Fischer : https://github.com/jfroffice
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var fr = moment.defineLocale('fr', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : '');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return fr;
	
	}));

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : canadian french (fr-ca)
	//! author : Jonathan Abourbih : https://github.com/jonbca
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var fr_ca = moment.defineLocale('fr-ca', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|e)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : 'e');
	        }
	    });
	
	    return fr_ca;
	
	}));

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : swiss french (fr)
	//! author : Gaspard Bucher : https://github.com/gaspard
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var fr_ch = moment.defineLocale('fr-ch', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|e)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : 'e');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return fr_ch;
	
	}));

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : frisian (fy)
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');
	
	    var fy = moment.defineLocale('fy', {
	        months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },
	        weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
	        weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
	        weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[hjoed om] LT',
	            nextDay: '[moarn om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[juster om] LT',
	            lastWeek: '[ôfrûne] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'oer %s',
	            past : '%s lyn',
	            s : 'in pear sekonden',
	            m : 'ien minút',
	            mm : '%d minuten',
	            h : 'ien oere',
	            hh : '%d oeren',
	            d : 'ien dei',
	            dd : '%d dagen',
	            M : 'ien moanne',
	            MM : '%d moannen',
	            y : 'ien jier',
	            yy : '%d jierren'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return fy;
	
	}));

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : great britain scottish gealic (gd)
	//! author : Jon Ashdown : https://github.com/jonashdown
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var months = [
	        'Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'
	    ];
	
	    var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];
	
	    var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];
	
	    var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];
	
	    var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];
	
	    var gd = moment.defineLocale('gd', {
	        months : months,
	        monthsShort : monthsShort,
	        monthsParseExact : true,
	        weekdays : weekdays,
	        weekdaysShort : weekdaysShort,
	        weekdaysMin : weekdaysMin,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[An-diugh aig] LT',
	            nextDay : '[A-màireach aig] LT',
	            nextWeek : 'dddd [aig] LT',
	            lastDay : '[An-dè aig] LT',
	            lastWeek : 'dddd [seo chaidh] [aig] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ann an %s',
	            past : 'bho chionn %s',
	            s : 'beagan diogan',
	            m : 'mionaid',
	            mm : '%d mionaidean',
	            h : 'uair',
	            hh : '%d uairean',
	            d : 'latha',
	            dd : '%d latha',
	            M : 'mìos',
	            MM : '%d mìosan',
	            y : 'bliadhna',
	            yy : '%d bliadhna'
	        },
	        ordinalParse : /\d{1,2}(d|na|mh)/,
	        ordinal : function (number) {
	            var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return gd;
	
	}));

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : galician (gl)
	//! author : Juan G. Hurtado : https://github.com/juanghurtado
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var gl = moment.defineLocale('gl', {
	        months : 'Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro'.split('_'),
	        monthsShort : 'Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.'.split('_'),
	        weekdays : 'Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado'.split('_'),
	        weekdaysShort : 'Dom._Lun._Mar._Mér._Xov._Ven._Sáb.'.split('_'),
	        weekdaysMin : 'Do_Lu_Ma_Mé_Xo_Ve_Sá'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	            },
	            nextDay : function () {
	                return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	            },
	            lastDay : function () {
	                return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
	            },
	            lastWeek : function () {
	                return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : function (str) {
	                if (str === 'uns segundos') {
	                    return 'nuns segundos';
	                }
	                return 'en ' + str;
	            },
	            past : 'hai %s',
	            s : 'uns segundos',
	            m : 'un minuto',
	            mm : '%d minutos',
	            h : 'unha hora',
	            hh : '%d horas',
	            d : 'un día',
	            dd : '%d días',
	            M : 'un mes',
	            MM : '%d meses',
	            y : 'un ano',
	            yy : '%d anos'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return gl;
	
	}));

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hebrew (he)
	//! author : Tomer Cohen : https://github.com/tomer
	//! author : Moshe Simantov : https://github.com/DevelopmentIL
	//! author : Tal Ater : https://github.com/TalAter
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var he = moment.defineLocale('he', {
	        months : 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
	        monthsShort : 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
	        weekdays : 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
	        weekdaysShort : 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
	        weekdaysMin : 'א_ב_ג_ד_ה_ו_ש'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [ב]MMMM YYYY',
	            LLL : 'D [ב]MMMM YYYY HH:mm',
	            LLLL : 'dddd, D [ב]MMMM YYYY HH:mm',
	            l : 'D/M/YYYY',
	            ll : 'D MMM YYYY',
	            lll : 'D MMM YYYY HH:mm',
	            llll : 'ddd, D MMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[היום ב־]LT',
	            nextDay : '[מחר ב־]LT',
	            nextWeek : 'dddd [בשעה] LT',
	            lastDay : '[אתמול ב־]LT',
	            lastWeek : '[ביום] dddd [האחרון בשעה] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'בעוד %s',
	            past : 'לפני %s',
	            s : 'מספר שניות',
	            m : 'דקה',
	            mm : '%d דקות',
	            h : 'שעה',
	            hh : function (number) {
	                if (number === 2) {
	                    return 'שעתיים';
	                }
	                return number + ' שעות';
	            },
	            d : 'יום',
	            dd : function (number) {
	                if (number === 2) {
	                    return 'יומיים';
	                }
	                return number + ' ימים';
	            },
	            M : 'חודש',
	            MM : function (number) {
	                if (number === 2) {
	                    return 'חודשיים';
	                }
	                return number + ' חודשים';
	            },
	            y : 'שנה',
	            yy : function (number) {
	                if (number === 2) {
	                    return 'שנתיים';
	                } else if (number % 10 === 0 && number !== 10) {
	                    return number + ' שנה';
	                }
	                return number + ' שנים';
	            }
	        },
	        meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
	        isPM : function (input) {
	            return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 5) {
	                return 'לפנות בוקר';
	            } else if (hour < 10) {
	                return 'בבוקר';
	            } else if (hour < 12) {
	                return isLower ? 'לפנה"צ' : 'לפני הצהריים';
	            } else if (hour < 18) {
	                return isLower ? 'אחה"צ' : 'אחרי הצהריים';
	            } else {
	                return 'בערב';
	            }
	        }
	    });
	
	    return he;
	
	}));

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hindi (hi)
	//! author : Mayank Singhal : https://github.com/mayanksinghal
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };
	
	    var hi = moment.defineLocale('hi', {
	        months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
	        monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
	        weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm बजे',
	            LTS : 'A h:mm:ss बजे',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm बजे',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm बजे'
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[कल] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[कल] LT',
	            lastWeek : '[पिछले] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s में',
	            past : '%s पहले',
	            s : 'कुछ ही क्षण',
	            m : 'एक मिनट',
	            mm : '%d मिनट',
	            h : 'एक घंटा',
	            hh : '%d घंटे',
	            d : 'एक दिन',
	            dd : '%d दिन',
	            M : 'एक महीने',
	            MM : '%d महीने',
	            y : 'एक वर्ष',
	            yy : '%d वर्ष'
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
	        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
	        meridiemParse: /रात|सुबह|दोपहर|शाम/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सुबह') {
	                return hour;
	            } else if (meridiem === 'दोपहर') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'शाम') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात';
	            } else if (hour < 10) {
	                return 'सुबह';
	            } else if (hour < 17) {
	                return 'दोपहर';
	            } else if (hour < 20) {
	                return 'शाम';
	            } else {
	                return 'रात';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return hi;
	
	}));

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hrvatski (hr)
	//! author : Bojan Marković : https://github.com/bmarkovic
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	        }
	    }
	
	    var hr = moment.defineLocale('hr', {
	        months : {
	            format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
	            standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
	        },
	        monthsShort : 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
	        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danas u] LT',
	            nextDay  : '[sutra u] LT',
	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[jučer u] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'par sekundi',
	            m      : translate,
	            mm     : translate,
	            h      : translate,
	            hh     : translate,
	            d      : 'dan',
	            dd     : translate,
	            M      : 'mjesec',
	            MM     : translate,
	            y      : 'godinu',
	            yy     : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return hr;
	
	}));

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hungarian (hu)
	//! author : Adam Brunner : https://github.com/adambrunner
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
	    function translate(number, withoutSuffix, key, isFuture) {
	        var num = number,
	            suffix;
	        switch (key) {
	        case 's':
	            return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
	        case 'm':
	            return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'mm':
	            return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'h':
	            return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'hh':
	            return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'd':
	            return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'dd':
	            return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'M':
	            return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'MM':
	            return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'y':
	            return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
	        case 'yy':
	            return num + (isFuture || withoutSuffix ? ' év' : ' éve');
	        }
	        return '';
	    }
	    function week(isFuture) {
	        return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
	    }
	
	    var hu = moment.defineLocale('hu', {
	        months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
	        monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
	        weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
	        weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
	        weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'YYYY.MM.DD.',
	            LL : 'YYYY. MMMM D.',
	            LLL : 'YYYY. MMMM D. H:mm',
	            LLLL : 'YYYY. MMMM D., dddd H:mm'
	        },
	        meridiemParse: /de|du/i,
	        isPM: function (input) {
	            return input.charAt(1).toLowerCase() === 'u';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower === true ? 'de' : 'DE';
	            } else {
	                return isLower === true ? 'du' : 'DU';
	            }
	        },
	        calendar : {
	            sameDay : '[ma] LT[-kor]',
	            nextDay : '[holnap] LT[-kor]',
	            nextWeek : function () {
	                return week.call(this, true);
	            },
	            lastDay : '[tegnap] LT[-kor]',
	            lastWeek : function () {
	                return week.call(this, false);
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s múlva',
	            past : '%s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return hu;
	
	}));

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Armenian (hy-am)
	//! author : Armendarabyan : https://github.com/armendarabyan
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var hy_am = moment.defineLocale('hy-am', {
	        months : {
	            format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
	            standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
	        },
	        monthsShort : 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
	        weekdays : 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
	        weekdaysShort : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        weekdaysMin : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY թ.',
	            LLL : 'D MMMM YYYY թ., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY թ., HH:mm'
	        },
	        calendar : {
	            sameDay: '[այսօր] LT',
	            nextDay: '[վաղը] LT',
	            lastDay: '[երեկ] LT',
	            nextWeek: function () {
	                return 'dddd [օրը ժամը] LT';
	            },
	            lastWeek: function () {
	                return '[անցած] dddd [օրը ժամը] LT';
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s հետո',
	            past : '%s առաջ',
	            s : 'մի քանի վայրկյան',
	            m : 'րոպե',
	            mm : '%d րոպե',
	            h : 'ժամ',
	            hh : '%d ժամ',
	            d : 'օր',
	            dd : '%d օր',
	            M : 'ամիս',
	            MM : '%d ամիս',
	            y : 'տարի',
	            yy : '%d տարի'
	        },
	        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
	        isPM: function (input) {
	            return /^(ցերեկվա|երեկոյան)$/.test(input);
	        },
	        meridiem : function (hour) {
	            if (hour < 4) {
	                return 'գիշերվա';
	            } else if (hour < 12) {
	                return 'առավոտվա';
	            } else if (hour < 17) {
	                return 'ցերեկվա';
	            } else {
	                return 'երեկոյան';
	            }
	        },
	        ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'DDD':
	            case 'w':
	            case 'W':
	            case 'DDDo':
	                if (number === 1) {
	                    return number + '-ին';
	                }
	                return number + '-րդ';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return hy_am;
	
	}));

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bahasa Indonesia (id)
	//! author : Mohammad Satrio Utomo : https://github.com/tyok
	//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var id = moment.defineLocale('id', {
	        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
	        weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
	        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|siang|sore|malam/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'siang') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'sore' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'siang';
	            } else if (hours < 19) {
	                return 'sore';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Besok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kemarin pukul] LT',
	            lastWeek : 'dddd [lalu pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lalu',
	            s : 'beberapa detik',
	            m : 'semenit',
	            mm : '%d menit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return id;
	
	}));

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : icelandic (is)
	//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function plural(n) {
	        if (n % 100 === 11) {
	            return true;
	        } else if (n % 10 === 1) {
	            return false;
	        }
	        return true;
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':
	            return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
	        case 'm':
	            return withoutSuffix ? 'mínúta' : 'mínútu';
	        case 'mm':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
	            } else if (withoutSuffix) {
	                return result + 'mínúta';
	            }
	            return result + 'mínútu';
	        case 'hh':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
	            }
	            return result + 'klukkustund';
	        case 'd':
	            if (withoutSuffix) {
	                return 'dagur';
	            }
	            return isFuture ? 'dag' : 'degi';
	        case 'dd':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'dagar';
	                }
	                return result + (isFuture ? 'daga' : 'dögum');
	            } else if (withoutSuffix) {
	                return result + 'dagur';
	            }
	            return result + (isFuture ? 'dag' : 'degi');
	        case 'M':
	            if (withoutSuffix) {
	                return 'mánuður';
	            }
	            return isFuture ? 'mánuð' : 'mánuði';
	        case 'MM':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'mánuðir';
	                }
	                return result + (isFuture ? 'mánuði' : 'mánuðum');
	            } else if (withoutSuffix) {
	                return result + 'mánuður';
	            }
	            return result + (isFuture ? 'mánuð' : 'mánuði');
	        case 'y':
	            return withoutSuffix || isFuture ? 'ár' : 'ári';
	        case 'yy':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
	            }
	            return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
	        }
	    }
	
	    var is = moment.defineLocale('is', {
	        months : 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
	        weekdays : 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
	        weekdaysShort : 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
	        weekdaysMin : 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] H:mm',
	            LLLL : 'dddd, D. MMMM YYYY [kl.] H:mm'
	        },
	        calendar : {
	            sameDay : '[í dag kl.] LT',
	            nextDay : '[á morgun kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[í gær kl.] LT',
	            lastWeek : '[síðasta] dddd [kl.] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'eftir %s',
	            past : 'fyrir %s síðan',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : 'klukkustund',
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return is;
	
	}));

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : italian (it)
	//! author : Lorenzo : https://github.com/aliem
	//! author: Mattia Larentis: https://github.com/nostalgiaz
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var it = moment.defineLocale('it', {
	        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
	        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
	        weekdays : 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
	        weekdaysShort : 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
	        weekdaysMin : 'Do_Lu_Ma_Me_Gi_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Oggi alle] LT',
	            nextDay: '[Domani alle] LT',
	            nextWeek: 'dddd [alle] LT',
	            lastDay: '[Ieri alle] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[la scorsa] dddd [alle] LT';
	                    default:
	                        return '[lo scorso] dddd [alle] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : function (s) {
	                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
	            },
	            past : '%s fa',
	            s : 'alcuni secondi',
	            m : 'un minuto',
	            mm : '%d minuti',
	            h : 'un\'ora',
	            hh : '%d ore',
	            d : 'un giorno',
	            dd : '%d giorni',
	            M : 'un mese',
	            MM : '%d mesi',
	            y : 'un anno',
	            yy : '%d anni'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal: '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return it;
	
	}));

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : japanese (ja)
	//! author : LI Long : https://github.com/baryon
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ja = moment.defineLocale('ja', {
	        months : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
	        weekdaysShort : '日_月_火_水_木_金_土'.split('_'),
	        weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
	        longDateFormat : {
	            LT : 'Ah時m分',
	            LTS : 'Ah時m分s秒',
	            L : 'YYYY/MM/DD',
	            LL : 'YYYY年M月D日',
	            LLL : 'YYYY年M月D日Ah時m分',
	            LLLL : 'YYYY年M月D日Ah時m分 dddd'
	        },
	        meridiemParse: /午前|午後/i,
	        isPM : function (input) {
	            return input === '午後';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return '午前';
	            } else {
	                return '午後';
	            }
	        },
	        calendar : {
	            sameDay : '[今日] LT',
	            nextDay : '[明日] LT',
	            nextWeek : '[来週]dddd LT',
	            lastDay : '[昨日] LT',
	            lastWeek : '[前週]dddd LT',
	            sameElse : 'L'
	        },
	        ordinalParse : /\d{1,2}日/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            default:
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s後',
	            past : '%s前',
	            s : '数秒',
	            m : '1分',
	            mm : '%d分',
	            h : '1時間',
	            hh : '%d時間',
	            d : '1日',
	            dd : '%d日',
	            M : '1ヶ月',
	            MM : '%dヶ月',
	            y : '1年',
	            yy : '%d年'
	        }
	    });
	
	    return ja;
	
	}));

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Boso Jowo (jv)
	//! author : Rony Lantip : https://github.com/lantip
	//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var jv = moment.defineLocale('jv', {
	        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
	        weekdays : 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
	        weekdaysShort : 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
	        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /enjing|siyang|sonten|ndalu/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'enjing') {
	                return hour;
	            } else if (meridiem === 'siyang') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'enjing';
	            } else if (hours < 15) {
	                return 'siyang';
	            } else if (hours < 19) {
	                return 'sonten';
	            } else {
	                return 'ndalu';
	            }
	        },
	        calendar : {
	            sameDay : '[Dinten puniko pukul] LT',
	            nextDay : '[Mbenjang pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kala wingi pukul] LT',
	            lastWeek : 'dddd [kepengker pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'wonten ing %s',
	            past : '%s ingkang kepengker',
	            s : 'sawetawis detik',
	            m : 'setunggal menit',
	            mm : '%d menit',
	            h : 'setunggal jam',
	            hh : '%d jam',
	            d : 'sedinten',
	            dd : '%d dinten',
	            M : 'sewulan',
	            MM : '%d wulan',
	            y : 'setaun',
	            yy : '%d taun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return jv;
	
	}));

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Georgian (ka)
	//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ka = moment.defineLocale('ka', {
	        months : {
	            standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
	            format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
	        },
	        monthsShort : 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
	        weekdays : {
	            standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
	            format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
	            isFormat: /(წინა|შემდეგ)/
	        },
	        weekdaysShort : 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
	        weekdaysMin : 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[დღეს] LT[-ზე]',
	            nextDay : '[ხვალ] LT[-ზე]',
	            lastDay : '[გუშინ] LT[-ზე]',
	            nextWeek : '[შემდეგ] dddd LT[-ზე]',
	            lastWeek : '[წინა] dddd LT-ზე',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : function (s) {
	                return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
	                    s.replace(/ი$/, 'ში') :
	                    s + 'ში';
	            },
	            past : function (s) {
	                if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
	                    return s.replace(/(ი|ე)$/, 'ის წინ');
	                }
	                if ((/წელი/).test(s)) {
	                    return s.replace(/წელი$/, 'წლის წინ');
	                }
	            },
	            s : 'რამდენიმე წამი',
	            m : 'წუთი',
	            mm : '%d წუთი',
	            h : 'საათი',
	            hh : '%d საათი',
	            d : 'დღე',
	            dd : '%d დღე',
	            M : 'თვე',
	            MM : '%d თვე',
	            y : 'წელი',
	            yy : '%d წელი'
	        },
	        ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
	        ordinal : function (number) {
	            if (number === 0) {
	                return number;
	            }
	            if (number === 1) {
	                return number + '-ლი';
	            }
	            if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
	                return 'მე-' + number;
	            }
	            return number + '-ე';
	        },
	        week : {
	            dow : 1,
	            doy : 7
	        }
	    });
	
	    return ka;
	
	}));

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : kazakh (kk)
	//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var suffixes = {
	        0: '-ші',
	        1: '-ші',
	        2: '-ші',
	        3: '-ші',
	        4: '-ші',
	        5: '-ші',
	        6: '-шы',
	        7: '-ші',
	        8: '-ші',
	        9: '-шы',
	        10: '-шы',
	        20: '-шы',
	        30: '-шы',
	        40: '-шы',
	        50: '-ші',
	        60: '-шы',
	        70: '-ші',
	        80: '-ші',
	        90: '-шы',
	        100: '-ші'
	    };
	
	    var kk = moment.defineLocale('kk', {
	        months : 'Қаңтар_Ақпан_Наурыз_Сәуір_Мамыр_Маусым_Шілде_Тамыз_Қыркүйек_Қазан_Қараша_Желтоқсан'.split('_'),
	        monthsShort : 'Қаң_Ақп_Нау_Сәу_Мам_Мау_Шіл_Там_Қыр_Қаз_Қар_Жел'.split('_'),
	        weekdays : 'Жексенбі_Дүйсенбі_Сейсенбі_Сәрсенбі_Бейсенбі_Жұма_Сенбі'.split('_'),
	        weekdaysShort : 'Жек_Дүй_Сей_Сәр_Бей_Жұм_Сен'.split('_'),
	        weekdaysMin : 'Жк_Дй_Сй_Ср_Бй_Жм_Сн'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Бүгін сағат] LT',
	            nextDay : '[Ертең сағат] LT',
	            nextWeek : 'dddd [сағат] LT',
	            lastDay : '[Кеше сағат] LT',
	            lastWeek : '[Өткен аптаның] dddd [сағат] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ішінде',
	            past : '%s бұрын',
	            s : 'бірнеше секунд',
	            m : 'бір минут',
	            mm : '%d минут',
	            h : 'бір сағат',
	            hh : '%d сағат',
	            d : 'бір күн',
	            dd : '%d күн',
	            M : 'бір ай',
	            MM : '%d ай',
	            y : 'бір жыл',
	            yy : '%d жыл'
	        },
	        ordinalParse: /\d{1,2}-(ші|шы)/,
	        ordinal : function (number) {
	            var a = number % 10,
	                b = number >= 100 ? 100 : null;
	            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return kk;
	
	}));

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : khmer (km)
	//! author : Kruy Vanna : https://github.com/kruyvanna
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var km = moment.defineLocale('km', {
	        months: 'មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        monthsShort: 'មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
	            nextDay: '[ស្អែក ម៉ោង] LT',
	            nextWeek: 'dddd [ម៉ោង] LT',
	            lastDay: '[ម្សិលមិញ ម៉ោង] LT',
	            lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%sទៀត',
	            past: '%sមុន',
	            s: 'ប៉ុន្មានវិនាទី',
	            m: 'មួយនាទី',
	            mm: '%d នាទី',
	            h: 'មួយម៉ោង',
	            hh: '%d ម៉ោង',
	            d: 'មួយថ្ងៃ',
	            dd: '%d ថ្ងៃ',
	            M: 'មួយខែ',
	            MM: '%d ខែ',
	            y: 'មួយឆ្នាំ',
	            yy: '%d ឆ្នាំ'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return km;
	
	}));

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : korean (ko)
	//!
	//! authors
	//!
	//! - Kyungwook, Park : https://github.com/kyungw00k
	//! - Jeeeyul Lee <jeeeyul@gmail.com>
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ko = moment.defineLocale('ko', {
	        months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
	        weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
	        weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
	        longDateFormat : {
	            LT : 'A h시 m분',
	            LTS : 'A h시 m분 s초',
	            L : 'YYYY.MM.DD',
	            LL : 'YYYY년 MMMM D일',
	            LLL : 'YYYY년 MMMM D일 A h시 m분',
	            LLLL : 'YYYY년 MMMM D일 dddd A h시 m분'
	        },
	        calendar : {
	            sameDay : '오늘 LT',
	            nextDay : '내일 LT',
	            nextWeek : 'dddd LT',
	            lastDay : '어제 LT',
	            lastWeek : '지난주 dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s 후',
	            past : '%s 전',
	            s : '몇초',
	            ss : '%d초',
	            m : '일분',
	            mm : '%d분',
	            h : '한시간',
	            hh : '%d시간',
	            d : '하루',
	            dd : '%d일',
	            M : '한달',
	            MM : '%d달',
	            y : '일년',
	            yy : '%d년'
	        },
	        ordinalParse : /\d{1,2}일/,
	        ordinal : '%d일',
	        meridiemParse : /오전|오후/,
	        isPM : function (token) {
	            return token === '오후';
	        },
	        meridiem : function (hour, minute, isUpper) {
	            return hour < 12 ? '오전' : '오후';
	        }
	    });
	
	    return ko;
	
	}));

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Luxembourgish (lb)
	//! author : mweimerskirch : https://github.com/mweimerskirch, David Raison : https://github.com/kwisatz
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eng Minutt', 'enger Minutt'],
	            'h': ['eng Stonn', 'enger Stonn'],
	            'd': ['een Dag', 'engem Dag'],
	            'M': ['ee Mount', 'engem Mount'],
	            'y': ['ee Joer', 'engem Joer']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }
	    function processFutureTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'a ' + string;
	        }
	        return 'an ' + string;
	    }
	    function processPastTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'viru ' + string;
	        }
	        return 'virun ' + string;
	    }
	    /**
	     * Returns true if the word before the given number loses the '-n' ending.
	     * e.g. 'an 10 Deeg' but 'a 5 Deeg'
	     *
	     * @param number {integer}
	     * @returns {boolean}
	     */
	    function eifelerRegelAppliesToNumber(number) {
	        number = parseInt(number, 10);
	        if (isNaN(number)) {
	            return false;
	        }
	        if (number < 0) {
	            // Negative Number --> always true
	            return true;
	        } else if (number < 10) {
	            // Only 1 digit
	            if (4 <= number && number <= 7) {
	                return true;
	            }
	            return false;
	        } else if (number < 100) {
	            // 2 digits
	            var lastDigit = number % 10, firstDigit = number / 10;
	            if (lastDigit === 0) {
	                return eifelerRegelAppliesToNumber(firstDigit);
	            }
	            return eifelerRegelAppliesToNumber(lastDigit);
	        } else if (number < 10000) {
	            // 3 or 4 digits --> recursively check first digit
	            while (number >= 10) {
	                number = number / 10;
	            }
	            return eifelerRegelAppliesToNumber(number);
	        } else {
	            // Anything larger than 4 digits: recursively check first n-3 digits
	            number = number / 1000;
	            return eifelerRegelAppliesToNumber(number);
	        }
	    }
	
	    var lb = moment.defineLocale('lb', {
	        months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
	        weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
	        weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
	        longDateFormat: {
	            LT: 'H:mm [Auer]',
	            LTS: 'H:mm:ss [Auer]',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm [Auer]',
	            LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
	        },
	        calendar: {
	            sameDay: '[Haut um] LT',
	            sameElse: 'L',
	            nextDay: '[Muer um] LT',
	            nextWeek: 'dddd [um] LT',
	            lastDay: '[Gëschter um] LT',
	            lastWeek: function () {
	                // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
	                switch (this.day()) {
	                    case 2:
	                    case 4:
	                        return '[Leschten] dddd [um] LT';
	                    default:
	                        return '[Leschte] dddd [um] LT';
	                }
	            }
	        },
	        relativeTime : {
	            future : processFutureTime,
	            past : processPastTime,
	            s : 'e puer Sekonnen',
	            m : processRelativeTime,
	            mm : '%d Minutten',
	            h : processRelativeTime,
	            hh : '%d Stonnen',
	            d : processRelativeTime,
	            dd : '%d Deeg',
	            M : processRelativeTime,
	            MM : '%d Méint',
	            y : processRelativeTime,
	            yy : '%d Joer'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return lb;
	
	}));

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : lao (lo)
	//! author : Ryan Hart : https://github.com/ryanhart2
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var lo = moment.defineLocale('lo', {
	        months : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	        monthsShort : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	        weekdays : 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	        weekdaysShort : 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	        weekdaysMin : 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'ວັນdddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
	        isPM: function (input) {
	            return input === 'ຕອນແລງ';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ຕອນເຊົ້າ';
	            } else {
	                return 'ຕອນແລງ';
	            }
	        },
	        calendar : {
	            sameDay : '[ມື້ນີ້ເວລາ] LT',
	            nextDay : '[ມື້ອື່ນເວລາ] LT',
	            nextWeek : '[ວັນ]dddd[ໜ້າເວລາ] LT',
	            lastDay : '[ມື້ວານນີ້ເວລາ] LT',
	            lastWeek : '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ອີກ %s',
	            past : '%sຜ່ານມາ',
	            s : 'ບໍ່ເທົ່າໃດວິນາທີ',
	            m : '1 ນາທີ',
	            mm : '%d ນາທີ',
	            h : '1 ຊົ່ວໂມງ',
	            hh : '%d ຊົ່ວໂມງ',
	            d : '1 ມື້',
	            dd : '%d ມື້',
	            M : '1 ເດືອນ',
	            MM : '%d ເດືອນ',
	            y : '1 ປີ',
	            yy : '%d ປີ'
	        },
	        ordinalParse: /(ທີ່)\d{1,2}/,
	        ordinal : function (number) {
	            return 'ທີ່' + number;
	        }
	    });
	
	    return lo;
	
	}));

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Lithuanian (lt)
	//! author : Mindaugas Mozūras : https://github.com/mmozuras
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var units = {
	        'm' : 'minutė_minutės_minutę',
	        'mm': 'minutės_minučių_minutes',
	        'h' : 'valanda_valandos_valandą',
	        'hh': 'valandos_valandų_valandas',
	        'd' : 'diena_dienos_dieną',
	        'dd': 'dienos_dienų_dienas',
	        'M' : 'mėnuo_mėnesio_mėnesį',
	        'MM': 'mėnesiai_mėnesių_mėnesius',
	        'y' : 'metai_metų_metus',
	        'yy': 'metai_metų_metus'
	    };
	    function translateSeconds(number, withoutSuffix, key, isFuture) {
	        if (withoutSuffix) {
	            return 'kelios sekundės';
	        } else {
	            return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
	        }
	    }
	    function translateSingular(number, withoutSuffix, key, isFuture) {
	        return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
	    }
	    function special(number) {
	        return number % 10 === 0 || (number > 10 && number < 20);
	    }
	    function forms(key) {
	        return units[key].split('_');
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        if (number === 1) {
	            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
	        } else if (withoutSuffix) {
	            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
	        } else {
	            if (isFuture) {
	                return result + forms(key)[1];
	            } else {
	                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
	            }
	        }
	    }
	    var lt = moment.defineLocale('lt', {
	        months : {
	            format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
	            standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_')
	        },
	        monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
	        weekdays : {
	            format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
	            standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
	            isFormat: /dddd HH:mm/
	        },
	        weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
	        weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY [m.] MMMM D [d.]',
	            LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	            LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
	            l : 'YYYY-MM-DD',
	            ll : 'YYYY [m.] MMMM D [d.]',
	            lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	            llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
	        },
	        calendar : {
	            sameDay : '[Šiandien] LT',
	            nextDay : '[Rytoj] LT',
	            nextWeek : 'dddd LT',
	            lastDay : '[Vakar] LT',
	            lastWeek : '[Praėjusį] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'po %s',
	            past : 'prieš %s',
	            s : translateSeconds,
	            m : translateSingular,
	            mm : translate,
	            h : translateSingular,
	            hh : translate,
	            d : translateSingular,
	            dd : translate,
	            M : translateSingular,
	            MM : translate,
	            y : translateSingular,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}-oji/,
	        ordinal : function (number) {
	            return number + '-oji';
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return lt;
	
	}));

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : latvian (lv)
	//! author : Kristaps Karlsons : https://github.com/skakri
	//! author : Jānis Elmeris : https://github.com/JanisE
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var units = {
	        'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	        'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	        'h': 'stundas_stundām_stunda_stundas'.split('_'),
	        'hh': 'stundas_stundām_stunda_stundas'.split('_'),
	        'd': 'dienas_dienām_diena_dienas'.split('_'),
	        'dd': 'dienas_dienām_diena_dienas'.split('_'),
	        'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	        'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	        'y': 'gada_gadiem_gads_gadi'.split('_'),
	        'yy': 'gada_gadiem_gads_gadi'.split('_')
	    };
	    /**
	     * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
	     */
	    function format(forms, number, withoutSuffix) {
	        if (withoutSuffix) {
	            // E.g. "21 minūte", "3 minūtes".
	            return number % 10 === 1 && number !== 11 ? forms[2] : forms[3];
	        } else {
	            // E.g. "21 minūtes" as in "pēc 21 minūtes".
	            // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
	            return number % 10 === 1 && number !== 11 ? forms[0] : forms[1];
	        }
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        return number + ' ' + format(units[key], number, withoutSuffix);
	    }
	    function relativeTimeWithSingular(number, withoutSuffix, key) {
	        return format(units[key], number, withoutSuffix);
	    }
	    function relativeSeconds(number, withoutSuffix) {
	        return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
	    }
	
	    var lv = moment.defineLocale('lv', {
	        months : 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
	        weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
	        weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY.',
	            LL : 'YYYY. [gada] D. MMMM',
	            LLL : 'YYYY. [gada] D. MMMM, HH:mm',
	            LLLL : 'YYYY. [gada] D. MMMM, dddd, HH:mm'
	        },
	        calendar : {
	            sameDay : '[Šodien pulksten] LT',
	            nextDay : '[Rīt pulksten] LT',
	            nextWeek : 'dddd [pulksten] LT',
	            lastDay : '[Vakar pulksten] LT',
	            lastWeek : '[Pagājušā] dddd [pulksten] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'pēc %s',
	            past : 'pirms %s',
	            s : relativeSeconds,
	            m : relativeTimeWithSingular,
	            mm : relativeTimeWithPlural,
	            h : relativeTimeWithSingular,
	            hh : relativeTimeWithPlural,
	            d : relativeTimeWithSingular,
	            dd : relativeTimeWithPlural,
	            M : relativeTimeWithSingular,
	            MM : relativeTimeWithPlural,
	            y : relativeTimeWithSingular,
	            yy : relativeTimeWithPlural
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return lv;
	
	}));

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Montenegrin (me)
	//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var translator = {
	        words: { //Different grammatical cases
	            m: ['jedan minut', 'jednog minuta'],
	            mm: ['minut', 'minuta', 'minuta'],
	            h: ['jedan sat', 'jednog sata'],
	            hh: ['sat', 'sata', 'sati'],
	            dd: ['dan', 'dana', 'dana'],
	            MM: ['mjesec', 'mjeseca', 'mjeseci'],
	            yy: ['godina', 'godine', 'godina']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };
	
	    var me = moment.defineLocale('me', {
	        months: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
	        monthsShort: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun', 'jul', 'avg.', 'sep.', 'okt.', 'nov.', 'dec.'],
	        weekdays: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
	        weekdaysShort: ['ned.', 'pon.', 'uto.', 'sri.', 'čet.', 'pet.', 'sub.'],
	        weekdaysMin: ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su'],
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sjutra u] LT',
	
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[juče u] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[prošle] [nedjelje] [u] LT',
	                    '[prošlog] [ponedjeljka] [u] LT',
	                    '[prošlog] [utorka] [u] LT',
	                    '[prošle] [srijede] [u] LT',
	                    '[prošlog] [četvrtka] [u] LT',
	                    '[prošlog] [petka] [u] LT',
	                    '[prošle] [subote] [u] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'nekoliko sekundi',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'dan',
	            dd     : translator.translate,
	            M      : 'mjesec',
	            MM     : translator.translate,
	            y      : 'godinu',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return me;
	
	}));

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : macedonian (mk)
	//! author : Borislav Mickov : https://github.com/B0k0
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var mk = moment.defineLocale('mk', {
	        months : 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort : 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays : 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
	        weekdaysShort : 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
	        weekdaysMin : 'нe_пo_вт_ср_че_пе_сa'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'D.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : '[Денес во] LT',
	            nextDay : '[Утре во] LT',
	            nextWeek : '[Во] dddd [во] LT',
	            lastDay : '[Вчера во] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[Изминатата] dddd [во] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[Изминатиот] dddd [во] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'после %s',
	            past : 'пред %s',
	            s : 'неколку секунди',
	            m : 'минута',
	            mm : '%d минути',
	            h : 'час',
	            hh : '%d часа',
	            d : 'ден',
	            dd : '%d дена',
	            M : 'месец',
	            MM : '%d месеци',
	            y : 'година',
	            yy : '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal : function (number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return mk;
	
	}));

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : malayalam (ml)
	//! author : Floyd Pink : https://github.com/floydpink
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ml = moment.defineLocale('ml', {
	        months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
	        monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
	        weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
	        weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
	        weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm -നു',
	            LTS : 'A h:mm:ss -നു',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm -നു',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm -നു'
	        },
	        calendar : {
	            sameDay : '[ഇന്ന്] LT',
	            nextDay : '[നാളെ] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[ഇന്നലെ] LT',
	            lastWeek : '[കഴിഞ്ഞ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s കഴിഞ്ഞ്',
	            past : '%s മുൻപ്',
	            s : 'അൽപ നിമിഷങ്ങൾ',
	            m : 'ഒരു മിനിറ്റ്',
	            mm : '%d മിനിറ്റ്',
	            h : 'ഒരു മണിക്കൂർ',
	            hh : '%d മണിക്കൂർ',
	            d : 'ഒരു ദിവസം',
	            dd : '%d ദിവസം',
	            M : 'ഒരു മാസം',
	            MM : '%d മാസം',
	            y : 'ഒരു വർഷം',
	            yy : '%d വർഷം'
	        },
	        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'രാത്രി' && hour >= 4) ||
	                    meridiem === 'ഉച്ച കഴിഞ്ഞ്' ||
	                    meridiem === 'വൈകുന്നേരം') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'രാത്രി';
	            } else if (hour < 12) {
	                return 'രാവിലെ';
	            } else if (hour < 17) {
	                return 'ഉച്ച കഴിഞ്ഞ്';
	            } else if (hour < 20) {
	                return 'വൈകുന്നേരം';
	            } else {
	                return 'രാത്രി';
	            }
	        }
	    });
	
	    return ml;
	
	}));

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Marathi (mr)
	//! author : Harshad Kale : https://github.com/kalehv
	//! author : Vivek Athalye : https://github.com/vnathalye
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };
	
	    function relativeTimeMr(number, withoutSuffix, string, isFuture)
	    {
	        var output = '';
	        if (withoutSuffix) {
	            switch (string) {
	                case 's': output = 'काही सेकंद'; break;
	                case 'm': output = 'एक मिनिट'; break;
	                case 'mm': output = '%d मिनिटे'; break;
	                case 'h': output = 'एक तास'; break;
	                case 'hh': output = '%d तास'; break;
	                case 'd': output = 'एक दिवस'; break;
	                case 'dd': output = '%d दिवस'; break;
	                case 'M': output = 'एक महिना'; break;
	                case 'MM': output = '%d महिने'; break;
	                case 'y': output = 'एक वर्ष'; break;
	                case 'yy': output = '%d वर्षे'; break;
	            }
	        }
	        else {
	            switch (string) {
	                case 's': output = 'काही सेकंदां'; break;
	                case 'm': output = 'एका मिनिटा'; break;
	                case 'mm': output = '%d मिनिटां'; break;
	                case 'h': output = 'एका तासा'; break;
	                case 'hh': output = '%d तासां'; break;
	                case 'd': output = 'एका दिवसा'; break;
	                case 'dd': output = '%d दिवसां'; break;
	                case 'M': output = 'एका महिन्या'; break;
	                case 'MM': output = '%d महिन्यां'; break;
	                case 'y': output = 'एका वर्षा'; break;
	                case 'yy': output = '%d वर्षां'; break;
	            }
	        }
	        return output.replace(/%d/i, number);
	    }
	
	    var mr = moment.defineLocale('mr', {
	        months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
	        monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
	        weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm वाजता',
	            LTS : 'A h:mm:ss वाजता',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm वाजता',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm वाजता'
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[उद्या] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[काल] LT',
	            lastWeek: '[मागील] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future: '%sमध्ये',
	            past: '%sपूर्वी',
	            s: relativeTimeMr,
	            m: relativeTimeMr,
	            mm: relativeTimeMr,
	            h: relativeTimeMr,
	            hh: relativeTimeMr,
	            d: relativeTimeMr,
	            dd: relativeTimeMr,
	            M: relativeTimeMr,
	            MM: relativeTimeMr,
	            y: relativeTimeMr,
	            yy: relativeTimeMr
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात्री') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सकाळी') {
	                return hour;
	            } else if (meridiem === 'दुपारी') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'सायंकाळी') {
	                return hour + 12;
	            }
	        },
	        meridiem: function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात्री';
	            } else if (hour < 10) {
	                return 'सकाळी';
	            } else if (hour < 17) {
	                return 'दुपारी';
	            } else if (hour < 20) {
	                return 'सायंकाळी';
	            } else {
	                return 'रात्री';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return mr;
	
	}));

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bahasa Malaysia (ms-MY)
	//! author : Weldan Jamili : https://github.com/weldan
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ms = moment.defineLocale('ms', {
	        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|tengahari|petang|malam/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'tengahari') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'petang' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'tengahari';
	            } else if (hours < 19) {
	                return 'petang';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Esok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kelmarin pukul] LT',
	            lastWeek : 'dddd [lepas pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lepas',
	            s : 'beberapa saat',
	            m : 'seminit',
	            mm : '%d minit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ms;
	
	}));

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bahasa Malaysia (ms-MY)
	//! author : Weldan Jamili : https://github.com/weldan
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ms_my = moment.defineLocale('ms-my', {
	        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|tengahari|petang|malam/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'tengahari') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'petang' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'tengahari';
	            } else if (hours < 19) {
	                return 'petang';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Esok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kelmarin pukul] LT',
	            lastWeek : 'dddd [lepas pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lepas',
	            s : 'beberapa saat',
	            m : 'seminit',
	            mm : '%d minit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ms_my;
	
	}));

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Burmese (my)
	//! author : Squar team, mysquar.com
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '၁',
	        '2': '၂',
	        '3': '၃',
	        '4': '၄',
	        '5': '၅',
	        '6': '၆',
	        '7': '၇',
	        '8': '၈',
	        '9': '၉',
	        '0': '၀'
	    }, numberMap = {
	        '၁': '1',
	        '၂': '2',
	        '၃': '3',
	        '၄': '4',
	        '၅': '5',
	        '၆': '6',
	        '၇': '7',
	        '၈': '8',
	        '၉': '9',
	        '၀': '0'
	    };
	
	    var my = moment.defineLocale('my', {
	        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
	        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
	        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
	        weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
	        weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
	
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[ယနေ.] LT [မှာ]',
	            nextDay: '[မနက်ဖြန်] LT [မှာ]',
	            nextWeek: 'dddd LT [မှာ]',
	            lastDay: '[မနေ.က] LT [မှာ]',
	            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'လာမည့် %s မှာ',
	            past: 'လွန်ခဲ့သော %s က',
	            s: 'စက္ကန်.အနည်းငယ်',
	            m: 'တစ်မိနစ်',
	            mm: '%d မိနစ်',
	            h: 'တစ်နာရီ',
	            hh: '%d နာရီ',
	            d: 'တစ်ရက်',
	            dd: '%d ရက်',
	            M: 'တစ်လ',
	            MM: '%d လ',
	            y: 'တစ်နှစ်',
	            yy: '%d နှစ်'
	        },
	        preparse: function (string) {
	            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return my;
	
	}));

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : norwegian bokmål (nb)
	//! authors : Espen Hovlandsdal : https://github.com/rexxars
	//!           Sigurd Gartmann : https://github.com/sigurdga
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var nb = moment.defineLocale('nb', {
	        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
	        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort : 'sø._ma._ti._on._to._fr._lø.'.split('_'),
	        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] HH:mm',
	            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[i dag kl.] LT',
	            nextDay: '[i morgen kl.] LT',
	            nextWeek: 'dddd [kl.] LT',
	            lastDay: '[i går kl.] LT',
	            lastWeek: '[forrige] dddd [kl.] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : 'for %s siden',
	            s : 'noen sekunder',
	            m : 'ett minutt',
	            mm : '%d minutter',
	            h : 'en time',
	            hh : '%d timer',
	            d : 'en dag',
	            dd : '%d dager',
	            M : 'en måned',
	            MM : '%d måneder',
	            y : 'ett år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return nb;
	
	}));

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : nepali/nepalese
	//! author : suvash : https://github.com/suvash
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };
	
	    var ne = moment.defineLocale('ne', {
	        months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
	        monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
	        weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
	        weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
	        weekdaysMin : 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
	        longDateFormat : {
	            LT : 'Aको h:mm बजे',
	            LTS : 'Aको h:mm:ss बजे',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, Aको h:mm बजे',
	            LLLL : 'dddd, D MMMM YYYY, Aको h:mm बजे'
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'राति') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'बिहान') {
	                return hour;
	            } else if (meridiem === 'दिउँसो') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'साँझ') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 3) {
	                return 'राति';
	            } else if (hour < 12) {
	                return 'बिहान';
	            } else if (hour < 16) {
	                return 'दिउँसो';
	            } else if (hour < 20) {
	                return 'साँझ';
	            } else {
	                return 'राति';
	            }
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[भोलि] LT',
	            nextWeek : '[आउँदो] dddd[,] LT',
	            lastDay : '[हिजो] LT',
	            lastWeek : '[गएको] dddd[,] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%sमा',
	            past : '%s अगाडि',
	            s : 'केही क्षण',
	            m : 'एक मिनेट',
	            mm : '%d मिनेट',
	            h : 'एक घण्टा',
	            hh : '%d घण्टा',
	            d : 'एक दिन',
	            dd : '%d दिन',
	            M : 'एक महिना',
	            MM : '%d महिना',
	            y : 'एक बर्ष',
	            yy : '%d बर्ष'
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ne;
	
	}));

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : dutch (nl)
	//! author : Joris Röling : https://github.com/jjupiter
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');
	
	    var nl = moment.defineLocale('nl', {
	        months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },
	        weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
	        weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
	        weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[vandaag om] LT',
	            nextDay: '[morgen om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[gisteren om] LT',
	            lastWeek: '[afgelopen] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'over %s',
	            past : '%s geleden',
	            s : 'een paar seconden',
	            m : 'één minuut',
	            mm : '%d minuten',
	            h : 'één uur',
	            hh : '%d uur',
	            d : 'één dag',
	            dd : '%d dagen',
	            M : 'één maand',
	            MM : '%d maanden',
	            y : 'één jaar',
	            yy : '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return nl;
	
	}));

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : norwegian nynorsk (nn)
	//! author : https://github.com/mechuwind
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var nn = moment.defineLocale('nn', {
	        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays : 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
	        weekdaysShort : 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
	        weekdaysMin : 'su_må_ty_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] H:mm',
	            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[I dag klokka] LT',
	            nextDay: '[I morgon klokka] LT',
	            nextWeek: 'dddd [klokka] LT',
	            lastDay: '[I går klokka] LT',
	            lastWeek: '[Føregåande] dddd [klokka] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : 'for %s sidan',
	            s : 'nokre sekund',
	            m : 'eit minutt',
	            mm : '%d minutt',
	            h : 'ein time',
	            hh : '%d timar',
	            d : 'ein dag',
	            dd : '%d dagar',
	            M : 'ein månad',
	            MM : '%d månader',
	            y : 'eit år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return nn;
	
	}));

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : punjabi india (pa-in)
	//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '੧',
	        '2': '੨',
	        '3': '੩',
	        '4': '੪',
	        '5': '੫',
	        '6': '੬',
	        '7': '੭',
	        '8': '੮',
	        '9': '੯',
	        '0': '੦'
	    },
	    numberMap = {
	        '੧': '1',
	        '੨': '2',
	        '੩': '3',
	        '੪': '4',
	        '੫': '5',
	        '੬': '6',
	        '੭': '7',
	        '੮': '8',
	        '੯': '9',
	        '੦': '0'
	    };
	
	    var pa_in = moment.defineLocale('pa-in', {
	        // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
	        months : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	        monthsShort : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	        weekdays : 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
	        weekdaysShort : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	        weekdaysMin : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm ਵਜੇ',
	            LTS : 'A h:mm:ss ਵਜੇ',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm ਵਜੇ',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
	        },
	        calendar : {
	            sameDay : '[ਅਜ] LT',
	            nextDay : '[ਕਲ] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[ਕਲ] LT',
	            lastWeek : '[ਪਿਛਲੇ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ਵਿੱਚ',
	            past : '%s ਪਿਛਲੇ',
	            s : 'ਕੁਝ ਸਕਿੰਟ',
	            m : 'ਇਕ ਮਿੰਟ',
	            mm : '%d ਮਿੰਟ',
	            h : 'ਇੱਕ ਘੰਟਾ',
	            hh : '%d ਘੰਟੇ',
	            d : 'ਇੱਕ ਦਿਨ',
	            dd : '%d ਦਿਨ',
	            M : 'ਇੱਕ ਮਹੀਨਾ',
	            MM : '%d ਮਹੀਨੇ',
	            y : 'ਇੱਕ ਸਾਲ',
	            yy : '%d ਸਾਲ'
	        },
	        preparse: function (string) {
	            return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
	        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
	        meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'ਰਾਤ') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'ਸਵੇਰ') {
	                return hour;
	            } else if (meridiem === 'ਦੁਪਹਿਰ') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'ਸ਼ਾਮ') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ਰਾਤ';
	            } else if (hour < 10) {
	                return 'ਸਵੇਰ';
	            } else if (hour < 17) {
	                return 'ਦੁਪਹਿਰ';
	            } else if (hour < 20) {
	                return 'ਸ਼ਾਮ';
	            } else {
	                return 'ਰਾਤ';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return pa_in;
	
	}));

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : polish (pl)
	//! author : Rafal Hirsz : https://github.com/evoL
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_'),
	        monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
	    function plural(n) {
	        return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
	    }
	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'minuta' : 'minutę';
	        case 'mm':
	            return result + (plural(number) ? 'minuty' : 'minut');
	        case 'h':
	            return withoutSuffix  ? 'godzina'  : 'godzinę';
	        case 'hh':
	            return result + (plural(number) ? 'godziny' : 'godzin');
	        case 'MM':
	            return result + (plural(number) ? 'miesiące' : 'miesięcy');
	        case 'yy':
	            return result + (plural(number) ? 'lata' : 'lat');
	        }
	    }
	
	    var pl = moment.defineLocale('pl', {
	        months : function (momentToFormat, format) {
	            if (format === '') {
	                // Hack: if format empty we know this is used to generate
	                // RegExp by moment. Give then back both valid forms of months
	                // in RegExp ready format.
	                return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
	            } else if (/D MMMM/.test(format)) {
	                return monthsSubjective[momentToFormat.month()];
	            } else {
	                return monthsNominative[momentToFormat.month()];
	            }
	        },
	        monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
	        weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
	        weekdaysShort : 'nie_pon_wt_śr_czw_pt_sb'.split('_'),
	        weekdaysMin : 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Dziś o] LT',
	            nextDay: '[Jutro o] LT',
	            nextWeek: '[W] dddd [o] LT',
	            lastDay: '[Wczoraj o] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[W zeszłą niedzielę o] LT';
	                case 3:
	                    return '[W zeszłą środę o] LT';
	                case 6:
	                    return '[W zeszłą sobotę o] LT';
	                default:
	                    return '[W zeszły] dddd [o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : '%s temu',
	            s : 'kilka sekund',
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : '1 dzień',
	            dd : '%d dni',
	            M : 'miesiąc',
	            MM : translate,
	            y : 'rok',
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return pl;
	
	}));

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : portuguese (pt)
	//! author : Jefferson : https://github.com/jalex79
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var pt = moment.defineLocale('pt', {
	        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	        weekdays : 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
	        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	        weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY HH:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function () {
	                return (this.day() === 0 || this.day() === 6) ?
	                    '[Último] dddd [às] LT' : // Saturday + Sunday
	                    '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'em %s',
	            past : 'há %s',
	            s : 'segundos',
	            m : 'um minuto',
	            mm : '%d minutos',
	            h : 'uma hora',
	            hh : '%d horas',
	            d : 'um dia',
	            dd : '%d dias',
	            M : 'um mês',
	            MM : '%d meses',
	            y : 'um ano',
	            yy : '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return pt;
	
	}));

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : brazilian portuguese (pt-br)
	//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var pt_br = moment.defineLocale('pt-br', {
	        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	        weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
	        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	        weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function () {
	                return (this.day() === 0 || this.day() === 6) ?
	                    '[Último] dddd [às] LT' : // Saturday + Sunday
	                    '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'em %s',
	            past : '%s atrás',
	            s : 'poucos segundos',
	            m : 'um minuto',
	            mm : '%d minutos',
	            h : 'uma hora',
	            hh : '%d horas',
	            d : 'um dia',
	            dd : '%d dias',
	            M : 'um mês',
	            MM : '%d meses',
	            y : 'um ano',
	            yy : '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal : '%dº'
	    });
	
	    return pt_br;
	
	}));

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : romanian (ro)
	//! author : Vlad Gurdiga : https://github.com/gurdiga
	//! author : Valentin Agachi : https://github.com/avaly
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	                'mm': 'minute',
	                'hh': 'ore',
	                'dd': 'zile',
	                'MM': 'luni',
	                'yy': 'ani'
	            },
	            separator = ' ';
	        if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
	            separator = ' de ';
	        }
	        return number + separator + format[key];
	    }
	
	    var ro = moment.defineLocale('ro', {
	        months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
	        monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
	        weekdays : 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
	        weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
	        weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[azi la] LT',
	            nextDay: '[mâine la] LT',
	            nextWeek: 'dddd [la] LT',
	            lastDay: '[ieri la] LT',
	            lastWeek: '[fosta] dddd [la] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'peste %s',
	            past : '%s în urmă',
	            s : 'câteva secunde',
	            m : 'un minut',
	            mm : relativeTimeWithPlural,
	            h : 'o oră',
	            hh : relativeTimeWithPlural,
	            d : 'o zi',
	            dd : relativeTimeWithPlural,
	            M : 'o lună',
	            MM : relativeTimeWithPlural,
	            y : 'un an',
	            yy : relativeTimeWithPlural
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ro;
	
	}));

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : russian (ru)
	//! author : Viktorminator : https://github.com/Viktorminator
	//! Author : Menelion Elensúle : https://github.com/Oire
	//! author : Коренберг Марк : https://github.com/socketpair
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
	            'hh': 'час_часа_часов',
	            'dd': 'день_дня_дней',
	            'MM': 'месяц_месяца_месяцев',
	            'yy': 'год_года_лет'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'минута' : 'минуту';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];
	
	    // http://new.gramota.ru/spravka/rules/139-prop : § 103
	    var ru = moment.defineLocale('ru', {
	        months : {
	            format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
	            standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
	        },
	        monthsShort : {
	            format: 'янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек'.split('_'),
	            standalone: 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_')
	        },
	        weekdays : {
	            standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
	            format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
	            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
	        },
	        weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        monthsParse : monthsParse,
	        longMonthsParse : monthsParse,
	        shortMonthsParse : monthsParse,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY г.',
	            LLL : 'D MMMM YYYY г., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	        },
	        calendar : {
	            sameDay: '[Сегодня в] LT',
	            nextDay: '[Завтра в] LT',
	            lastDay: '[Вчера в] LT',
	            nextWeek: function (now) {
	                if (now.week() !== this.week()) {
	                    switch (this.day()) {
	                    case 0:
	                        return '[В следующее] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[В следующий] dddd [в] LT';
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[В следующую] dddd [в] LT';
	                    }
	                } else {
	                    if (this.day() === 2) {
	                        return '[Во] dddd [в] LT';
	                    } else {
	                        return '[В] dddd [в] LT';
	                    }
	                }
	            },
	            lastWeek: function (now) {
	                if (now.week() !== this.week()) {
	                    switch (this.day()) {
	                    case 0:
	                        return '[В прошлое] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[В прошлый] dddd [в] LT';
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[В прошлую] dddd [в] LT';
	                    }
	                } else {
	                    if (this.day() === 2) {
	                        return '[Во] dddd [в] LT';
	                    } else {
	                        return '[В] dddd [в] LT';
	                    }
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'через %s',
	            past : '%s назад',
	            s : 'несколько секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : 'час',
	            hh : relativeTimeWithPlural,
	            d : 'день',
	            dd : relativeTimeWithPlural,
	            M : 'месяц',
	            MM : relativeTimeWithPlural,
	            y : 'год',
	            yy : relativeTimeWithPlural
	        },
	        meridiemParse: /ночи|утра|дня|вечера/i,
	        isPM : function (input) {
	            return /^(дня|вечера)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночи';
	            } else if (hour < 12) {
	                return 'утра';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечера';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го|я)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            case 'w':
	            case 'W':
	                return number + '-я';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ru;
	
	}));

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Northern Sami (se)
	//! authors : Bård Rolstad Henriksen : https://github.com/karamell
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	
	    var se = moment.defineLocale('se', {
	        months : 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
	        monthsShort : 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
	        weekdays : 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
	        weekdaysShort : 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
	        weekdaysMin : 's_v_m_g_d_b_L'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'MMMM D. [b.] YYYY',
	            LLL : 'MMMM D. [b.] YYYY [ti.] HH:mm',
	            LLLL : 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[otne ti] LT',
	            nextDay: '[ihttin ti] LT',
	            nextWeek: 'dddd [ti] LT',
	            lastDay: '[ikte ti] LT',
	            lastWeek: '[ovddit] dddd [ti] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s geažes',
	            past : 'maŋit %s',
	            s : 'moadde sekunddat',
	            m : 'okta minuhta',
	            mm : '%d minuhtat',
	            h : 'okta diimmu',
	            hh : '%d diimmut',
	            d : 'okta beaivi',
	            dd : '%d beaivvit',
	            M : 'okta mánnu',
	            MM : '%d mánut',
	            y : 'okta jahki',
	            yy : '%d jagit'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return se;
	
	}));

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Sinhalese (si)
	//! author : Sampath Sitinamaluwa : https://github.com/sampathsris
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    /*jshint -W100*/
	    var si = moment.defineLocale('si', {
	        months : 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
	        monthsShort : 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
	        weekdays : 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
	        weekdaysShort : 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
	        weekdaysMin : 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
	        longDateFormat : {
	            LT : 'a h:mm',
	            LTS : 'a h:mm:ss',
	            L : 'YYYY/MM/DD',
	            LL : 'YYYY MMMM D',
	            LLL : 'YYYY MMMM D, a h:mm',
	            LLLL : 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
	        },
	        calendar : {
	            sameDay : '[අද] LT[ට]',
	            nextDay : '[හෙට] LT[ට]',
	            nextWeek : 'dddd LT[ට]',
	            lastDay : '[ඊයේ] LT[ට]',
	            lastWeek : '[පසුගිය] dddd LT[ට]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%sකින්',
	            past : '%sකට පෙර',
	            s : 'තත්පර කිහිපය',
	            m : 'මිනිත්තුව',
	            mm : 'මිනිත්තු %d',
	            h : 'පැය',
	            hh : 'පැය %d',
	            d : 'දිනය',
	            dd : 'දින %d',
	            M : 'මාසය',
	            MM : 'මාස %d',
	            y : 'වසර',
	            yy : 'වසර %d'
	        },
	        ordinalParse: /\d{1,2} වැනි/,
	        ordinal : function (number) {
	            return number + ' වැනි';
	        },
	        meridiemParse : /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
	        isPM : function (input) {
	            return input === 'ප.ව.' || input === 'පස් වරු';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'ප.ව.' : 'පස් වරු';
	            } else {
	                return isLower ? 'පෙ.ව.' : 'පෙර වරු';
	            }
	        }
	    });
	
	    return si;
	
	}));

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : slovak (sk)
	//! author : Martin Minka : https://github.com/k2s
	//! based on work of petrbela : https://github.com/petrbela
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
	        monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
	    function plural(n) {
	        return (n > 1) && (n < 5);
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minúty' : 'minút');
	            } else {
	                return result + 'minútami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodín');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dni' : 'dní');
	            } else {
	                return result + 'dňami';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'mesiace' : 'mesiacov');
	            } else {
	                return result + 'mesiacmi';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'rokov');
	            } else {
	                return result + 'rokmi';
	            }
	            break;
	        }
	    }
	
	    var sk = moment.defineLocale('sk', {
	        months : months,
	        monthsShort : monthsShort,
	        weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
	        weekdaysShort : 'ne_po_ut_st_št_pi_so'.split('_'),
	        weekdaysMin : 'ne_po_ut_st_št_pi_so'.split('_'),
	        longDateFormat : {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[dnes o] LT',
	            nextDay: '[zajtra o] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [o] LT';
	                case 3:
	                    return '[v stredu o] LT';
	                case 4:
	                    return '[vo štvrtok o] LT';
	                case 5:
	                    return '[v piatok o] LT';
	                case 6:
	                    return '[v sobotu o] LT';
	                }
	            },
	            lastDay: '[včera o] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[minulú nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[minulý] dddd [o] LT';
	                case 3:
	                    return '[minulú stredu o] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [o] LT';
	                case 6:
	                    return '[minulú sobotu o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : 'pred %s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return sk;
	
	}));

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : slovenian (sl)
	//! author : Robert Sedovšek : https://github.com/sedovsek
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':
	            return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
	        case 'm':
	            return withoutSuffix ? 'ena minuta' : 'eno minuto';
	        case 'mm':
	            if (number === 1) {
	                result += withoutSuffix ? 'minuta' : 'minuto';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'minute' : 'minutami';
	            } else {
	                result += withoutSuffix || isFuture ? 'minut' : 'minutami';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'ena ura' : 'eno uro';
	        case 'hh':
	            if (number === 1) {
	                result += withoutSuffix ? 'ura' : 'uro';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'uri' : 'urama';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'ure' : 'urami';
	            } else {
	                result += withoutSuffix || isFuture ? 'ur' : 'urami';
	            }
	            return result;
	        case 'd':
	            return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
	        case 'dd':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'dan' : 'dnem';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
	            } else {
	                result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
	            }
	            return result;
	        case 'M':
	            return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
	        case 'MM':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
	            } else {
	                result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
	            }
	            return result;
	        case 'y':
	            return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
	        case 'yy':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'leto' : 'letom';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'leti' : 'letoma';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'leta' : 'leti';
	            } else {
	                result += withoutSuffix || isFuture ? 'let' : 'leti';
	            }
	            return result;
	        }
	    }
	
	    var sl = moment.defineLocale('sl', {
	        months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
	        weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
	        weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
	        weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danes ob] LT',
	            nextDay  : '[jutri ob] LT',
	
	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v] [nedeljo] [ob] LT';
	                case 3:
	                    return '[v] [sredo] [ob] LT';
	                case 6:
	                    return '[v] [soboto] [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[v] dddd [ob] LT';
	                }
	            },
	            lastDay  : '[včeraj ob] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[prejšnjo] [nedeljo] [ob] LT';
	                case 3:
	                    return '[prejšnjo] [sredo] [ob] LT';
	                case 6:
	                    return '[prejšnjo] [soboto] [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prejšnji] dddd [ob] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'čez %s',
	            past   : 'pred %s',
	            s      : processRelativeTime,
	            m      : processRelativeTime,
	            mm     : processRelativeTime,
	            h      : processRelativeTime,
	            hh     : processRelativeTime,
	            d      : processRelativeTime,
	            dd     : processRelativeTime,
	            M      : processRelativeTime,
	            MM     : processRelativeTime,
	            y      : processRelativeTime,
	            yy     : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return sl;
	
	}));

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Albanian (sq)
	//! author : Flakërim Ismani : https://github.com/flakerimi
	//! author: Menelion Elensúle: https://github.com/Oire (tests)
	//! author : Oerd Cukalla : https://github.com/oerd (fixes)
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var sq = moment.defineLocale('sq', {
	        months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
	        monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
	        weekdays : 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
	        weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
	        weekdaysMin : 'D_H_Ma_Më_E_P_Sh'.split('_'),
	        meridiemParse: /PD|MD/,
	        isPM: function (input) {
	            return input.charAt(0) === 'M';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            return hours < 12 ? 'PD' : 'MD';
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Sot në] LT',
	            nextDay : '[Nesër në] LT',
	            nextWeek : 'dddd [në] LT',
	            lastDay : '[Dje në] LT',
	            lastWeek : 'dddd [e kaluar në] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'në %s',
	            past : '%s më parë',
	            s : 'disa sekonda',
	            m : 'një minutë',
	            mm : '%d minuta',
	            h : 'një orë',
	            hh : '%d orë',
	            d : 'një ditë',
	            dd : '%d ditë',
	            M : 'një muaj',
	            MM : '%d muaj',
	            y : 'një vit',
	            yy : '%d vite'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return sq;
	
	}));

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian-latin (sr)
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var translator = {
	        words: { //Different grammatical cases
	            m: ['jedan minut', 'jedne minute'],
	            mm: ['minut', 'minute', 'minuta'],
	            h: ['jedan sat', 'jednog sata'],
	            hh: ['sat', 'sata', 'sati'],
	            dd: ['dan', 'dana', 'dana'],
	            MM: ['mesec', 'meseca', 'meseci'],
	            yy: ['godina', 'godine', 'godina']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };
	
	    var sr = moment.defineLocale('sr', {
	        months: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
	        monthsShort: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun', 'jul', 'avg.', 'sep.', 'okt.', 'nov.', 'dec.'],
	        weekdays: ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'],
	        weekdaysShort: ['ned.', 'pon.', 'uto.', 'sre.', 'čet.', 'pet.', 'sub.'],
	        weekdaysMin: ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su'],
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sutra u] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedelju] [u] LT';
	                case 3:
	                    return '[u] [sredu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[juče u] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[prošle] [nedelje] [u] LT',
	                    '[prošlog] [ponedeljka] [u] LT',
	                    '[prošlog] [utorka] [u] LT',
	                    '[prošle] [srede] [u] LT',
	                    '[prošlog] [četvrtka] [u] LT',
	                    '[prošlog] [petka] [u] LT',
	                    '[prošle] [subote] [u] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'pre %s',
	            s      : 'nekoliko sekundi',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'dan',
	            dd     : translator.translate,
	            M      : 'mesec',
	            MM     : translator.translate,
	            y      : 'godinu',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return sr;
	
	}));

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian-cyrillic (sr-cyrl)
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var translator = {
	        words: { //Different grammatical cases
	            m: ['један минут', 'једне минуте'],
	            mm: ['минут', 'минуте', 'минута'],
	            h: ['један сат', 'једног сата'],
	            hh: ['сат', 'сата', 'сати'],
	            dd: ['дан', 'дана', 'дана'],
	            MM: ['месец', 'месеца', 'месеци'],
	            yy: ['година', 'године', 'година']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };
	
	    var sr_cyrl = moment.defineLocale('sr-cyrl', {
	        months: ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар'],
	        monthsShort: ['јан.', 'феб.', 'мар.', 'апр.', 'мај', 'јун', 'јул', 'авг.', 'сеп.', 'окт.', 'нов.', 'дец.'],
	        weekdays: ['недеља', 'понедељак', 'уторак', 'среда', 'четвртак', 'петак', 'субота'],
	        weekdaysShort: ['нед.', 'пон.', 'уто.', 'сре.', 'чет.', 'пет.', 'суб.'],
	        weekdaysMin: ['не', 'по', 'ут', 'ср', 'че', 'пе', 'су'],
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[данас у] LT',
	            nextDay: '[сутра у] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[у] [недељу] [у] LT';
	                case 3:
	                    return '[у] [среду] [у] LT';
	                case 6:
	                    return '[у] [суботу] [у] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[у] dddd [у] LT';
	                }
	            },
	            lastDay  : '[јуче у] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[прошле] [недеље] [у] LT',
	                    '[прошлог] [понедељка] [у] LT',
	                    '[прошлог] [уторка] [у] LT',
	                    '[прошле] [среде] [у] LT',
	                    '[прошлог] [четвртка] [у] LT',
	                    '[прошлог] [петка] [у] LT',
	                    '[прошле] [суботе] [у] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'за %s',
	            past   : 'пре %s',
	            s      : 'неколико секунди',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'дан',
	            dd     : translator.translate,
	            M      : 'месец',
	            MM     : translator.translate,
	            y      : 'годину',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return sr_cyrl;
	
	}));

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : swedish (sv)
	//! author : Jens Alm : https://github.com/ulmus
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var sv = moment.defineLocale('sv', {
	        months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
	        weekdaysShort : 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
	        weekdaysMin : 'sö_må_ti_on_to_fr_lö'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Idag] LT',
	            nextDay: '[Imorgon] LT',
	            lastDay: '[Igår] LT',
	            nextWeek: '[På] dddd LT',
	            lastWeek: '[I] dddd[s] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : 'för %s sedan',
	            s : 'några sekunder',
	            m : 'en minut',
	            mm : '%d minuter',
	            h : 'en timme',
	            hh : '%d timmar',
	            d : 'en dag',
	            dd : '%d dagar',
	            M : 'en månad',
	            MM : '%d månader',
	            y : 'ett år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}(e|a)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'e' :
	                (b === 1) ? 'a' :
	                (b === 2) ? 'a' :
	                (b === 3) ? 'e' : 'e';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return sv;
	
	}));

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : swahili (sw)
	//! author : Fahad Kassim : https://github.com/fadsel
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var sw = moment.defineLocale('sw', {
	        months : 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
	        weekdaysShort : 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
	        weekdaysMin : 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[leo saa] LT',
	            nextDay : '[kesho saa] LT',
	            nextWeek : '[wiki ijayo] dddd [saat] LT',
	            lastDay : '[jana] LT',
	            lastWeek : '[wiki iliyopita] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s baadaye',
	            past : 'tokea %s',
	            s : 'hivi punde',
	            m : 'dakika moja',
	            mm : 'dakika %d',
	            h : 'saa limoja',
	            hh : 'masaa %d',
	            d : 'siku moja',
	            dd : 'masiku %d',
	            M : 'mwezi mmoja',
	            MM : 'miezi %d',
	            y : 'mwaka mmoja',
	            yy : 'miaka %d'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return sw;
	
	}));

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : tamil (ta)
	//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '௧',
	        '2': '௨',
	        '3': '௩',
	        '4': '௪',
	        '5': '௫',
	        '6': '௬',
	        '7': '௭',
	        '8': '௮',
	        '9': '௯',
	        '0': '௦'
	    }, numberMap = {
	        '௧': '1',
	        '௨': '2',
	        '௩': '3',
	        '௪': '4',
	        '௫': '5',
	        '௬': '6',
	        '௭': '7',
	        '௮': '8',
	        '௯': '9',
	        '௦': '0'
	    };
	
	    var ta = moment.defineLocale('ta', {
	        months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
	        weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
	        weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, HH:mm',
	            LLLL : 'dddd, D MMMM YYYY, HH:mm'
	        },
	        calendar : {
	            sameDay : '[இன்று] LT',
	            nextDay : '[நாளை] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[நேற்று] LT',
	            lastWeek : '[கடந்த வாரம்] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s இல்',
	            past : '%s முன்',
	            s : 'ஒரு சில விநாடிகள்',
	            m : 'ஒரு நிமிடம்',
	            mm : '%d நிமிடங்கள்',
	            h : 'ஒரு மணி நேரம்',
	            hh : '%d மணி நேரம்',
	            d : 'ஒரு நாள்',
	            dd : '%d நாட்கள்',
	            M : 'ஒரு மாதம்',
	            MM : '%d மாதங்கள்',
	            y : 'ஒரு வருடம்',
	            yy : '%d ஆண்டுகள்'
	        },
	        ordinalParse: /\d{1,2}வது/,
	        ordinal : function (number) {
	            return number + 'வது';
	        },
	        preparse: function (string) {
	            return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // refer http://ta.wikipedia.org/s/1er1
	        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 2) {
	                return ' யாமம்';
	            } else if (hour < 6) {
	                return ' வைகறை';  // வைகறை
	            } else if (hour < 10) {
	                return ' காலை'; // காலை
	            } else if (hour < 14) {
	                return ' நண்பகல்'; // நண்பகல்
	            } else if (hour < 18) {
	                return ' எற்பாடு'; // எற்பாடு
	            } else if (hour < 22) {
	                return ' மாலை'; // மாலை
	            } else {
	                return ' யாமம்';
	            }
	        },
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'யாமம்') {
	                return hour < 2 ? hour : hour + 12;
	            } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
	                return hour;
	            } else if (meridiem === 'நண்பகல்') {
	                return hour >= 10 ? hour : hour + 12;
	            } else {
	                return hour + 12;
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ta;
	
	}));

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : telugu (te)
	//! author : Krishna Chaitanya Thota : https://github.com/kcthota
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var te = moment.defineLocale('te', {
	        months : 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
	        monthsShort : 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
	        weekdays : 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
	        weekdaysShort : 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
	        weekdaysMin : 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm',
	            LTS : 'A h:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm'
	        },
	        calendar : {
	            sameDay : '[నేడు] LT',
	            nextDay : '[రేపు] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[నిన్న] LT',
	            lastWeek : '[గత] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s లో',
	            past : '%s క్రితం',
	            s : 'కొన్ని క్షణాలు',
	            m : 'ఒక నిమిషం',
	            mm : '%d నిమిషాలు',
	            h : 'ఒక గంట',
	            hh : '%d గంటలు',
	            d : 'ఒక రోజు',
	            dd : '%d రోజులు',
	            M : 'ఒక నెల',
	            MM : '%d నెలలు',
	            y : 'ఒక సంవత్సరం',
	            yy : '%d సంవత్సరాలు'
	        },
	        ordinalParse : /\d{1,2}వ/,
	        ordinal : '%dవ',
	        meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'రాత్రి') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'ఉదయం') {
	                return hour;
	            } else if (meridiem === 'మధ్యాహ్నం') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'సాయంత్రం') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'రాత్రి';
	            } else if (hour < 10) {
	                return 'ఉదయం';
	            } else if (hour < 17) {
	                return 'మధ్యాహ్నం';
	            } else if (hour < 20) {
	                return 'సాయంత్రం';
	            } else {
	                return 'రాత్రి';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return te;
	
	}));

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : thai (th)
	//! author : Kridsada Thanabulpong : https://github.com/sirn
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var th = moment.defineLocale('th', {
	        months : 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
	        monthsShort : 'มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา'.split('_'),
	        weekdays : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
	        weekdaysShort : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
	        weekdaysMin : 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
	        longDateFormat : {
	            LT : 'H นาฬิกา m นาที',
	            LTS : 'H นาฬิกา m นาที s วินาที',
	            L : 'YYYY/MM/DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY เวลา H นาฬิกา m นาที',
	            LLLL : 'วันddddที่ D MMMM YYYY เวลา H นาฬิกา m นาที'
	        },
	        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
	        isPM: function (input) {
	            return input === 'หลังเที่ยง';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ก่อนเที่ยง';
	            } else {
	                return 'หลังเที่ยง';
	            }
	        },
	        calendar : {
	            sameDay : '[วันนี้ เวลา] LT',
	            nextDay : '[พรุ่งนี้ เวลา] LT',
	            nextWeek : 'dddd[หน้า เวลา] LT',
	            lastDay : '[เมื่อวานนี้ เวลา] LT',
	            lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'อีก %s',
	            past : '%sที่แล้ว',
	            s : 'ไม่กี่วินาที',
	            m : '1 นาที',
	            mm : '%d นาที',
	            h : '1 ชั่วโมง',
	            hh : '%d ชั่วโมง',
	            d : '1 วัน',
	            dd : '%d วัน',
	            M : '1 เดือน',
	            MM : '%d เดือน',
	            y : '1 ปี',
	            yy : '%d ปี'
	        }
	    });
	
	    return th;
	
	}));

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tagalog/Filipino (tl-ph)
	//! author : Dan Hagman
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var tl_ph = moment.defineLocale('tl-ph', {
	        months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
	        monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
	        weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
	        weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
	        weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'MM/D/YYYY',
	            LL : 'MMMM D, YYYY',
	            LLL : 'MMMM D, YYYY HH:mm',
	            LLLL : 'dddd, MMMM DD, YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Ngayon sa] LT',
	            nextDay: '[Bukas sa] LT',
	            nextWeek: 'dddd [sa] LT',
	            lastDay: '[Kahapon sa] LT',
	            lastWeek: 'dddd [huling linggo] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'sa loob ng %s',
	            past : '%s ang nakalipas',
	            s : 'ilang segundo',
	            m : 'isang minuto',
	            mm : '%d minuto',
	            h : 'isang oras',
	            hh : '%d oras',
	            d : 'isang araw',
	            dd : '%d araw',
	            M : 'isang buwan',
	            MM : '%d buwan',
	            y : 'isang taon',
	            yy : '%d taon'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : function (number) {
	            return number;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return tl_ph;
	
	}));

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Klingon (tlh)
	//! author : Dominika Kruk : https://github.com/amaranthrose
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');
	
	    function translateFuture(output) {
	        var time = output;
	        time = (output.indexOf('jaj') !== -1) ?
	    	time.slice(0, -3) + 'leS' :
	    	(output.indexOf('jar') !== -1) ?
	    	time.slice(0, -3) + 'waQ' :
	    	(output.indexOf('DIS') !== -1) ?
	    	time.slice(0, -3) + 'nem' :
	    	time + ' pIq';
	        return time;
	    }
	
	    function translatePast(output) {
	        var time = output;
	        time = (output.indexOf('jaj') !== -1) ?
	    	time.slice(0, -3) + 'Hu’' :
	    	(output.indexOf('jar') !== -1) ?
	    	time.slice(0, -3) + 'wen' :
	    	(output.indexOf('DIS') !== -1) ?
	    	time.slice(0, -3) + 'ben' :
	    	time + ' ret';
	        return time;
	    }
	
	    function translate(number, withoutSuffix, string, isFuture) {
	        var numberNoun = numberAsNoun(number);
	        switch (string) {
	            case 'mm':
	                return numberNoun + ' tup';
	            case 'hh':
	                return numberNoun + ' rep';
	            case 'dd':
	                return numberNoun + ' jaj';
	            case 'MM':
	                return numberNoun + ' jar';
	            case 'yy':
	                return numberNoun + ' DIS';
	        }
	    }
	
	    function numberAsNoun(number) {
	        var hundred = Math.floor((number % 1000) / 100),
	    	ten = Math.floor((number % 100) / 10),
	    	one = number % 10,
	    	word = '';
	        if (hundred > 0) {
	            word += numbersNouns[hundred] + 'vatlh';
	        }
	        if (ten > 0) {
	            word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
	        }
	        if (one > 0) {
	            word += ((word !== '') ? ' ' : '') + numbersNouns[one];
	        }
	        return (word === '') ? 'pagh' : word;
	    }
	
	    var tlh = moment.defineLocale('tlh', {
	        months : 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
	        monthsShort : 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
	        weekdays : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        weekdaysShort : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        weekdaysMin : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[DaHjaj] LT',
	            nextDay: '[wa’leS] LT',
	            nextWeek: 'LLL',
	            lastDay: '[wa’Hu’] LT',
	            lastWeek: 'LLL',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : translateFuture,
	            past : translatePast,
	            s : 'puS lup',
	            m : 'wa’ tup',
	            mm : translate,
	            h : 'wa’ rep',
	            hh : translate,
	            d : 'wa’ jaj',
	            dd : translate,
	            M : 'wa’ jar',
	            MM : translate,
	            y : 'wa’ DIS',
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return tlh;
	
	}));

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : turkish (tr)
	//! authors : Erhan Gundogan : https://github.com/erhangundogan,
	//!           Burak Yiğit Kaya: https://github.com/BYK
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var suffixes = {
	        1: '\'inci',
	        5: '\'inci',
	        8: '\'inci',
	        70: '\'inci',
	        80: '\'inci',
	        2: '\'nci',
	        7: '\'nci',
	        20: '\'nci',
	        50: '\'nci',
	        3: '\'üncü',
	        4: '\'üncü',
	        100: '\'üncü',
	        6: '\'ncı',
	        9: '\'uncu',
	        10: '\'uncu',
	        30: '\'uncu',
	        60: '\'ıncı',
	        90: '\'ıncı'
	    };
	
	    var tr = moment.defineLocale('tr', {
	        months : 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
	        monthsShort : 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
	        weekdays : 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
	        weekdaysShort : 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
	        weekdaysMin : 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[bugün saat] LT',
	            nextDay : '[yarın saat] LT',
	            nextWeek : '[haftaya] dddd [saat] LT',
	            lastDay : '[dün] LT',
	            lastWeek : '[geçen hafta] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s sonra',
	            past : '%s önce',
	            s : 'birkaç saniye',
	            m : 'bir dakika',
	            mm : '%d dakika',
	            h : 'bir saat',
	            hh : '%d saat',
	            d : 'bir gün',
	            dd : '%d gün',
	            M : 'bir ay',
	            MM : '%d ay',
	            y : 'bir yıl',
	            yy : '%d yıl'
	        },
	        ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
	        ordinal : function (number) {
	            if (number === 0) {  // special case for zero
	                return number + '\'ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return tr;
	
	}));

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : talossan (tzl)
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v with the help of Iustì Canun
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	
	    // After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
	    // This is currently too difficult (maybe even impossible) to add.
	    var tzl = moment.defineLocale('tzl', {
	        months : 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
	        weekdays : 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
	        weekdaysShort : 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
	        weekdaysMin : 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM [dallas] YYYY',
	            LLL : 'D. MMMM [dallas] YYYY HH.mm',
	            LLLL : 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
	        },
	        meridiemParse: /d\'o|d\'a/i,
	        isPM : function (input) {
	            return 'd\'o' === input.toLowerCase();
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'd\'o' : 'D\'O';
	            } else {
	                return isLower ? 'd\'a' : 'D\'A';
	            }
	        },
	        calendar : {
	            sameDay : '[oxhi à] LT',
	            nextDay : '[demà à] LT',
	            nextWeek : 'dddd [à] LT',
	            lastDay : '[ieiri à] LT',
	            lastWeek : '[sür el] dddd [lasteu à] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'osprei %s',
	            past : 'ja%s',
	            s : processRelativeTime,
	            m : processRelativeTime,
	            mm : processRelativeTime,
	            h : processRelativeTime,
	            hh : processRelativeTime,
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            's': ['viensas secunds', '\'iensas secunds'],
	            'm': ['\'n míut', '\'iens míut'],
	            'mm': [number + ' míuts', '' + number + ' míuts'],
	            'h': ['\'n þora', '\'iensa þora'],
	            'hh': [number + ' þoras', '' + number + ' þoras'],
	            'd': ['\'n ziua', '\'iensa ziua'],
	            'dd': [number + ' ziuas', '' + number + ' ziuas'],
	            'M': ['\'n mes', '\'iens mes'],
	            'MM': [number + ' mesen', '' + number + ' mesen'],
	            'y': ['\'n ar', '\'iens ar'],
	            'yy': [number + ' ars', '' + number + ' ars']
	        };
	        return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1]);
	    }
	
	    return tzl;
	
	}));

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Morocco Central Atlas Tamaziɣt (tzm)
	//! author : Abdel Said : https://github.com/abdelsaid
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var tzm = moment.defineLocale('tzm', {
	        months : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        monthsShort : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        weekdays : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysShort : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysMin : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
	            nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
	            nextWeek: 'dddd [ⴴ] LT',
	            lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
	            lastWeek: 'dddd [ⴴ] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
	            past : 'ⵢⴰⵏ %s',
	            s : 'ⵉⵎⵉⴽ',
	            m : 'ⵎⵉⵏⵓⴺ',
	            mm : '%d ⵎⵉⵏⵓⴺ',
	            h : 'ⵙⴰⵄⴰ',
	            hh : '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
	            d : 'ⴰⵙⵙ',
	            dd : '%d oⵙⵙⴰⵏ',
	            M : 'ⴰⵢoⵓⵔ',
	            MM : '%d ⵉⵢⵢⵉⵔⵏ',
	            y : 'ⴰⵙⴳⴰⵙ',
	            yy : '%d ⵉⵙⴳⴰⵙⵏ'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return tzm;
	
	}));

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Morocco Central Atlas Tamaziɣt in Latin (tzm-latn)
	//! author : Abdel Said : https://github.com/abdelsaid
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var tzm_latn = moment.defineLocale('tzm-latn', {
	        months : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        monthsShort : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[asdkh g] LT',
	            nextDay: '[aska g] LT',
	            nextWeek: 'dddd [g] LT',
	            lastDay: '[assant g] LT',
	            lastWeek: 'dddd [g] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dadkh s yan %s',
	            past : 'yan %s',
	            s : 'imik',
	            m : 'minuḍ',
	            mm : '%d minuḍ',
	            h : 'saɛa',
	            hh : '%d tassaɛin',
	            d : 'ass',
	            dd : '%d ossan',
	            M : 'ayowr',
	            MM : '%d iyyirn',
	            y : 'asgas',
	            yy : '%d isgasn'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return tzm_latn;
	
	}));

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : ukrainian (uk)
	//! author : zemlanin : https://github.com/zemlanin
	//! Author : Menelion Elensúle : https://github.com/Oire
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
	            'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
	            'dd': 'день_дні_днів',
	            'MM': 'місяць_місяці_місяців',
	            'yy': 'рік_роки_років'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвилина' : 'хвилину';
	        }
	        else if (key === 'h') {
	            return withoutSuffix ? 'година' : 'годину';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    function weekdaysCaseReplace(m, format) {
	        var weekdays = {
	            'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
	            'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
	            'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
	        },
	        nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
	            'accusative' :
	            ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
	                'genitive' :
	                'nominative');
	        return weekdays[nounCase][m.day()];
	    }
	    function processHoursFunction(str) {
	        return function () {
	            return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
	        };
	    }
	
	    var uk = moment.defineLocale('uk', {
	        months : {
	            'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
	            'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
	        },
	        monthsShort : 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
	        weekdays : weekdaysCaseReplace,
	        weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY р.',
	            LLL : 'D MMMM YYYY р., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY р., HH:mm'
	        },
	        calendar : {
	            sameDay: processHoursFunction('[Сьогодні '),
	            nextDay: processHoursFunction('[Завтра '),
	            lastDay: processHoursFunction('[Вчора '),
	            nextWeek: processHoursFunction('[У] dddd ['),
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return processHoursFunction('[Минулої] dddd [').call(this);
	                case 1:
	                case 2:
	                case 4:
	                    return processHoursFunction('[Минулого] dddd [').call(this);
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'за %s',
	            past : '%s тому',
	            s : 'декілька секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : 'годину',
	            hh : relativeTimeWithPlural,
	            d : 'день',
	            dd : relativeTimeWithPlural,
	            M : 'місяць',
	            MM : relativeTimeWithPlural,
	            y : 'рік',
	            yy : relativeTimeWithPlural
	        },
	        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
	        meridiemParse: /ночі|ранку|дня|вечора/,
	        isPM: function (input) {
	            return /^(дня|вечора)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночі';
	            } else if (hour < 12) {
	                return 'ранку';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечора';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return uk;
	
	}));

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : uzbek (uz)
	//! author : Sardor Muminov : https://github.com/muminoff
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var uz = moment.defineLocale('uz', {
	        months : 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
	        monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
	        weekdays : 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
	        weekdaysShort : 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
	        weekdaysMin : 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'D MMMM YYYY, dddd HH:mm'
	        },
	        calendar : {
	            sameDay : '[Бугун соат] LT [да]',
	            nextDay : '[Эртага] LT [да]',
	            nextWeek : 'dddd [куни соат] LT [да]',
	            lastDay : '[Кеча соат] LT [да]',
	            lastWeek : '[Утган] dddd [куни соат] LT [да]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'Якин %s ичида',
	            past : 'Бир неча %s олдин',
	            s : 'фурсат',
	            m : 'бир дакика',
	            mm : '%d дакика',
	            h : 'бир соат',
	            hh : '%d соат',
	            d : 'бир кун',
	            dd : '%d кун',
	            M : 'бир ой',
	            MM : '%d ой',
	            y : 'бир йил',
	            yy : '%d йил'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return uz;
	
	}));

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : vietnamese (vi)
	//! author : Bang Nguyen : https://github.com/bangnk
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var vi = moment.defineLocale('vi', {
	        months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
	        monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
	        weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
	        weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        meridiemParse: /sa|ch/i,
	        isPM : function (input) {
	            return /^ch$/i.test(input);
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower ? 'sa' : 'SA';
	            } else {
	                return isLower ? 'ch' : 'CH';
	            }
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM [năm] YYYY',
	            LLL : 'D MMMM [năm] YYYY HH:mm',
	            LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
	            l : 'DD/M/YYYY',
	            ll : 'D MMM YYYY',
	            lll : 'D MMM YYYY HH:mm',
	            llll : 'ddd, D MMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hôm nay lúc] LT',
	            nextDay: '[Ngày mai lúc] LT',
	            nextWeek: 'dddd [tuần tới lúc] LT',
	            lastDay: '[Hôm qua lúc] LT',
	            lastWeek: 'dddd [tuần rồi lúc] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s tới',
	            past : '%s trước',
	            s : 'vài giây',
	            m : 'một phút',
	            mm : '%d phút',
	            h : 'một giờ',
	            hh : '%d giờ',
	            d : 'một ngày',
	            dd : '%d ngày',
	            M : 'một tháng',
	            MM : '%d tháng',
	            y : 'một năm',
	            yy : '%d năm'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : function (number) {
	            return number;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return vi;
	
	}));

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : chinese (zh-cn)
	//! author : suupic : https://github.com/suupic
	//! author : Zeno Zeng : https://github.com/zenozeng
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var zh_cn = moment.defineLocale('zh-cn', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah点mm分',
	            LTS : 'Ah点m分s秒',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日Ah点mm分',
	            LLLL : 'YYYY年MMMD日ddddAh点mm分',
	            l : 'YYYY-MM-DD',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日Ah点mm分',
	            llll : 'YYYY年MMMD日ddddAh点mm分'
	        },
	        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '凌晨' || meridiem === '早上' ||
	                    meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            } else {
	                // '中午'
	                return hour >= 11 ? hour : hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 600) {
	                return '凌晨';
	            } else if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : function () {
	                return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
	            },
	            nextDay : function () {
	                return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
	            },
	            lastDay : function () {
	                return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
	            },
	            nextWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            lastWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            sameElse : 'LL'
	        },
	        ordinalParse: /\d{1,2}(日|月|周)/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            case 'M':
	                return number + '月';
	            case 'w':
	            case 'W':
	                return number + '周';
	            default:
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s内',
	            past : '%s前',
	            s : '几秒',
	            m : '1 分钟',
	            mm : '%d 分钟',
	            h : '1 小时',
	            hh : '%d 小时',
	            d : '1 天',
	            dd : '%d 天',
	            M : '1 个月',
	            MM : '%d 个月',
	            y : '1 年',
	            yy : '%d 年'
	        },
	        week : {
	            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return zh_cn;
	
	}));

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : traditional chinese (zh-tw)
	//! author : Ben : https://github.com/ben-lin
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(12)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var zh_tw = moment.defineLocale('zh-tw', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah點mm分',
	            LTS : 'Ah點m分s秒',
	            L : 'YYYY年MMMD日',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日Ah點mm分',
	            LLLL : 'YYYY年MMMD日ddddAh點mm分',
	            l : 'YYYY年MMMD日',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日Ah點mm分',
	            llll : 'YYYY年MMMD日ddddAh點mm分'
	        },
	        meridiemParse: /早上|上午|中午|下午|晚上/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '早上' || meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '中午') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : '[今天]LT',
	            nextDay : '[明天]LT',
	            nextWeek : '[下]ddddLT',
	            lastDay : '[昨天]LT',
	            lastWeek : '[上]ddddLT',
	            sameElse : 'L'
	        },
	        ordinalParse: /\d{1,2}(日|月|週)/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd' :
	            case 'D' :
	            case 'DDD' :
	                return number + '日';
	            case 'M' :
	                return number + '月';
	            case 'w' :
	            case 'W' :
	                return number + '週';
	            default :
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s內',
	            past : '%s前',
	            s : '幾秒',
	            m : '一分鐘',
	            mm : '%d分鐘',
	            h : '一小時',
	            hh : '%d小時',
	            d : '一天',
	            dd : '%d天',
	            M : '一個月',
	            MM : '%d個月',
	            y : '一年',
	            yy : '%d年'
	        }
	    });
	
	    return zh_tw;
	
	}));

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var getFlightDetails = __webpack_require__(11).getFlightDetails;
	var getTotalFlightPrice = __webpack_require__(11).getTotalFlightPrice;
	var getFlightDuration = __webpack_require__(11).getFlightDuration;
	var getNumberOfStopovers = __webpack_require__(11).getNumberOfStopovers;
	var getOriginIata = __webpack_require__(11).getOriginIata;
	var getDestinationIata = __webpack_require__(11).getDestinationIata;
	
	var originCityName, destinationCityName, originIATA, destinationIATA, flightDuration, flightPrice, numberStopovers;
	
	var divIds = ["origin-cityname", "destination-cityname", "origin-iata", "destination-iata", "flight-duration", "flight-price", "number-stopovers"];
	
	function populateFlightsView(data) {
	  console.log("PopulateFlightsView has been called");
	  for(itinerary in data.results) {
	    console.log("creating a card");
	    createCard(itinerary);
	    console.log("writing stuff to a card");
	    writeCardContents(data, itinerary);
	  }
	}
	
	function createCard(index) {
	  var flightResultsContainer = document.querySelector('.flight-results-container');
	  var card = document.createElement('section');
	  var div = document.createElement('div');
	
	  card.className = 'temp-card';
	
	  for(var id of divIds) {
	    var div = document.createElement('div');
	    div.id = (id + index);
	    card.appendChild(div);
	  }
	
	  flightResultsContainer.appendChild(card);
	  getCardIds(index);
	  console.log("card has been created")
	}
	
	function getCardIds(index) {
	  originCityName = document.getElementById("origin-cityname" + index);
	  destinationCityName = document.getElementById("destination-cityname" + index);
	  originIATA = document.getElementById("origin-iata" + index);
	  destinationIATA = document.getElementById("destination-iata" + index);
	  flightDuration = document.getElementById("flight-duration" + index);
	  flightPrice = document.getElementById("flight-price" + index);
	  numberStopovers = document.getElementById("number-stopovers" + index);
	}
	
	function writeCardContents(data, index) {
	  originCityName.innerHTML = 'From: ' + getOriginIata(data, index);
	  destinationCityName.innerHTML = 'To: ' + getDestinationIata(data, index);
	  originIATA.innerHTML = "Origin IATA " + getOriginIata(data, index);
	  destinationIATA.innerHTML = "Destination IATA " + getDestinationIata(data, index);
	  flightDuration.innerHTML = "Flight Duration " + getFlightDuration(data, index) + "h";
	  flightPrice.innerHTML = "Flight Price " + getTotalFlightPrice(data, index);
	  numberStopovers.innerHTML = "Stopovers " + getNumberOfStopovers(data, index);
	}
	
	module.exports = {
	  populateFlightsView: populateFlightsView
	}
	
	// for each result
	// grab details
	// print card with details

/***/ },
/* 113 */
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(115);
	
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
/* 115 */
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
/* 116 */,
/* 117 */,
/* 118 */
/***/ function(module, exports) {

	$(document).ready(function() {
	  console.log("Hello from autocomplete");
	  $("#origin").autocomplete({
	    source: "/airports",
	    minLength: 2,
	    open: function(e,ui) {
	      var acData = $(this).data('autocomplete');
	      acData
	        .menu
	        .element
	        .find('a')
	        .each(function() {
	            var me = $(this);
	            var regex = new RegExp( '(' + acData.term + ')', 'gi' );
	            me.html( me.text().replace(regex, termTemplate) );
	        });
	    }
	  });
	});

/***/ },
/* 119 */
/***/ function(module, exports) {

	$(document).ready(function() {
	  console.log("Hello from autocomplete");
	  $("#destination").autocomplete({
	    source: "/airports",
	    minLength: 2,
	    open: function(e,ui) {
	      var acData = $(this).data('autocomplete');
	      acData
	        .menu
	        .element
	        .find('a')
	        .each(function() {
	            var me = $(this);
	            var regex = new RegExp( '(' + acData.term + ')', 'gi' );
	            me.html( me.text().replace(regex, termTemplate) );
	        });
	    }
	  });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map