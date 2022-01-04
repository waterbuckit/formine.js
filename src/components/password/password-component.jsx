import { h, Component } from "preact";
import { useState } from "preact/hooks";
import { useTextComponent } from "../../lib/hooks";

export default function PasswordComponent(props) {
	const [value, setValue] = useState(props.defaultValue ?? "");
	const actionHandlers = useTextComponent(setValue, props);

	return <input {...props?.attributes} {...actionHandlers} type="text" />;
}
