export function arrayToDateTime(arr) {
    if (arr.length < 6) {
        console.error("Mảng phải chứa ít nhất 6 phần tử (năm, tháng, ngày, giờ, phút, giây)");
        return null;
    }

    var year = arr[0];
    var month = arr[1];
    var day = arr[2];
    var hours = arr[3];
    var minutes = arr[4];
    var seconds = arr[5];

    var dateTime = new Date(year, month - 1, day, hours, minutes, seconds);

    return dateTime;
}

export const displayDateTime = (arr) => {
    const date = arrayToDateTime(arr);
    const dateCurrent = Date.now();
    const diffInMs = dateCurrent - date.getTime(); // Tính hiệu số thời gian ở đơn vị mili giây

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Chuyển đổi thành đơn vị phút
    if(diffInMinutes <= 0) {
        return "Bây giờ"
    }
    if(diffInMinutes < 60) {
        return `${diffInMinutes} phút`
    }

    if(diffInMinutes >= 60 && diffInMinutes < 1440) {
        // chuyển sang giờ
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} giờ` ;
    }
    if(diffInMinutes >= 1440 && diffInMinutes < 43200) {
        // chuyển sang ngày
        const hours = diffInMinutes/60;
        const days = Math.floor(hours/24);
        return `${days} ngày` 

    }
    if(diffInMinutes >= 43200 && diffInMinutes < 525600) {
        // chuyển sang tháng 
        const hours = diffInMinutes/60;
        const days = hours/24;
        const months = Math.floor(days/30);
        return `${months} tháng`
    }
    if(diffInMinutes >= 525600) {
        // chuyển sang năm
        const hours = diffInMinutes/60;
        const days = hours/24;
        const months = days/30;
        const years = Math.floor(months/12);
        return `${years} năm`;
    }
}

