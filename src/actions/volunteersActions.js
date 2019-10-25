export const SET_VOLUNTEERS_DATA = 'SET_VOLUNTEERS_DATA';
export const setVolunteersData = (volunteers) => ({
    type: SET_VOLUNTEERS_DATA,
    volunteers
});

export const SET_VOLUNTEER_DETAIL_DATA = 'SET_VOLUNTEER_DETAIL_DATA';
export const setVolunteerDetailData = (user) => ({
    type: SET_VOLUNTEER_DETAIL_DATA,
    user
});