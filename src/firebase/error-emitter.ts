import { EventEmitter } from 'events';

// This is a global event emitter for handling specific errors.
// It is used to surface rich, contextual errors to the user during development.
export const errorEmitter = new EventEmitter();
