import { h, Component } from "preact";
import { useState } from "preact/hooks";
import { SubmissionContext } from "../../lib/context";
import * as FormineComponents from "./../components";

export default class FormComponent extends Component {
	state = {
		submission: {},
	};

	get submission() {
		return this.state.submission;
	}

	render(
		{
			formine: {
				hooks,
				options,
				schema: { components },
			},
			path = null,
		},
		state
	) {
		const onChange = (e, value, path) => {
			updateSubmissionField(value, path);
			hooks.onChange?.(e);
		};

		const onInput = (e, value, path) => {
			updateSubmissionField(value, path);
			hooks.onInput?.(e);
		};

		const updateSubmissionField = (value, path) => {
			this.state.submission = { ...state.submission, [path]: value };
			console.log(this.state.submission);
		};

		return (
			<SubmissionContext.Provider
				value={{
					submission: state.submission,
					onChange,
					onInput,
				}}
			>
				<form>
					{components.map((component) => {
						const comp = {
							component: FormineComponents[component.type],
						};
						return (
							<comp.component
								{...component}
								path={`${path ? path + "." : ""}${
									component.key
								}`}
							/>
						);
					})}
				</form>
			</SubmissionContext.Provider>
		);
	}
}
