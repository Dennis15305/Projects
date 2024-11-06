import { NextApiRequest, NextApiResponse } from 'next';
import cities from '../../../../public/cities.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sortedCities = cities
    .filter(city => city.population > 50000)
    .sort((a, b) => b.population - a.population);

  res.status(200).json(sortedCities.map(city => city.name));
}
