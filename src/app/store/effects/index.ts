import { CurrentEffects } from './current.effect';
import { MuteEffects } from './mute.effect';
import { QueueEffects } from './queue.effect';
import { UserEffects } from './user.effect';
import { VolumeEffects } from './volume.effect';


export const effects: any[] = [
  CurrentEffects,
  MuteEffects,
  QueueEffects,
  UserEffects,
  VolumeEffects
];

export * from './current.effect';
export * from './mute.effect';
export * from './queue.effect';
export * from './user.effect';
export * from './volume.effect';
