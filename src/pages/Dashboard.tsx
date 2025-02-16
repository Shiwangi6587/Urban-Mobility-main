// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import React, { useEffect ,useState } from 'react';
// import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { Activity, Users, AlertTriangle, Clock, TrendingUp, Zap, Leaf, Timer, Fuel, MapPin } from 'lucide-react';
// import { set } from 'mongoose';

// const data = [
//   { name: 'Mon', optimization: 65, emergency: 12 },
//   { name: 'Tue', optimization: 72, emergency: 8 },
//   { name: 'Wed', optimization: 68, emergency: 15 },
//   { name: 'Thu', optimization: 80, emergency: 10 },
//   { name: 'Fri', optimization: 74, emergency: 7 },
//   { name: 'Sat', optimization: 62, emergency: 5 },
//   { name: 'Sun', optimization: 70, emergency: 9 },
// ];

// const pieData = [
//   { name: 'Electric', value: 45 },
//   { name: 'Hybrid', value: 30 },
//   { name: 'Gas', value: 25 },
// ];

// const COLORS = ['#818cf8', '#34d399', '#fb7185'];

// const stats = [
//   { 
//     title: 'Active Users', 
//     value: '1,429', 
//     change: '+8%',
//     icon: Users,
//     color: 'from-indigo-500/20 to-indigo-600/20',
//     iconColor: 'text-indigo-400'
//   },
//   { 
//     title: 'Optimization Score', 
//     value: '92%', 
//     change: '+5%',
//     icon: Activity,
//     color: 'from-emerald-500/20 to-emerald-600/20',
//     iconColor: 'text-emerald-400'
//   },
//   { 
//     title: 'Emergency Alerts', 
//     value: '3', 
//     change: '-2',
//     icon: AlertTriangle,
//     color: 'from-rose-500/20 to-rose-600/20',
//     iconColor: 'text-rose-400'
//   },
// ];

// const routeOptions = [
//   {
//     id: 'eco',
//     name: 'Eco-Friendly',
//     textcolor: 'black',
//     icon: Leaf,
//     description: 'Optimize for lowest carbon emissions',
//     reduction: '45% less CO₂'
//   },
//   {
//     id: 'quick',
//     name: 'Fastest Route',
//     icon: Timer,
//     description: 'Optimize for shortest travel time',
//     reduction: '25 min faster'
//   },
//   {
//     id: 'fuel',
//     name: 'Fuel Efficient',
//     icon: Fuel,
//     description: 'Optimize for minimal fuel consumption',
//     reduction: '30% fuel saved'
//   }
// ];


// declare global {
//   interface Window {
//     MapmyIndia: any;
//     map: any;
//   }
// }

// interface MapSearchProps {
//   onLocationSelect?: (location: {
//     lat: number;
//     lon: number;
//     placeName: string;
//     address: string;
//   }) => void;
// }

// export default function Dashboard() {
//   const [selectedRoute, setSelectedRoute] = useState('');       // e
//   const [showMap, setShowMap] = useState(false);      // e
//   const [currentLocation, setCurrentLocation] = useState<string>("Fetching...");
//   // const [destination, setDestination] = useState<string>("");
//   const [destination, setDestination] = useState<{ lat: number; lon: number } | null>(null);
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [location, setLocation] = useState<{lat: number; lng: number} | null>(null);

//   // const [map, setMap] = useState<any>(null);
//   const [routeData, setRouteData] = useState<any>(null);
//   const apiKey = "21aec3f8c1f1cf282554c5d96095864e";

//   const [map, setMap] = useState<any>(null);
//   const [marker, setMarker] = useState<any>(null);
//   const mapplsApiKey = "b7036904-69e0-4d7c-b830-f7c6df373e58"; // Replace with your API key

