import {Btn} from "./btn";
import {expect} from "chai";
import sinon from "sinon";

describe.only("button tests", () => {
    it('Should call router.go on click', function () {
        let navigateMock = sinon.mock()

        const instance = new Btn({
            type: "link",
            class: "btn",
            href: "/menu",
            label: "click",
            navigate: navigateMock
        })

        const elem = instance.element

        elem?.click()

        expect(navigateMock.callCount).to.eq(1)
    })

})
