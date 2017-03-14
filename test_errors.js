//using CasperJS, we look for and log JS errors
//to run this, type: casperjs test_errors.js allUrls
//it will output an HTML file with errors.
'use strict';
var casper = require('casper').create({    
	verbose: true,
    logLevel: 'debug'
});
var fs = require('fs');
var errors = [];

var allUrls = {
    redesignUrls: [
    'business/intellectual-property/utility-patent-overview.html',
    'business/intellectual-property/utility-patent-pricing.html'
    ],
    legacy: [

    ],
    drupal: [
    ]
  };

var basePath = "https://www.legalzoom.com";
if (casper.cli.has("basepath")) {
    var getPath = casper.cli.get('basepath');
    if (!getPath || !getPath.match(/http(s)?:\/\/[a-z-]+\.legalzoom\.com/) || !getPath.match(/http(s)?:\/\/[a-z-]+\.legalzoom\.com/).length) {
        casper.echo("Invalid basepath supplied!");
        casper.exit();
    }
    else basePath = getPath;
}

var pageType = 'redesignUrls';
if (casper.cli.has("pagetype")) pageType = casper.cli.get('pagetype');

if (!allUrls[pageType]) {
    casper.echo("Invalid pagetype supplied!");
    casper.exit();
}

var firstUrl = allUrls[pageType].unshift();
casper.start(basePath + firstUrl, function () {
    console.log('');
});

allUrls[pageType].forEach(function (el) {
    casper.thenOpen(basePath + '/' + el);
});

casper.on('page.error', function(msg, trace) {		
	errors.push('<li><a href=' + this.getCurrentUrl() + '>' + this.getCurrentUrl() + '</a>:  <span class=error>' + msg + '</span></li>');
});

casper.on("resource.received", function (request) {
    if (request.status == 404) {
        errors.push('<li><a href=' + this.getCurrentUrl() + '>' + this.getCurrentUrl() + '</a>:  <span class=error404>Resource not found - ' + request.url + '</span></li>');
    }
});
//ignores this vendor code
casper.on("resource.requested", function (resource, request) {
    var skip = [
       'players.brightcove.net',
       's.ytimg.com',
       'youtube.com/embed'
    ];

    skip.forEach(function (needle) {
        if (resource.url.indexOf(needle) >= 0) return request.abort();
    });
});
//creates a formatted output HTML file
casper.run(function() {
	if (errors.length > 0) {
		var data = "<html><head><style>body{font-family:tahoma;font-size:12px}.error{color:red}.error404{color:orange}li{line-height:18px}a{color:dodgerblue2}</style></head><body><h1>Errors on pages</h1><ol>";		
		errors.forEach(function(el){			
			data += el;
		});
		data += "</ol></body></html>";
		var myfile = "test-data-"+ pageType + '-' + Date.now() + ".html";
		fs.write(myfile, data, 'w');
	}	
  casper.exit();
});