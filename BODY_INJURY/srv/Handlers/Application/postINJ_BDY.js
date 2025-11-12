const cds = require('@sap/cds');
const log = cds.log("cds");

function setValue(value) {
    return (value !== undefined && value !== null && value !== '') ? value : null;
}

async function createUpdateINJWithBDY(req) {
    try {
        const tx = cds.tx(req);
        const payload = req.data;

        // 🔹 Parse incoming JSON string (expected injury + body parts structure)
        const oINJ = JSON.parse(payload.D4OXYPALUYAIDNSO);  // similar to your NEO oNotes

        if (!oINJ || typeof oINJ !== 'object') {
            throw new Error("Payload must be a valid JSON object with injury data.");
        }

        // 🔹 Step 1: Call procedure to insert/update the INJ record
        log.info("Processing Injury Record:", oINJ);

        const injResult = await tx.run(
            `CALL "prCREATEUPDATEINJEM"(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                setValue(oINJ.INJID),
                setValue(oINJ.EMPID),
                setValue(oINJ.EMPNM),
                setValue(oINJ.SUPVR),
                setValue(oINJ.TPHNE),
                setValue(oINJ.CLSSF),
                setValue(oINJ.LDWRK),
                setValue(oINJ.FDABS),
                setValue(oINJ.OCCIL),
                setValue(oINJ.RTWRK),
                setValue(oINJ.RGTIM),
                setValue(oINJ.NAINC),
                setValue(oINJ.CAUSE)
            ]
        );

        const oINJID = injResult.OINJID || injResult[0]?.OINJID;
        log.info("Injury Procedure Result:", injResult);

        // 🔹 Step 2: Handle array of body parts (similar to your NEO cstm2 loop)
        const aBDY = oINJ.bodyparts || [];

        if (!Array.isArray(aBDY)) {
            throw new Error("Body parts must be an array.");
        }

        const aBodyResults = [];

        for (let i = 0; i < aBDY.length; i++) {
            const oBDY = aBDY[i];
            log.info(`Processing Body Part Record ${i + 1}:`, oBDY);

            const bdyResult = await tx.run(
                `CALL "prCREATEUPDATEBDYPT"(?,?,?,?,?,?,?)`,
                [
                    setValue(oBDY.BDPID),
                    setValue(oINJ.EMPID),  // FK from injury EMPID
                    setValue(oBDY.BDYPT),
                    setValue(oBDY.NOINJ),
                    setValue(oBDY.SIDE_),
                    setValue(oBDY.BPDES)
                ]
            );

            const oBDPID = bdyResult.OBDPID || bdyResult[0]?.OBDPID;
            aBodyResults.push({
                EMPID: oINJ.EMPID,
                BDPID: oBDPID,
                Status: "Success"
            });
        }

        // 🔹 Commit transaction
        await tx.commit();

        // 🔹 Return object (similar to Neo style)
        const returnObj = {
            "Success": "Injury and related body parts saved successfully.",
            "INJID": oINJID,
            "BodyParts": aBodyResults
        };

        log.info("Final Result:", returnObj);
        return JSON.stringify(returnObj);

    } catch (error) {
        log.error("Error in createUpdateINJWithBDY:", error);
        throw error;
    }
}

module.exports = {
    createUpdateINJWithBDY
};
