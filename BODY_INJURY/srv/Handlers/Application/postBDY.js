// const cds = require('@sap/cds');
// const log= cds.log("cds");
// function setValue(value) {
//     if (value !== undefined && value !== null && value !== '') {
//         return value;
//     }else{
//         return null;
//     }
    
// }

// async function createUpdateBDY(req) {
//     try {
//         let result,oBDYID;
//         tx = cds.tx(req);
//         const payload = req.data;  
//         const oBDY = JSON.parse(payload.A23EMOI12NM34ML1);

//         console.log(oBDY);


//         result= await tx.run('CALL "prCREATEUPDATEBDYPT"(?,?,?,?,?,?,?)',
//             setValue(oBDY.BDPID),
//             setValue(oBDY.EMPID),
//             setValue(oBDY.BDYPT),
//             setValue(oBDY.NOINJ),
//             setValue(oBDY.SIDE_),
//             setValue(oBDY.BPDES)
           
//         );
//         oBDYID=result.oBDPID;

//         console.log(oBDYID);
//         console.log(result);
        
//         returnObj = {
//             "Success" : "Employee Saves Sucessfully",
//             "OBDYID" : oBDYID
//         }

//         return JSON.stringify(returnObj);
        
//     } catch (error) {
//         throw error;
//     }
// }

// module.exports = {
//     createUpdateBDY
// };


////////////////----------------------------------------------------------------------------//////////////////////////////
const cds = require('@sap/cds');
const log = cds.log("cds");

function setValue(value) {
    if (value !== undefined && value !== null && value !== '') {
        return value;
    } else {
        return null;
    }
}

async function createUpdateBDY(req) {
    try {
        let result, oBDYID;
        const tx = cds.tx(req);
        const payload = req.data;

        const aBDY = JSON.parse(payload.A23EMOI12NM34ML1);

        if (!Array.isArray(aBDY)) {
            throw new Error("Payload must be a JSON array of BDY records.");
        }

        const aResult = [];

        for (let i = 0; i < aBDY.length; i++) {
            const oBDY = aBDY[i];
            console.log("Processing record:", oBDY);

            result = await tx.run(
                `CALL "prCREATEUPDATEBDYPT"(?,?,?,?,?,?,?)`,
                [
                    setValue(oBDY.BDPID),
                    setValue(oBDY.EMPID),
                    setValue(oBDY.BDYPT),
                    setValue(oBDY.NOINJ),
                    setValue(oBDY.SIDE_),
                    setValue(oBDY.BPDES)
                ]
            );

            oBDYID = result.OBDPID;

            console.log("Procedure Result:", result);

            aResult.push({
                EMPID: oBDY.EMPID,
                OBDYID: oBDYID,
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
    createUpdateBDY
};
