/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Bike, Truck, Clock, Leaf, Shield, Route } from "lucide-react";
// import { Map, MapplsGL } from "@mappls/mappls-web-maps";
// import axios from "axios";


// Add type declaration for window.mappls
declare global {
  interface Window {
    mappls: any;
  }
}


const MAPPLS_API_KEY = "f9103064-b408-4a94-942c-11fd3dcbe5a6";

// Add these interfaces at the top of the file
interface Location {
  name: string;
  lat: string;
  lon: string;
}

interface LocationSuggestion {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}



// // Component to render the map
// const MapComponent = ({ routeData }: { routeData: any }) => {
//   useEffect(() => {
//     if (!routeData) return;

//     // Initialize the map
//     const map = new MapplsGL.Map({
//       container: "map",
//       center: [routeData.start.lng, routeData.start.lat],
//       zoom: 12,
//       accessToken: MAPPLS_API_KEY,
//     });

//     // Add the route to the map
//     map.on("load", () => {
//       map.addSource("route", {
//         type: "geojson",
//         data: routeData.geojson,
//       });

//       map.addLayer({
//         id: "route-layer",
//         type: "line",
//         source: "route",
//         layout: {
//           "line-join": "round",
//           "line-cap": "round",
//         },
//         paint: {
//           "line-color": "#007AFF",
//           "line-width": 4,
//         },
//       });
//     });
//   }, [routeData]);

//   return <div id="map" style={{ width: "100%", height: "500px" }} />;
// };



const VehicleOption = ({
    icon,
    label,
    selected,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 border rounded-lg flex flex-col items-center ${
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-500"
      }`}
    >
      {icon}
      <span className="mt-2 text-sm font-medium">{label}</span>
    </button>
  );
  
  const RouteOption = ({
    icon,
    label,
    selected,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 border rounded-lg flex flex-col items-center ${
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-500"
      }`}
    >
      {icon}
      <span className="mt-2 text-sm font-medium">{label}</span>
    </button>
  );



