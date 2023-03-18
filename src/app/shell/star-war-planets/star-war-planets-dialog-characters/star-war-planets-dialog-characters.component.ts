import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ICharacterDto } from 'src/app/api/star-war-planets/dto/character.dto';

@Component({
  selector: 'app-star-war-planets-dialog-characters',
  templateUrl: './star-war-planets-dialog-characters.component.html',
  styleUrls: ['./star-war-planets-dialog-characters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarPlanetsDialogCharactersComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ICharacterDto[]) {}

  public displayedCharacterColumns: string[] = [
    'name',
    'height',
    'mass',
    'hair_color',
    'skin_color',
    'eye_color',
    'birth_year',
    'gender',
  ];
}
