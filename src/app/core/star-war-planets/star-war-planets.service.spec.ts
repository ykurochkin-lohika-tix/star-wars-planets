import { of } from 'rxjs';
import { ICharacterDto } from 'src/app/api/star-war-planets/dto/character.dto';
import { IPlanetDto } from 'src/app/api/star-war-planets/dto/planet.dto';
import { StarWarCharactersApiService } from 'src/app/api/star-war-planets/star-war-character-api.service';
import { StarWarPlanetsApiService } from 'src/app/api/star-war-planets/star-war-planets-api.service';
import { StarWarPlanetsService } from './star-war-planets.service';
import { TestBed } from '@angular/core/testing';

describe('StarWarPlanetsService', () => {
  let service: StarWarPlanetsService;
  let planetsApiServiceSpy: jasmine.SpyObj<StarWarPlanetsApiService>;
  let charactersApiServiceSpy: jasmine.SpyObj<StarWarCharactersApiService>;

  beforeEach(() => {
    const planetsSpy = jasmine.createSpyObj('StarWarPlanetsApiService', [
      'getAll$',
      'get$',
    ]);
    const charactersSpy = jasmine.createSpyObj('StarWarCharactersApiService', [
      'get$',
    ]);

    TestBed.configureTestingModule({
      providers: [
        StarWarPlanetsService,
        { provide: StarWarPlanetsApiService, useValue: planetsSpy },
        { provide: StarWarCharactersApiService, useValue: charactersSpy },
      ],
    });

    service = TestBed.inject(StarWarPlanetsService);
    planetsApiServiceSpy = TestBed.inject(
      StarWarPlanetsApiService
    ) as jasmine.SpyObj<StarWarPlanetsApiService>;
    charactersApiServiceSpy = TestBed.inject(
      StarWarCharactersApiService
    ) as jasmine.SpyObj<StarWarCharactersApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll$', () => {
    it('should call the planetsApiService.getAll$ method', () => {
      planetsApiServiceSpy.getAll$.and.returnValue(of([]));

      service.getAll$();

      expect(planetsApiServiceSpy.getAll$).toHaveBeenCalled();
    });
  });

  describe('get$', () => {
    it('should call the planetsApiService.get$ method', () => {
      const url = 'https://swapi.dev/api/planets/1/';
      planetsApiServiceSpy.get$.and.returnValue(of({} as IPlanetDto));

      service.get$(url);

      expect(planetsApiServiceSpy.get$).toHaveBeenCalledWith(url, {
        format: 'json',
      });
    });
  });

  describe('getAllPlanetResidents', () => {
    it('should call the charactersApiService.get$ method for each url and return the merged results', () => {
      const urls = [
        'https://swapi.dev/api/people/1/',
        'https://swapi.dev/api/people/2/',
      ];
      const characters: ICharacterDto[] = [
        { name: 'Luke Skywalker' } as ICharacterDto,
        { name: 'Leia Organa' } as ICharacterDto,
      ];
      charactersApiServiceSpy.get$
        .withArgs(urls[0], { format: 'json' })
        .and.returnValue(of(characters[0]));
      charactersApiServiceSpy.get$
        .withArgs(urls[1], { format: 'json' })
        .and.returnValue(of(characters[1]));

      service.getAllPlanetResidents(urls).subscribe((result) => {
        expect(result).toEqual(characters);
      });

      expect(charactersApiServiceSpy.get$).toHaveBeenCalledTimes(2);
    });
  });
});
