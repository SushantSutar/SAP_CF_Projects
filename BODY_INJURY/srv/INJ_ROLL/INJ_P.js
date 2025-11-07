const cds = require('@sap/cds');
 
const {createUpdateINJ} = require('../Handlers/Application/postINJ');
 
module.exports = cds.service.impl(function () {
 
 this.on("rlQ2Em7VGztsJeed", createUpdateINJ);
})