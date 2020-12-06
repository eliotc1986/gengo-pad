export const getPhraseCount = (topicId, phrases) => {
  if (phrases.length < 1) return 0;

  return phrases.reduce((acc, cur) => {
    if (cur.topicId === topicId) acc++;
    return acc;
  }, 0);
};