//   const fetchAddress = async (latitude: number, longitude: number) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//       );
//       const data = await response.json();
//       if (data && data.display_name) {
//         setCurrentLocation(data.display_name);
//       } else {
//         setCurrentLocation("Address not found.");
//       }
//     } catch (error) {
//       console.error("Error fetching address:", error);
//       setCurrentLocation("Failed to fetch address.");
//     }
//   };

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation(`Lat: ${latitude}, Lng: ${longitude}`);
//           setLocation({ lat: latitude, lng: longitude });
//           fetchAddress(latitude, longitude); // Call fetchAddress here
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//           switch (error.code) {
//             case error.PERMISSION_DENIED:
//               setCurrentLocation("Location access denied.");
//               break;
//             case error.POSITION_UNAVAILABLE:
//               setCurrentLocation("Location unavailable.");
//               break;
//             case error.TIMEOUT:
//               setCurrentLocation("Location request timed out.");
//               break;
//             default:
//               setCurrentLocation("Unknown error.");
//           }
//         },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//       );
//     } else {
//       setCurrentLocation("Geolocation not supported.");
//     }
//   }, []);
 
//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation(`Lat: ${latitude}, Lng: ${longitude}`);
//           setLocation({ lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//           switch (error.code) {
//             case error.PERMISSION_DENIED:
//               setCurrentLocation("Location access denied.");
//               break;
//             case error.POSITION_UNAVAILABLE:
//               setCurrentLocation("Location unavailable.");
//               break;
//             case error.TIMEOUT:
//               setCurrentLocation("Location request timed out.");
//               break;
//             default:
//               setCurrentLocation("Unknown error.");
//           }
//         },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//       );
//     } else {
//       setCurrentLocation("Geolocation not supported.");
//     }
//   }, []);

// console.log("lat---"+ location?.lat);
// console.log("lng---"+ location?.lng);


//   // Update marker position when location changes
//   useEffect(() => {
//     if (map && marker && location) {
//       // Remove existing marker
//       marker.remove();
      
//       // Create new marker at updated position
//       const newMarker = new window.MapmyIndia.Marker({
//         map: map,
//         position: { lat: location.lat, lng: location.lng },
//         draggable: false,
//         fitbounds: true
//       });
      
//       // Update marker state
//       setMarker(newMarker);
      
//       // Center map on new position
//       map.setView([location.lat, location.lng], 12);
//     }
//   }, [location, map]);

//   // Initialize map with proper position handling
//   useEffect(() => {
//     let mapInstance: any;
    
//     function initializeMap() {
//       if (window.MapmyIndia && !map) {
//         // Initialize map with default or current location
//         const initialPosition = location 
//           ? [location.lat, location.lng]
//           : [28.544, 77.5454]; // Default position if location not available

//         mapInstance = new window.MapmyIndia.Map('map', {
//           center: initialPosition,
//           zoom: 12,
//           zoomControl: true,
//           hybrid: false
//         });

//         mapInstance.addListener('load', () => {
//           // Only add marker if we have location data
//           if (location) {
//             const initialMarker = new window.MapmyIndia.Marker({
//               map: mapInstance,
//               position: { lat: location.lat, lng: location.lng },
//               draggable: false,
//               fitbounds: true
//             });
//             setMarker(initialMarker);
//           }
//         });

//         setMap(mapInstance);
//       }
//     }

//     // Check if the script is already loaded
//     if (window.MapmyIndia) {
//       initializeMap();
//     } else {
//       // Load the MapMyIndia script
//       const script = document.createElement('script');
//       script.src = `https://apis.mappls.com/advancedmaps/api/${mapplsApiKey}/map_sdk?layer=vector&v=2.0`;
//       script.async = true;
//       script.defer = true;
//       script.onload = initializeMap;
//       document.head.appendChild(script);
//     }

//     return () => {
//       if (mapInstance) {
//         mapInstance.remove();
//       }
//     };
//   }, [location]); // Add location as dependency



// // this code complete address suggestion 
// // const fetchAddressSuggestions = async (query: string) => {
// //   if (!query.trim()) {
// //     setSuggestions([]);
// //     return;
// //   }

// //   try {
// //     const response = await fetch(
// //       `https://nominatim.openstreetmap.org/search?format=json&countrycodes=IN&q=${encodeURIComponent(query)}`
// //     );
// //     const data = await response.json();
// //     console.log(data);
// //     if (Array.isArray(data) && data.length > 0) {
// //       setSuggestions(data.map((item: any) => item.display_name));
// //     } else {
// //       setSuggestions([]);
// //     }
// //   } catch (error) {
// //     console.error("Error fetching address suggestions:", error);
// //     setSuggestions([]);
// //   }
// // };

