const colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0',
    '#FFCCFF', '#33FFFF'
];

export const extractName = (name) => {
    const nameString = name + "";
    const names = nameString.split(" ");
    let newName = "";
    if(names.length > 1) {
        newName = names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
    } else {
        newName = names[0].charAt(0).toUpperCase();
    }
    return newName;

}   

export const getColorForName = (name) => {
    const nameExtracted = extractName(name);
    let totalAsciiCode = 0;
    for(let i = 0; i < nameExtracted.length; i++) {
        const asciiCode = nameExtracted.charCodeAt(i);
        totalAsciiCode += asciiCode;
    }
    const colorIndex = Math.floor((totalAsciiCode/10) / 2);
    return colors[colorIndex];
}
// export const getColorForName = (name) => {
//     const nameExtracted = extractName(name);
//     let totalAsciiCode = 0;
//     for (let i = 0; i < nameExtracted.length; i++) {
//         const asciiCode = nameExtracted.charCodeAt(i);
//         totalAsciiCode += asciiCode;
//     }
//     const colorIndex = totalAsciiCode % colors.length; // Sử dụng phép chia lấy dư
//     return colors[colorIndex];
// }