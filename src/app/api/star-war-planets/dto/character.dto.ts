import { IStandardFieldsDto } from '../../common/dto/standard-fields.dto';
import {
  FilmLink,
  PlanetLink,
  SpecieLink,
  StarshipLink,
  VehicleLink,
} from '../../common/types/star-wars.types';

export interface ICharacterDto extends IStandardFieldsDto {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: PlanetLink;
  films: FilmLink[];
  species: SpecieLink[];
  vehicles: VehicleLink[];
  starships: StarshipLink[];
}
