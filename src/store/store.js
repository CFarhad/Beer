import {createStore } from "@reduxjs/toolkit";
import reducers from "../reducers";

function svelteStoreEnhancer(createStoreApi) {
	return function (reducer, initialState) {
		const reduxStore = createStoreApi(
			reducer, initialState
		);
		return {
			...reduxStore,
			subscribe(fn) {
				fn(reduxStore.getState());

				return reduxStore.subscribe(() => {
					fn(reduxStore.getState());
				});
			}
		}
	}
}

export default createStore(reducers,svelteStoreEnhancer)