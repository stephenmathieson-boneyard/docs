'use strict';

var vows = require('vows'),
	assert = require('assert'),
	context = require('../fixtures/context.json'),
	parse = require('../../lib/parse');

function tests(data) {
	return {
		topic: function () {
			return parse.context(data.line);
		},
		'should return an Object': function (result) {
			assert.isObject(result);
		},
		'should not be null': function (result) {
			assert.notStrictEqual(result, null);
		},
		'should have a "type" String': function (result) {
			assert.include(result, 'type');
			assert.isString(result.type);
		},
		'should have a "name" String': function (result) {
			assert.include(result, 'name');
			assert.isString(result.name);
		},
		'should match the expected data': function (result) {
			assert.deepEqual(result, data.expected);
		}
	};
}

vows
	.describe('parse context')
	.addBatch({
		'declarations': {
			'normal': tests(context.declaration[0]),
			'extra whitespace': tests(context.declaration[1]),
			'mixed spaces and tabs': tests(context.declaration[2]),
			'single parameter': tests(context.declaration[3]),
			'multiple parameters': tests(context.declaration[4]),
			'multiple parameters spaces and tabs': tests(context.declaration[4])
		},
		'expressions': {
			'normal': tests(context.expressions[0]),
			'messy whitespace': tests(context.expressions[1]),
			'mixed spaces and tabs': tests(context.expressions[2]),
			'single parameter': tests(context.expressions[3]),
			'single parameter mixed spaces and tabs': tests(context.expressions[4]),
			'multiple parameters': tests(context.expressions[5]),
			'multiple parameters mixed spaces and tabs': tests(context.expressions[6]),
			'IFFE': tests(context.expressions[7])
		},
		'methods': {
			'prototype': {
				'normal': tests(context.methods.prototype[0]),
				'no whitespace': tests(context.methods.prototype[1]),
				'messy whitespace': tests(context.methods.prototype[2]),
				'no whitespace with parameters': tests(context.methods.prototype[3]),
				'IFFE': tests(context.methods.prototype[4]),
				'IFFE with messy whitespace': tests(context.methods.prototype[4])
			},
			'object': {
				'normal': tests(context.methods.object[0]),
				'normal params': tests(context.methods.object[1]),
				'named': tests(context.methods.object[2]),
				'named params': tests(context.methods.object[3]),
				'iffe': tests(context.methods.object[4]),
				'deeply nested': {
					'normal': tests(context.methods.object[5]),
					'named': tests(context.methods.object[6]),
					'iffe': tests(context.methods.object[7])
				}
			}
		}
	})
	.exportTo(module);
