import { SubmissionContext } from "./context";
import { useContext, useEffect, useMemo, useState } from "preact/hooks";
import { conditionReducer } from "./reducers";
import { snake } from "./helpers";

export const useTextComponent = ({defaultValue, path, hooks}) => {
	const [value, setValue] = useState(defaultValue ?? "");
	const { onChange, onInput } = useContext(SubmissionContext);
	return [value, setValue,{
		value, 
		onChange : (e) => {
			setValue(e.target.value);
			hooks?.onChange?.(e, e.target.value, path);
			onChange(e, e.target.value, path);
		},
		onInput : (e) => {
			setValue(e.target.value);
			hooks?.onInput?.(e, e.target.value, path);
			onInput(e, e.target.value, path);
		},
        onClick : hooks?.onClick
	}];
};

export const useCheckboxComponent = ({defaultValue = false, path, hooks}, { value = null}) => {

	const { onChange, onInput } = useContext(SubmissionContext);
	const [ checked, setChecked ] = useState(defaultValue);
	return [checked, setChecked,{
		checked,
		value,
		onChange : (e) => {
			const val = e.target.checked ? (value ?? checked) : false;
			setChecked(e.target.checked);
			hooks?.onChange?.(e, val, path);
			onChange(e, val, path);
		},
		onInput : (e) => {
			const val = e.target.checked ? (value ?? checked) : false;
			setChecked(e.target.checked);
			hooks?.onInput?.(e, val, path);
			onInput(e, val, path);
		},
        onClick : hooks?.onClick
	}];
}

export const useCheckboxFieldsetComponent = (fields, { path, hooks }) => {
    const { onChange, onInput } = useContext(SubmissionContext);
	const [event, setEvent] = useState(null);

    const [checkedState, setCheckedState] = useState(
        fields.reduce((a, b) => {
            a[snake(b.label)] = false;
            return a;
        }, {})
    );

				
	useEffect(() => {
        hooks?.onChange?.(event, val, path);
        onChange(event, checkedState, path);
    }, [checkedState]);

    return [
        checkedState,
        setCheckedState,
        {
            getChecked: (field) => checkedState[field],
            updateCheckedState: async (field, e) => {

                const opposite = fields.reduce((a, b) => {
                    a[snake(b.label)] = b.value;
                    return a;
                }, {})[field];

                setCheckedState({
                    ...checkedState,
                    [field]: checkedState[field] ? false : opposite,
                });
				setEvent(e);
            },
        },
    ];
};

export const useButtonComponent = (attributes, hooks) => {
	const type =  ['submit', 'reset'].includes(attributes?.type) ? attributes.type : "button";
	return [{
        onClick : hooks?.onClick
	}, type];
};

export const useShowLabel = (showLabel = true, type, before = true) => {

	const invalidType = useMemo(() => {
		switch(type){
			case "button":
				return false;
			default:
				return true;
		}
	}, [type])

	return [...useState(showLabel && invalidType), 
		before ?? useMemo(() => {
			switch(type){
				case "checkbox":
					return false;
				default:
					return true;
			}
		}, [type])
	];
}

export const useConditionalRender = (conditions = [], defaultShow = true) => {

    const { submission } = useContext(SubmissionContext);
    const [show, setShow] = useState(defaultShow);

	useMemo(() => {
    	setShow(conditions.reduce(conditionReducer(submission), defaultShow));
	}, [submission]);

    return [show, setShow];
}
