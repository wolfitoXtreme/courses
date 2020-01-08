class WeatherData {
    constructor(cityName, description) {
        this.cityName = cityName;
        this.description = description;
        this.temperature = '';
    }
}

const toFahrenheit = (value) => {
    return (value * 1.8 + 32).toFixed(2);
};

// data proxy handler
const dataProxyHandler = {
    // get trap
    get: function(target, property) {
        // accessing object properties through the Reflect Api, not necessary
        console.log('dataProxyHandler Get...');
        return Reflect.get(target, property);
    },
    // set trap
    set: function(target, property, value) {
        console.log('dataProxyHandler Set...');
        const newValue = toFahrenheit(value) + '°F';

        // setting object properties through the Reflect Api
        return Reflect.set(target, property, newValue);
    }
}

export { WeatherData, dataProxyHandler };