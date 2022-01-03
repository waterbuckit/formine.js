import { SubmissionContext } from "./context";
import { useContext, useEffect, useState } from "preact/hooks";
import { conditionReducer } from "./reducers";

export const useTextComponent = (setValue, props) => {
	const { onChange, onInput } = useContext(SubmissionContext);
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

export const useConditionalRender = (conditions = [], defaultShow = true) => {

    const { submission } = useContext(SubmissionContext);
    const [show, setShow] = useState(defaultShow);

    setShow(conditions.reduce(conditionReducer(submission), defaultShow));

    return [show, setShow];
}
