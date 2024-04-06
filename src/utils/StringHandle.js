export const litmitString = (str) => {
    if(str.length >= 9)
        return `${str.slice(0, 9)}...`;
    return str;
}