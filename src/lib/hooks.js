import { SubmissionContext } from "./context";
import { useContext } from "preact/hooks";

export const useTextComponent = (setValue, props) => {
	const { submission, onChange, onInput } = useContext(SubmissionContext);
	return {
		onChange : (e) => {
			setValue(e.target.value);
			props.onChange?.(e, e.target.value, props.path);
			onChange(e, e.target.value, props.path);
		},
		onInput : (e) => {
			setValue(e.target.value);
			props.onInput?.(e, e.target.value, props.path);
			onInput(e, e.target.value, props.path);
		},
        onClick : props?.onClick
	};
};
