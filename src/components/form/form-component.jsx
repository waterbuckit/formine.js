import { h, Component } from "preact";
import { SubmissionContext } from "../../lib/context";
import FormineComponent from "../formine-component";
import * as FormineComponents from "./../components";

export default class FormComponent extends Component {
    state = {
        submission: {},
        submitted: false,
    };

    get submission() {
		console.log(this.state.submission);
        return Object.entries(this.state.submission).reduce(
            (prev, [keyPath, value]) => this.#setValue(prev, keyPath, value),
            {}
        );
    }

    #setValue(obj, path, value) {
        var a = path.split(".");
        var o = obj;
        while (a.length - 1) {
            var n = a.shift();
            if (!(n in o)) o[n] = {};
            o = o[n];
        }
        o[a[0]] = value;
        return obj;
    }

    get submitted() {
        return this.state.submitted;
    }

    render(
        {
            formine: {
                hooks,
                options: { submitDefault = false },
                schema: { attributes, components },
				values
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

		const onFieldLoadState = (value, path) => {
			updateSubmissionField(value, path);
		}

        const onSubmit = (e) => {
            e.preventDefault();

            hooks.beforeSubmit?.(e, this);
            this.setState({
                submitted: true,
            });
            hooks.onSubmit?.(e, this);

            if (submitDefault) {
                e.target.submit();
            }
        };

        const onReset = (e) => {
            hooks.beforeReset?.(e, this.submission, this);
            this.setState({ submission: {} });
            hooks.onReset?.(e, this);
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
					values : values,
                    onChange,
                    onInput,
					onFieldLoadState
                }}
            >
                <form onSubmit={onSubmit} onReset={onReset} {...attributes}>
                    {components.map((component) => {
						const newPath = `${path ? path + "." : ""}${
                                    component.uid
                                }`
                        return (
                            <FormineComponent
                                path={newPath}
                                {...component}
                            />
                        );
                    })}
                    <input type="submit" hidden></input>
                </form>
            </SubmissionContext.Provider>
        );
    }
}
