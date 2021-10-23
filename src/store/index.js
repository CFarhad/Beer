import {writable} from 'svelte/store'
import * as pdfjsLib  from "pdfjs-dist/build/pdf";

export const modal = writable(false);

export const pdf = pdfjsLib;
export const pdfTotal = writable(0);
export const pdfLoaded = writable(0);


export const noLoad = writable(true);