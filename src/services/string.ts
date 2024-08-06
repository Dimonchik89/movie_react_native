const normalizeText = (str: string = '', length: number) => {
    if (str.length < length) {
        return str;
    } else {
        return str.slice(0, length) + '...';
    }
};

const normalizeDate = (date: string) => {
    return new Date(date).toDateString()
}

export { normalizeText, normalizeDate };
