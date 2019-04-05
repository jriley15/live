import constants from "../constants/streamConstants";
import { basicPost, authGet, basicGet } from "../services/apiService";

//get stream

//get all streams

//get my stream 

//follow stream


export const getMyStream = () => async(dispatch, getState) => {

    dispatch({
        type: constants.GET_MYSTREAM_REQUEST
    });

    let response = await authGet(getState().login.authToken, "Streams", "GetMyStream", {});

    if (response.success) {

        dispatch({
            type: constants.GET_MYSTREAM_SUCCESS,
            myStream: response.data
        });

    } else {
        dispatch({
            type: constants.GET_MYSTREAM_FAILURE
        });
    }

}

export const getStream = (id) => async(dispatch, getState) => {


    dispatch({
        type: constants.GET_STREAM_REQUEST
    });

    let response = await basicGet("Streams", "GetStream", {id: id});
    
    if (response.success) {

        dispatch({
            type: constants.GET_STREAM_SUCCESS,
            stream: response.data
        });

    } else {

        dispatch({
            type: constants.GET_STREAM_FAILURE
        });

    }


}

export const getStreams = () => async(dispatch, getState) => {

    if (!getState().stream.firstLoad) {

        dispatch({
            type: constants.GET_STREAMS_REQUEST
        });

        let response = await basicGet("Streams", "GetStreams", {});
        
        if (response.success) {

            dispatch({
                type: constants.GET_STREAMS_SUCCESS,
                streams: response.data
            });

        } else {

            dispatch({
                type: constants.GET_STREAMS_FAILURE
            });

        }
    } else {
        dispatch({
            type: constants.RESET_STREAMS
        });
    }
}