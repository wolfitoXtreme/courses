class HttpRequest {

    // static method to handle the Url request
    static fetchData(url) {

        console.log('fetching data...');

        // return a promise
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            // open the requested Url (XMLHttpRequest.open method)
            request.open('GET', url);

            // handling the request response (XMLHttpRequest.onreadystatechange EventHandler)
            request.onreadystatechange = function() {
                // checks for success
                if(request.readyState === XMLHttpRequest.DONE && request.status === 200) { 
                    // convert response string into a object
                    const response_data = JSON.parse(request.responseText);
                    
                    // resolving promise
                    resolve(response_data);
                } else if(request.readyState === XMLHttpRequest.DONE) {
                    
                    // reject promise
                    reject('Something went wrong');
                }
            };

            // sending the request
            request.send();
        });
    }
}

export default HttpRequest; // default export