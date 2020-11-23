const dateFormat = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const timestampToDate = (timestamp) =>
  new Intl.DateTimeFormat('en-US', dateFormat).format(timestamp);
