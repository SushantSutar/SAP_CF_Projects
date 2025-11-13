const cds = require('@sap/cds');
const log = cds.log("cds");

function setValue(value) {
    if (value !== undefined && value !== null && value !== '') {
        return value;
    } else {
        return null;
    }
}

async function createUpdateATTACH(req) {
    try {
        let result, oATTID;
        const tx = cds.tx(req);
        const payload = req.data;

        const aATTACH = JSON.parse(payload.A23EMOI12NM34ML4);

        if (!Array.isArray(aATTACH)) {
            throw new Error("Payload must be a JSON array of CASE records.");
        }

        const aResult = [];

        for (let i = 0; i < aATTACH.length; i++) {
            const oATTACH = aATTACH[i];
            console.log("Processing record:", oATTACH);

            result = await tx.run(
                `CALL "prCREATEUPDATE_ATTACH"(?,?,?,?,?,?,?,?)`,
                [
                    setValue(oATTACH.ATTID),
                    setValue(oATTACH.EMPID),
                    setValue(oATTACH.CASEI),
                    setValue(oATTACH.FLNAM),
                    setValue(oATTACH.FLTYP),
                    setValue(oATTACH.UPDDT),
                    setValue(oATTACH.FLPTH)                    
                ]
            );

            oATTID = result.OATTID;

            console.log("Procedure Result:", result);

            aResult.push({
                EMPID: oATTACH.EMPID,
                oATTID: oATTID,
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
        console.error("Error in createUpdateCASE:", error);
        throw error;
    }
}

module.exports = {
    createUpdateATTACH
};