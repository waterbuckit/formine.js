import { SubmissionContext } from "./context";
import { useContext, useEffect, useMemo, useState } from "preact/hooks";
import { conditionReducer } from "./reducers";

export const useTextComponent = (props) => {
	const [value, setValue] = useState(props.defaultValue ?? "");
	const { onChange, onInput } = useContext(SubmissionContext);
	return [value, setValue,{
		value, 
		onChange : (e) => {
			setValue(e.target.value);
			props.hooks?.onChange?.(e, e.target.value, props.path);
			onChange(e, e.target.value, props.path);
		},
		onInput : (e) => {
			setValue(e.target.value);
			props.hooks?.onInput?.(e, e.target.value, props.path);
			onInput(e, e.target.value, props.path);
		},
        onClick : props.hooks?.onClick
	}];
};

export const useButtonComponent = (setValue, props) => {
	const { onChange, onInput } = useContext(SubmissionContext);
	const type =  props?.attributes?.type == "submit" ? props.attributes.type : "button";
	return [{
        onClick : props.hooks?.onClick
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

	useMemo(() => {
    	setShow(conditions.reduce(conditionReducer(submission), defaultShow));
	}, [submission]);

    return [show, setShow];
}
