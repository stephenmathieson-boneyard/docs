'use strict';

var underscore = require('underscore'),
	fs = require('fs'),
	join = require('path').join;

function mark(template, blocks) {
	var result = '';

	blocks.forEach(function (block) {
		result += template(block);
	});

	return result;
}

module.exports = function (blocks, callback) {
	fs.readFile(join(__dirname, 'template._'), 'utf-8', function (err, data) {
		if (err) {
			return callback(err);
		}

		var markdown,
			template = underscore.template(data);

		try {
			markdown = mark(template, blocks);
		} catch (markError) {
			return callback(markError);
		}

		return callback(null, markdown);
	});
};
