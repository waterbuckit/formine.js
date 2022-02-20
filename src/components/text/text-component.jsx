import { h, Component } from "preact";
import { useTextComponent } from "../../lib/hooks";

export default function TextComponent({attributes, ...props}) {
    const [value, setValue, componentProps] = useTextComponent(props);

	return <input {...attributes} {...componentProps} type="text" />;
}
