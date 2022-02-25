import operators from './operators';

export const conditionReducer = (submission, op = operators.AND) => 
    (toShow, condition) => {

    const applyConditions = (ret) => {
        return op.operate(ret == (condition.display ?? true), toShow);
    }

    switch(typeof condition){
        case "object":
            const newCon = {...condition, op : operators[condition.op]};

            if(!(newCon?.op?.prototype instanceof operators.Operator)){
                throw new Error(`Invalid Operator Type: ${typeof newCon?.op}`);
            }

            return newCon.conditions ? 
                applyConditions(newCon.conditions.reduce(conditionReducer(submission, newCon.op), true)) : 
                applyConditions(newCon.op.operate(submission[newCon.path], newCon.value));
        case "string":
            return applyConditions(Function('"use strict";return (' + condition + ')')()(submission));
        case "function":
            return applyConditions(condition(submission) ?? true);
        default:
            throw new Error(`Invalid Condition Type: ${typeof condition}`); 
    }
};
