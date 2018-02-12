import * as queueReducer from './queue.reducer';
import * as queueAction from '../actions/queue.action';
import { QueueMeta, QueueItem } from '../../../api';
import { environment } from '../../../../environments/environment';

// tslint:disable:max-line-length
const queueItem1: QueueItem = {'track': {'album': {'id': 'f3a11314-d9fa-46b3-ab6e-3f1e5a68a784', 'images': [{'url': 'https://i.scdn.co/image/c0193357d5a9a2261729189694fe1488eb0045c7', 'width': 640, 'height': 640}, {'url': 'https://i.scdn.co/image/b48b1b7e56f424818f2e8df537c3b692740f100b', 'width': 300, 'height': 300}, {'url': 'https://i.scdn.co/image/3cc13a8c1fc2fb71a178d2ad7e6e812b27ac913f', 'width': 64, 'height': 64}], 'name': 'Views', 'uri': 'spotify:album:3hARKC8cinq3mZLLAEaBh9'}, 'name': 'One Dance', 'uri': 'spotify:track:1xznGGDReH1oQq0xzbwXa3', 'play_count': 0, 'artists': [{'id': 'bdfc95d9-3f45-491f-a3af-db87325b3401', 'uri': 'spotify:artist:3TVXtAsR1Inumwj472S9r4', 'name': 'Drake'}, {'id': 'ec8f8c49-223d-4cb3-85cd-43f020e8d004', 'uri': 'spotify:artist:3tVQdUvClmAT7URs9V3rsp', 'name': 'WizKid'}, {'id': '4435da05-6e27-4d09-a8bf-8259373b0368', 'uri': 'spotify:artist:77DAFfvm3O9zT5dIoG0eIO', 'name': 'Kyla'}], 'duration': 173986, 'id': '8a07912a-a99f-4ccf-aeb7-32848ba74485'}, 'user': {'family_name': 'Opare-Aryee', 'display_name': 'Edward Opare-Aryee', 'avatar_url': 'https://lh4.googleusercontent.com/-28HClpLQXVg/AAAAAAAAAAI/AAAAAAAAAIo/JMQCw6V7Zuk/photo.jpg', 'spotify_playlists': null, 'given_name': 'Edward', 'id': '646d6d63-225a-4301-a55a-447ffa9a0cbe'}, 'uuid': '1d5f3e89-7f56-4068-b179-97d3d1cd9157'};
const queueItem2: QueueItem = {'track': {'album': {'id': 'c0723b1d-7fa7-427f-8a0e-0a7e46c0c68f', 'images': [{'url': 'https://i.scdn.co/image/459dbc62a8634b01fe3bbc4bc06d21cbb7b6cfde', 'width': 640, 'height': 640}, {'url': 'https://i.scdn.co/image/8f5f72b3aadb8829d740137fd4a217853cdf82b7', 'width': 300, 'height': 300}, {'url': 'https://i.scdn.co/image/1233a218b7c1e900eaf160846d470cf49c314750', 'width': 64, 'height': 64}], 'name': 'More Life', 'uri': 'spotify:album:7Ix0FS4f1lK42C3rix5rHg'}, 'name': 'Passionfruit', 'uri': 'spotify:track:7hDc8b7IXETo14hHIHdnhd', 'play_count': 0, 'artists': [{'id': 'bdfc95d9-3f45-491f-a3af-db87325b3401', 'uri': 'spotify:artist:3TVXtAsR1Inumwj472S9r4', 'name': 'Drake'}], 'duration': 298940, 'id': '85e96979-ed23-4140-a0c2-79c19276e025'}, 'user': {'family_name': 'Opare-Aryee', 'display_name': 'Edward Opare-Aryee', 'avatar_url': 'https://lh4.googleusercontent.com/-28HClpLQXVg/AAAAAAAAAAI/AAAAAAAAAIo/JMQCw6V7Zuk/photo.jpg', 'spotify_playlists': null, 'given_name': 'Edward', 'id': '646d6d63-225a-4301-a55a-447ffa9a0cbe'}, 'uuid': 'fa42543c-90ea-43d8-97da-6369d7616986'};
const queueItem3: QueueItem = {'track': {'album': {'id': 'f3640529-a29f-4c68-822e-5b3a1679bf93', 'images': [{'url': 'https://i.scdn.co/image/d68defc78c8c70b3fb733e8ac9892cd0455fdddc', 'width': 640, 'height': 640}, {'url': 'https://i.scdn.co/image/8978ca55e89fc664cbf672804a90ac7afb142fd0', 'width': 300, 'height': 300}, {'url': 'https://i.scdn.co/image/c2b5f7d4b88327724b00fd6c66c47d3b22d06d74', 'width': 64, 'height': 64}], 'name': 'Flower Boy', 'uri': 'spotify:album:2nkto6YNI4rUYTLqEwWJ3o'}, 'name': '911 / Mr. Lonely', 'uri': 'spotify:track:4bEcoz1OcfMgUbp2ft8ieQ', 'play_count': 0, 'artists': [{'id': 'f097707f-478b-4156-987e-b6cb03dedb3e', 'uri': 'spotify:artist:2h93pZq0e7k5yf4dywlkpM', 'name': 'Frank Ocean'}, {'id': '175c62d3-762c-44e4-9d06-fe9bc3ef49e4', 'uri': 'spotify:artist:4V8LLVI7PbaPR0K2TGSxFF', 'name': 'Tyler, The Creator'}, {'id': '011289ac-65b9-42d1-a7a0-5e1a7a5d8696', 'uri': 'spotify:artist:57vWImR43h4CaDao012Ofp', 'name': 'Steve Lacy'}], 'duration': 255653, 'id': '3712603a-c47a-478f-b918-ffb2471ccc26'}, 'user': {'family_name': 'Opare-Aryee', 'display_name': 'Edward Opare-Aryee', 'avatar_url': 'https://lh4.googleusercontent.com/-28HClpLQXVg/AAAAAAAAAAI/AAAAAAAAAIo/JMQCw6V7Zuk/photo.jpg', 'spotify_playlists': null, 'given_name': 'Edward', 'id': '646d6d63-225a-4301-a55a-447ffa9a0cbe'}, 'uuid': '3b18549c-eb7a-41b0-b14e-ecacca495b36'};
const queueItem4: QueueItem = {'track': {'album': {'id': '5b941d15-8abe-402e-8509-2dded27e4d5b', 'images': [{'url': 'https://i.scdn.co/image/225d4551ebc93b56b897b75c695b39ac61c4401c', 'width': 640, 'height': 640}, {'url': 'https://i.scdn.co/image/272376cc5ce2042be360ba3359d2c7983dbb7660', 'width': 300, 'height': 300}, {'url': 'https://i.scdn.co/image/465adefaa0e2d00c571a662d5275767ae6499cbe', 'width': 64, 'height': 64}], 'name': 'PARTYNEXTDOOR 3 (P3)', 'uri': 'spotify:album:2FXGUAESmG5l9YPrzWPvHI'}, 'name': 'Come and See Me (feat. Drake)', 'uri': 'spotify:track:1wZqJM5FGDEl3FjHDxDyQd', 'play_count': 0, 'artists': [{'id': 'bdfc95d9-3f45-491f-a3af-db87325b3401', 'uri': 'spotify:artist:3TVXtAsR1Inumwj472S9r4', 'name': 'Drake'}, {'id': 'cf872df6-b590-4b28-bfaa-2b9c56668210', 'uri': 'spotify:artist:2HPaUgqeutzr3jx5a9WyDV', 'name': 'PARTYNEXTDOOR'}], 'duration': 235477, 'id': '8dce4d95-7bbd-4668-bf8e-4d37d6fe4e47'}, 'user': {'family_name': 'Opare-Aryee', 'display_name': 'Edward Opare-Aryee', 'avatar_url': 'https://lh4.googleusercontent.com/-28HClpLQXVg/AAAAAAAAAAI/AAAAAAAAAIo/JMQCw6V7Zuk/photo.jpg', 'spotify_playlists': null, 'given_name': 'Edward', 'id': '646d6d63-225a-4301-a55a-447ffa9a0cbe'}, 'uuid': 'd4f7e1f1-fec7-4ad2-b40a-647ed9f7c22f'};
const queueMeta: QueueMeta = {'play_time': 964056, 'genres': {}, 'total': 4, 'users': {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 4}};
// tslint:enable:max-line-length

