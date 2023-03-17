import { IStandardFieldsDto } from '../../common/dto/standard-fields.dto';
import {
  CharacterLink,
  FilmLink,
  PlanetLink,
} from '../../common/types/star-wars.types';

export interface ISpeciesDto extends IStandardFieldsDto {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string; // possible enum
  hair_colors: string; // possible enum
  eye_colors: string;
  average_lifespan: string;
  homeworld: PlanetLink;
  language: string;
  people: CharacterLink[];
  films: FilmLink[];
}
