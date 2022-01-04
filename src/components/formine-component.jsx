import { useConditionalRender } from "../lib/hooks";

export default function FormineComponent({
	children,
	display : { conditions = [], defaultShow } = {},
}) {
	const [show, setShow] = useConditionalRender(conditions, defaultShow);
	return show ? children : null;
}
