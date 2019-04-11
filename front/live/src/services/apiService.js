import axios from 'axios';
import { formatErrors } from '../helpers/errorHelper';
//import store from '../store/store';
import { connect } from 'react-redux';

export const api = "https://api.jrdn.tech";

export const basicPost = async(controller, action, params) => {
    
    let response = {
        success: false,
        data: {}
    };

    let url = api + '/' + controller + '/' + action;

    await axios.post(url, params, {

        headers: {
            'Content-Type': 'application/json',
        }

    }).then(function (res) {

        response.success = true;
        response.data = res.data;

    }).catch(function (errors) {

        response.data = formatErrors(errors);

    });

    return response;

}

const mapStateToProps = state => ({
    loginState: state.login,
});


export const authGet = async(authToken, controller, action, params) => {

    let response = {
        success: false,
        data: {}
    };

    let url = api + '/' + controller + '/' + action;

    await axios.get(url, {

        params: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }

    }).then(function (res) {

        response.success = true;
        response.data = res.data;

    }).catch(function (errors) {

        response.data = formatErrors(errors);

    });

    return response;

}

export const basicGet = async(controller, action, params) => {

    let response = {
        success: false,
        data: {}
    };

    let url = api + '/' + controller + '/' + action;

    await axios.get(url, {

        params: params,
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(function (res) {

        response.success = true;
        response.data = res.data;

    }).catch(function (errors) {

        response.data = formatErrors(errors);

    });

    return response;

}
