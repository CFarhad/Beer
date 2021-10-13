import {writable} from 'svelte/store'
import pdfjs from "pdfjs-dist/";

export const stage = writable();
export const layer = writable();
export const transformer = writable();

export const signStage = writable();
export const signLayer = writable();

export const modal = writable(false);

export const pdf = pdfjs;
export const pdfTotal = writable(0);
export const pdfLoaded = writable(0);
export const pdfPages = writable({total:0,now:1});

export const noLoad = writable(true);