// const cds = require('@sap/cds');
// const log = cds.log("cds");
// // const { addMetadata } = require('../../utils/metadata');
 
// function setValue(value){
//     if(value !== undefined && value !== null && value !== ''){
//         return value;
//     }else{
//         return null;
//     }
// }
 
// async function createUpdateINJ(req) {
//     // const { sessionUser, currentDate, currentTime } = addMetadata(req);
//     try {
//         let result, oINJID;
//         tx = cds.tx(req);
//         payload = req.data;
//         oINJ = JSON.parse(payload.D4OXYPALUYAIDNSO);
//             console.log(oINJ);
            
//         // oInput = await decryptAES(payload.D4OXYPALUYAIDNSO, cds.transaction(req));
 
//         // let oNotes = oInput.NotesPayload;
 
//         // Checking mandatory fields
//         // await checkMandatoryFields(oNotes, ['NOTID']);
 
//         // Procedure for Reopening the case
//         // result = await tx.run(`CALL "prCREATEUPDATEINJEM"(0, 'SLS1386', 'John Doe', 'Jane Smith', '9876543210', 'Injury', '2025-11-07', '2025-11-08', 'Y', 'N', '2025-11-07T10:30:00Z', 'Near Miss', 'Slippery Floor', ?);
// // `);
//         result = await tx.run(`CALL "prCREATEUPDATEINJEM"(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
//             setValue(oINJ.INJID),
//             setValue(oINJ.EMPID),
//             setValue(oINJ.EMPNM),
//             setValue(oINJ.SUPVR),
//             setValue(oINJ.TPHNE),
//             setValue(oINJ.CLSSF),
//             setValue(oINJ.LDWRK),
//             setValue(oINJ.FDABS),
//             setValue(oINJ.OCCIL),
//             setValue(oINJ.RTWRK),
//             setValue(oINJ.RGTIM),
//             setValue(oINJ.NAINC),
//             setValue(oINJ.CAUSE),
//         );
//         oINJID = result.OINJID;


        
//         // console.log("HELLO");

//         console.log(oINJID);
//         // console.log("HELLO");
        
//        console.log(result);
       
 
 
 
//         // Creating Event Summary
//         // await createSummary(tx, oNotes.CLMID, 'Case', 'Reopen', '', 331);
 
//         // Creating Audit log
//         // await createAuditLog(tx, oNotes.CLMID, oNotes.CLMID, 'Case Id', 'reopenCase', constants.VIEW_NAME, JSON.stringify(oInput));
 
//         // success
//         returnObj = {
//             "Success": "Employee Saved Successfully.",
//             "OINJID" : oINJID
//         };
 
//         // await tx.commit();
//         return JSON.stringify(returnObj);
 
//     } catch (error) {
//         // try {
//         //     tx1 = cds.transaction(req);
//         //     // await createErrorLog(tx1, constants.APP_NAME_PORTAL, 'reopenCase', JSON.stringify(oInput), error.toString());
//         //     console.log(result);
//         //     await tx1.commit();
//         // } catch (logError) {
//         //     console.error('Error logging failed:', logError);
//         // }
//         // if (tx) {
//         //     await tx.rollback();
//         // }
//         // if (error.name === 'Error') {
//         //     return req.error(400, error.message);
//         // } else {
//         //     return req.error(500, 'An internal server error occurred. Please contact the system administrator.');
//         // }
//         throw error;
//             }
// }
 
 
// module.exports = {
//      createUpdateINJ
//     };


///////////////////--------------------------------------------------------------------------///////////////


const cds = require('@sap/cds');
const log = cds.log("cds");

function setValue(value) {
    if (value !== undefined && value !== null && value !== '') {
        return value;
    } else {
        return null;
    }
}

async function createUpdateINJ(req) {
    try {
        let result, oINJID;
        const tx = cds.tx(req);
        const payload = req.data;

        // 🔹 Parse incoming JSON string (expected array)
        const aINJ = JSON.parse(payload.D4OXYPALUYAIDNSO);

        if (!Array.isArray(aINJ)) {
            throw new Error("Payload must be a JSON array of injury records.");
        }

        const aResult = [];

        // 🔹 Use traditional for loop (your preferred style)
        for (let i = 0; i < aINJ.length; i++) {
            const oINJ = aINJ[i];
            console.log("Processing record:", oINJ);

            result = await tx.run(
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

            oINJID = result.OINJID;

            console.log("Procedure Result:", result);

            aResult.push({
                EMPID: oINJ.EMPID,
                OINJID: oINJID,
                Status: "Success"
            });
        }

        await tx.commit();

        const returnObj = {
            "Success": "All Employee Injuries Saved Successfully.",
            "Results": aResult
        };

        return JSON.stringify(returnObj);

    } catch (error) {
        console.error("Error in createUpdateINJ:", error);
        throw error;
    }
}

module.exports = {
    createUpdateINJ
};
