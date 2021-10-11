import {writable} from 'svelte/store'

const stage = writable();
export const layer = writable();
export const transformer = writable();

export const signStage = writable();
export const signLayer = writable();

export const modal = writable(false);

export default stage;
