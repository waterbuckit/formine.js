import { h, Component, Fragment } from "preact";

export function LabelComponent({showFieldLabel, uid, fieldLabel, ...labelAttributes}){
    return showFieldLabel && <label {...labelAttributes} for={uid}> {fieldLabel ?? uid} </label>;
}