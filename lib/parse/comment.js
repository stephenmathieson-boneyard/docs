'use strict';

var tags = require('./tags'),
	extend = require('../extend');

function clean(line) {
	return line
		.replace(clean.regex, '')
		.trim() + '\n';
}

//
// remove leading space(s) and/or tab(s)
// remove leading star(s)
//
clean.regex = /^[\t ]*\*+/;

module.exports = function (comment) {
	var parts, count,
		cleanComment = '',
		lines = comment.trim().split('\n'),
		meta = {};

	meta.comment = comment;

	lines.shift();
	lines.pop();
	lines.forEach(function (line) {
		cleanComment += clean(line);
	});

	parts = cleanComment.split('\n\n');

	count = parts.length;

	meta.desc = parts[0];

	// more parts than description and tags
	if (count > 1) {
		// take all parts other than the description (first) and the tags (tags)
		meta.extra = parts
			.slice(1, count - 1)
			.join('\n\n');
	}

	return extend(meta, tags(cleanComment));
};
