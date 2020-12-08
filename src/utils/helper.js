import ext from "./ext";
import ReactDOM from "react-dom";
import React from "react";

/**
 * Get chrome local url from path
 *
 * @param { string } url
 * @returns { string }
 */
export const getExtensionURL = (url) => {
    return ext.runtime.getURL(url);
};

/**
 * Get Closet Tag from dom
 *
 * @param { string } str Search String
 * @param { HTMLElement } from Dom Element: Default is document.body
 * @returns { Array<HTMLElement> }
 */
export const recursivelySearchString = (str, from = document.body) => {
    if (from.textContent.indexOf(str) == -1) return null; // doesn't contain the string, stop

    const children = Array.from(from.children);
    if (children.length > 0) {
        // current element has children, look deeper
        let found = [];
        for (let i = 0; i < children.length; i++) {
            const result = recursivelySearchString(str, children[i]);
            if (result) {
                found = [...found, ...result];
            }
        }
        return found;
    }

    // none of the children matched, return the parent
    return [from];
};

/**
 * Get email addresses from dom element
 *
 * @param { HTMLElement } from Default is document.body
 * @returns { Array<string> }
 */
export const getEmailAddresses = (from = document.body) => {
    const search_in = from.innerHTML;
    const string_context = search_in.toString();
    const array_mails = string_context.match(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    );
    return array_mails;
};

/**
 * Check document ready status
 *
 * @param { Function } fn callback function
 */
export const documentReady = (fn) => {
    // see if DOM is already available
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn, false);
    }
};

/**
 * Render React component by component name
 * @param {HTMLElement} element
 * @param {*} componentName
 * @param {*} props
 */
export const renderReactComponent = (element, componentName, props = {}) => {
    return ReactDOM.render(
        React.createElement(componentName, props, null),
        element
    );
};
