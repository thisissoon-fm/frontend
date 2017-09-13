import * as fromQueue from '../actions/queue.action';
import { QueueItem, QueueMeta } from '../../../api';

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
  action: fromQueue.QueueAction
): QueueState {
  switch (action.type) {
    case fromQueue.LOAD_QUEUE: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case fromQueue.LOAD_QUEUE_SUCCESS: {
      const queue = (<fromQueue.LoadQueueSuccess>action).payload;

      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        queue
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

      return Object.assign({}, state, {
        queue: [...state.queue, item]
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
      queue.shift();

      return Object.assign({}, state, { queue });
    }
  }

  return state;
}

export const getQueueLoaded = (state: QueueState) => state.loaded;
export const getQueueLoading = (state: QueueState) => state.loading;
export const getQueue = (state: QueueState) => state.queue;
export const getMeta = (state: QueueState) => state.meta;
