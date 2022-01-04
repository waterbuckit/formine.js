import { h, Component } from "preact";
import { useState } from "preact/hooks";
import { useButtonComponent } from "../../lib/hooks";

export default function ButtonComponent(props) {
	const [value, setValue] = useState(props.defaultValue ?? "");
	const [actionHandlers, type] = useButtonComponent(value, props);

	return <button {...props.attributes} {...actionHandlers} type={type}
	dangerouslySetInnerHTML={{
		__html: props.innerHTML ?? `<span>${props.uid}</span>`
	  }}></button>;
}
