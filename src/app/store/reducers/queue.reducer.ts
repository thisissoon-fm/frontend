import * as queue from '../actions/queue.action';
import { QueueItem, QueueMeta } from '../../api';

export interface QueueState {
  loaded: boolean;
  loading: boolean;
  queue: QueueItem[];
  meta: QueueMeta;
}

const initialState: QueueState = {
  loaded: false,
  loading: false,
  queue: [],
  meta: null
};

export function queueReducer(
  state = initialState,
  action: queue.QueueAction
): QueueState {
  switch (action.type) {
    case queue.LOAD_QUEUE: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case queue.LOAD_QUEUE_SUCCESS: {
      const queue = (<queue.LoadQueueSuccess>action).payload;

      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        queue
      });
    }

    case queue.LOAD_QUEUE_FAIL: {
      return Object.assign({}, state, {
        loading: false
      });
    }

    case queue.LOAD_QUEUE_META_SUCCESS: {
      const meta = (<queue.LoadQueueMetaSuccess>action).payload;

      return Object.assign({}, state, {
        meta
      });
    }
  }

  return state;
}

export const getQueueLoaded = (state: QueueState) => state.loaded;

export const getQueueLoading = (state: QueueState) => state.loading;

export const getQueue = (state: QueueState) => state.queue;

export const getMeta = (state: QueueState) => state.meta;
