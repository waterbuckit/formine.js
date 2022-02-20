import { useConditionalRender, useShowLabel } from "../lib/hooks";
import { h, Component, Fragment } from "preact";
import { useState } from "preact/hooks";

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
    const [showFieldLabel, setShowFieldLabel] = useShowLabel(showLabel, type)

	return show ? (
		<>
			{showFieldLabel && <label {...labelAttributes} for={uid}> {fieldLabel ?? uid} </label>} {children}
		</>
	) : null;
}
