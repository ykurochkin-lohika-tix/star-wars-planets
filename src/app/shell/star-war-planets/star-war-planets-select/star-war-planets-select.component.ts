import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { IPlanetDto } from 'src/app/api/star-war-planets/dto/planet.dto';

@Component({
  selector: 'app-star-war-planets-select',
  templateUrl: './star-war-planets-select.component.html',
  styleUrls: ['./star-war-planets-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarPlanetsSelectComponent implements OnInit {
  @Input()
  public planets: IPlanetDto[] = [];

  @Output()
  public selectedPlanets = new EventEmitter<string[] | null>();

  public planetsControl = new FormControl('');

  public ngOnInit(): void {
    this.planetsControl.valueChanges.subscribe({
      next: (planetsSelected) => {
        this.selectedPlanets.emit(planetsSelected as string[] | null);
      },
    });
  }
}
