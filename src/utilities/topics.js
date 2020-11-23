import { nanoid } from 'nanoid';
import { getLSItem, setLSItem } from './localStorage';
import { LS_KEYS } from '../constants';

export const addTopic = (topic) => {
  let prevTopics = getLSItem(LS_KEYS.TOPICS);

  const saveTopic = {
    ...topic,
    id: nanoid(),
    sortOrder: new Date().getTime(),
  };

  const newTopics = [...prevTopics, saveTopic];
  setLSItem(LS_KEYS.TOPICS, newTopics);
};