// -------------- Main Component starts here --------------
const RouteInput = () => {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("car");
  const [routeType, setRouteType] = useState("fastest");
  const [routeData, setRouteData] = useState(null);
  // Add new state variables
  const [sourceQuery, setSourceQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState<LocationSuggestion[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<LocationSuggestion[]>([]);


  // Add new state for storing selected locations
  const [sourceLocation, setSourceLocation] = useState<Location | null>(null);
  const [destLocation, setDestLocation] = useState<Location | null>(null);

  const mapRef = useRef<any>(null);
  const startMarkerRef = useRef<any>(null);
  const destinationMarkerRef = useRef<any>(null);





  // ----------------------- For Destination -------------------------  
  //  fetchAddressSuggestions to return full location data
  // This is to fetch address with suggestion
  const fetchAddressSuggestions = async (query: string) => {
    if (!query) {
      return [];
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=IN&viewbox=74.0,31.5,84.5,26.0&bounded=1&q=${query}`
      );
      const data: LocationSuggestion[] = await response.json();
      return data.map((item) => ({
        place_id: item.place_id,
        display_name: item.display_name,
        lat: item.lat,
        lon: item.lon,
      }));
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      return [];
    }
  };


  // -------------------- Also for destination ----------------------  
  // Add debounced search effect for source
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (sourceQuery) {
        const suggestions = await fetchAddressSuggestions(sourceQuery);
        setSourceSuggestions(suggestions);
      } else {
        setSourceSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [sourceQuery]);

  // Add debounced search effect for destination
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (destQuery) {
        const suggestions = await fetchAddressSuggestions(destQuery);
        setDestSuggestions(suggestions);
      } else {
        setDestSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [destQuery]);


  // --------------------- To submit destination input ---------------------   
  // Modify handleSubmit to include location data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceLocation || !destLocation) {
      alert("Please select both source and destination locations");
      return;
    }
    navigate("/route-results", {
      state: {
        source: sourceLocation,
        destination: destLocation,
        vehicleType,
        routeType,
      },
    });
  };


  // ------------------------------ Create Map Initialization function here ------------------------------
  const initializeMap = (startLoc: any, destinationLoc: any) => {
    if (mapRef.current) {
      // Clear existing map data
      if (startMarkerRef.current) startMarkerRef.current.remove();
      if (destinationMarkerRef.current) destinationMarkerRef.current.remove();
      mapRef.current.remove();
    }

    let center: { lat: number; lng: number } = { lat: 28.6139, lng: 77.209 }; // Default center

    if (startLoc) {
      center = startLoc;
    } else if (destinationLoc) {
      center = destinationLoc;
    }

    const mapInstance = new window.MapmyIndia.Map("map", {
      center: center,
      zoom: 12,
      zoomControl: true,
      hybrid: false,
    });
    mapRef.current = mapInstance;

    if (startLoc) {
      const newStartMarker = new window.MapmyIndia.Marker({
        map: mapInstance,
        position: startLoc,
        draggable: false,
      });
      startMarkerRef.current = newStartMarker;
    }

    if (destinationLoc) {
      const newDestinationMarker = new window.MapmyIndia.Marker({
        map: mapInstance,
        position: destinationLoc,
        draggable: false,
      });
      destinationMarkerRef.current = newDestinationMarker;
    }
  };


   //  ---------------------- Fetch current location ------------------------------
  const fetchCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current Location:", latitude, longitude);

          // Fetch address using OpenStreetMap's Nominatim API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data.display_name) {
            setSourceQuery(data.display_name);
            setSourceLocation({
              name: data.display_name,
              lat: latitude.toString(),
              lon: longitude.toString(),
            });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Failed to get location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };



  useEffect(() => {
    if (window.MapmyIndia && (sourceLocation || destLocation)) {
      const startLoc = sourceLocation
        ? {
            lat: parseFloat(sourceLocation.lat),
            lng: parseFloat(sourceLocation.lon),
          }
        : null;
      const destinationLoc = destLocation
        ? {
            lat: parseFloat(destLocation.lat),
            lng: parseFloat(destLocation.lon),
          }
        : null;
      initializeMap(startLoc, destinationLoc);
    } else if (!window.MapmyIndia) {
      const script = document.createElement("script");
      script.src = `https://apis.mappls.com/advancedmaps/api/${MAPPLS_API_KEY}/map_sdk?layer=vector&v=2.0`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const startLoc = sourceLocation
          ? {
              lat: parseFloat(sourceLocation.lat),
              lng: parseFloat(sourceLocation.lon),
            }
          : null;
        const destinationLoc = destLocation
          ? {
              lat: parseFloat(destLocation.lat),
              lng: parseFloat(destLocation.lon),
            }
          : null;
        initializeMap(startLoc, destinationLoc);
      };
      document.head.appendChild(script);
    }
  }, [sourceLocation, destLocation]);


  // ------------ Main route function ----------------
  // Fetch optimized route
  const directionPluginRef = useRef<any>(null);

  // Load Mappls SDK scripts
  useEffect(() => {
    const loadMapScript = () => {
      return new Promise<void>((resolve) => {
        const script1 = document.createElement('script');
        script1.src = `https://apis.mappls.com/advancedmaps/api/${MAPPLS_API_KEY}/map_sdk?layer=vector&v=3.0`;
        script1.async = true;

        const script2 = document.createElement('script');
        script2.src = `https://apis.mappls.com/advancedmaps/api/${MAPPLS_API_KEY}/map_sdk_plugins?v=3.0`;
        script2.async = true;

        script1.onload = () => {
          script2.onload = () => {
            resolve();
          };
          document.head.appendChild(script2);
        };

        document.head.appendChild(script1);
      });
    };

    loadMapScript();

    return () => {
      // Cleanup scripts on component unmount
      const scripts = document.querySelectorAll('script[src*="mappls"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  // Initialize map and fetch route
  useEffect(() => {
    const fetchRoute = async () => {
      if (!sourceLocation || !destLocation || !window.mappls) return;

      try {
        // Initialize map if not already initialized
        if (!mapRef.current) {
          mapRef.current = new window.mappls.Map('map', {
            center: [28.09, 78.3],
            zoom: 5
          });
        }

        // Initialize direction plugin
        if (mapRef.current && sourceLocation && destLocation) {
          const directionOptions = {
            map: mapRef.current,
            divWidth: '350px',
            isDraggable: false,
            Profile:['driving','biking','trucking','walking'],
            start: {
              label: sourceLocation.name,
              geoposition: `${sourceLocation.lat},${sourceLocation.lon}`
            },
            end: {
              label: destLocation.name,
              geoposition: `${destLocation.lat},${destLocation.lon}`
            }
          };

          // Remove existing direction plugin if it exists
          if (directionPluginRef.current) {
            directionPluginRef.current.remove();
          }

          // Create new direction plugin
          window.mappls.direction(directionOptions, function(data: any) {
            directionPluginRef.current = data;
            console.log("Direction plugin initialized:", data?.data);
          });
        }
      } catch (error) {
        console.error("Error initializing map or directions:", error);
      }
    };

    // Add a small delay to ensure the SDK is loaded
    const timer = setTimeout(() => {
      fetchRoute();
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (directionPluginRef.current) {
        directionPluginRef.current.remove();
      }
    };
  }, [sourceLocation, destLocation]);





  // ---------------------- Return the main UI here ----------------------
  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Plan Your Route</h1>

      <form className="space-y-6">
        {/* Location Inputs */}
        <div className="space-y-4">
          <div className="relative">
            
            
            <label
              htmlFor="source"
              className="block text-sm font-medium text-gray-700"
            >
              Starting Point                    {/* Source Input Field */}
            </label>
            <div className="flex">
              <input
                type="text"
                id="source"
                value={sourceQuery}
                onChange={(e) => {
                  setSourceQuery(e.target.value);
                  setSourceLocation(null);
                }}
                className="mt-1 block w-full rounded-md border-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-pink-900"
                placeholder="Enter starting location "
              />
              <button
                type="button"
                onClick={fetchCurrentLocation}
                className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
              >
                📍 Use Current Location         {/* Current Location Button */}
              </button>
            </div>


            {/* -------------------------- Display suggestions for source location ------------------------------- */}
            {sourceSuggestions.length > 0 && !sourceLocation && (
              <div className="absolute z-10 w-full bg-black mt-1 border border-gray-900 rounded-md shadow-lg">
                {sourceSuggestions.map((suggestion: LocationSuggestion) => (
                  <div
                    key={suggestion.place_id}
                    className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer"
                    onClick={() => {
                      setSourceQuery(suggestion.display_name);
                      setSourceLocation({
                        name: suggestion.display_name,
                        lat: suggestion.lat,
                        lon: suggestion.lon,
                      });
                      setSourceSuggestions([]);
                    }}
                  >
                    {suggestion.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>

            {/*-------------------------------- Destination Input Field ---------------------------*/}
          <div className="relative">
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700"
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={destQuery}
              onChange={(e) => {
                setDestQuery(e.target.value);
                setDestLocation(null);
              }}
              className="mt-1 block w-full rounded-md border-gray-900 shadow-sm focus:border-blue-900 focus:ring-blue-500 text-pink-900"
              placeholder="Enter destination"
            />

            {/* -------------------------- Display suggestions for destination location ------------------------------- */}
            {destSuggestions.length > 0 && !destLocation && (
              <div className="absolute z-10 w-full bg-black mt-1 border border-gray-900 rounded-md shadow-lg">
                {destSuggestions.map((suggestion: LocationSuggestion) => (
                  <div
                    key={suggestion.place_id}
                    className="px-4 py-2 hover:bg-gray-900 cursor-pointer"
                    onClick={() => {
                      setDestQuery(suggestion.display_name);
                      setDestLocation({
                        name: suggestion.display_name,
                        lat: suggestion.lat,
                        lon: suggestion.lon,
                      });
                      setDestSuggestions([]);
                    }}
                  >
                    {suggestion.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>



        {/* Vehicle Type Selection */}
        <div className="text-black">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Type
          </label>
          <div className="grid grid-cols-3 gap-4">
            <VehicleOption
              icon={<Car className="h-6 w-6 " />}
              label="Car"
              selected={vehicleType === "car"}
              onClick={() => setVehicleType("car")}
            />
            <VehicleOption
              icon={<Bike className="h-6 w-6" />}
              label="Bike"
              selected={vehicleType === "bike"}
              onClick={() => setVehicleType("bike")}
            />
            <VehicleOption
              icon={<Truck className="h-6 w-6" />}
              label="Truck"
              selected={vehicleType === "truck"}
              onClick={() => setVehicleType("truck")}
            />
          </div>
        </div>



        {/* Route Type Selection */}
        <div className="text-black">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Route Preference
          </label>
          <div className="grid grid-cols-3 gap-4">
            <RouteOption
              icon={<Clock className="h-6 w-6" />}
              label="Fastest"
              selected={routeType === "fastest"}
              onClick={() => setRouteType("fastest")}
            />
            <RouteOption
              icon={<Shield className="h-6 w-6" />}
              label="Safest"
              selected={routeType === "safest"}
              onClick={() => setRouteType("safest")}
            />
            <RouteOption
              icon={<Leaf className="h-6 w-6" />}
              label="Eco-friendly"
              selected={routeType === "eco"}
              onClick={() => setRouteType("eco")}
            />
          </div>
        </div>


        {/* -------------------------- Submit Button ---------------------------- */}
        <button
          type="submit"
        //   onClick={fetchRoute}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Optimize Route
        </button>
        {/*<MapComponent*/}
        {/*    start={sourceLocation ? { lat: parseFloat(sourceLocation.lat), lng: parseFloat(sourceLocation.lon) } : null}*/}
        {/*    destination={destLocation ? { lat: parseFloat(destLocation.lat), lng: parseFloat(destLocation.lon) } : null}*/}
        {/*/>*/}
        <div className="flex flex-row w-full gap-4"> 
          <div id="map" style={{ width: "70%", height: "500px" }}></div>
          {sourceLocation && destLocation && 
          (<div className="w-[30%] p-4 bg-white rounded-lg shadow overflow-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Available Routes</h2>
            {directionPluginRef.current?.data ? (
              <div className="space-y-4">
                {Array.from({ length: directionPluginRef.current.data.length }, (_, i) => (
                  <div 
                    key={i}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">Route {i + 1}</span>
                      <span className="text-sm text-gray-500">
                        {directionPluginRef.current.data[i].routeName || `Route ${i + 1}`}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Route className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-900">
                          {directionPluginRef.current.data[i].distance}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-900">
                          {directionPluginRef.current.data[i].eta}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center">
                Enter source and destination to see available routes
              </div>
            )}
          </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RouteInput;
