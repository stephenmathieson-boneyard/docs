'use strict';

var expressions = require('../expressions');

/**
 * get all tags of a provided type from a comment block
 *
 * @private
 * @param {String} type The type
 * @param {String} comment The comment
 * @return {Array} The tags
 */
function get(type, comment) {
	var things = [],
		regex = expressions.tags[type];

	// each match of the given regex
	regex.forEach(comment, function (match) {
		// remove the first (input) member of the match
		things.push(match.slice(1));
	});

	// don't return an array unless it's got members
	if (things.length) {
		return things;
	}
}

module.exports = function (comment) {
	var booleans,
		meta = {};

	meta.params = get('param', comment);
	meta.examples = get('example', comment);
	meta.author = get('author', comment) || [].join(' ,');
	meta.returns = get('return', comment);

	booleans = get('boolean', comment) || [];
	booleans.forEach(function (tag) {
		meta[tag[0]] = true;
	});

	return meta;
};
