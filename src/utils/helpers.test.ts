import {expect} from "chai";
import {checkOnErrors, set} from "./helpers";

describe("helpers functions",() => {
    describe('method set ', function () {
        it('should return passed object if typeof obj is not an object', function () {
            //arrange
            const obj = 1
            //act
            const result = set(1, "test.test", 1 )
            //assert
            expect(result).to.eq(obj)
        });
        it('should return passed null if null is passed', function () {
            //arrange
            const obj: unknown = null
            //act
            const result = set(obj, 'test.test', 1)
            //assert
            expect(result).to.eq(obj)
        });
        it('should throw an error if path is not string', function () {
            const obj = {};
            const path = 1 as any;

            const fn = () => set(obj, path, 1);

            expect(fn).to.throw(Error)
        });
        it('should set new property to passed object with passed value', function () {
            const obj = {}
            const path = "a.b.c"
            const value = 3

            const result = set(obj, path, value)

            expect((result as any).a.b.c).to.eq(value)
        });
        it('should not return new object', function () {
            const obj = {}
            const path = "a.b.c"
            const value = 3

            const result = set(obj, path, value)

            expect(result).to.eq(obj)
        });

    });
    describe("function checkOnError", () => {
        it("in case first name is in lower case should return obj.check = true (errored)", () => {
            const first_name = "maks2"

            const result = checkOnErrors("first_name", first_name);

            expect(result.check).to.eq(false)
        })
        it("in case phone has letters should return obj.check = false", () => {
            const phone = "11122maks"

            const result = checkOnErrors("phone", phone);

            expect(result.check).to.be.false
        })
        it("In case email hasn't @ and domain should return obj.check = false", () => {
            const email = "maks.e"

            const result = checkOnErrors("email", email);

            expect(result.check).to.be.false
        })
    })
})
