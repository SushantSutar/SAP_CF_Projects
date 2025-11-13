const cds = require('@sap/cds');
const log = cds.log("cds");

function setValue(value) {
    if (value !== undefined && value !== null && value !== '') {
        return value;
    } else {
        return null;
    }
}

async function createUpdateEMP(req) {
    try {
        let result, oE__ID;
        const tx = cds.tx(req);
        const payload = req.data;

        const aEMP = JSON.parse(payload.A23EMOI12NM34ML1);

        if (!Array.isArray(aEMP)) {
            throw new Error("Payload must be a JSON array of EMP records.");
        }

        const aResult = [];

        for (let i = 0; i < aEMP.length; i++) {
            const oEMP = aEMP[i];
            console.log("Processing record:", oEMP);

            result = await tx.run(
                `CALL "prCREATEUPDATE_EMP"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    setValue(oEMP.E__ID),
                    setValue(oEMP.EMPID),
                    setValue(oEMP.FNAME),
                    setValue(oEMP.LNAME),
                    setValue(oEMP.PHON1),
                    setValue(oEMP.PHON2),
                    setValue(oEMP.EMAIL),
                    setValue(oEMP.AEMAL),
                    setValue(oEMP.GNDR),
                    setValue(oEMP.DOB),
                    setValue(oEMP.AGE),
                    setValue(oEMP.SAPAD),
                    setValue(oEMP.ACTAD),
                    setValue(oEMP.PROV),
                    setValue(oEMP.CITY),
                    setValue(oEMP.POSTC),
                    setValue(oEMP.SIN),
                    setValue(oEMP.SAMES)
                ]
            );

            oE__ID = result.OE__ID;

            console.log("Procedure Result:", result);

            aResult.push({
                EMPID: oEMP.EMPID,
                OE__ID: oE__ID,
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
        console.error("Error in createUpdateBDY:", error);
        throw error;
    }
}

module.exports = {
    createUpdateEMP
};