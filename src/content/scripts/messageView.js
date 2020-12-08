import { getExtensionURL } from "utils/helper";
import ContentPanelView from "./contentPanelView";
import Signature from "email-signature-detector";
import { sendMessage } from "utils/sendMessages";

/**
 * Define MessageView
 * @type { class }
 */
export class CMessageView {
    constructor(messageView) {
        console.log("===== Registered MessageView =====", messageView);
        this._messageView = messageView;
        ContentPanelView.showPanel();

        //Event Handler
        this._messageView.on("contactHover", this.contactHoverListener);
        this._messageView.on("load", this.loadListener);
        this._messageView.on("destroy", this.destroyListener);
    }

    /**
     * Listen mouseover event of contact
     * @param {*} props
     */
    contactHoverListener = (props) => {
        ContentPanelView.showUserDetail(props.contact);
    };

    /**
     * Loaded new messageView
     */
    loadListener = () => {
        ContentPanelView.showUserDetail(this._messageView.getSender());
        ContentPanelView.showPanel();

        //get signature
    };

    /**
     * Destroyed messageView
     */
    destroyListener = () => {
        ContentPanelView.hidePanel();
    };

    getSignature = () => {
        const ret = Signature.getSignature(this._messageView.getBodyElement());
        console.log("Signature :>> ", ret);
        sendMessage("SAVE_SIGNATURE", {
            email: this._messageView.getSender(),
            signature: ret,
        });
    };
}

/**
 * Create CMessageView Instance
 * @param {*} messageView
 */
export const messageViewHandler = (messageView) => {
    return new CMessageView(messageView);
};
