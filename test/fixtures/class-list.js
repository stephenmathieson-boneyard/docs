/*global amaze*/

var lib = amaze.lib;

/**
 * Return a ClassList for an element.  ClassList is not an
 * Element#classList polyfil, but an extension thereof.
 *
 * @param {HTMLElement} element
 * @return {ClassList} An instance of ClassList specific to the provided HTMLElement
 */
lib.classList = (function () {
	'use strict';

	var indexOf = lib.indexOf,
		inArray = lib.inArray,
		rtrim = /\S/.test('\xA0') ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g,
		trim = function (string) {
			if (String.prototype.trim) {
				return string.trim();
			}
			return string.replace(rtrim, '');
		},
		re = /\s+/;

	function ClassList(element) {
		this.element = element;
		this.list = element.classList;
	}

	/**
	 * Add a class to the element if not already present
	 *
	 * @chainable
	 * @param {String} name
	 * @return {ClassList}
	 */
	ClassList.prototype.add = function (name) {
		var array;

		// standard
		if (this.list) {
			this.list.add(name);
			return this;
		}

		// fallback
		array = this.toArray();

		if (!inArray(array, name)) {
			array.push(name);
			this.element.className = array.join(' ');
		}

		return this;
	};

	/**
	 * Remove a class from the element
	 *
	 * @chainable
	 * @param {String} name
	 * @return {ClassList}
	 */
	ClassList.prototype.remove = function (name) {
		var array, index;

		// standard
		if (this.list) {
			this.list.remove(name);
			return this;
		}

		array = this.toArray();
		index = indexOf(array, name);
		if (index !== -1) {
			array.splice(index, 1);
			this.element.className = array.join(' ');
		}

		return this;
	};

	/**
	 * Replace a specific class from the element with another.  If the class to be replaced is no present, the replacement class will be added.
	 *
	 * @chainable
	 * @param {String} oldClass
	 * @param {String} newClass
	 * @return {ClassList}
	 */
	ClassList.prototype.replace = function (oldClass, newClass) {
		return this
			.remove(oldClass)
			.add(newClass);
	};

	/**
	 * Toggle a class of the element
	 *
	 * @chainable
	 * @param {String} name
	 * @return {ClassList}
	 */
	ClassList.prototype.toggle = function (name) {

		// standard
		if (this.list) {
			this.list.toggle(name);
			return this;
		}

		// IE
		if (this.has(name)) {
			return this.remove(name);
		}

		return this.add(name);
	};


	/**
	 * Return an array of classes attached to the element
	 *
	 * @return {Array}
	 */
	ClassList.prototype.toArray = function () {
		return trim(this.element.className).split(re);
	};

	/**
	 * Check if the element has the class
	 *
	 * @param {String} name
	 * @return {Boolean}
	 */
	ClassList.prototype.contains = function (name) {

		// standard
		if (this.list) {
			return this.list.contains(name);
		}

		// IE
		return inArray(this.toArray(), name);
	};

	/**
	 * Return a String representation of the element's ClassList
	 *
	 * @return {String}
	 */
	ClassList.prototype.toString = function () {
		return this.element.className;
	};

	return function (element) {
		return new ClassList(element);
	};

}());
