import constants from "../constants/loginConstants";
import { basicPost } from "../services/apiService";
import { getAuth as loadAuth, storeAuth, deleteAuth } from "../helpers/authHelper";

export const login = (email, pass) => async (dispatch, getState) => {

    dispatch({
        type: constants.LOGIN_REQUEST
    });

    let response = await basicPost("Auth", "Login", {Email: email, Password: pass});

    if (response.success) {

        dispatch({
            type: constants.LOGIN_SUCCESS,
            authToken: response.data.accessToken
        });

        storeAuth(response.data.accessToken);

    } else {
        dispatch({
            type: constants.LOGIN_FAILURE
        });
    }
    
};

export const logout = () => async (dispatch, getState) => {

    deleteAuth();

    dispatch({
        type: constants.LOGOUT
    });

}

export const getAuth = () => async (dispatch, getState) => {

    const auth = await loadAuth();

    if (auth) {
        dispatch({
            type: constants.AUTH_FOUND,
            authToken: auth
        });
    }

}