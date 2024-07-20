// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchNearbyHospitals(latitude, longitude);
        },
        error => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchNearbyHospitals = (latitude, longitude) => {
    const location = new window.google.maps.LatLng(latitude, longitude);
    const map = new window.google.maps.Map(document.createElement('div')); // Dummy map

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location,
      radius: '5000',
      type: ['hospital'],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setHospitals(results);
      } else {
        setError('Failed to fetch hospitals');
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nearby Hospitals</h1>
        {error && <p>{error}</p>}
        <ul>
          {hospitals.map(hospital => (
            <li key={hospital.place_id}>
              {hospital.name} - {hospital.vicinity}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default Dashboard;
