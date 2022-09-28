import {takeLatest, all, call, put} from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesFail, fetchCategoriesSuccess } from './categories.actions';

import { CATEGORIES_ACTION_TYPES } from './categories.types';
  

export function* fetchCategoriesAsync() {
    try{
        const categories = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categories));
    }catch(error) {
        yield put(fetchCategoriesFail(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([
        call(onFetchCategories)
    ]);
}