"use strict"

const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const chatsFile = path.join(__dirname, '../chats.txt');

const write = {};
module.exports = write;

write.addChats = (chatsArr) => { 
	let txt = chatsArr.map(chat => JSON.stringify(chat) ).join('\n');
	return write.writeTxt(txt)
	.then( () => {console.log('done!')})
}

write.writeTxt = (txt) => {
	return new Promise( (resolve, reject) => {
		fs.writeFile(chatsFile, txt, function(err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		})
	})
}