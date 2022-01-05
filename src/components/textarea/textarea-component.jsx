import { h, Component } from "preact";
import { useTextComponent } from "../../lib/hooks";

export default function TextArea(props) {
	const [value, setValue, componentProps] = useTextComponent(props);

	return <textarea {...props?.attributes} {...componentProps}></textarea>;
}
