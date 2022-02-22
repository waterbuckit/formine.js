import { h, Component, Fragment } from "preact";
import { useCheckboxComponent } from "../../lib/hooks";

export default function CheckboxComponent({ attributes, fields, ...props }) {
  const [value, setValue, componentProps] = useCheckboxComponent(
    props,
    attributes
  );
 

  return fields ? (
    <fieldset {...attributes}>
      {fields.map((field) => {
        return (
          <>
            <input name={`${attributes.name}-${field.label.toLowerCase()}`} value={field.value} type="checkbox" />
            <label for={`${attributes.name}-${field.label.toLowerCase()}`}>{field.label}</label>
          </>
        );
      })}
    </fieldset>
  ) : (
    <input {...attributes} {...componentProps} type="checkbox" />
  );
}
