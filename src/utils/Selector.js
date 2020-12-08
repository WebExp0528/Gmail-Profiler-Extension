/**
 * Check if A contains B
 * @param {HTMLElement} a A Element to find
 * @param {HTMLElement} b Parent Element: Default is document.body
 * @returns {boolean}
 */
function collectionHas(a, b = document.body) {
    for (var i = 0, len = b.length; i < len; i++) {
        if (b[i] == a) return true;
    }
    return false;
}

/**
 * Define Selector functions.
 * @type Class
 */
export class Selector {
    /**
     * Get current provided selector.
     *
     * @param { string | object } selector
     * @param { 'null' | 'querySelector' | 'querySelectorAll' } type
     */
    constructor(selector, type) {
        // Check selector is Document or Window
        if (typeof selector === "object") {
            this.element = selector;
            return;
        }

        // Define default type as 'querySelector.
        let selectorType = type || "querySelector";

        // Check if is an ID.
        if (selector.indexOf("#") === 0) {
            selectorType = "getElementById";
            selector = selector.substr(1, selector.length);
        }

        this.element = document[selectorType](selector);

        return;
    }

    /**
     * Validate if element found in page
     *
     * @returns {boolean}
     */
    validElement() {
        if (this.element === null) return false;
        return true;
    }

    /**
     * Get an element click.
     *
     * @param { Function } callback
     * @returns { void }
     */
    click(callback) {
        this.element.addEventListener("click", callback);
    }

    /**
     * Add new class element to a selector.
     *
     * @param { string } style
     * @returns { void }
     */
    addClass(style) {
        this.element.classList.add(style);
    }

    /**
     * Remove class element from a selector.
     *
     * @param { string } style
     * @returns { void }
     */
    removeClass(style) {
        this.element.classList.remove(style);
    }

    /**
     * Toggle action under a selector.
     *
     * @param { string } style
     * @returns { void }
     */
    toggle(style) {
        this.element.classList.toggle(style);
    }

    /**
     * Set or Get value
     *
     * @param { string } value
     * @returns { string }
     */
    val(value) {
        if (typeof value !== "undefined") {
            this.element.value = value;

            return value;
        }

        return this.element.value;
    }

    /**
     * Set or Get checked
     *
     * @param { string } value
     * @returns { string }
     */
    checked(value) {
        if (typeof value !== "undefined") {
            this.element.checked = value;

            return value;
        }

        return this.element.checked;
    }

    /**
     * DOM Content Loaded
     *
     * @param { Function } callback
     * @returns { void }
     */
    ready(callback) {
        this.element.addEventListener("DOMContentLoaded", callback);
    }

    /**
     * Set or Get textContent
     *
     * @param { string } value
     * @returns { string }
     */
    text(value) {
        if (typeof value !== "undefined") {
            this.element.textContent = value;

            return value;
        }

        return this.element.textContent;
    }

    /**
     * find parent element
     *
     * @param { string } selector Query String
     * @returns { boolean }
     */
    findParentBySelector(selector) {
        var all = document.querySelectorAll(selector);
        var cur = this.element.parentNode;
        while (cur && !collectionHas(all, cur)) {
            //keep going up until you find a match
            cur = cur.parentNode; //go up
        }
        return cur; //will return null if not found
    }

    /**
     * find Child element
     *
     * @param { string } selector Query String
     * @returns { boolean }
     */
    findChildBySelector(selector) {
        return this.element.querySelectorAll(selector);
    }
}

/**
 * Create selector instance.
 *
 * @param { string | object } selector
 * @param { 'null' | 'querySelector' | 'querySelectorAll' } type
 */
export const selector = (selector, type) => {
    return new Selector(selector, type);
};
