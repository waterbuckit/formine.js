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
            this.state.submission = {...this.submission, [path] : value};
            // let tempSub = submission;
            // path = path.split('.');
            // for (i = 0; i < path.length - 1; i++)
            //     tempSub = tempSub[path[i]];

            // tempSub[path[i]] = value;
            // setSubmission(tempSub);
        }

		return (
			<SubmissionContext.Provider
				value={{
					submission: state.submission,
                    onChange,
                    onInput
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
// export default function FormComponent({formine : {hooks, options, schema : {components}}, getSubmission = null, path = null}) {
// 	const [submission, setSubmission] = useState({});

// 	const onChange = (e, value, path) => {
//         updateSubmissionField(value, path);
// 		hooks.onChange?.(e);
// 	};

// 	const onInput = (e, value, path) => {
//         updateSubmissionField(value, path);
// 		hooks.onInput?.(e);
// 	};

//     const updateSubmissionField = (value, path) => {
//         setSubmission({ ...submission, [path] : value });
//         // let tempSub = submission;
//         // path = path.split('.');
//         // for (i = 0; i < path.length - 1; i++)
//         //     tempSub = tempSub[path[i]];

//         // tempSub[path[i]] = value;
//         // setSubmission(tempSub);
//     }

// 	return (
// 		<SubmissionContext.Provider value={{ submission, onChange, onInput }}>
// 			<form>
// 				{components.map((component) => {
// 					const comp = {
// 						component: FormineComponents[component.type],
// 					};
// 					return <comp.component {...component} path={`${path ? path + "." : ""}${component.key}`} />;
// 				})}
// 			</form>
// 		</SubmissionContext.Provider>
// 	);
// }
