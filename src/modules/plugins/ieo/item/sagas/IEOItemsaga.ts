import { put, call } from 'redux-saga/effects';

import { findIEOById, IEOItemData, IEOItemError } from '../actions';
import { API, RequestOptions } from '../../../../../api';

const createOptions = (csrfToken?: string): RequestOptions => {
	return { apiVersion: 'peatio', headers: { 'X-CSRF-Token': csrfToken } };
};

export function* findIEOItemByIdSaga(action: findIEOById) {
	try {
		const response = yield call(API.get(createOptions()), `/fetch/ieo_id=${action.payload.id}`);
		yield put(IEOItemData(response));
	} catch (error) {
		yield put(IEOItemError(error));
	}
}
