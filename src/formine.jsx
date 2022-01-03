import FormComponent from './components/form/form-component';
import {h, render } from 'preact';

class Formine {

    constructor(element, schema = {}, options = {}){
        this.element = element;
        this.schema = schema;
        this.options = options;
    }

    static async render(element, {schema = {}, options = {}}){
        return new Promise((resolve, reject) => {
            const instance = new Formine(element, schema, options);
            try{
                instance.#initialiseForm();
                resolve(this);
            }catch(e){
                reject(e);
            }
        });
    }

    #initialiseForm(){
        this.rootForm = <FormComponent formine={this} /> 
        render(this.rootForm, this.element);
    }

    on(event, callback = () => {}){

    }

}

export default Formine;