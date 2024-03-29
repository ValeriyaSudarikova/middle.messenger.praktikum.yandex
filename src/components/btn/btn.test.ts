import {Btn} from "./btn"
import {expect} from "chai"
import sinon from "sinon"

describe("button tests", () => {
	it("Should call router.go on click", function () {
		const navigateMock = sinon.mock()

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
	it("should render button with correct label", function () {
		const label = " click me "

		const instance = new Btn({
			type: "link",
			class: "btn",
			href: "/menu",
			label: label,
		})

		const elem = instance.element

		expect(elem?.innerHTML).to.eq(label)
	})
})
