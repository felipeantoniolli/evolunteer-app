export const SET_WORK_NAME_DATA = 'SET_WORK_NAME_DATA';
export const setWorkNameData = (name) => ({
    type: SET_WORK_NAME_DATA,
    name
});

export const SET_WORK_CONTENT_DATA = 'SET_WORK_CONTENT_DATA';
export const setWorkContentData = (content) => ({
    type: SET_WORK_CONTENT_DATA,
    content
});

export const SET_WORK_DATE_DATA = 'SET_WORK_DATE_DATA';
export const setWorkDateData = (work_date) => ({
    type: SET_WORK_DATE_DATA,
    work_date
});

export const WORK_CLEAR_DATA = 'WORK_CLEAR_DATA';
export const workClearData = () => ({
    type: WORK_CLEAR_DATA
});