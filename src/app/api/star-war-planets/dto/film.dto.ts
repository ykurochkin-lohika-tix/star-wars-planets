import { IStandardFieldsDto } from '../../common/dto/standard-fields.dto';
import {
  CharacterLink,
  PlanetLink,
  SpecieLink,
  StarshipLink,
  VehicleLink,
} from '../../common/types/star-wars.types';

export interface IFilmDto extends IStandardFieldsDto {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string; // possible parse to date
  characters: CharacterLink[];
  planets: PlanetLink[];
  starships: StarshipLink[];
  vehicles: VehicleLink[];
  species: SpecieLink[];
}
