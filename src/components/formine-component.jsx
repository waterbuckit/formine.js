import { useConditionalRender, useShowLabel, useWithSubmissionValue } from "../lib/hooks";
import { h, Component, Fragment } from "preact";
import { useContext, useState } from "preact/hooks";
import * as FormineComponents from "./components";
import { LabelComponent } from "./label-component";
import { nanoid } from 'nanoid'
import { slug } from "../lib/helpers";
import { SubmissionContext } from "../lib/context";

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

	const { values } = useContext(SubmissionContext);
	useWithSubmissionValue(values[path], path);

	const [show, setShow] = useConditionalRender(conditions, defaultShow);
    const [showFieldLabel, setShowFieldLabel, before] = useShowLabel(showLabel, type)



	props.attributes = {...props.attributes, name : props.attributes?.name || uid, id : id}; 

	return show ? (	
		<>
			{before && <LabelComponent showFieldLabel={showFieldLabel} fieldLabel={fieldLabel} id={id} labelAttributes={labelAttributes} uid={uid} />}
			<FormField path={path} {...props} /> 
			{!before && <LabelComponent showFieldLabel={showFieldLabel} fieldLabel={fieldLabel} id={id} labelAttributes={labelAttributes} uid={uid} />}
		</>
	) : null;
}
