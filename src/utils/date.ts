export function formatDatetime(date: Date | number) {
    if (typeof date == 'number') {
        return formatDatetime(new Date(date))
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // 返回格式化后的日期字符串
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function formatDate(date: Date | number) {
    if (typeof date == 'number') {
        return formatDate(new Date(date))
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // 返回格式化后的日期字符串
    return `${year}-${month}-${day}`;
}


export function formatTime(date: Date | number) {
    if (typeof date == 'number') {
        return formatTime(new Date(date))
    }

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // 返回格式化后的日期字符串
    return `${hours}:${minutes}:${seconds}`;
}