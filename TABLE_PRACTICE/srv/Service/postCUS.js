const { setValue } = require('../utils/common');
const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {

  this.on("CreateOrUpdateCustomer", async (req) => {
    let tx;
    try {
      let result;
      let payload = req.data;

      console.log("Incoming Payload:", payload);

      // Parse the JSON input (if sent as a stringified JSON)
      let oInput = JSON.parse(payload.FXPUWMCJEKALGSTV);
      let oCustomer = oInput.CPM_T_CUSTOMER;

      console.log("Extracted Customer Object:", oCustomer);

      // Start a transaction
      tx = cds.transaction(req);

      // Call the HANA stored procedure
      result = await tx.run(
        'CALL "prCREATEUPDATECUST"(?,?,?,?,?)',
        setValue(oCustomer.CS_ID),
        setValue(oCustomer.CUSID),
        setValue(oCustomer.CNAME),
        setValue(oCustomer.CNTRY),
        setValue(oCustomer.CUSTP)
      );

      console.log("Stored Procedure Result:", result);

      await tx.commit();

      return {
        message: "Customer processed successfully",
        result
      };

    } catch (error) {
      console.error("Error executing procedure:", error);

      if (tx) {
        await tx.rollback();
      }

      return req.error({
        code: 500,
        message: error.toString()
      });
    }
  });

});
