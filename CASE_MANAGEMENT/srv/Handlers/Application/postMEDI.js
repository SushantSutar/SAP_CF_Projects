const cds = require('@sap/cds');
const log = cds.log("cds");

function setValue(value) {
    if (value !== undefined && value !== null && value !== '') {
        return value;
    } else {
        return null;
    }
}

async function createUpdateMEDI(req) {
    try {
        let result, oRECID;
        const tx = cds.tx(req);
        const payload = req.data;

        const aMEDI = JSON.parse(payload.A23EMOI12NM34ML3);

        if (!Array.isArray(aMEDI)) {
            throw new Error("Payload must be a JSON array of MEDI records.");
        }

        const aResult = [];

        for (let i = 0; i < aMEDI.length; i++) {
            const oMEDI = aMEDI[i];
            console.log("Processing record:", oMEDI);

            result = await tx.run(
                `CALL "prCREATEUPDATE_MEDI"(?,?,?,?,?,?,?,?)`,
                [
                    setValue(oMEDI.RECID),
                    setValue(oMEDI.EMPID),
                    setValue(oMEDI.MRTYP),
                    setValue(oMEDI.FLNAM),
                    setValue(oMEDI.MRDAT),
                    setValue(oMEDI.RCVDT),
                    setValue(oMEDI.NOTES)                    
                ]
            );

            oRECID = result.ORECID;

            console.log("Procedure Result:", result);

            aResult.push({
                EMPID: oMEDI.EMPID,
                oRECID: oRECID,
                Status: "Success"
            });
        }

        await tx.commit();

        const returnObj = {
            "Success": "All Body Injury Records Saved Successfully.",
            "Results": aResult
        };

        return JSON.stringify(returnObj);

    } catch (error) {
        console.error("Error in createUpdateMEDI:", error);
        throw error;
    }
}

module.exports = {
    createUpdateMEDI
};