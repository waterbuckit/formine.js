import { h, Component } from "preact";
import { useContext, useState } from "preact/hooks";
import { SubmissionContext } from "../../lib/context";
import { useTextComponent } from "../../lib/hooks";

export default function TextComponent(props) {
    const [value, setValue] = useState(props.defaultValue ?? "");
    const actionHandlers = useTextComponent(setValue, props);

    return (
			<input
				{...props.attributes}
                {...actionHandlers}
				type="text"
			/>
	);
}