import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { processRemittanceData, getAvailableYears } from '../utils/processRemittanceData';
import './RemittanceGlobe.css';

function RemittanceGlobe() {
  const [pointsData, setPointsData] = useState([]);
  const [polygonsData, setPolygonsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxValue, setMaxValue] = useState(0);
  const globeRef = useRef();
  const rotationRef = useRef({ lat: 0, lng: 0 });

  useEffect(() => {
    // Load country borders (GeoJSON) - using Natural Earth data
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then((response) => {
        if (!response.ok) {
          // Fallback to alternative source
          return fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
        }
        return response;
      })
      .then((response) => response.json())
      .then((geoData) => {
        // Handle both GeoJSON and TopoJSON formats
        if (geoData.features) {
          setPolygonsData(geoData.features);
        } else if (geoData.objects) {
          // TopoJSON format - would need topojson library to convert
          // For now, use the first source
          console.warn('TopoJSON format detected, using alternative');
        }
      })
      .catch((error) => {
        console.error('Error loading country borders:', error);
        // Continue without borders if loading fails
      });

    // Load CSV data
    fetch('/data/WB_KNOMAD.csv')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load CSV');
        }
        return response.text();
      })
      .then(async (csvText) => {
        // Get available years
        const years = await getAvailableYears(csvText);
        
        // Set default year to latest
        const latestYear = years[years.length - 1];

        // Process data for latest year
        const data = await processRemittanceData(csvText, latestYear);
        
        // Calculate max value for scaling
        const max = Math.max(...data.map((d) => d.value), 1);
        setMaxValue(max);
        
        setPointsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);


  // Auto-rotation effect
  useEffect(() => {
    if (!globeRef.current || loading) return;

    let animationFrameId;
    const rotateGlobe = () => {
      rotationRef.current.lng += 0.02; // Slow rotation speed
      if (globeRef.current) {
        globeRef.current.pointOfView(
          {
            lat: rotationRef.current.lat,
            lng: rotationRef.current.lng,
            altitude: 2.5,
          },
          0 // No animation, smooth rotation
        );
      }
      animationFrameId = requestAnimationFrame(rotateGlobe);
    };

    rotateGlobe();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [loading]);

  // Color scale function (blue to red based on value)
  const getColor = (value) => {
    if (value === 0) return 'rgba(100, 100, 100, 0.3)';
    const normalized = Math.min(value / maxValue, 1);
    // Blue (low) -> Green -> Yellow -> Red (high)
    if (normalized < 0.25) {
      return `rgba(59, 130, 246, ${0.3 + normalized * 2})`; // Blue
    } else if (normalized < 0.5) {
      return `rgba(34, 197, 94, ${0.5 + (normalized - 0.25) * 2})`; // Green
    } else if (normalized < 0.75) {
      return `rgba(234, 179, 8, ${0.7 + (normalized - 0.5) * 2})`; // Yellow
    } else {
      return `rgba(239, 68, 68, ${0.8 + (normalized - 0.75) * 2})`; // Red
    }
  };

  // Size scale function
  const getSize = (value) => {
    if (value === 0) return 0.5;
    const normalized = Math.min(value / maxValue, 1);
    return 0.5 + normalized * 3; // Size between 0.5 and 3.5
  };

  // Format value for display
  const formatValue = (value) => {
    if (value === 0) return '$0';
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    }
    return `$${value.toFixed(1)}M`;
  };

  return (
    <div className="globe-section">
      <div className="globe-container">
        {loading ? (
          <div className="loading">Loading remittance data...</div>
        ) : (
          <Globe
            ref={globeRef}
            globeImageUrl={null}
            backgroundImageUrl={null}
            polygonsData={polygonsData}
            polygonAltitude={0.01}
            polygonCapColor={(d) => 'rgba(255, 255, 255, 0.1)'}
            polygonSideColor={(d) => 'rgba(255, 255, 255, 0.1)'}
            polygonStrokeColor={() => 'rgba(255, 255, 255, 0.5)'}
            polygonLabel=""
            pointsData={pointsData}
            pointLat="lat"
            pointLng="lng"
            pointColor={(d) => getColor(d.value)}
            pointRadius={(d) => getSize(d.value)}
            pointResolution={12}
            showAtmosphere={true}
            atmosphereColor="#1a1a2e"
            atmosphereAltitude={0.1}
            enablePointerInteraction={false}
            animateIn={true}
          />
        )}
      </div>
    </div>
  );
}

export default RemittanceGlobe;

