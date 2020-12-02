let APIURL = '';

switch (window.location.hostname) {
    //this is the local host name of your react app
    case 'localhost' || '3000':
        //this is the local host name of your API
        APIURL = 'http://localhost:6969';
        break;
    //this is the deployed react application
    case 'ljd-megamoviesclient.herokuapp.com':
        //this is the full url of your deployed API
        APIURL = 'https://ljd-megamovies.herokuapp.com'
}

export default APIURL