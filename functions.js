module.exports = {
    getTimeFromDate(timestamp) {
        let date = new Date(timestamp * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)

        function pad(num) {
            return ("0" + num).slice(-2);
        };
    },
    lockedAt() {
        const date = new Date();
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const newDate = new Date(utc + (3600000 * +5.5));
        const ist = newDate.toLocaleString("en-IN");
        return ist.replace(/\//g, '-').split(', ').join(' ');
    },
    getTimeFromSeconds(time) {
        time = Number(time);
        let h = Math.floor(time / 3600);
        let m = Math.floor(time % 3600 / 60);
        let s = Math.floor(time % 3600 % 60);
    
        return `${h}:${m}:${s}`;
    }
};
