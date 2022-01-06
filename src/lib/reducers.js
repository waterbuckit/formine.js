import Formine from "../formine";


export const conditionReducer = (submission, operation = Formine.OPERATORS.AND) => 
    (toShow, condition) => {

    const applyConditions = (ret) => {
        return operation.operate(ret == (condition.display ?? true), toShow);
    }

    switch(typeof condition){
        case "object":
            if(!(condition?.operation?.prototype instanceof Formine.OPERATORS.Operator)){
                throw new Error(`Invalid Operator Type: ${typeof condition?.operation}`);
            }
            return condition.conditions ? 
                applyConditions(condition.conditions.reduce(conditionReducer(submission, condition.operation), true)) : 
                applyConditions(condition.operation.operate(submission[condition.path], condition.value));
        case "string":
            return applyConditions(Function('"use strict";return (' + condition + ')')()(submission));
        case "function":
            return applyConditions(condition(submission) ?? true);
        default:
            throw new Error(`Invalid Condition Type: ${typeof condition}`); 
    }
};
