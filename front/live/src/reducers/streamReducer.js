import constants from '../constants/streamConstants';

export const initialState = {

    loadingStreams: false,
    streams: [],

    loadingStream: false,
    stream: {},

    loadingMyStream: false,
    myStream: {},

    updatingStream: false,
    updateStreamErrors: [],

    followingStream: false,
    followStreamErrors: [],

    firstLoad: false
};

export const reducer = (state, action) => {

  state = state || initialState;

  switch (action.type) {

    case constants.GET_MYSTREAM_REQUEST:

      return {
        ...state,
        loadingMyStream: true,
      };

    case constants.GET_MYSTREAM_SUCCESS:
      return {
        ...state,
        loadingMyStream: false,
        myStream: action.myStream
      };

    case constants.GET_MYSTREAM_FAILURE:
      return {
        ...state,
        //errors: action.errors,
        loadingMyStream: false
      };



    case constants.GET_STREAM_REQUEST:

      return {
        ...state,
        loadingStream: true,
      };

    case constants.GET_STREAM_SUCCESS:
      return {
        ...state,
        loadingStream: false,
        stream: action.stream
      };

    case constants.GET_STREAM_FAILURE:
      return {
        ...state,
        //errors: action.errors,
        loadingStream: false
      };


      case constants.GET_STREAMS_REQUEST:

      return {
        ...state,
        loadingStreams: true,
      };

    case constants.GET_STREAMS_SUCCESS:
      return {
        ...state,
        loadingStreams: false,
        streams: action.streams
      };

    case constants.GET_STREAMS_FAILURE:
      return {
        ...state,
        //errors: action.errors,
        loadingStreams: false
      };

    case constants.RESET_STREAMS:
      return {
        ...state,
        firstLoad: false
      };

    default:
      return state;
  }

};

export default reducer;