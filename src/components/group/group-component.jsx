import { h, Component, Fragment } from "preact";
import FormineComponent from "../formine-component";
import * as FormineComponents from "./../components";

export default function GroupComponent(props) {
  return (
    <>
      {props.components.map((component) => {
        const comp = {
          component: FormineComponents[component.type],
        };
        return (
          <FormineComponent {...component}>
            <comp.component
              {...component}
              path={`${props.path ? props.path + "." : ""}${component.uid}`}
            />
          </FormineComponent>
        );
      })}
    </>
  );
}
