"use strict"

const fetch = require('isomorphic-fetch');
const Promise = require('bluebird');
const config = require('../config.js');
const url = 'https://api.parse.com/1/classes/chatterbox';

const requestChats = {};
module.exports = requestChats;

requestChats.getRound = (skip, order, limit) => {
	let skipUrl = 'skip=' + (skip || 0);
	let orderUrl = 'order=' + (order || '-createdAt');
	let limitUrl = 'limit=' + (limit || 100);

	let u = url + '?' + skipUrl + '&' + orderUrl + '&' + limitUrl;
	return fetch(u, {
		headers: {
			'X-Parse-Application-Id': config.id,
			'X-Parse-REST-API-Key': config.key,
			'contentType': 'application/json'
			// 'data': { order: 'createdAt'}
			// 'skip': skip,
			// 'order':  '-createdAt'
		}
	})
	.then( result => result.json() )
	.catch( err => {
		console.log('noooo error', err);
		throw err;
	})
}

//there are less than 1000 chats so this will work
requestChats.getAll = () => {
	return requestChats.getRound(0, '-createdAt', 2000)
	.then( results => results.results)
	.catch( err => {
		console.log('error getting all', err)
		return err;
	})
}
