import * as fromQueue from '../actions/queue.action';

import { QueueItem, QueueMeta, QueueResponse, Pagination } from '../../../api';
import { environment } from '../../../../environments/environment';

export interface QueueState {
  loaded: boolean;
  loading: boolean;
  queue: QueueItem[];
  pagination: Pagination;
  meta: QueueMeta;
}

export const initialState: QueueState = {
  loaded: false,
  loading: false,
  queue: [],
  pagination: { totalCount: 0, totalPages: 1, currentPage: 1 },
  meta: null
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function queueReducer(
  state = initialState,
  action: fromQueue.QueueAction
): QueueState {
  switch (action.type) {
    case fromQueue.LOAD_QUEUE: {
      return newState(state, {
        loading: true
      });
    }

    case fromQueue.LOAD_QUEUE_SUCCESS: {
      const queue = (<fromQueue.LoadQueueSuccess>action).payload.items;
      const pagination = (<fromQueue.LoadQueueSuccess>action).payload.pagination;
      pagination.currentPage = 1;

      return newState(state, {
        loaded: true,
        loading: false,
        queue,
        pagination: Object.assign({}, state.pagination, pagination)
      });
    }

    case fromQueue.LOAD_QUEUE_FAIL: {
      return newState(state, {
        loading: false
      });
    }

    case fromQueue.LOAD_NEXT_QUEUE_PAGE: {
      return newState(state, {
        loading: true
      });
    }

    case fromQueue.LOAD_NEXT_QUEUE_PAGE_SUCCESS: {
      const queue = (<fromQueue.LoadNextQueuePageSuccess>action).payload.items;
      const pagination = (<fromQueue.LoadNextQueuePageSuccess>action).payload.pagination;
      pagination.currentPage = state.pagination.currentPage + 1;

      return newState(state, {
        loading: false,
        queue: [...state.queue, ...queue],
        pagination: newState(state.pagination, pagination)
      });
    }

    case fromQueue.LOAD_NEXT_QUEUE_PAGE_FAIL: {
      return newState(state, {
        loading: false
      });
    }

    case fromQueue.LOAD_QUEUE_META_SUCCESS: {
      const meta = (<fromQueue.LoadQueueMetaSuccess>action).payload;

      return newState(state, { meta });
    }

    case fromQueue.LOAD_QUEUE_ITEM_SUCCESS: {
      const item: QueueItem = (<fromQueue.LoadQueueItemSuccess>action).payload;
      const queue = [...state.queue];
      if (state.queue.length === state.pagination.totalCount) {
        queue.push(item);
      }
      const totalCount = state.pagination.totalCount + 1;
      const totalPages = Math.ceil(totalCount / environment.apiLimit) || 1;
      const currentPage = Math.ceil(queue.length / environment.apiLimit);
      const pagination = newState(state.pagination, { totalCount, totalPages, currentPage });
      const userId = item ? item.user.id : null;
      const user = state.meta.users[userId];
      const users = newState(state.meta.users, { [userId]: user ? user + 1 : 1 });
      const play_time = state.meta.play_time + item.track.duration;
      const meta = newState (state.meta, { play_time, total: totalCount, users });

      return newState(state, { queue, pagination, meta});
    }

    case fromQueue.QUEUE_REMOVE_SUCCESS: {
      const uuid = (<fromQueue.QueueRemoveSuccess>action).payload;
      const index = state.queue.findIndex(queueItem => queueItem.uuid === uuid);
      const item = state.queue[index];
      const queue = [...state.queue];

      if (item) {
        queue.splice(index, 1);
      }

      const totalCount = state.pagination.totalCount - 1;
      const totalPages = Math.ceil(totalCount / environment.apiLimit) || 1;
      const currentPage = Math.ceil(queue.length / environment.apiLimit);
      const pagination = newState(state.pagination, { totalCount, totalPages, currentPage });
      const userId = item ? item.user.id : null;
      const userCount = userId ? state.meta.users[userId] : 0;
      const users = userId && userCount ? newState(state.meta.users, { [userId]: userCount - 1 }) : state.meta.users;
      const play_time = item ? state.meta.play_time - item.track.duration : state.meta.play_time;
      const meta = newState(state.meta, { play_time, total: totalCount, users });

      return newState(state, {queue, meta, pagination});
    }

    case fromQueue.QUEUE_SHIFT: {
      const item = state.queue[0];
      const queue = [...state.queue];
      queue.shift();

      const totalCount = state.pagination.totalCount - 1;
      const totalPages = Math.ceil(totalCount / environment.apiLimit) || 1;
      const currentPage = Math.ceil(queue.length / environment.apiLimit);
      const pagination = newState(state.pagination, { totalCount, totalPages, currentPage });
      const userId = item ? item.user.id : null;
      const userCount = userId ? state.meta.users[userId] : 0;
      const users = userId && userCount ? newState(state.meta.users, { [userId]: userCount - 1 }) : state.meta.users;
      const play_time = item ? state.meta.play_time - item.track.duration : state.meta.play_time;
      const meta = newState(state.meta, { play_time, total: totalCount, users });

      return newState(state, {queue, meta, pagination});
    }
  }

  return state;
}

export const getQueueLoaded = (state: QueueState) => state.loaded;
export const getQueueLoading = (state: QueueState) => state.loading;
export const getQueue = (state: QueueState) => state.queue;
export const getMeta = (state: QueueState) => state.meta;
export const getPagination = (state: QueueState) => state.pagination;
