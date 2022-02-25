class Operator {}

class AND extends Operator {
    static operate = (a, b) => a && b;
}
class OR extends Operator {
    static operate = (a, b) => a || b;
}
class EQ extends Operator {
    static operate = (a, b) => a == b;
}
class NEQ extends Operator {
    static operate = (a, b) => a != b;
}
class GT extends Operator {
    static operate = (a, b) => a > b;
}
class GTE extends Operator {
    static operate = (a, b) => a >= b;
}
class LT extends Operator {
    static operate = (a, b) => a < b;
}
class LTE extends Operator {
    static operate = (a, b) => a <= b;
}
export default {
    Operator,
    AND,
    OR,
    EQ,
    NEQ,
    GT,
    GTE,
    LT,
    LTE,
    "&&": AND,
    "||": OR,
    "==": EQ,
    "!=": NEQ,
    ">": GT,
    ">=": GTE,
    "<": LT,
    "<=": LTE,
};
