import Block from "../../utils/Block";
import {Router} from "../../utils/Router";

interface BlockConstructable { new(props: any): Block; }
export function withRouter(Component: BlockConstructable) {
    type Props = typeof Component extends typeof Block<infer Props> ? Props : any;

    return class WithRouter extends Component {
        constructor(props: Props & PropsWithRouter) {
            super({ ...props, router: Router });
        }
    }
}

export interface PropsWithRouter {
    router: Router;
}
