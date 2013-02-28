'use strict';

var underscore = require('underscore'),
	fs = require('fs');

//
// TODO
//
//   this should *not* be a .js
//
//


module.exports = underscore.template(fs.readFileSync(__dirname + '/template._', 'utf-8'));
return;

module.exports = underscore.template([
	/*jshint white:false*/
	'### ',
	'<% if (type === "method" && typeof object === "string") { %>',
		'<%= object %>.<%= name %>',
	'<% } else if (type === "method" && typeof constructor === "string") { %>',
		'<%= constructor %>#<%= name %>',
	'<% } else { %>',
		'<%= name %>',
	'<% } %>',
	'(',
	'<% if (typeof params !== "undefined") { %>',
		'<% if (params.length) { %>',
			'<% params.forEach(function (param, index) { %>',
				'<% if (index > 0) { %>',
					', ',
				'<% } %>',
				'<%= param[1] %>',
			'<% }) %>',
		'<% } %>',
	'<% } %>',
	')\n\n',
	'<% if (typeof params !== "undefined") { %>',
		'<% if (params.length) { %>',
			'#### Parameters\n',
			'<% params.forEach(function (param) {%>',
				'-  `',
				'<%= param[1] %>',
				'` ',
				'*<%= param[0] %>* ',
				'<% if (param[2]) { %>',
					'<%= param[2] %>',
				'<% } %>',
				'\n',
			'<% }) %>',
		'<% } %>',
	'<% } %>',
	'\n\n',
	'<%= desc %>',
	'<% if (typeof extra === "string") { %>',
		'<%= extra %>',
	'<% } %>',
	'\n\n',
	'<% if (typeof examples !== "undefined" && examples.length) { %>',
		'#### Example Usage\n',
		'<%   examples.forEach(function (example, index) {%>',
			'\n```\n',
			'<%= example %>',
			'\n```\n',
		'<%   }) %>',
	'<% } %>',
	'\n\n',
	'<% if (typeof returns !== "undefined" && returns.length) { %>',
		'#### Returns\n',
		'<% returns.forEach(function (ret) {%>',
			'_<%= ret[0] %>_ ',
			'<% if (ret[1]) { %>',
				'<%= ret[1] %>',
			'<% } %>',
		'<% }) %>',
	'<% } %>',
	'\n\n'
].join(''));
