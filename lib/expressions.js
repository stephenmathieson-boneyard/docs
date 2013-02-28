'use strict';

var XRegExp = require('XRegExp').XRegExp,
	expressions = module.exports = {};

expressions.tags = {

	//
	// @example
	// ```
	// var foo = new Bar();
	// foo.baz();
	// return foo.bit();
	// ```
	// @example
	// ```
	// return new Bar().baz().bit();
	// ```
	//
	// HACK: [^`]
	//
	example: new XRegExp('@example\\n' +
						'`{3}\\n' +
						'(?<example>.[^`]*)\\n' +
						'`{3}', 'is'),
	//
	// @param {String} name
	// @param {String} name The name of the class to check for
	//
	param: new XRegExp('@param *' +
						'\\{' +
						'(?<param_type>[a-z|]+)' +
						'\\}[ \\t]*' +
						'(?<name>[a-z]+) *' +
						'(?<desc>.*)\\n', 'i'),
	//
	// @author Someone
	// @author Some One
	// @author Some One <someone@foo.org>
	// @author <Some One> someone@foo.org
	//
	author:
		new XRegExp('@author *' +
					'(?<author>.*)\\n', 'i'),
	//
	// @return {String}
	// @return {String} The String
	// @return {String|Array} The String or Array
	//
	'return': new XRegExp('@return *' +
						'{(?<type>[a-z\\|]+)} *' +
						'(?<desc>.*)\\n', 'i'),
	//
	// @chainable
	// @public
	// @private
	// @async
	//
	boolean: new XRegExp('@(?<type>[' +
						'chainable|' +
						'public|' +
						'private|' +
						'async' +
						']+)\\n')

};

// all context expressions support both spaces and tabs
expressions.context = {
	//
	// function foo() {}
	//
	declaration: new XRegExp('^function' +
							'[ \\t]*' +
							'(?<name>[\\w]+)' +
							'[ \\t]*' +
							'\\('),
	//
	// var foo = function () {}
	// var foo = (function () {}())
	//
	expression: new XRegExp('^var' +
							'[ \\t]*' +
							'(?<name>[\\w]+)' +
							'[ \\t]*=[ \\t]*' +
							'\\({0,1}' +
							'function'),
	//
	// Foo.prototype.bar = function () {}
	// Foo.prototype.bar = (function () {}())
	//
	prototype: new XRegExp('^(?<constructor>[\\w]+)' +
							'\\.prototype\\.' +
							'(?<name>[\\w]+)' +
							'[ \t]*=[ \t]*' +
							'\\({0,1}' +
							'function'),
	//
	// foo.bar = function () {}
	// foo.bar.baz = (function () {}())
	//
	method: new XRegExp('^(?<object>[\\w.]+)' +
						'\\.(?<name>[\\w]+)' +
						'[ \\t]*=[ \\t]*' +
						'\\({0,1}' +
						'function')
};
