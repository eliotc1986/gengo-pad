import { nanoid } from 'nanoid';
import { getLSItem, setLSItem } from './localStorage';
import { LS_KEYS } from '../constants';
import { tryCatch } from 'ramda';

export const getLikes = () => {
  return getLSItem(LS_KEYS.LIKES);
};

export const formatLikes = (likes = []) => {
  if (!Array.isArray(likes)) return {};

  return likes.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.phraseId]: curr.id,
    };
  }, {});
};

export const addLike = (phraseId) => {
  try {
    const prevLikes = getLSItem(LS_KEYS.LIKES);

    const like = {
      id: nanoid(),
      phraseId,
    };

    const newLikes = [...prevLikes, like];
    setLSItem(LS_KEYS.LIKES, newLikes);
  } catch (err) {
    console.log(err);
  }
};

export const deleteLike = (likeId) => {
  try {
    const prevLikes = getLSItem(LS_KEYS.LIKES);
    const newLikes = prevLikes.filter((like) => like.id !== likeId);

    setLSItem(LS_KEYS.LIKES, newLikes);
  } catch (err) {
    console.log(err);
  }
};
