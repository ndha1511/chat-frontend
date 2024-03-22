export const getDataFromLocalStorage = (name) => {
    const data = localStorage.getItem(name);
    if(data) {
        return JSON.parse(data);
    }
    return null;
}