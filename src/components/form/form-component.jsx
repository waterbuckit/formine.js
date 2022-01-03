import { h, Component } from "preact";
import { useState } from "preact/hooks";
import { SubmissionContext } from "../../lib/context";
import * as FormineComponents from "./../components";

export default function FormComponent({formine : {hooks, options, schema : {components}}}) {
	const [submission, setSubmission] = useState({});

	const onChange = (e) => {
		hooks.onChange?.(e);
	};

	const onInput = (e) => {
		hooks.onInput?.(e);
	};

	return (
		<SubmissionContext.Provider value={{ submission, onChange, onInput }}>
			<form>
				{components.map((component) => {
					const comp = {
						component: FormineComponents[component.type],
					};
					return <comp.component {...component} />;
				})}
			</form>
		</SubmissionContext.Provider>
	);
}
