import FormComponent from "./components/form/form-component";
import { h, render as preactRender } from "preact";
import operators from "./lib/operators";

class Formine extends FormComponent {
	static get OPERATORS(){
		return operators;
	}

	constructor(element, schema, options, hooks) {
		super();
		this.element = element;
		this.schema = schema;
		this.options = options;
		this.hooks = hooks;
	}

	static async render(element, { schema = {}, hooks = {}, options = {} }) {
		return new Promise((resolve, reject) => {
			try {
				let instance = null;
				preactRender(
					<Formine
						ref={(formine) => {
							instance = formine;
						}}
						formine={{ schema, hooks, options }}
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
