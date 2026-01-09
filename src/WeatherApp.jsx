import { useState, useEffect } from 'react';
import { Search, CloudRain, Sun, CloudSnow, CloudFog, CloudDrizzle, Cloud, Wind, Thermometer, Droplets, ArrowUp, ArrowDown, Moon, SunMoon } from 'lucide-react';

// Main Weather App Component
export default function WeatherApp() {
  // State variables
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   const [error1, setError1] = useState(null)
  
  // Fetch weather data on initial load using geolocation
  useEffect(() => {
    getUserLocation();
  }, []);

  // Toggle between dark and light mode
  useEffect(() => {
    document.body.className = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  }, [darkMode]);

  // Get user's current location
  const getUserLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        /* The above code is a JavaScript React arrow function that handles an error when trying to get
        the user's location. It sets an error message using the `setError` function and then sets
        the loading state to false using the `setLoading` function. If geolocation fails, it fetches
        weather data for the city of London using the `fetchWeatherByCity` function. */
        (err) => {
          setError("Failed to get your location. Please search manually.");
          setLoading(false);
          // Default to London if geolocation fails
          fetchWeatherByCity("London");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      // Default to London if geolocation is not supported
      fetchWeatherByCity("London");
     console.log("successfull")
    }
  };

  // Fetch weather data by coordinates
  const fetchWeatherByCoords = (lat, lon) => {
    setLoading(true);
    // Mock API call - in a real app, replace with your actual API call
    // Example: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=YOUR_API_KEY`
    
    setTimeout(() => {
      // Simulate API response with mock data
      const mockWeatherData = generateMockWeatherData();
      setWeather(mockWeatherData);
      setLocation(mockWeatherData.city);
      setLoading(false);
    }, 1000);
  };

  // Fetch weather data by city name
  const fetchWeatherByCity = (city) => {
    setLoading(true);
    // Mock API call - in a real app, replace with your actual API call
    
    setTimeout(() => {
      // Simulate API response with mock data
      const mockWeatherData = generateMockWeatherData(city);
      setWeather(mockWeatherData);
      setLocation(city);
      setLoading(false);
    }, 1000);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeatherByCity(location);
    }
  };

  // Toggle temperature units
  const toggleUnits = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    
    // Refetch data with new units if we have a location
    if (weather) {
      fetchWeatherByCity(weather.city);
    }
  };

  // Generate background class based on weather condition
  const getBackgroundClass = () => {
    if (!weather) return 'bg-blue-50';
    
    const condition = weather.current.condition.toLowerCase();
    if (condition.includes('clear') || condition.includes('sunny')) {
      return darkMode ? 'bg-amber-900' : 'bg-amber-50';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return darkMode ? 'bg-blue-900' : 'bg-blue-50';
    } else if (condition.includes('cloud')) {
      return darkMode ? 'bg-gray-800' : 'bg-gray-200';
    } else if (condition.includes('snow')) {
      return darkMode ? 'bg-indigo-900' : 'bg-indigo-50';
    } else if (condition.includes('fog') || condition.includes('mist')) {
      return darkMode ? 'bg-gray-700' : 'bg-gray-300';
    } else {
      return darkMode ? 'bg-gray-900' : 'bg-blue-50';
    }
  };

  // Generate weather icon based on condition
  const getWeatherIcon = (condition, size = 24) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain')) {
      return <CloudRain size={size} className={darkMode ? 'text-blue-300' : 'text-blue-500'} />;
    } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return <Sun size={size} className={darkMode ? 'text-yellow-300' : 'text-yellow-500'} />;
    } else if (conditionLower.includes('snow')) {
      return <CloudSnow size={size} className={darkMode ? 'text-blue-200' : 'text-blue-400'} />;
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return <CloudFog size={size} className={darkMode ? 'text-gray-300' : 'text-gray-500'} />;
    } else if (conditionLower.includes('drizzle')) {
      return <CloudDrizzle size={size} className={darkMode ? 'text-blue-300' : 'text-blue-500'} />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud size={size} className={darkMode ? 'text-gray-300' : 'text-gray-500'} />;
    } else {
      return <Sun size={size} className={darkMode ? 'text-yellow-300' : 'text-yellow-500'} />;
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header with search bar and toggles */}
        <header className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className={`text-2xl font-bold mb-4 md:mb-0 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Weather App
            </h1>
            
            {/* Search form */}
            <form onSubmit={handleSubmit} className="flex mb-4 md:mb-0">
              <div className="relative flex-1 mr-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search for a city..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </form>
            
            {/* Toggle buttons */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button 
                onClick={toggleUnits} 
                className={`px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border shadow-sm`}
              >
                {units === 'metric' ? '°C' : '°F'}
              </button>
              
              <button 
                onClick={() => setDarkMode(!darkMode)} 
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-white text-gray-800'} border shadow-sm`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error message */}
        {error && !loading && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Weather data */}
        {weather && !loading && (
          <div className="space-y-6">
            {/* Current weather */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{weather.city}</h2>
                  <p className="text-sm opacity-75">{weather.current.date}</p>
                  <div className="flex items-center mt-2">
                    {getWeatherIcon(weather.current.condition, 36)}
                    <span className="text-4xl ml-2 font-bold">
                      {Math.round(weather.current.temp)}{units === 'metric' ? '°C' : '°F'}
                    </span>
                  </div>
                  <p className="mt-1">{weather.current.condition}</p>
                </div>
                
                <div className="mt-4 md:mt-0 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Thermometer size={20} className="mr-2 opacity-75" />
                    <div>
                      <p className="text-sm opacity-75">Feels like</p>
                      <p>{Math.round(weather.current.feelsLike)}{units === 'metric' ? '°C' : '°F'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Wind size={20} className="mr-2 opacity-75" />
                    <div>
                      <p className="text-sm opacity-75">Wind</p>
                      <p>{weather.current.wind} {units === 'metric' ? 'km/h' : 'mph'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Droplets size={20} className="mr-2 opacity-75" />
                    <div>
                      <p className="text-sm opacity-75">Humidity</p>
                      <p>{weather.current.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ArrowDown size={20} className="mr-2 opacity-75" />
                    <div>
                      <p className="text-sm opacity-75">Pressure</p>
                      <p>{weather.current.pressure} hPa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hourly forecast */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              <h2 className="text-lg font-semibold mb-4">Hourly Forecast</h2>
              <div className="flex overflow-x-auto pb-2 space-x-6">
                {weather.hourly.map((hour, index) => (
                  <div key={index} className="flex flex-col items-center min-w-max">
                    <p className="text-sm opacity-75">{hour.time}</p>
                    {getWeatherIcon(hour.condition)}
                    <p className="mt-1 font-medium">{Math.round(hour.temp)}{units === 'metric' ? '°C' : '°F'}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily forecast */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              <h2 className="text-lg font-semibold mb-4">7-Day Forecast</h2>
              <div className="space-y-4">
                {weather.daily.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="w-24">
                      <p className={index === 0 ? 'font-medium' : 'opacity-75'}>
                        {index === 0 ? 'Today' : day.day}
                      </p>
                    </div>
                    <div className="flex items-center flex-1 justify-center">
                      {getWeatherIcon(day.condition)}
                      <span className="ml-2 opacity-75 text-sm">{day.condition}</span>
                    </div>
                    <div className="flex items-center w-24 justify-end">
                      <span className="font-medium">{Math.round(day.tempMax)}</span>
                      <span className="opacity-75 mx-1">/</span>
                      <span className="opacity-75">{Math.round(day.tempMin)}</span>
                      <span className="ml-1">{units === 'metric' ? '°C' : '°F'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <footer className={`mt-12 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>© 2025 Weather App. All rights reserved.</p>
          <p className="mt-1">Data provided by Weather API</p>
        </footer>
      </div>
    </div>
  );
}

// Generate mock weather data
function generateMockWeatherData(city = "London") {
  const isMetric = true;
  const now = new Date();
  
  // Current weather
  const current = {
    temp: 18 + Math.floor(Math.random() * 10),
    feelsLike: 17 + Math.floor(Math.random() * 10),
    humidity: 60 + Math.floor(Math.random() * 30),
    pressure: 1010 + Math.floor(Math.random() * 20),
    wind: 5 + Math.floor(Math.random() * 15),
    condition: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Clear"][Math.floor(Math.random() * 5)],
    date: now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  };
  
  // Hourly forecast (24 hours)
  const hourly = Array.from({ length: 24 }, (_, i) => {
    const hourTime = new Date(now);
    hourTime.setHours(now.getHours() + i);
    
    return {
      time: hourTime.toLocaleTimeString('en-US', { hour: 'numeric' }),
      temp: current.temp + Math.floor(Math.random() * 6) - 3,
      condition: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Clear"][Math.floor(Math.random() * 5)]
    };
  });
  
  // Daily forecast (7 days)
  const daily = Array.from({ length: 7 }, (_, i) => {
    const dayDate = new Date(now);
    dayDate.setDate(now.getDate() + i);
    
    return {
      day: dayDate.toLocaleDateString('en-US', { weekday: 'short' }),
      date: dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      tempMax: current.temp + Math.floor(Math.random() * 5),
      tempMin: current.temp - Math.floor(Math.random() * 8),
      condition: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Clear"][Math.floor(Math.random() * 5)]
    };
  });
  
  return {
    city,
    current,
    hourly,
    daily
  };
}
