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

const initialState: QueueState = {
  loaded: false,
  loading: false,
  queue: [],
  pagination: { totalCount: 0, totalPages: 1, currentPage: 1 },
  meta: null
};

export function queueReducer(
  state = initialState,
  action: fromQueue.QueueAction
): QueueState {
  switch (action.type) {
    case fromQueue.LOAD_QUEUE: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case fromQueue.LOAD_QUEUE_SUCCESS: {
      const queue = (<fromQueue.LoadQueueSuccess>action).payload.items;
      const pagination = (<fromQueue.LoadQueueSuccess>action).payload.pagination;
      pagination.currentPage = state.pagination.currentPage ? state.pagination.currentPage++ : 1;

      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        queue,
        pagination: Object.assign({}, state.pagination, pagination)
      });
    }

    case fromQueue.LOAD_QUEUE_FAIL: {
      return Object.assign({}, state, {
        loading: false
      });
    }

    case fromQueue.LOAD_NEXT_QUEUE_PAGE: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case fromQueue.LOAD_NEXT_QUEUE_PAGE_SUCCESS: {
      const queue = (<fromQueue.LoadNextQueuePageSuccess>action).payload.items;
      const pagination = (<fromQueue.LoadNextQueuePageSuccess>action).payload.pagination;
      pagination.currentPage = state.pagination.currentPage + 1;

      return Object.assign({}, state, {
        loading: false,
        queue: [...state.queue, ...queue],
        pagination: Object.assign({}, state.pagination, pagination)
      });
    }

    case fromQueue.LOAD_QUEUE_FAIL: {
      return Object.assign({}, state, {
        loading: false
      });
    }

    case fromQueue.LOAD_QUEUE_META_SUCCESS: {
      const meta = (<fromQueue.LoadQueueMetaSuccess>action).payload;

      return Object.assign({}, state, { meta });
    }

    case fromQueue.LOAD_QUEUE_ITEM_SUCCESS: {
      const item = (<fromQueue.LoadQueueItemSuccess>action).payload;
      const queue = [...state.queue];
      if (state.pagination.totalPages === state.pagination.currentPage) {
        queue.push(item);
      }
      const totalCount = state.pagination.totalCount + 1;
      const pagination = Object.assign({}, state.pagination, {
        totalCount,
        totalPages: Math.ceil(totalCount / environment.apiLimit)
      });

      return Object.assign({}, state, {
        queue,
        pagination
      });
    }

    case fromQueue.QUEUE_REMOVE_SUCCESS: {
      const uuid = (<fromQueue.QueueRemoveSuccess>action).payload;
      const index = state.queue.findIndex(item => item.uuid === uuid);
      const queue = [...state.queue];
      queue.splice(index, 1);

      return Object.assign({}, state, { queue });
    }

    case fromQueue.QUEUE_SHIFT: {
      const queue = [...state.queue];
      const totalCount = state.pagination.totalCount - 1;
      const pagination = Object.assign({}, state.pagination, {
        totalCount,
        totalPages: Math.ceil(totalCount / environment.apiLimit)
      });
      queue.shift();

      return Object.assign({}, state, {
        queue,
        pagination
      });
    }
  }

  return state;
}

export const getQueueLoaded = (state: QueueState) => state.loaded;
export const getQueueLoading = (state: QueueState) => state.loading;
export const getQueue = (state: QueueState) => state.queue;
export const getMeta = (state: QueueState) => state.meta;
export const getPagination = (state: QueueState) => state.pagination;
