'use strict';

var template = require('./template'),
	parse = require('./parse');

module.exports = function (data, callback) {
	parse.blocks(data, function (err, blocks) {
		if (err) {
			return callback(err);
		}

		template(blocks, function (err, output) {
			if (err) {
				return callback(err);
			}

			return callback(null, output);
		});
	});
};
