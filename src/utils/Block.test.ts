import Block from "./Block";

describe("block", () => {
    class Component extends Block<{}> {
        render() {
            return new DocumentFragment()
        }
    }

    it('test', () => {
        // const instance = new Component("div", {})
    });
})
