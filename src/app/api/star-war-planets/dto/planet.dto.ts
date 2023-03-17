import { IStandardFieldsDto } from '../../common/dto/standard-fields.dto';
import { CharacterLink, FilmLink } from '../../common/types/star-wars.types';

export interface IPlanetDto extends IStandardFieldsDto {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string; // possible enum
  surface_water: string;
  population: string;
  residents: CharacterLink[];
  films: FilmLink[];
}
