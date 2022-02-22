import { h, Component, Fragment } from "preact";

export function LabelComponent({showFieldLabel, uid, id, fieldLabel, ...labelAttributes}){
    return showFieldLabel && <label {...labelAttributes} for={id}> {fieldLabel ?? uid} </label>;
}