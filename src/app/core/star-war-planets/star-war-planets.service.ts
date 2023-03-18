import { Injectable } from '@angular/core';
import { Observable, mergeMap, of, reduce } from 'rxjs';

import { ICharacterDto } from 'src/app/api/star-war-planets/dto/character.dto';
import { IPlanetDto } from 'src/app/api/star-war-planets/dto/planet.dto';
import { StarWarCharactersApiService } from 'src/app/api/star-war-planets/star-war-character-api.service';
import { StarWarPlanetsApiService } from 'src/app/api/star-war-planets/star-war-planets-api.service';

// todo : make models and fromDto functions
@Injectable({
  providedIn: 'root',
})
export class StarWarPlanetsService {
  constructor(
    private readonly planetsApiService: StarWarPlanetsApiService,
    private readonly charactersApiService: StarWarCharactersApiService
  ) {}

  public getAll$(): Observable<IPlanetDto[]> {
    return this.planetsApiService.getAll$({ format: 'json' });
  }

  public get$(url: string): Observable<IPlanetDto> {
    return this.planetsApiService.get$(url, { format: 'json' });
  }

  public getAllPlanetResidents(urls: string[]): Observable<ICharacterDto[]> {
    return of(...urls).pipe(
      mergeMap((url) =>
        this.charactersApiService.get$(url, { format: 'json' })
      ),
      reduce((acc, cur) => acc.concat(cur), [] as ICharacterDto[])
    );
  }
}
