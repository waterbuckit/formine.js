import { h, Component, Fragment } from "preact";
import { useCheckboxComponent, useCheckboxFieldsetComponent } from "../../lib/hooks";
import { slug, snake } from "../../lib/helpers";

export default function CheckboxComponent({ attributes, fields, path, hooks, ...props }) {
    if (fields) {

        const [checkedState, setCheckedState, onChange] =  useCheckboxFieldsetComponent(fields);
		const getChecked = (field) => checkedState[field];
		const updateCheckedStatus = (field, e) => {
            const opposite = fields.reduce((a, b) => {
                          a[snake(b.label)] = b.value;
                          return a;
                      }, {})[field];
            setCheckedState({
                ...checkedState, 
                [field]: checkedState[field]
                    ? false
                    : opposite
            });
            hooks?.onChange?.(e, val, path);
            onChange(e, checkedState, path);
        };
	
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
                                checked={getChecked(snake(field.label))}
                                onClick={(e) => updateCheckedStatus(snake(field.label), e)}
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
