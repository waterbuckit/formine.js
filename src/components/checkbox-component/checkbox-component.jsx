import { h, Component, Fragment } from "preact";
import { useCheckboxComponent, useCheckboxFieldsetComponent } from "../../lib/hooks";
import { slug } from "../../lib/helpers";

export default function CheckboxComponent({ attributes, fields, ...props }) {
    if (fields) {

        // const [checked, setChecked, handlers] = useCheckboxFieldsetComponent(fields);

        return (
            <fieldset {...attributes}>
                {fields.map((field) => {
                    return (
                        <>
                            <input
                                name={`${
                                    attributes.name
                                }-${slug(field.label)}`}
                                value={field.value}
                                type="checkbox"
                            />
                            <label
                                for={`${
                                    attributes.name
                                }-${slug(field.label)}`}
                            >
                                {field.label}
                            </label>
                        </>
                    );
                })}
            </fieldset>
        );
    }

    const [value, setValue, componentProps] = useCheckboxComponent(
        props,
        attributes
    );

    return <input {...attributes} {...componentProps} type="checkbox" />;
}
