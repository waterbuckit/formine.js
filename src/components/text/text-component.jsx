import { h, Component } from "preact";
import { useTextComponent } from "../../lib/hooks";

export default function TextComponent(props) {
    const [value, setValue, componentProps] = useTextComponent(props);

	return <input {...props?.attributes} {...componentProps} type="text" />;
}
