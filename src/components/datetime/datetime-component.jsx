import { h, Component } from "preact";
import { useTextComponent } from "../../lib/hooks";

export default function DatetimeComponent({attributes, ...props}) {
    const [value, setValue, componentProps] = useTextComponent(props);

	return <input {...attributes} {...componentProps} type="datetime-local" />;
}