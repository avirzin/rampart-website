import Papa from 'papaparse';
import { getCountryCoordinates } from './countryCoordinates';

/**
 * Process remittance data from CSV file
 * @param {string} csvText - Raw CSV text content
 * @param {number} year - Year to filter data (optional, defaults to latest available)
 * @returns {Array} Array of objects with country data for globe visualization
 */
export async function processRemittanceData(csvText, year = null) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          // Filter for remittance inflows only
          const inflowData = results.data.filter(
            (row) => row.INDICATOR === 'WB_KNOMAD_MRI'
          );

          // Group by country and year
          const countryYearData = {};
          inflowData.forEach((row) => {
            const countryCode = row.REF_AREA;
            const countryName = row.REF_AREA_LABEL;
            const dataYear = parseInt(row.TIME_PERIOD);
            const value = parseFloat(row.OBS_VALUE) || 0;

            if (!countryYearData[countryCode]) {
              countryYearData[countryCode] = {
                code: countryCode,
                name: countryName,
                years: {},
              };
            }

            countryYearData[countryCode].years[dataYear] = value;
          });

          // Process each country
          const processedData = [];
          Object.values(countryYearData).forEach((country) => {
            const coords = getCountryCoordinates(country.code);
            if (!coords) {
              // Skip countries without coordinates
              return;
            }

            // Determine which year to use
            let selectedYear = year;
            if (!selectedYear) {
              // Use latest available year
              const years = Object.keys(country.years)
                .map(Number)
                .filter((y) => country.years[y] > 0);
              selectedYear = years.length > 0 ? Math.max(...years) : null;
            }

            if (!selectedYear || !country.years[selectedYear]) {
              // Use latest available year if requested year not found
              const years = Object.keys(country.years)
                .map(Number)
                .filter((y) => country.years[y] > 0);
              selectedYear = years.length > 0 ? Math.max(...years) : null;
            }

            const value = selectedYear ? country.years[selectedYear] : 0;

            processedData.push({
              lat: coords[0],
              lng: coords[1],
              countryCode: country.code,
              countryName: country.name,
              value: value,
              year: selectedYear,
              allYears: country.years,
            });
          });

          // Sort by value descending
          processedData.sort((a, b) => b.value - a.value);

          resolve(processedData);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

/**
 * Get available years from the data
 * @param {string} csvText - Raw CSV text content
 * @returns {Array} Array of available years
 */
export async function getAvailableYears(csvText) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const inflowData = results.data.filter(
            (row) => row.INDICATOR === 'WB_KNOMAD_MRI'
          );
          const years = new Set();
          inflowData.forEach((row) => {
            const year = parseInt(row.TIME_PERIOD);
            if (!isNaN(year)) {
              years.add(year);
            }
          });
          resolve(Array.from(years).sort());
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

