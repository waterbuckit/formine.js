import { SubmissionContext } from "./context";
import { useContext } from "preact/hooks";

export const useTextComponent = (setValue, props) => {
	const { submission, onChange, onInput } = useContext(SubmissionContext);
	return {
		onChange : (e) => {
			setValue(e.target.value);
			props.onChange?.(e);
			onChange(e);
		},
		onInput : (e) => {
			setValue(e.target.value);
			props.onInput?.(e);
			onInput(e);
		},
        onClick : props?.onClick
	};
};
