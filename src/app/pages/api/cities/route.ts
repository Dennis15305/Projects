import { NextResponse } from 'next/server';
import cities from '../../../../../public/cities.json';

export async function GET() {
  // Фильтрация городов по населению и сортировка
    const filteredCities = cities
    .filter((city) => city.population > 50000)
    .sort((a, b) => b.population - a.population);

    // Переместить город с наибольшим населением на первое место
    const mostPopulousCity = filteredCities.shift();
    if (mostPopulousCity) {
        filteredCities.unshift(mostPopulousCity);
    }

    return NextResponse.json(filteredCities);
}
