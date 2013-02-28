'use strict';

var expressions = require('../expressions').context;

module.exports = function (line) {
	/*jshint maxstatements:20*/

	var result;

	//
	// expressions and declartions
	//
	result = expressions.declaration.xexec(line) ||
				expressions.expression.xexec(line);
	if (result) {
		return {
			'type': 'function',
			'name': result.name
		};
	}

	//
	// Foo.prototype.bar = function
	//
	result = expressions.prototype.xexec(line);
	if (expressions.prototype.xexec(line)) {
		return {
			'type': 'method',
			'constructor': result.constructor,
			'name': result.name
		};
	}

	//
	// foo.bar = function () {}
	// foo.bar.baz = (function () {}
	//
	// allows for any depth of parent objects
	//
	result = expressions.method.xexec(line);
	if (result) {
		return {
			'type': 'method',
			'object': result.object,
			'name': result.name
		};
	}

	return null;
};
