const format = {
  date: (date: Date, delimiter?: '-' | '.') => {
    if (!delimiter)
      return `${date.getFullYear()}년 ${
        date.getMonth() + 1
      }월 ${date.getDate()}일`;

    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${date.getFullYear()}${delimiter}${
      month < 10 ? `0${month}` : month
    }${delimiter}${day < 10 ? `0${day}` : day}`;
  },
};

export default format;
