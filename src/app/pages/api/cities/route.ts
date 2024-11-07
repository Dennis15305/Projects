import { NextResponse } from 'next/server';
import cities from '../../../../../public/cities.json';

export async function GET() {
  // Преобразуем данные в нужный формат
  const formattedCities = cities.map((city, index) => ({
    id: index + 1,  // Создаем уникальный id
    name: city.city,
    population: parseInt(city.population, 10)
  }));

  // Фильтруем и сортируем города
  const filteredCities = formattedCities
    .filter((city) => city.population > 50000)
    .sort((a, b) => b.population - a.population);

  return NextResponse.json(filteredCities);
}