describe('QueueReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = queueReducer.queueReducer(undefined, {} as any);

      expect(result).toEqual(queueReducer.initialState);
    });
  });

  describe('Load queue', () => {
    it('should set loading to true on load queue request', () => {
      const expected = { ...queueReducer.initialState, loading: true };
      const action = new queueAction.LoadQueue();
      const result = queueReducer.queueReducer(
        queueReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });

    it('should set reset loading state on load queue fail', () => {
      const expected = { ...queueReducer.initialState, loading: false };
      const action = new queueAction.LoadQueueFail(null);
      const result = queueReducer.queueReducer(
        { ...queueReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should load queue', () => {
      const queue = [queueItem1, queueItem2, queueItem3, queueItem4];
      const pagination = { totalCount: 4, totalPages: 1, currentPage: 1 };
      const expected = { ...queueReducer.initialState, queue, pagination, loaded: true };
      const action = new queueAction.LoadQueueSuccess({ items: queue, pagination});
      const result = queueReducer.queueReducer(
        queueReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Load queue: next page', () => {
    it('should request next page of queue items', () => {
      const queue = [queueItem1, queueItem2];
      const pagination = { totalCount: 2, totalPages: 2, currentPage: 1 };
      const expected = { ...queueReducer.initialState, queue, pagination, loading: true };
      const action = new queueAction.LoadNextQueuePage();
      const result = queueReducer.queueReducer(
        { ...queueReducer.initialState, queue, pagination },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should reset loading state on load queue fail', () => {
      const queue = [queueItem1, queueItem2];
      const pagination = { totalCount: 2, totalPages: 2, currentPage: 1 };
      const expected = { ...queueReducer.initialState, queue, pagination };
      const action = new queueAction.LoadNextQueuePageFail(null);
      const result = queueReducer.queueReducer(
        { ...queueReducer.initialState, queue, pagination },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should load next page of queue items', () => {
      const queue = [queueItem1, queueItem2, queueItem3, queueItem4];
      const pagination = { totalCount: 4, totalPages: 2, currentPage: 2 };
      const expected = { ...queueReducer.initialState, queue, pagination };
      const action = new queueAction.LoadNextQueuePageSuccess({
        items: [queueItem3, queueItem4],
        pagination
      });
      const result = queueReducer.queueReducer(
        {
          ...queueReducer.initialState,
          queue: [queueItem1, queueItem2],
          pagination: { totalCount: 4, totalPages: 2, currentPage: 1 }
        },
        action
      );

      expect(result).toEqual(expected);
    });

  });

  describe('Load metadata', () => {

    it('should load queue metadata', () => {
      const expected = { ...queueReducer.initialState, meta: queueMeta };
      const action = new queueAction.LoadQueueMetaSuccess(queueMeta);
      const result = queueReducer.queueReducer(
        queueReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });

  });

  describe('Load queue item', () => {

    it('should load queue item', () => {
      environment.apiLimit = 2;
      const pagination = { totalCount: 3, totalPages: 2, currentPage: 2 };
      const meta = {
        play_time: queueItem1.track.duration + queueItem2.track.duration + queueItem3.track.duration,
        genres: {},
        total: 3,
        users: {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 3}
      };
      const queue = [queueItem1, queueItem2, queueItem3];
      const expected = { ...queueReducer.initialState, queue, pagination, meta };
      const action = new queueAction.LoadQueueItemSuccess(queueItem3);
      const result = queueReducer.queueReducer(
        {
          ...queueReducer.initialState,
          queue: [queueItem1, queueItem2],
          pagination: { totalCount: 2, totalPages: 1, currentPage: 1 },
          meta: {
            play_time: queueItem1.track.duration + queueItem2.track.duration,
            genres: {},
            total: 2,
            users: {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 2}
          }
        },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should not add queue item if current page is less than total pages', () => {
      environment.apiLimit = 2;
      const pagination = { totalCount: 4, totalPages: 2, currentPage: 1 };
      const meta = {
        play_time: queueItem1.track.duration + queueItem2.track.duration + queueItem3.track.duration + queueItem4.track.duration,
        genres: {},
        total: 4,
        users: {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 4}
      };
      const queue = [queueItem1, queueItem2];
      const expected = { ...queueReducer.initialState, queue, pagination, meta };
      const action = new queueAction.LoadQueueItemSuccess(queueItem4);
      const result = queueReducer.queueReducer(
        {
          ...queueReducer.initialState,
          queue,
          pagination: { totalCount: 3, totalPages: 2, currentPage: 1 },
          meta: {
            play_time: queueItem1.track.duration + queueItem2.track.duration + queueItem3.track.duration,
            genres: {},
            total: 3,
            users: {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 3}
          }
        },
        action
      );

      expect(result).toEqual(expected);
    });

  });

  describe('Remove queue item', () => {

    it('should remove item from queue', () => {
      environment.apiLimit = 2;
      const pagination = { totalCount: 3, totalPages: 2, currentPage: 2 };
      const meta = {
        play_time: queueItem1.track.duration + queueItem3.track.duration + queueItem4.track.duration,
        genres: {},
        total: 3,
        users: {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 3}
      };
      const queue = [queueItem1, queueItem3, queueItem4];
      const expected = { ...queueReducer.initialState, queue, pagination, meta };
      const action = new queueAction.QueueRemoveSuccess(queueItem2.uuid);
      const result = queueReducer.queueReducer(
        {
          ...queueReducer.initialState,
          queue: [queueItem1, queueItem2, queueItem3, queueItem4],
          pagination: { totalCount: 4, totalPages: 2, currentPage: 2 },
          meta: {
            play_time: queueItem1.track.duration + queueItem2.track.duration + queueItem3.track.duration + queueItem4.track.duration,
            genres: {},
            total: 4,
            users: {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 4}
          }
        },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should not remove any items from queue', () => {
      environment.apiLimit = 2;
      const pagination = { totalCount: 3, totalPages: 2, currentPage: 1 };
      const meta = {
        play_time: queueItem1.track.duration + queueItem2.track.duration + queueItem3.track.duration + queueItem4.track.duration,
        genres: {},
        total: 3,
        users: {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 4}
      };
      const queue = [queueItem1, queueItem2];
      const expected = { ...queueReducer.initialState, queue, pagination, meta };
      const action = new queueAction.QueueRemoveSuccess(queueItem4.uuid);
      const result = queueReducer.queueReducer(
        {
          ...queueReducer.initialState,
          queue,
          pagination: { totalCount: 4, totalPages: 2, currentPage: 1 },
          meta: {
            play_time: queueItem1.track.duration + queueItem2.track.duration + queueItem3.track.duration + queueItem4.track.duration,
            genres: {},
            total: 4,
            users: {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 4}
          }
        },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Queue shift', () => {
    it('should remove first item from queue', () => {
      environment.apiLimit = 2;
      const pagination = { totalCount: 3, totalPages: 2, currentPage: 2 };
      const meta = {
        play_time:  + queueItem2.track.duration + queueItem3.track.duration + queueItem4.track.duration,
        genres: {},
        total: 3,
        users: {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 3}
      };
      const queue = [queueItem2, queueItem3, queueItem4];
      const expected = { ...queueReducer.initialState, queue, pagination, meta };
      const action = new queueAction.QueueShift();
      const result = queueReducer.queueReducer(
        {
          ...queueReducer.initialState,
          queue: [queueItem1, queueItem2, queueItem3, queueItem4],
          pagination: { totalCount: 4, totalPages: 2, currentPage: 2 },
          meta: {
            play_time: queueItem1.track.duration + queueItem2.track.duration + queueItem3.track.duration + queueItem4.track.duration,
            genres: {},
            total: 4,
            users: {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 4}
          }
        },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Get state values', () => {
    const pagination = { totalCount: 3, totalPages: 2, currentPage: 2 };
    const meta = {
      play_time:  + queueItem2.track.duration + queueItem3.track.duration + queueItem4.track.duration,
      genres: {},
      total: 3,
      users: {'646d6d63-225a-4301-a55a-447ffa9a0cbe': 3}
    };
    const queue = [queueItem2, queueItem3, queueItem4];
    const state = { ...queueReducer.initialState, queue, pagination, meta };

    it('should get queue items', () => {
      const expected = queue;
      const result = queueReducer.getQueue(state);
      expect(result).toEqual(expected);
    });

    it('should get queue loading', () => {
      const expected = false;
      const result = queueReducer.getQueueLoading(state);
      expect(result).toEqual(expected);
    });

    it('should get queue loaded', () => {
      const expected = false;
      const result = queueReducer.getQueueLoaded(state);
      expect(result).toEqual(expected);
    });

    it('should get queue meta', () => {
      const expected = meta;
      const result = queueReducer.getMeta(state);
      expect(result).toEqual(expected);
    });

    it('should get pagination data', () => {
      const expected = pagination;
      const result = queueReducer.getPagination(state);
      expect(result).toEqual(expected);
    });
  });
});

