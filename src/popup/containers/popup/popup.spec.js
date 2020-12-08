import React from "react";
import { expect } from "chai";
import Popup from ".";
import { mount } from "enzyme";

describe("button", function () {
    it("renders without problems", () => {
        const popup = mount(<Popup />);
        expect(popup).to.not.be.null;
    });
});
