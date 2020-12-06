import { nanoid } from 'nanoid';
import { getLSItem, setLSItem } from './localStorage';
import { LS_KEYS } from '../constants';
import { tryCatch } from 'ramda';

export const getPhrases = () => {
  return getLSItem(LS_KEYS.PHRASES);
};

export const addPhrase = (phrase) => {
  try {
    const prevPhrases = getLSItem(LS_KEYS.PHRASES);
    const savePhrase = {
      ...phrase,
      id: nanoid(),
      isLiked: false,
      sortOrder: new Date().getTime(),
      created: new Date().getTime(),
    };

    const newPhrases = [...prevPhrases, savePhrase];
    setLSItem(LS_KEYS.PHRASES, newPhrases);
  } catch (err) {
    console.log(err);
  }
};

export const deletePhrase = (phraseId) => {
  try {
    const prevPhrases = getLSItem(LS_KEYS.PHRASES);
    const newPhrases = prevPhrases.filter((topic) => topic.id !== phraseId);

    setLSItem(LS_KEYS.PHRASES, newPhrases);
  } catch (err) {
    console.log(err);
  }
};
