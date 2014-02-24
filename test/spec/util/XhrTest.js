/* global define, describe, it */
define([
	'chai',
	'sinon',

	'util/Xhr'
], function (
	chai,
	sinon,

	Xhr
) {
	'use strict';
	var expect = chai.expect;

	describe('Xhr test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(Xhr).not.to.be.undefined;
				/* jshint +W030 */
			});
		});

		describe('ajax()', function () {
			it('is a function', function () {
				expect(Xhr).to.respondTo('ajax');
			});

			it('succeeds for a simple xml file', function (done) {
				var success = sinon.spy(function () {
					expect(success.callCount).to.equal(1);
					done();
				});
				var error = sinon.spy(function () {
					expect(error.callCount).to.equal(0);
					done();
				});

				Xhr.ajax({
					url: 'ajax.xml',
					success: success,
					error: error
				});
			});

			it('fails for a non-existent file', function (done) {
				var success = sinon.spy(function () {
					expect(success.callCount).to.equal(0);
					done();
				});
				var error = sinon.spy(function () {
					expect(error.callCount).to.equal(1);
					done();
				});

				Xhr.ajax({
					url: 'does-not-exist.hmtl',
					success: success,
					error: error
				});
			});
		});

		describe('jsonp()', function () {
			it('has such a method', function () {
				expect(Xhr).to.respondTo('jsonp');
			});

			it('succeeds for simple jsonp data', function (done) {
				var success = sinon.spy(function () {
					expect(success.callCount).to.equal(1);
					done();
				});
				var error = sinon.spy(function () {
					expect(error.callCount).to.equal(0);
					done();
				});

				Xhr.jsonp({
					url: 'jsonp.js',
					success: success,
					error: error,
					callbackName: 'callback',
					callbackParameter: 'callback'
				});
			});

			it('false for non-existent jsonp data', function (done) {
				var success = sinon.spy(function () {
					expect(success.callCount).to.equal(0);
					done();
				});
				var error = sinon.spy(function () {
					expect(error.callCount).to.equal(1);
					done();
				});

				Xhr.jsonp({
					url: 'does-not-exist.js',
					success: success,
					error: error,
					callbackName: 'callback',
					callbackParameter: 'callback'
				});
			});
		});

	});
});