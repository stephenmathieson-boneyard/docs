/*global amaze*/

var proto = Array.prototype,
	lib = amaze.lib;

/**
 * Get the index of an item in an Array
 *
 * @example
 * ```
 * lib.indexOf(['hello', 'world'], 'world') === 1
 * // => true
 * ```
 * @example
 * ```
 * lib.indexOf(['hello', 'world'], 'goodbye') === -1
 * // => true
 * ```
 * @param {Array} array
 * @param {Mixed|Any} needle
 * @param {Number} fromIndex
 * @return {Number}
 */
lib.indexOf = (function () {
	'use strict';

	var indexOf = proto.indexOf;

	if (indexOf) {
		return function (array, needle, fromIndex) {
			return array.indexOf(needle, fromIndex);
		};
	}

	return function (array, needle, fromIndex) {
		var length = array.length;

		fromIndex = fromIndex || 0;

		for (fromIndex; fromIndex < length; fromIndex += 1) {
			if (array[fromIndex] === needle) {
				return fromIndex;
			}
		}

		return -1;
	};
}());

/**
 * Check if something is an Array
 *
 * @example
 * ```
 * lib.isArray('foo')
 * // => false
 * ```
 * @example
 * ```
 * lib.isArray(['foo'])
 * // => true
 * ```
 * @example
 * ```
 * lib.isArray(document.getElementsByTagName('*'))
 * // => false
 * ```
 * @param {Mixed|Any} candidate
 * @return {Boolean}
 */
lib.isArray = (function () {
	'use strict';

	if (Array.isArray) {
		return Array.isArray;
	}

	var toString = Object.prototype.toString;

	return function (candidate) {
		return toString.call(candidate) === '[object Array]';
	};
}());

/**
 * Check if an item is contained within an Array
 *
 * @example
 * ```
 * lib.inArray(['hello', 'world'], 'world') === 1
 * // => true
 * ```
 * @example
 * ```
 * lib.inArray(['hello', 'world'], 'goodbye')
 * // => false
 * ```
 * @param {Array} array
 * @param {Mixed|Any} needle
 * @param {Number} fromIndex
 * @return {Boolean}
 */
lib.inArray = (function () {
	'use strict';

	var indexOf = lib.indexOf;

	return function (array, needle, fromIndex) {
		return indexOf(array, needle, fromIndex) !== -1;
	};
}());


/**
 * Handles coherion from a list to an Array
 *
 * @example
 * ```
 * lib.toArray(document.getElementsByTagName('*'))
 * ```
 * @param {Object} list The list (Object with length)
 * @return {Array}
 */
lib.toArray = (function () {
	'use strict';
	/*jslint browser:true*/

	var isArray = lib.isArray,
		slice = proto.slice,
		threw = false;

	try {
		slice.call(document.getElementsByTagName('cats'));
	} catch (internetExplorer) {
		threw = true;
	}

	// standard
	if (!threw) {
		return function (list) {
			if (isArray(list)) {
				return list;
			}

			return slice.call(list);
		};
	}

	// IE
	return function (list) {
		var index, length, result;

		if (isArray(list)) {
			return list;
		}

		result = [];
		for (index = 0, length = list.length; index < length; index += 1) {
			result.push(list[index]);
		}
		return result;
	};
}());
