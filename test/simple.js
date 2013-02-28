'use strict';

var simple = require('../lib/'),
	fs = require('fs'),
	path = require('path'),
	classlist = path.join(__dirname, 'fixtures/class-list'),
	array = path.join(__dirname, 'fixtures/array');

fs.readFile(classlist + '.js', 'utf-8', function (err, data) {
	if (err) {
		throw err;
	}

	simple(data, function (err, markdown) {
		fs.writeFile(classlist + '.md', markdown, function (err) {
			if (err) {
				throw err;
			}
		});
	});
});

fs.readFile(array + '.js', 'utf-8', function (err, data) {
	if (err) {
		throw err;
	}

	simple(data, function (err, markdown) {
		fs.writeFile(array + '.md', markdown, function (err) {
			if (err) {
				throw err;
			}
		});
	});
});
