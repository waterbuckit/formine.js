import { useConditionalRender, useShowLabel } from "../lib/hooks";
import { h, Component, Fragment } from "preact";
import { useState } from "preact/hooks";
import * as FormineComponents from "./components";
import { LabelComponent } from "./label-component";
import { nanoid } from 'nanoid'
import { slug } from "../lib/helpers";

export default function FormineComponent({
	uid,
	fieldLabel,
    type,
    showLabel,
	path,
	labelAttributes,
	display: { conditions = [], defaultShow }  = {},
	...props
}) {
	const FormField = FormineComponents[type];

	const [id] = useState(slug(`${nanoid(4)} ${uid}`))

	const [show, setShow] = useConditionalRender(conditions, defaultShow);
    const [showFieldLabel, setShowFieldLabel, before] = useShowLabel(showLabel, type)

	props.attributes = {...props.attributes, name : props.attributes?.name || uid, id : id}; 

	return show ? (	
		<>
			{before && <LabelComponent showFieldLabel={showFieldLabel} fieldLabel={fieldLabel} labelAttributes={labelAttributes} uid={uid} />}
			<FormField path={path} {...props} /> 
			{!before && <LabelComponent showFieldLabel={showFieldLabel} fieldLabel={fieldLabel} labelAttributes={labelAttributes} uid={uid} />}
		</>
	) : null;
}
