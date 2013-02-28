'use strict';

/**
 * Add bar to some foo
 *
 * @param {Number} bar The number of bar to add
 * @return {String} The bar'ed foo
 */
function addBar(bar) {
	var index,
		foo = '',
		BAR = 'bar';

	for (index = 0; index < bar; index += 1) {
		foo += BAR;
	}

	return foo;
}
