const cds = require('@sap/cds');

const { createUpdateEMP  } = require('../Handlers/Application/postEMP');
const { createUpdateCASE } = require('../Handlers/Application/postCASE');
const { createUpdateMEDI } = require('../Handlers/Application/postMEDI');
const { createUpdateATTACH } = require('../Handlers/Application/postATTACH');
const { sendMessage } = require('../Handlers/Application/sendMessage');


module.exports = cds.service.impl(function () {
    this.on("rlQ2Em7VGztsJeed", createUpdateEMP);
    this.on("CASErlQ2Em7VGzts", createUpdateCASE);
    this.on("MEDInsiducnsiocc", createUpdateMEDI);
    this.on("ATTACHdfghjuyytr", createUpdateATTACH);
    this.on("SENDSMS" , sendMessage)
})
