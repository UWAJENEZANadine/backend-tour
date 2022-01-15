import dotenv from "dotenv"
dotenv.config();
const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_ID
);
const sendSms = (userName, tourName, applicationStatus,applicationId, userPhone) => {
    client.messages.create({ body:
        "Hey "+
        userName+
        ", Your "+
        tourName+
        " Booking tour "+
        applicationStatus+
        ", RefId:"
        +applicationId,
        from:"+12676134616",
        to:userPhone
    }).then((message)=> console.log(message.sid))
};
export default sendSms;