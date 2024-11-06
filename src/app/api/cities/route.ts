import { NextResponse } from 'next/server';
import cities from '../../../../public/cities.json';

export async function GET() {
  try {

    const citiesWithNumPopulation = cities.map(city => ({
      city: city.city,
      population: parseInt(city.population, 10)
    }));

    let filteredCities = citiesWithNumPopulation
      .filter(city => city.population > 50000);

    const maxPopulationCity = [...filteredCities].sort((a, b) => b.population - a.population)[0];

    filteredCities = filteredCities.filter(city => city.city !== maxPopulationCity.city);

    filteredCities.sort((a, b) => a.city.localeCompare(b.city));

    const finalCities = [maxPopulationCity, ...filteredCities];

    const formattedCities = finalCities.map((city, index) => ({
      id: index + 1,
      name: city.city,
      population: city.population
    }));

    return NextResponse.json(formattedCities);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cities' },
      { status: 500 }
    );
  }
}