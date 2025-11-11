const cds = require('@sap/cds');
 
const {createUpdateINJ} = require('../Handlers/Application/postINJ'); 
const {createUpdateBDY} = require('../Handlers/Application/postBDY');

module.exports = cds.service.impl(function () { 
//  this.on("rlQ2Em7VGztsJeed", createUpdateINJ);
 this.on("mjicdnmodicncdcc", createUpdateBDY);
})