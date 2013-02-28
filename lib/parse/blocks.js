'use strict';

var parseContext = require('./context'),
	parseComment = require('./comment'),
	extend = require('../extend');

function makeBlocks(data) {
	/*jshint maxstatements:20*/

	var index, length, line,
		context, comment, block,
		inComment = false,
		foundContext = false,
		lines = data.trim().split('\n'),
		blocks = [];

	// walk each line
	for (index = 0, length = lines.length; index < length; index += 1) {
		line = lines[index].trim();
		// ignore whitespace-only lines
		if (line) {
			// if we're within a comment block
			if (inComment) {
				// ending?
				if (line === '*/') {
					inComment = false;
				}
				// add the line
				comment.push(line);
			} else {
				// not in a comment block
				if (!foundContext) {
					// attempt to parse the context from the current line
					context = parseContext(line);
					if (context && comment) {
						// join the comment into a big text block
						block = extend(context, parseComment(comment.join('\n')));
						blocks.push(block);
						inComment = false;
						foundContext = true;
					}
				}

				// start of a comment?
				if (line === '/**') {
					inComment = true;
					foundContext = false;
					// create the array
					comment = [ line ];
				}
			}
		}
	}

	return blocks;
}

module.exports = function (data, callback) {
	var blocks;

	try {
		blocks = makeBlocks(data);
	} catch (err) {
		return callback(err);
	}

	return callback(null, blocks);
};
