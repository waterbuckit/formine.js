import { h, Component } from "preact";
import { useState } from "preact/hooks";
import { SubmissionContext } from "../../lib/context";
import * as FormineComponents from "./../components";

export default function FormComponent(props) {
    const [submission, setSubmission] = useState({});

    const onChange = (e) => {
        console.log("change", e);
    }

    const onInput = (e) => {
        console.log("input", e);
    }


	return (
		<SubmissionContext.Provider value={{submission, onChange, onInput}}>
			<form>
				{props.formine.schema.components.map((component) => {
					const comp = { component: FormineComponents[component.type] };
					return <comp.component {...component} />;
				})}
			</form>
		</SubmissionContext.Provider>
	);
}