import { NextApiRequest, NextApiResponse } from 'next';
import cities from '../../../../public/cities.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sortedCities = cities
    .filter(city => parseInt(city.population, 10) > 50000)
    .sort((a, b) => parseInt(b.population, 10) - parseInt(a.population, 10));

  res.status(200).json(sortedCities.map(city => city.city));
}