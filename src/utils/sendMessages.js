import ext from "./ext";
import { MSG_TYPE } from "./constant";

/**
 * Send Message to background script
 * @param { keyof MSG_TYPE } msgType
 * @param { {[string]:any} } message
 */
export const sendMessage = async (msgType, message) => {
    const msg = {
        msgType,
        ...message,
    };
    console.log("===== Sending Message => ", msg);
    return new Promise((resolve, reject) => {
        try {
            ext.runtime.sendMessage(msg, (response) => {
                resolve(response);
            });
        } catch (e) {
            console.log(" SendMessage Failed => ", e);
            reject({ success: false, error: e });
        }
    });
};

export default sendMessage;
