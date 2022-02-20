import { h, Component } from "preact";
import { SubmissionContext } from "../../lib/context";
import FormineComponent from "../formine-component";
import * as FormineComponents from "./../components";

export default class FormComponent extends Component {
	state = {
		submission: {},
		submitted : false,
	};

	get submission() {
		return this.state.submission;
	}

	get submitted() {
		return this.state.submitted;
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

		const onSubmit = (e) => {
			e.preventDefault();
			hooks.beforeSubmit?.(e, this);	
			this.setState({
				submitted : true
			});
			hooks.onSubmit?.(e, this);
		}

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
				<form 
				onSubmit={onSubmit}
				{...this.props?.attributes}>
					{components.map((component) => {
						const comp = {
							component: FormineComponents[component.type],
						};
						return (
							<FormineComponent 
								{...component}>
								<comp.component
									{...component}
									path={`${path ? path + "." : ""}${
										component.uid
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
