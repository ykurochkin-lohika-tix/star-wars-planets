import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, finalize, takeUntil, tap } from 'rxjs';

import { ICharacterDto } from 'src/app/api/star-war-planets/dto/character.dto';
import { IPlanetDto } from 'src/app/api/star-war-planets/dto/planet.dto';
import { StarWarPlanetsService } from 'src/app/core/star-war-planets/star-war-planets.service';
import { StarWarPlanetsDialogCharactersComponent } from './star-war-planets-dialog-characters/star-war-planets-dialog-characters.component';

@Component({
  selector: 'app-star-war-planets',
  templateUrl: './star-war-planets.component.html',
  styleUrls: ['./star-war-planets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarPlanetsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public planets$: Observable<IPlanetDto[]> | undefined;

  public fetchedPlanets: IPlanetDto[] | undefined;
  public selectedPlanets: IPlanetDto[] = [];
  public clickedPlanet: IPlanetDto | undefined;

  public isLoading: boolean = true;
  public isLoadingCharacters: boolean = false;

  constructor(
    private readonly planetService: StarWarPlanetsService,
    public readonly characterDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.planets$ = this.planetService.getAll$().pipe(
      tap((planets) => (this.fetchedPlanets = planets)),
      finalize(() => (this.isLoading = false))
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public onPlanetsSelected(urls: string[] | null): void {
    this.selectedPlanets =
      this.fetchedPlanets?.filter((planet) =>
        urls?.some((url) => url === planet.url)
      ) ?? [];
  }

  public onPlanetClicked(event: string): void {
    const clickedPlanet = this.fetchedPlanets?.find((p) => p.url === event);

    if (clickedPlanet) {
      this.clickedPlanet = clickedPlanet;
      this.getCharactersByPlanet(clickedPlanet);
    }
  }

  private getCharactersByPlanet(planet: IPlanetDto | undefined): void {
    if (planet != undefined) {
      this.isLoadingCharacters = true;
      this.planetService
        .getAllPlanetResidents(planet.residents)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.isLoadingCharacters = false;
            this.changeDetectorRef.detectChanges();
          })
        )
        .subscribe((characters) => this.openCharacterDialog(characters));
    }
  }

  private openCharacterDialog(characters: ICharacterDto[]): void {
    this.characterDialog.open(StarWarPlanetsDialogCharactersComponent, {
      data: characters,
    });
  }
}
