'use strict';

var vows = require('vows'),
	assert = require('assert'),
	expressions = require('../lib/expressions.js'),
	tags = require('./fixtures/tags.json');

function simple(expression, data) {
	return {
		topic: function () {
			return expression.xexec(data[0]);
		},
		'should provide an Array': function (result) {
			assert.isArray(result);
		},
		members: {
			topic: function (result) {
				// drop uneeded properties (XRegExp adds stupid shit everywhere)
				return result.slice();
			},
			'first should be the input': function (members) {
				assert.equal(members[0], data[0]);
			},
			'second should be the parsed example': function (members) {
				assert.equal(members[1], data[1]);
			}
		}
	};
}

function complex(expression, data, removeLast) {
	return {
		topic: function () {
			return expression.xexec(data[0]);
		},
		'should provide an Array': function (result) {
			assert.isArray(result);
		},
		members: {
			topic: function (result) {
				return result.slice();
			},
			'first should be the input': function (members) {
				assert.equal(members[0], data[0]);
			},
			'second should match the expected format': function (members) {
				var actual;

				if (removeLast) {
					// remove first and last
					actual = members.slice(1, members.length - 1);
				} else {
					// remove first
					actual = members.slice(1);
				}

				assert.deepEqual(actual, data[1]);
			}
		}
	};
}

function noMatches(expression, data) {
	return {
		topic: function () {
			return expression.xexec(data);
		},
		'should provide null': function (result) {
			assert.isNull(result);
		}
	};
}

vows
	.describe('expressions')
	.addBatch({
		'tags': {
			'examples': {
				'multiline': simple(expressions.tags.example,
											tags.examples[0]),
				'single': simple(expressions.tags.example,
											tags.examples[1]),
				'param': noMatches(expressions.tags.example,
											tags.params[0][0]),
				'author': noMatches(expressions.tags.example,
											tags.author[0][0]),
				'return': noMatches(expressions.tags.example,
											tags.returns[0][0]),
				'boolean': noMatches(expressions.tags.example,
											tags.boolean[0][0])
			},
			'params': {
				'type, name': complex(expressions.tags.param,
											tags.params[0], true),
				'type, name, description': complex(expressions.tags.param,
											tags.params[1]),
				'example': noMatches(expressions.tags.param,
											tags.examples[0][0]),
				'author': noMatches(expressions.tags.param,
											tags.author[0][0]),
				'return': noMatches(expressions.tags.param,
											tags.returns[0][0]),
				'boolean': noMatches(expressions.tags.param,
											tags.boolean[0][0])
			},
			'author': {
				'single name': simple(expressions.tags.author,
											tags.author[0]),
				'full name': simple(expressions.tags.author,
											tags.author[1]),
				'name with email': simple(expressions.tags.author,
											tags.author[2]),
				'name with email (again)': simple(expressions.tags.author,
											tags.author[3]),
				'param': noMatches(expressions.tags.author,
											tags.params[0][0]),
				'example': noMatches(expressions.tags.author,
											tags.examples[0][0]),
				'return': noMatches(expressions.tags.author,
											tags.returns[0][0]),
				'boolean': noMatches(expressions.tags.author,
											tags.boolean[0][0])
			},
			'returns': {
				'single type': simple(expressions.tags['return'],
											tags.returns[0]),
				'mutliple types': simple(expressions.tags['return'],
											tags.returns[1]),
				'single type with description': complex(expressions.tags['return'],
											tags.returns[2]),
				'mutliple types with description': complex(expressions.tags['return'],
											tags.returns[3]),
				'param': noMatches(expressions.tags['return'],
											tags.params[0][0]),
				'example': noMatches(expressions.tags['return'],
											tags.examples[0][0]),
				'author': noMatches(expressions.tags['return'],
											tags.author[0][0]),
				'boolean': noMatches(expressions.tags['return'],
											tags.boolean[0][0])
			},
			'booleans': {
				'chainable': simple(expressions.tags.boolean,
											tags.boolean[0]),
				'public': simple(expressions.tags.boolean,
											tags.boolean[1]),
				'private': simple(expressions.tags.boolean,
											tags.boolean[2]),
				'async': simple(expressions.tags.boolean,
											tags.boolean[3]),
				'returns': noMatches(expressions.tags.boolean,
											tags.returns[0][0]),
				'param': noMatches(expressions.tags.boolean,
											tags.params[0][0]),
				'example': noMatches(expressions.tags.boolean,
											tags.examples[0][0]),
				'author': noMatches(expressions.tags.boolean,
											tags.author[0][0])
			}
		}
	})
	.exportTo(module);
