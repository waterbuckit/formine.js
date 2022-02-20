import { h, Component } from "preact";
import { useState } from "preact/hooks";
import { useButtonComponent } from "../../lib/hooks";

export default function ButtonComponent({attributes, ...props}) {

	const [actionHandlers, type] = useButtonComponent(props);

	return <button {...attributes} {...actionHandlers} type={type}
	dangerouslySetInnerHTML={{
		__html: props.innerHTML ?? `<span>${props.uid}</span>`
	  }}></button>;
}
