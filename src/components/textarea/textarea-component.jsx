import { h, Component } from "preact";
import { useState } from "preact/hooks";
import { useTextComponent } from "../../lib/hooks";

export default function TextArea(props) {
	const [value, setValue] = useState(props.defaultValue ?? "");
	const actionHandlers = useTextComponent(setValue, props);

	return <textarea {...props.attributes} {...actionHandlers}></textarea>;
}
