import ext from "./../utils/ext";
import { MSG_TYPE, API } from "utils/constant";
import axios from "axios";

/**
 * Define content script functions
 * @type {class}
 */
class Background {
    constructor() {
        this.init();
    }

    /**
     * Document Ready
     * @returns {void}
     */
    init = () => {
        console.log("loaded Background Scripts");

        //Add message listener in Browser.
        ext.runtime.onMessage.addListener(this.onMessage);

        console.log(BACKEND_URL);
    };

    /**
     * Create a new api request object
     */
    axiosInstance = () =>
        axios.create({
            baseURL: BACKEND_URL,
            headers: {
                "Content-Type": "application/json",
            },
            transformRequest: [
                (data, headers) => {
                    console.log(
                        "===== request header from client =====",
                        headers
                    );
                    console.log("===== request data from client=====", data);
                    return data;
                },
            ],
            transformResponse: [
                (data) => {
                    let resp;

                    try {
                        resp = JSON.parse(data);
                    } catch (error) {
                        throw Error(
                            `[requestClient] Error parsing response JSON data - ${JSON.stringify(
                                error
                            )}`
                        );
                    }
                    console.log("===== response data from server =====", resp);
                    return resp;
                },
            ],
            timeout: 30000,
            validateStatus: (status) => {
                console.log(
                    "===== response status code from server =====",
                    status
                );
                return status >= 200 && status < 300; // default
            },
        });

    //TODO: Listeners

    /**
     * installed chrome extension
     */
    onInstalled = () => {
        console.log("Installed Gmail extension");
    };

    /**
     * Message Handler Function
     * @param { {type: keyof MSG_TYPE, [string]:any} } message
     * @param { object } sender
     * @param { object } reply
     */
    onMessage = (message, sender, reply) => {
        console.log("===== Received Message =>", message);
        switch (message.msgType) {
            case "GET_INFO_BY_EMAIL": {
                this.axiosInstance()
                    .get(API.emails, {
                        params: {
                            email: message.emailAddress,
                            key: "internal-key-miguel-42srfk",
                        },
                    })
                    .then((res) => {
                        reply(res);
                    })
                    .catch((err) => {
                        reply(null);
                    });
                break;
            }
            case "SAVE_SIGNATURE": {
                this.axiosInstance()
                    .post(API.email_signature, {
                        body: {
                            email: message.email,
                            signature: message.signature,
                        },
                    })
                    .then((res) => {
                        reply(res);
                    })
                    .catch((err) => {
                        reply(null);
                    });
                break;
            }
        }
        return true;
    };
}

export const background = new Background();
