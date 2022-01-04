import { h, Component } from "preact";
import { useState } from "preact/hooks";
import { SubmissionContext } from "../../lib/context";
import FormineComponent from "../formine-component";
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
			this.setState({
				submission: { ...state.submission, [path]: value },
			});
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
							<FormineComponent {...component}>
								<comp.component
									{...component}
									path={`${path ? path + "." : ""}${
										component.key
									}`}
								/>
							</FormineComponent>
						);
					})}
				</form>
			</SubmissionContext.Provider>
		);
	}
}
