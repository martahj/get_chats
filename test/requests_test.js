"use strict"

const expect = require('chai').expect;
const _ = require('lodash');
const requestChats = require('../js/requestChats.js')

describe('** requesting chats **', function() {

	let skipZero;

	it('returns chats', function() {
		return requestChats.getRound(0)
		.then( result => {
			expect(result).to.be.an('object');

			expect(result.results).to.be.an('array');
			expect(result.results).to.have.length(100);
			skipZero = result.results;

			expect(result.results[0]).to.be.an('object');
			expect(result.results[0]).to.have.any.keys('createdAt', 'objectId', 'roomname', 'text', 'opponents', 'updatedAt', 'username')
		})
	})

	it('returns different chats if a different skip is provided', function() {
		return requestChats.getRound(100)
		.then( result => {
			expect(result).to.be.an('object');

			expect(result.results).to.be.an('array');
			expect(result.results).to.have.length(100);

			expect(objectsMatch(result.results, skipZero)).to.be.false; //should be false
		})
	})

	it('returns the same chats if the same skip is provided', function() {
		return requestChats.getRound(0)
		.then( result => {
			expect(result).to.be.an('object');

			expect(result.results).to.be.an('array');
			expect(result.results).to.have.length(100);

			expect(objectsMatch(result.results, skipZero)).to.be.true; 
		})
	})

	it('takes an optional order', function() {
		return requestChats.getRound(0, 'createdAt')
		.then( result => {
			expect(result).to.be.an('object');

			expect(result.results).to.be.an('array');
			expect(result.results).to.have.length(100);

			expect(objectsMatch(result.results, skipZero)).to.be.false;
		})
	})

	it('gets all the chats and packages them as one array', function() {
		return requestChats.getAll()
		.then( result => {
			expect(result).to.be.an('array');
			expect(result.length > 100).to.be.true;
		})
	})
})

function objectsMatch(a, b) {
	return _.isEqual(a, b);
}



