const twilio = require('twilio');
async function sendMessage(req) {
    let tx;
    try {
        // tx = cds.tx(req);
        // const result1 = await tx.run(`SELECT * FROM "GRV_M_EMPLY" `);
        // console.log(result1);


        const { to, message } = req.data;
        console.log(to + " " + message);

        

        const client = twilio(sid, token);
        const result = await client.messages.create({
            body: message,
            from: phno,
            to: to
        })
        console.log('sent sucessfully' + result.sid);
        return "sent sucessfully";

    } catch (error) {
        console.error('error ' + error);
        return error;
    }
}


module.exports={
    sendMessage
}