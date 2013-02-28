'use strict';

var vows = require('vows'),
	assert = require('assert'),
	extend = require('../lib/extend');

vows
	.describe('extend')
	.addBatch({
		'extend two objects': {
			topic: function () {
				var a = {
						'foo': 'bar',
						'1': 2,
						'false': true,
						'cats': 'cats'
					},
					b = {
						'foo': 'bar',
						'1': 2,
						'2': 2,
						'false': false
					};

				this.callback(null, extend(a, b));
			},

			'should return an object': function (err, result) {
				assert.isObject(result);
			},

			'should favor the second': function (err, result) {
				assert.equal(result['false'], false);
			},

			'should keep custom first properties': function (err, result) {
				assert.equal(result.cats, 'cats');
			},

			'should keep custom second properties': function (err, result) {
				assert.equal(result['2'], 2);
			}
		}
	})
	.addBatch({
		'deep-extend two objects': {
			topic: function () {
				var first = {},
					second = {};

				first.someCoolProperty = false;
				first.specificToFirst = 'hi';
				first.anEmptyObject = {};
				first.blah = {
					'stuff': true,
					'things': false,
					'apples': 34
				};

				second.someCoolProperty = true;
				second.specificToSecond = 'bye';
				second.anEmptyObject = {};
				second.blah = {
					'stuff': true,
					'things': true
				};

				this.callback(null, extend(first, second, true));
			},
			'should return an object': function (err, result) {
				assert.isObject(result);
			},
			'should favor the second': function (err, result) {
				assert.isTrue(result.someCoolProperty);
			},
			'should keep custom properties': function (err, result) {
				assert.equal(result.specificToFirst, 'hi');
				assert.equal(result.specificToSecond, 'bye');
			},
			'should merge inner-object properties': function (err, result) {
				assert.equal(result.blah.apples, 34);
				assert.isTrue(result.blah.stuff);
				assert.isTrue(result.blah.things);
			}
		}
	})
	.exportTo(module);
