import { useConditionalRender, useShowLabel } from "../lib/hooks";
import { h, Component, Fragment } from "preact";
import { useState } from "preact/hooks";
import { LabelComponent } from "./label-component";

export default function FormineComponent({
	children,
	uid,
	fieldLabel,
    type,
    showLabel,
	labelAttributes,
	display: { conditions = [], defaultShow }  = {},
}) {
	const [show, setShow] = useConditionalRender(conditions, defaultShow);
    const [showFieldLabel, setShowFieldLabel, before] = useShowLabel(showLabel, type)

	return show ? (
		<>
			{before && <LabelComponent showFieldLabel={showFieldLabel} fieldLabel={fieldLabel} labelAttributes={labelAttributes} uid={uid} />}
			{children}
			{!before && <LabelComponent showFieldLabel={showFieldLabel} fieldLabel={fieldLabel} labelAttributes={labelAttributes} uid={uid} />}
		</>
	) : null;
}
