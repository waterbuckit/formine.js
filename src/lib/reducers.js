import Formine from "../formine";


export const conditionReducer = (submission, operation = Formine.OPERATORS.AND) => (toShow, condition) => {

    if(!(condition.operation.prototype instanceof Formine.OPERATORS.Operator)){
        throw new Error(`Invalid Operator Type: ${typeof condition.operation}`);
    }

    const applyConditions = (ret) => {
        return operation.operate(ret == (condition.display ?? true), toShow);
    }

    let ret = toShow;
    switch(condition.type){
        case "set":
            return applyConditions(condition.conditions.reduce(conditionReducer(submission, condition.operation), true));
        case "simple":
            return applyConditions(condition.operation.operate(submission[condition.path], condition.value));
        case "advanced":
        default:
    }
};
