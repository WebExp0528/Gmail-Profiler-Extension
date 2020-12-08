import ContentPanel from "../pages/contentPanel";
import { getExtensionURL, renderReactComponent } from "utils/helper";
import { messageViewHandler } from "./messageView";
import { threadViewHandler } from "./threadView";
import ContentPanelView from "./contentPanelView";

/**
 * Define InboxSDK functions
 * @type { class }
 */

export class CGmailSDK {
    static _iSDK = undefined;
    _sidePanelEl = undefined;

    constructor() {}

    /**
     * Initiate GmailSDK
     *
     * @returns {Promise<void>}
     */
    init = async () => {
        CGmailSDK._iSDK = await InboxSDK.load(2, INBOX_SDK_KEY);
        console.log("===== Loaded InboxSDK => ", CGmailSDK._iSDK);
        await this.addSideBarButton();

        //Register Handlers
        CGmailSDK._iSDK.Conversations.registerThreadViewHandler(
            threadViewHandler
        );
        CGmailSDK._iSDK.Conversations.registerMessageViewHandler(
            messageViewHandler
        );
    };

    /**
     * Get gmail address using InboxSDK
     * @returns {string} email address
     */
    getUserEmailAddress = () => {
        return CGmailSDK._iSDK.User.getEmailAddress();
    };

    /**
     * Add Button in SideBar
     * @returns {Promise<ContentPanelView>}
     */
    addSideBarButton = async () => {
        this._sidePanelEl = document.createElement("div");
        renderReactComponent(this._sidePanelEl, ContentPanel);
        ContentPanelView._view = await CGmailSDK._iSDK.Global.addSidebarContentPanel(
            {
                el: this._sidePanelEl,
                title: "Gmail Extension",
                iconUrl: getExtensionURL("assets/icons/icon_16.png"),
                orderHint: 0,
            }
        );
        ContentPanelView.hidePanel();
        return ContentPanelView._view;
    };
}

/**
 * Create InboxSDK Instance
 */
export const inboxSDK = () => {
    return new CGmailSDK();
};
