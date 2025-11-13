const cds = require('@sap/cds');
const log = cds.log("cds");

function setValue(value) {
    if (value !== undefined && value !== null && value !== '') {
        return value;
    } else {
        return null;
    }
}

async function createUpdateCASE(req) {
    try {
        let result, oC__ID;
        const tx = cds.tx(req);
        const payload = req.data;

        const aCASE = JSON.parse(payload.A23EMOI12NM34ML2);

        if (!Array.isArray(aCASE)) {
            throw new Error("Payload must be a JSON array of CASE records.");
        }

        const aResult = [];

        for (let i = 0; i < aCASE.length; i++) {
            const oCASE = aCASE[i];
            console.log("Processing record:", oCASE);

            result = await tx.run(
                `CALL "prCREATEUPDATE_CASE"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    setValue(oCASE.C__ID),
                    setValue(oCASE.CASEI),
                    setValue(oCASE.EMPID),
                    setValue(oCASE.ASEHS),
                    setValue(oCASE.BTYPE),
                    setValue(oCASE.CDSTS),
                    setValue(oCASE.FRTWD),
                    setValue(oCASE.APDTD),
                    setValue(oCASE.DISDT),
                    setValue(oCASE.LSTWK),
                    setValue(oCASE.WKSTS),
                    setValue(oCASE.CSTS),
                    setValue(oCASE.BCSRT),
                    setValue(oCASE.BCEND),
                    setValue(oCASE.LOSRV),
                    setValue(oCASE.LNKFL)
                ]
            );

            oC__ID = result.OC__ID;

            console.log("Procedure Result:", result);

            aResult.push({
                EMPID: oCASE.EMPID,
                oC__ID: oC__ID,
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
    createUpdateCASE
};