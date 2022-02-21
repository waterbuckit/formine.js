import { h, Component } from "preact";
import { useCheckboxComponent } from "../../lib/hooks";

export default function CheckboxComponent({attributes, ...props}) {
    const [value, setValue, componentProps] = useCheckboxComponent(props, attributes);

    return  <input {...attributes} {...componentProps} type="checkbox" />
}
