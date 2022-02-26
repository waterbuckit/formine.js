export const slug = (string) =>
    string
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");

export const snake = (string) => {
    return string
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join("_");
};

export const mapToPaths = (object, path = "") => {
    let map = {};
    for (let [key, value] of Object.entries(object)) {
        map[`${path}${key}`] = value;
        if (typeof value == "object") {
            map = {...map, ...mapToPaths(value, `${key}.`)};
        }
    }
    return map;
};
