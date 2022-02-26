import FormComponent from "./components/form/form-component";
import { h, render as preactRender } from "preact";
import { mapToPaths } from "./lib/helpers";

class Formine extends FormComponent {
	constructor(element, schema, values = {}, options, hooks) {
		super();
		this.element = element;
		this.values = mapToPaths(values); 
		this.schema = schema;
		this.options = options;
		this.hooks = hooks;
	}

	static async render(element, { schema = {}, hooks = {}, values = {}, options = {} }) {
		return new Promise((resolve, reject) => {
			try {
				let instance = null;
				let mappedValues = mapToPaths(values);
				console.log(mappedValues);
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
