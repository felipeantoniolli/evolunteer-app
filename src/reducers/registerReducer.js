import { 
    SET_USERNAME_DATA,
    SET_EMAIL_DATA,
    SET_PASSWORD_DATA,
    SET_CEP_DATA,
    SET_STREET_DATA,
    SET_CITY_DATA,
    SET_STATE_DATA,
    SET_COMPLEMENT_DATA,
    SET_NUMBER_DATA,
    SET_REFERENCE_DATA,
    SET_TELEPHONE_DATA,
    SET_CELLPHONE_DATA,
    SET_NAME_DATA,
    SET_LASTNAME_DATA,
    SET_CPF_DATA,
    SET_RG_DATA,
    SET_BIRTH_DATA,
    SET_GENDER_DATA,
    CLEAR_DATA,
    SET_REASON_DATA,
    SET_FANTASY_DATA,
    SET_CPF_INSTITUTION_DATA,
    SET_CNPJ_DATA,
    SET_TYPE_DATA,
    SET_ALL_USER_DATA
} from '../actions/registerActions';

const INITIAL_STATE = {
    username: '',
    type: '',
    email: '',
    password: '',
    cep: '',
    street: '',
    city: '',
    state: '',
    complement: '',
    number: '',
    reference: '',
    telephone: '',
    cellphone: '',
    volunteer: {
        name: '',
        last_name: '',
        cpf: '',
        rg: '',
        birth: '',
        gender: ''
    },
    institution: {
        reason: '',
        fantasy: '',
        cpf: '',
        cnpj: ''
    }
};

const registerReducer = (state = INITIAL_STATE, action) => {
    let newVolunteer = {};
    let newInstitution = {};

    switch(action.type) {
        case CLEAR_DATA:
            return INITIAL_STATE;
        case SET_USERNAME_DATA:
            return {
                ...state,
                username: action.username
            };
        case SET_TYPE_DATA:
            return {
                ...state,
                type: action.type
            };
        case SET_EMAIL_DATA:
            return {
                ...state,
                email: action.email
            };
        case SET_PASSWORD_DATA:
            return {
                ...state,
                password: action.password
            };
        case SET_CEP_DATA:
            return {
                ...state,
                cep: action.cep
            };
        case SET_STREET_DATA:
            return {
                ...state,
                street: action.street
            };
        case SET_CITY_DATA:
            return {
                ...state,
                city: action.city
            };
        case SET_STATE_DATA:
            return {
                ...state,
                state: action.state
            };
        case SET_COMPLEMENT_DATA:
            return {
                ...state,
                complement: action.complement
            };
        case SET_NUMBER_DATA:
            return {
                ...state,
                number: action.number
            };
        case SET_REFERENCE_DATA:
            return {
                ...state,
                reference: action.reference
            };
        case SET_TELEPHONE_DATA:
            return {
                ...state,
                telephone: action.telephone
            };
        case SET_CELLPHONE_DATA:
            return {
                ...state,
                cellphone: action.cellphone
            };
        case SET_NAME_DATA:
            newVolunteer = {
                ...state.volunteer,
                name: action.name
            };

            return {
                ...state,
                volunteer: newVolunteer
            };
        case SET_LASTNAME_DATA:
            newVolunteer = {
                ...state.volunteer,
                last_name: action.last_name
            };

            return {
                ...state,
                volunteer: newVolunteer
            };
        case SET_CPF_DATA:
            newVolunteer = {
                ...state.volunteer,
                cpf: action.cpf
            };

            return {
                ...state,
                volunteer: newVolunteer
            };
        case SET_RG_DATA:
            newVolunteer = {
                ...state.volunteer,
                rg: action.rg
            };

            return {
                ...state,
                volunteer: newVolunteer
            };
        case SET_BIRTH_DATA:
            newVolunteer = {
                ...state.volunteer,
                birth: action.birth
            };

            return {
                ...state,
                volunteer: newVolunteer
            };
        case SET_GENDER_DATA:
            newVolunteer = {
                ...state.volunteer,
                gender: action.gender
            };

            return {
                ...state,
                volunteer: newVolunteer
            };
        case SET_REASON_DATA:
            newInstitution = {
                ...state.institution,
                reason: action.reason
            };  

            return {
                ...state,
                institution: newInstitution
            };
        case SET_FANTASY_DATA:
            newInstitution = {
                ...state.institution,
                fantasy: action.fantasy
            };

            return {
                ...state,
                institution: newInstitution
            };
        case SET_CPF_INSTITUTION_DATA:
            newInstitution = {
                ...state.institution,
                cpf: action.cpf
            };

            return {
                ...state,
                institution: newInstitution
            };
        case SET_CNPJ_DATA:
            newInstitution = {
                ...state.institution,
                cnpj: action.cnpj
            };

            return {
                ...state,
                institution: newInstitution
            };
        case SET_ALL_USER_DATA:
            return action.user;
        default:
            return state;
    }
};

export default registerReducer;