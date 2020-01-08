// form elements
const   element_search_button = document.querySelector('button'),
        element_searched_city = document.querySelector('#city');

// weather components
const   element_loading_text = 
            document.querySelector('#load'),
        element_weather_box = 
            document.querySelector('#weather'),
        element_weather_description = 
            element_weather_box.querySelector('#weatherDescription'),
        element_weather_city =  
            element_weather_box.querySelector('#weatherCity'),
        element_weather_temperature = 
            element_weather_box.querySelector('#weatherTemperature');

export {element_search_button, element_searched_city, element_loading_text, element_weather_box, element_weather_description, element_weather_city, element_weather_temperature};