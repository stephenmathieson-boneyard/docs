'use strict';

var template = require('./template');

function mark(blocks) {
	var result = '';

	blocks.forEach(function (block) {
		result += template(block);
	});

	return result;
}

module.exports = function (blocks, callback) {

	var markdown;

	try {
		markdown = mark(blocks);
	} catch (err) {
		return callback(err);
	}

	return callback(null, markdown);

};
