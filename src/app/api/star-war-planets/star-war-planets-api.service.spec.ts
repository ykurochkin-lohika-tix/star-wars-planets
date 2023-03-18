import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StarWarPlanetsApiService } from './star-war-planets-api.service';
import { IPlanetDto } from './dto/planet.dto';

describe('StarWarPlanetsApiService', () => {
  let service: StarWarPlanetsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StarWarPlanetsApiService],
    });
    service = TestBed.inject(StarWarPlanetsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll$', () => {
    it('should return an Observable of IPlanetDto[]', () => {
      const expectedPlanets: IPlanetDto[] = [
        {
          name: 'Tatooine',
          rotation_period: '23',
          orbital_period: '304',
          diameter: '10465',
          climate: 'arid',
          gravity: '1 standard',
          terrain: 'desert',
          surface_water: '1',
          population: '200000',
          residents: ['https://swapi.dev/api/people/1/'],
          films: ['https://swapi.dev/api/films/1/'],
          created: new Date('2014-12-09T13:50:49.641000Z'),
          edited: new Date('2014-12-20T20:58:18.411000Z'),
          url: 'https://swapi.dev/api/planets/1/',
        },
        {
          name: 'Alderaan',
          rotation_period: '24',
          orbital_period: '364',
          diameter: '12500',
          climate: 'temperate',
          gravity: '1 standard',
          terrain: 'grasslands, mountains',
          surface_water: '40',
          population: '2000000000',
          residents: ['https://swapi.dev/api/people/5/'],
          films: ['https://swapi.dev/api/films/1/'],
          created: new Date('2014-12-10T11:35:48.479000Z'),
          edited: new Date('2014-12-20T20:58:18.420000Z'),
          url: 'https://swapi.dev/api/planets/2/',
        },
      ];

      service.getAll$().subscribe((planets) => {
        expect(planets).toEqual(expectedPlanets);
      });

      const req = httpMock.expectOne('https://swapi.dev/api/planets');
      expect(req.request.method).toBe('GET');

      req.flush({ results: expectedPlanets });
    });

    it('should pass queryParams as request parameters', () => {
      const queryParams = { search: 'Tatooine' };
      service.getAll$(queryParams).subscribe();

      const req = httpMock.expectOne((req) => {
        return (
          req.url === 'https://swapi.dev/api/planets' &&
          req.params.get('search') === queryParams.search
        );
      });
      expect(req.request.method).toBe('GET');

      req.flush({});
    });
  });

  describe('get$', () => {
    it('should return an Observable of IPlanetDto', () => {
      const expectedPlanet: IPlanetDto = {
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1 standard',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        residents: ['https://swapi.dev/api/people/1/'],
        films: ['https://swapi.dev/api/films/1/'],
        created: new Date('2014-12-09T13:50:49.641000Z'),
        edited: new Date('2014-12-20T20:58:18.411000Z'),
        url: 'https://swapi.dev/api/planets/1/',
      };

      const url = 'https://swapi.dev/api/planets/1/';
      service.get$(url).subscribe((planet) => {
        expect(planet).toEqual(expectedPlanet);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');

      req.flush(expectedPlanet);
    });

    it('should pass queryParams as request parameters', () => {
      const queryParams = { search: 'Tatooine' };
      const url = 'https://swapi.dev/api/planets/1/';
      service.get$(url, queryParams).subscribe();

      const req = httpMock.expectOne((req) => {
        return (
          req.url === url && req.params.get('search') === queryParams.search
        );
      });
      expect(req.request.method).toBe('GET');

      req.flush({});
    });
  });
});
