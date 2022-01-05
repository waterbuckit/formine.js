import Formine from "../formine";

export const conditionReducer = (submission, operation = Formine.OPERATORS.AND) => (toShow, condition) => {
    let ret = toShow;
    switch(condition.type){
        case "set":
            ret = condition.conditions.reduce(conditionReducer(submission, condition.operation), true);
            break;
        case "simple":
            ret = condition.operation.operate(submission[condition.path], condition.value);
            break;
        case "advanced":
        default:
    }
    ret = operation.operate(ret == (condition.display ?? true), toShow);
    return ret;
};
