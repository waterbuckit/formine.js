import { h, Component, Fragment } from "preact";
import { useContext, useState } from "preact/hooks";
import { SubmissionContext } from "../../lib/context";
import { useConditionalRender, useTextComponent } from "../../lib/hooks";

export default function TextComponent(props) {
    const [value, setValue] = useState(props.defaultValue ?? "");
    const actionHandlers = useTextComponent(setValue, props);
    const [show, setShow] = useConditionalRender(props?.display?.conditions, props?.display?.defaultShow);

    return (
        <>
            { show &&
			<input
				{...props.attributes}
                {...actionHandlers}
				type="text"
			/>
            }
        </>
	);
}