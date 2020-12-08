/* global document */

import React from "react";
import ReactDOM from "react-dom";
import { CGmailSDK, inboxSDK } from "./scripts/sdk.js";
import ext from "utils/ext";
import MessageListener from "./scripts/messageListener";

export let contentPanelManager = {};
contentPanelManager["hoverEmailAddress"] = () => {};

export const Main = () => {
    return <></>;
};

(async function initialize() {
    try {
        await inboxSDK().init();
        //Set up message listener
        ext.runtime.onMessage.addListener(MessageListener);

        //Set up extension root
        const app = document.createElement("div");
        app.id = "my-extension-root";
        document.body.appendChild(app);
        ReactDOM.render(<Main />, app);
    } catch (err) {
        console.log("Error in Initialize of content script => ", err);
        return;
    }
})();
