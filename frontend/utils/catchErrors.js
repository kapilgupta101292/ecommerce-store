function catchErrors(error, displayError) {
    let errorMsg;
    let source;
    if( error.response) {
        // The request was made and server responded with
        // with status code not in the range of 2xx
        source = 'response';
        errorMsg = error.response.data;

        // for cloudinary image uploads
        if (error.response.data.error) {
            errorMsg = error.response.data.error.message;
        }

    } else if (error.request) {
        // the request was made but no response was returned
        source = 'request';
        errorMsg = error.request;
        } else {
        // something else happened in making the request that triggered an error
        source = 'message';
        errorMsg = error.message;
    }
    console.error(`Error ${source}`, errorMsg);
    displayError(errorMsg);
}

export default catchErrors;