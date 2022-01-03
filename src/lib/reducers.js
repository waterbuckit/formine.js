const applyOperator = (a, operator, b) => {
    switch(operator) {
        case "==":
            return a == b;
        case "||":
            return a || b;
        case "&&":
        default:
            return a && b;
    }
}

export const conditionReducer = (submission, operation = null) => (toShow, condition) => {
    let ret = toShow;
    switch(condition.type){
        case "set":
            ret = condition.conditions.reduce(conditionReducer(submission, condition.operation), true);
            break;
        case "simple":
            ret = applyOperator(submission[condition.path], condition.operation, condition.value);
            break;
        case "advanced":
        default:
    }

    ret = applyOperator(ret, operation, toShow);
    return ret;
};
