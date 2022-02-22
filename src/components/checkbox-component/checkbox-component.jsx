import { h, Component, Fragment } from "preact";
import {
    useCheckboxComponent,
    useCheckboxFieldsetComponent,
} from "../../lib/hooks";
import { slug, snake } from "../../lib/helpers";

export default function CheckboxComponent({ attributes, fields, ...props }) {
    if (fields) {
        const [
            checkedState,
            setCheckedState,
            { getChecked, updateCheckedState },
        ] = useCheckboxFieldsetComponent(fields, props);

        return (
            <fieldset {...attributes}>
                {fields.map((field) => {
                    const id = `${attributes.name}-${slug(field.label)}`;
                    return (
                        <>
                            <input
                                name={id}
                                value={field.value}
                                id={id}
                                checked={getChecked(snake(field.label))}
                                onClick={(e) =>
                                    updateCheckedState(snake(field.label), e)
                                }
                                type="checkbox"
                            />
                            <label for={id}>{field.label}</label>
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
