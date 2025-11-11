const cds = require('@sap/cds');
const log= cds.log("cds");
function setValue(value) {
    if (value !== undefined && value !== null && value !== '') {
        return value;
    }else{
        return null;
    }
    
}

async function createUpdateBDY(req) {
    try {
        let result,oBDYID;
        tx = cds.tx(req);
        const payload = req.data;  
        const oBDY = JSON.parse(payload.A23EMOI12NM34ML1);

        console.log(oBDY);


        result= await tx.run('CALL "prCREATEUPDATEBDYPT"(?,?,?,?,?,?,?)',
            setValue(oBDY.BDPID),
            setValue(oBDY.EMPID),
            setValue(oBDY.BDYPT),
            setValue(oBDY.NOINJ),
            setValue(oBDY.SIDE_),
            setValue(oBDY.BPDES)
           
        );
        oBDYID=result.oBDPID;

        console.log(oBDYID);
        console.log(result);
        
        returnObj = {
            "Success" : "Employee Saves Sucessfully",
            "OBDYID" : oBDYID
        }

        return JSON.stringify(returnObj);
        
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUpdateBDY
};