import FormComponent from "./components/form/form-component";
import { h, render as preactRender } from "preact";
import { mapToPaths } from "./lib/helpers";

class Formine extends FormComponent {

	static async render(element, { schema = {}, hooks = {}, values = {}, options = {} }) {
		return new Promise((resolve, reject) => {
			try {
				let instance = null;
				let mappedValues = mapToPaths(values);
				preactRender(
					<Formine
						ref={(formine) => {
							instance = formine;
						}}
						formine={{ schema, hooks, options, values : mappedValues }}
					/>,
					element
				);
				resolve(instance);
			} catch (e) {
				reject(e);
			}
		});
	}
}

export default Formine;
