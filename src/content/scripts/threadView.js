import { getExtensionURL } from "utils/helper";
import ContentPanelView from "./contentPanelView";

/**
 * Define ThreadView
 * @type { class }
 */
export class CThreadView {
    constructor(threadView) {
        console.log("===== Registered ThreadView =====", threadView);
        this._threadView = threadView;

        //Event Handler
        this._threadView.on("contactHover", this.contactHoverListener);
    }

    /**
     * Listen mouseover event of contact
     * @param {*} props
     */
    contactHoverListener = (props) => {
        // ContentPanelView.open(props.contact);
    };
}

/**
 * Create CThreadView Instance
 * @param {*} threadView
 */
export const threadViewHandler = (threadView) => {
    return new CThreadView(threadView);
};
