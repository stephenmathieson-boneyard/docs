'use strict';

var vows = require('vows'),
	assert = require('assert'),
	comments = require('../fixtures/comments.json'),
	parse = require('../../lib/parse');

function tests(data) {
	return {
		topic: function () {
			return parse.comment(data.input);
		},
		'should return an Object': function (result) {
			assert.isObject(result);
		},
		'should not have a "name"': function (result) {
			assert.isUndefined(result.name);
		},
		'should have a "comment" property': function (result) {
			assert.isString(result.comment);
		},
		'should provide the input comment': function (result) {
			assert.equal(result.comment, data.input);
		},
		'should contain all expected information': function (result) {
			var property,
				expected = data.expected;

			for (property in expected) {
				if (expected.hasOwnProperty(property)) {
					assert.deepEqual(result[property], expected[property]);
				}
			}

		}
	};
}

function failing(data) {
	return {
		topic: function () {
			return parse.comment(data);
		},
		'should return an Object': function (result) {
			assert.isObject(result);
		},
		'should have a "comment" property': function (result) {
			assert.isString(result.comment);
			assert.equal(result.comment, data);
		},
		'all properties should be falsey': function (result) {
			var property;

			for (property in result) {
				if (result.hasOwnProperty(property)) {
					// comment should be the input data
					if (property !== 'comment') {
						// ugly h4x
						assert.ok(!!!result[property]);
					}
				}
			}
		}
	};
}

vows
	.describe('parse comment')
	.addBatch({
		'valid': {
			'desc, params, returns': tests(comments.valid[0]),
			'desc, params, async': tests(comments.valid[1]),
			'desc, params, chainable, examples': tests(comments.valid[2])
		},
		'invalid': {
			'empty': failing(comments.invalid[0])
		}
	})
	.exportTo(module);