// // // Function to set destination on map
// // const selectDestination = (selectedPlace: any) => {
// //   setDestination({ lat: parseFloat(selectedPlace.lat), lon: parseFloat(selectedPlace.lon) });
// // };



// // console.log("suggestions---"+ suggestions);


// // ...existing code...

// const fetchAddressSuggestions = async (query: string) => {
//   if (!query.trim()) {
//     setSuggestions([]);
//     return;
//   }
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&countrycodes=IN&q=${encodeURIComponent(query)}`
//     );
//     const data = await response.json();
//     console.log(data);
//     if (Array.isArray(data) && data.length > 0) {
//       setSuggestions(data.map((item: any) => item.display_name));
//     } else {
//       setSuggestions([]);
//     }
//   } catch (error) {
//     console.error("Error fetching address suggestions:", error);
//     setSuggestions([]);
//   }
// };

// // Function to set destination on map
// const selectDestination = (selectedPlace: any) => {
//   setDestination({ lat: parseFloat(selectedPlace.lat), lon: parseFloat(selectedPlace.lon) });
//   updateMapWithDestination(selectedPlace);
// };

// const updateMapWithDestination = (selectedPlace: any) => {
//   if (mapInstance) {
//     const destinationMarker = new mapboxgl.Marker()
//       .setLngLat([parseFloat(selectedPlace.lon), parseFloat(selectedPlace.lat)])
//       .addTo(mapInstance);
//     mapInstance.flyTo({ center: [parseFloat(selectedPlace.lon), parseFloat(selectedPlace.lat)], zoom: 14 });
//   }
// };

// console.log("suggestions---" + suggestions);

// // ...existing code...


// const fetchRoute = async () => {
//   const API_URL = `https://apis.mapmyindia.com/advancedmaps/v1/${apiKey}/route_adv/driving/${currentLocation};${destination}`;
//   try {
//     const response = await fetch(API_URL, {
//       mode: 'no-cors',
//     });
//     const data = await response.json();
//     if (!data.routes || data.routes.length === 0) {
//       console.error("No routes found.");
//       return;
//     }
//     const route = data.routes[0].geometry.coordinates;
//     console.log("route---"+ route);
//     console.log(data);
//     setRouteData(route);
//     drawRoute(route);
//     setTimeout(() => drawRoute(route), 500);
//   } catch (error) {
//     console.error("Error fetching route:", error);
//   }
// };


// const drawRoute = (route: any) => {
//   if (!map) return;

//   const latlngs = route.map(([lon, lat]: any) => [lat, lon]); // Convert to [lat, lon]
//   const polyline = window.L.polyline(latlngs, { color: "blue" }).addTo(map);
//   map.fitBounds(polyline.getBounds());
// };


//   const handleRouteSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedRoute && destination) {
//       setShowMap(true);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <h1 className="text-5xl font-extrabold text-gray-800 dark:text-blue-900 font-serif">Command Center</h1>
//         <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
//           <Zap className="w-5 h-5 text-indigo-500" />
//           <span className="text-sm font-medium text-indigo-500">System Operating at 98% Efficiency</span>
//         </div>
//       </div>

