import { writable, derived } from 'svelte/store';

export const height = writable(5);
export const width = writable(5);
export const maze = writable([]);
