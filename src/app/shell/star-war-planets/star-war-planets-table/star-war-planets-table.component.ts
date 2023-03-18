import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IPlanetDto } from 'src/app/api/star-war-planets/dto/planet.dto';

@Component({
  selector: 'app-star-war-planets-table',
  templateUrl: './star-war-planets-table.component.html',
  styleUrls: ['./star-war-planets-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarPlanetsTableComponent {
  @Input()
  public selectedPlanets: IPlanetDto[] = [];

  @Output()
  public clickedPlanet = new EventEmitter<string>();

  public displayedColumns: string[] = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
  ];

  public clickedRowHandler(row: IPlanetDto): void {
    this.clickedPlanet.emit(row.url);
  }
}