//       <div className="p-6 rounded-xl border-4 border-black-900/30 bg-cream-900/30 backdrop-blur-md">
//         <h2 className="text-3xl font-bold gradient-text mb-6">Route Planner</h2>
     
     
//         <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         fetchRoute();
//       }}
//     >
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {routeOptions.map((option) => {
//               const Icon = option.icon;
//               return (
//                 <div
//                   key={option.id}
//                   className={`route-option ${selectedRoute === option.id ? 'selected' : ''}`}
//                   onClick={() => setSelectedRoute(option.id)}
//                 >
//                   <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-500/20">
//                     <Icon className="w-5 h-5 text-green-700" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">{option.name}</h3>
//                     <p className="text-sm text-gray-900 mt-1">{option.description}</p>
//                     <span className="text-xs font-medium text-indigo-900 mt-2 block">{option.reduction}</span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
          
//       <div className="flex gap-4">
//         <div className="flex-1">
//           <label className="block text-xl font-medium text-gray-900 mb-2">
//             Current Location
//           </label>
//           <input
//             type="text"
//             className="input-field block w-full border-4 border-black rounded-md"
//             value={currentLocation}
//             readOnly
//           />
//         </div>

//         <div className="flex-1">
//           <label className="block text-xl font-medium text-gray-900 mb-2">
//             Destination
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               className="input-field block w-full border-4 border-black rounded-md"
//               placeholder="Enter destination"
//               value={destination}
//               onChange={(e) => {
//                 setDestination(e.target.value);
//                 fetchAddressSuggestions(e.target.value);
//               }}
//             />
//             {suggestions.length > 0 && (
//               <ul className="absolute w-full max-h-60 overflow-y-auto bg-black border border-gray-300 rounded-md shadow-lg z-30">
//                 {suggestions.map((suggestion, index) => (
//                   <li
//                     key={index}
//                     className="p-2 cursor-pointer hover:bg-gray-200"
//                     onClick={() => {
//                       setDestination(suggestion);
//                       setSuggestions([]);
//                     }}
//                   >
//                     {suggestion}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="self-end px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-indigo-500/20"
//           disabled={!destination}
//         >
//           Find Route
//         </button>
//       </div>

//       <div id="map" className="w-full h-[500px] mt-5 border-2 border-gray-500 rounded-md"></div>
//     </form>
          
          
                
      

   
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {stats.map((stat) => {
//           const Icon = stat.icon;
//           return (
//             <div key={stat.title} className="glass-card p-6 rounded-xl">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
//                   <p className="text-2xl font-bold mt-1 text-gray-600">{stat.value}</p>
//                 </div>
//                 <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
//                   <Icon className={`w-6 h-6 ${stat.iconColor}`} />
//                 </div>
//               </div>
//               <p className={`text-sm mt-2 font-medium ${
//                 stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
//               }`}>
//                 {stat.change} from last week
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="glass-card p-6 rounded-xl lg:col-span-2">
//           <h2 className="text-xl font-bold gradient-text mb-6">Performance Analytics</h2>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
//                 <XAxis dataKey="name" stroke="#9ca3af" />
//                 <YAxis stroke="#9ca3af" />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#1f2937',
//                     border: '1px solid #374151',
//                     borderRadius: '0.75rem',
//                     color: '#f3f4f6'
//                   }}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="optimization" 
//                   stroke="#818cf8" 
//                   strokeWidth={2}
//                   dot={{ fill: '#818cf8', strokeWidth: 2 }}
//                   name="Route Optimization"
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="emergency" 
//                   stroke="#fb7185" 
//                   strokeWidth={2}
//                   dot={{ fill: '#fb7185', strokeWidth: 2 }}
//                   name="Emergency Responses"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="glass-card p-6 rounded-xl">
//           <h2 className="text-xl font-bold gradient-text mb-6">Fleet Distribution</h2>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   innerRadius={60}
//                   outerRadius={80}
//                   paddingAngle={5}
//                   dataKey="value"
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: '#1f2937',
//                     border: '1px solid #374151',
//                     borderRadius: '0.75rem',
//                     color: '#f3f4f6'
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="mt-6 space-y-3">
//             {pieData.map((entry, index) => (
//               <div key={entry.name} className="flex items-center gap-3">
//                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
//                 <span className="text-sm font-medium text-gray-500">{entry.name}</span>
//                 <span className="text-sm font-bold text-gray-500 ml-auto">{entry.value}%</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export { Dashboard };





/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect ,useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, AlertTriangle, Clock, TrendingUp, Zap, Leaf, Timer, Fuel, MapPin } from 'lucide-react';
import { set } from 'mongoose';

const data = [
  { name: 'Mon', optimization: 65, emergency: 12 },
  { name: 'Tue', optimization: 72, emergency: 8 },
  { name: 'Wed', optimization: 68, emergency: 15 },
  { name: 'Thu', optimization: 80, emergency: 10 },
  { name: 'Fri', optimization: 74, emergency: 7 },
  { name: 'Sat', optimization: 62, emergency: 5 },
  { name: 'Sun', optimization: 70, emergency: 9 },
];

const pieData = [
  { name: 'Electric', value: 45 },
  { name: 'Hybrid', value: 30 },
  { name: 'Gas', value: 25 },
];

const COLORS = ['#818cf8', '#34d399', '#fb7185'];

const stats = [
  { 
    title: 'Active Users', 
    value: '1,429', 
    change: '+8%',
    icon: Users,
    color: 'from-indigo-500/20 to-indigo-600/20',
    iconColor: 'text-indigo-400'
  },
  { 
    title: 'Optimization Score', 
    value: '92%', 
    change: '+5%',
    icon: Activity,
    color: 'from-emerald-500/20 to-emerald-600/20',
    iconColor: 'text-emerald-400'
  },
  { 
    title: 'Emergency Alerts', 
    value: '3', 
    change: '-2',
    icon: AlertTriangle,
    color: 'from-rose-500/20 to-rose-600/20',
    iconColor: 'text-rose-400'
  },
];

const routeOptions = [
  {
    id: 'eco',
    name: 'Eco-Friendly',
    textcolor: 'black',
    icon: Leaf,
    description: 'Optimize for lowest carbon emissions',
    reduction: '45% less CO₂'
  },
  {
    id: 'quick',
    name: 'Fastest Route',
    icon: Timer,
    description: 'Optimize for shortest travel time',
    reduction: '25 min faster'
  },
  {
    id: 'fuel',
    name: 'Fuel Efficient',
    icon: Fuel,
    description: 'Optimize for minimal fuel consumption',
    reduction: '30% fuel saved'
  }
];


declare global {
  interface Window {
    MapmyIndia: any;
    map: any;
  }
}


export default function Dashboard() {
  const [selectedRoute, setSelectedRoute] = useState('');       // e
  const [showMap, setShowMap] = useState(false);      // e
  const [currentLocation, setCurrentLocation] = useState<string>("Fetching...");
  const [destination, setDestination] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [location, setLocation] = useState<{lat: number; lng: number} | null>(null);

  // const [map, setMap] = useState<any>(null);
  const [routeData, setRouteData] = useState<any>(null);
  const apiKey = "21aec3f8c1f1cf282554c5d96095864e";

  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const mapplsApiKey = "b7036904-69e0-4d7c-b830-f7c6df373e58"; // Replace with your API key

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setCurrentLocation(data.display_name);
      } else {
        setCurrentLocation("Address not found.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setCurrentLocation("Failed to fetch address.");
    }
  };
  
 useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log("Location fetched:", latitude, longitude);
      setLocation({ lat: latitude, lng: longitude });

      // Fetch and update the address
      fetchAddress(latitude, longitude);
    },
    (error) => {
      console.error("Error fetching location:", error);
      alert("Location access denied. Showing default marker.");
      setLocation({ lat: 28.6139, lng: 77.2090 }); // Default location (Delhi)
    }
  );
}, []);

  

  console.log("lat---"+ location?.lat);
  console.log("lng---"+ location?.lng);

  // Update marker position when location changes
  useEffect(() => {
    if (map && location) {
      // Remove existing marker
      if (marker) marker.remove();
  
      // Create new marker at updated position
      const newMarker = new window.MapmyIndia.Marker({
        map: map,
        position: { lat: location.lat, lng: location.lng },
        draggable: false,
        fitbounds: true
      });
  
      setMarker(newMarker);
      map.setView([location.lat, location.lng], 12);
    }
  }, [location, map]); // Re-run whenever location or map changes
  

  // Initialize map with proper position handling
  useEffect(() => {
    let mapInstance: any;
    
    function initializeMap() {
      if (window.MapmyIndia && !map) {
        // Initialize map with default or current location
        const initialPosition = location 
          ? [location.lat, location.lng]
          : [28.544, 77.5454]; // Default position if location not available

        mapInstance = new window.MapmyIndia.Map('map', {
          center: initialPosition,
          zoom: 12,
          zoomControl: true,
          hybrid: false
        });

        mapInstance.addListener('load', () => {
          // Only add marker if we have location data
          if (location) {
            const initialMarker = new window.MapmyIndia.Marker({
              map: mapInstance,
              position: { lat: location.lat, lng: location.lng },
              draggable: false,
              fitbounds: true
            });
            setMarker(initialMarker);
          }
        });

        setMap(mapInstance);
      }
    }

    // Check if the script is already loaded
    if (window.MapmyIndia) {
      initializeMap();
    } else {
      // Load the MapMyIndia script
      const script = document.createElement('script');
      script.src = `https://apis.mappls.com/advancedmaps/api/${mapplsApiKey}/map_sdk?layer=vector&v=2.0`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [location]); // Add location as dependency

  const fetchAddressSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=IN&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data) && data.length > 0) {
        setSuggestions(data.map((item: any) => item.display_name));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setSuggestions([]);
    }
  };

  console.log("suggestions---"+ suggestions);

  const fetchRoute = async () => {
    const API_URL = `https://apis.mapmyindia.com/advancedmaps/v1/${apiKey}/route_adv/driving/${currentLocation};${destination}`;
    try {
      const response = await fetch(API_URL, {
        mode: 'no-cors',
      });
      const data = await response.json();
      if (!data.routes || data.routes.length === 0) {
        console.error("No routes found.");
        return;
      }
      const route = data.routes[0].geometry.coordinates;
      console.log("route---"+ route);
      console.log(data);
      setRouteData(route);
      drawRoute(route);
      setTimeout(() => drawRoute(route), 500);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const drawRoute = (route: any) => {
    if (!map) return;

    const latlngs = route.map(([lon, lat]: any) => [lat, lon]); // Convert to [lat, lon]
    const polyline = window.L.polyline(latlngs, { color: "blue" }).addTo(map);
    map.fitBounds(polyline.getBounds());
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-blue-900 font-serif">Command Center</h1>
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <Zap className="w-5 h-5 text-indigo-500" />
          <span className="text-sm font-medium text-indigo-500">System Operating at 98% Efficiency</span>
        </div>
      </div>

      <div className="p-6 rounded-xl border-4 border-black-900/30 bg-cream-900/30 backdrop-blur-md">
        <h2 className="text-3xl font-bold gradient-text mb-6">Route Planner</h2>
     
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchRoute();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {routeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className={`route-option ${selectedRoute === option.id ? 'selected' : ''}`}
                  onClick={() => setSelectedRoute(option.id)}
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-500/20">
                    <Icon className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{option.name}</h3>
                    <p className="text-sm text-gray-900 mt-1">{option.description}</p>
                    <span className="text-xs font-medium text-indigo-900 mt-2 block">{option.reduction}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xl font-medium text-gray-900 mb-2">
                Current Location
              </label>
              <input
                type="text"
                className="input-field block w-full border-4 border-black rounded-md"
                value={currentLocation}
                readOnly
              />
            </div>

            <div className="flex-1">
              <label className="block text-xl font-medium text-gray-900 mb-2">
                Destination
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="input-field block w-full border-4 border-black rounded-md"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    fetchAddressSuggestions(e.target.value);
                  }}
                />
                {suggestions.length > 0 && (
                  <ul className="absolute w-full max-h-60 overflow-y-auto bg-black border border-gray-300 rounded-md shadow-lg z-30">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          setDestination(suggestion);
                          setSuggestions([]);
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="self-end px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-indigo-500/20"
              disabled={!destination}
            >
              Find Route
            </button>
          </div>

          <div id="map" className="w-full h-[500px] mt-5 border-2 border-gray-500 rounded-md"></div>
        </form>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1 text-gray-600">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <p className={`text-sm mt-2 font-medium ${
                stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {stat.change} from last week
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl lg:col-span-2">
          <h2 className="text-xl font-bold gradient-text mb-6">Performance Analytics</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '0.75rem',
                    color: '#f3f4f6'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="optimization" 
                  stroke="#818cf8" 
                  strokeWidth={2}
                  dot={{ fill: '#818cf8', strokeWidth: 2 }}
                  name="Route Optimization"
                />
                <Line 
                  type="monotone" 
                  dataKey="emergency" 
                  stroke="#fb7185" 
                  strokeWidth={2}
                  dot={{ fill: '#fb7185', strokeWidth: 2 }}
                  name="Emergency Responses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-bold gradient-text mb-6">Fleet Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '0.75rem',
                    color: '#f3f4f6'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-sm font-medium text-gray-500">{entry.name}</span>
                <span className="text-sm font-bold text-gray-500 ml-auto">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export { Dashboard };
