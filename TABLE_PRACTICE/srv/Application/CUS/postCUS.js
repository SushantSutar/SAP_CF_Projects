const cds = require('@sap/cds');
 
const {createUpdateNotes} = require('../handlers/applications/ReportIncident');
 
module.exports = cds.service.impl(function () {
 
 this.on("rlQ2Em7VGztsJeed", createUpdateNotes);
 
}) 