import { getExtensionURL } from "utils/helper";
import { contentPanelManager } from "./../index";

/**
 * Define CContentPanelView
 * @type { class }
 */
export class CContentPanelView {
    static _view = undefined;
    constructor(contentPanelView) {
        console.log(
            "===== Registered ContentPanelView =====",
            contentPanelView
        );
        this._contentPanelView = contentPanelView;
    }

    /**
     * Show user detail info in ContentPanel
     * @param { { name: string , emailAddress: string } } contact
     * @returns {void}
     */
    static showUserDetail(contact) {
        contentPanelManager.hoverEmailAddress(contact);
        this.showPanel();
    }

    static showPanel() {
        console.log("~~~~ called show panel", this._view);
        if (!this._view.isActive()) {
            this.getSideBarButton().click();
        }
    }

    static hidePanel() {
        console.log("~~~~~ called hide panel", this._view);
        if (this._view.isActive()) {
            this.getSideBarButton().click();
        }
    }

    static getSideBarButton() {
        return document.querySelector('button[data-tooltip="Gmail Extension"]');
    }
}

export default CContentPanelView;
