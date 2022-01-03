import FormComponent from "./components/form/form-component";
import { h, render } from "preact";

class Formine {
	constructor(element, schema, options, hooks) {
		this.element = element;
		this.schema = schema;
		this.options = options;
		this.hooks = hooks;
	}

	static async render(element, { schema = {}, hooks = {}, options = {} }) {
		return new Promise((resolve, reject) => {
			const instance = new Formine(element, schema, options, hooks);
			try {
				instance.#initialiseForm();
				resolve(instance);
			} catch (e) {
				reject(e);
			}
		});
	}

    get submission(){
        return this.rootForm.submission;
    }

	#initialiseForm() {
		render(<FormComponent ref={(rootForm) => {this.rootForm = rootForm}} formine={this} />, this.element);
	}
}

export default Formine;
