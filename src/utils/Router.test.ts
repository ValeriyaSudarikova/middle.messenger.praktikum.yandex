import sinon from "sinon"
import Router from "./Router"
import {expect} from "chai"
import {describe} from "mocha"

describe("Router", () => {
	const originalForward = window.history.forward
	const originalBack = window.history.back


	beforeEach(() => {
		Router.reset()
		window.history.forward = sinon.fake()
		window.history.back = sinon.fake()
	})

	describe("function back", () => {
		it("should call back function once", function () {
			Router.back()

			expect((window.history.back as any).callCount).to.eq(1)
		})
	})
	describe("function forward", () => {
		it("should call forward function once", function () {
			Router.forward()

			expect((window.history.forward as any).callCount).to.eq(1)
		})
	})

	after(() => {
		window.history.forward = originalForward
		window.history.back = originalBack
	})
})
