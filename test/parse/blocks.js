'use strict';

var vows = require('vows'),
	assert = require('assert'),
	fs = require('fs'),
	path = require('path'),
	parse = require('../../lib/parse');

function tests(file, properties) {

	function genericPropertyCheck(property, type) {
		return {
			// vows passes this (block) in
			topic: function (block) {
				//
				// {
				//   type: 'function',
				//   name: 'addBar',
				//   comment: '/**\n* Add bar to some foo\n*\n* @param {Number} bar The number of bar to add\n* @return {String} The bar\'ed foo\n*/',
				//   desc: 'Add bar to some foo',
				//   extra: '',
				//   params: [ [ 'Number', 'bar', 'The number of bar to add' ] ],
				//   examples: undefined,
				//   author: '',
				//   returns: [ [ 'String', 'The bar\'ed foo' ] ]
				// }
				//
				return block[property] || null;
			},
			'should be truthy': function (value) {
				assert.ok(value);
			},
			'should have the correct type': function (value) {
				assert.typeOf(value, type || 'string');
			}
		};
	}

	var batch = {
		topic: function () {
			var callback = this.callback;

			fs.readFile(file, 'utf-8', function (err, data) {
				if (err) {
					return callback(err);
				}

				return parse.blocks(data, callback);
			});
		},
		'should not error': function (err, blocks) {
			assert.ifError(err);
		},
		'should provide an Array': function (err, blocks) {
			assert.isArray(blocks);
		},
		'every block': {
			topic: function (blocks) {
				var callback = this.callback;

				blocks.forEach(function (block) {
					callback(null, block);
				});
			},
			// populated below
			'properties': {}
		}
	};

	properties.forEach(function (property) {
		var splat = property.split('|');
		batch['every block'].properties[splat[0]] =
			genericPropertyCheck(splat[0], splat[1]);
	});


	return batch;
}

vows
	.describe('parse blocks')
	.addBatch({
		'valid': {
			'add-bar.js': tests(path.join(__dirname, '../fixtures/full/add-bar.js'),
				[ 'name', 'type', 'comment', 'desc', 'params|array', 'returns|array' ]),
			'foo.js': tests(path.join(__dirname, '../fixtures/full/foo.js'),
				[ 'name', 'type', 'comment', 'desc', 'examples|array' ]),
			'exports.js': tests(path.join(__dirname, '../fixtures/full/exports.js'),
				[ 'name', 'type', 'comment', 'desc', 'returns|array' ])
		},
		'invalid': {
			'missing function': {},
			'non-function': {}
		}
	})
	.exportTo(module);
