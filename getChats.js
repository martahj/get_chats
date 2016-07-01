"use strict"
const write = require('./js/write.js');
const requestChats = require('./js/requestChats');

return requestChats.getAll()
.then( chats => write.addChats(chats) );