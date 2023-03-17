import { IStandardFieldsDto } from '../../common/dto/standard-fields.dto';
import { CharacterLink, FilmLink } from '../../common/types/star-wars.types';

export interface IStarshipDto extends IStandardFieldsDto {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: CharacterLink[];
  films: FilmLink[];
}
