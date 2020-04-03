module.exports = function generate(){
    const date = new Date();

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const millis = date.getUTCMilliseconds();

    return `${year}${month}${day}${minutes}${seconds}${millis}`;
}