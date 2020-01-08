console.log(
    '=========================================',
    '\n  Course Project',
    '\n========================================='
);

import * as elements from   './modules/10-course-project-elements'; // DOM elements
import HttpRequest from     './modules/10-course-project-requests'; // Url request (default import)
import { 
    WeatherData, 
    dataProxyHandler 
} from './modules/10-course-project-data';                          // data conversion (ºC to ºF)

// Search
const searchWeather = () => {
    const   cityName = elements.element_searched_city.value.trim(),
            apiKey = 'cea28e315ecbadee228e576e81bd784c',
            url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;

    // exit function here is conditions are not met
    if(cityName.length <= 2) {
        return;
    }

    // show loading text
    elements.element_loading_text.classList.remove('hidden');
    elements.element_weather_box.classList.add('hidden');

    console.log('cityName = ' + cityName);

    // fetching Url trough 'fetchData' static method from HttpRequest class promise
    HttpRequest.fetchData(url)  // initialize function
        .then(responseData => { // handle promise success 
            
            // grabbing information from response data object
            const   weather_info = responseData.weather[0].description,
                    weather_temp = responseData.main.temp;

            const   weather_data = new WeatherData(cityName, weather_info), // creates a new WeatherData object
                    weather_proxy = new Proxy(                              // creates Proxy wrapper
                        weather_data,       // proxy target object
                        dataProxyHandler    // handler function
                    );
            
            // setting 'temperature' property via Proxy handler 'set' method
            weather_proxy.temperature = weather_temp;
            
            // accessing 'temperature' property via Proxy handler 'get' method
            console.log(weather_proxy.temperature);
            
            updateWeather(weather_proxy);

        }).catch(error => {     // catch error through a function
            console.log(error);
        });
};

// output weather
const updateWeather = (weather) => {

    elements.element_weather_city.textContent = weather.cityName;
    elements.element_weather_description.textContent = weather.description;
    elements.element_weather_temperature.textContent = weather.temperature;

    // show weather box
    elements.element_weather_box.classList.remove('hidden');
    
    // hide loading text
    elements.element_loading_text.classList.add('hidden');
};

// add click functionality
elements.element_search_button.addEventListener('click', searchWeather);



