import { SubmissionContext } from "./context";
import { useContext, useEffect, useMemo, useState } from "preact/hooks";
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

export const useButtonComponent = (setValue, props) => {
	const { onChange, onInput } = useContext(SubmissionContext);
	const type =  props?.attributes?.type == "submit" ? props.attributes.type : "button";
	return [{
        onClick : props?.onClick
	}, type];
};

export const useShowLabel = (showLabel = true, type) => {
	const invalidType = useMemo(() => {
		switch(type){
			case "button":
				return false;
			default:
				return true;
		}
	}, [type])
	return useState(showLabel && invalidType);
}

export const useConditionalRender = (conditions = [], defaultShow = true) => {

    const { submission } = useContext(SubmissionContext);
    const [show, setShow] = useState(defaultShow);

	useEffect(() => {
    	setShow(conditions.reduce(conditionReducer(submission), defaultShow));
	}, [submission]); // only run if the submission has changed

    return [show, setShow];
}
