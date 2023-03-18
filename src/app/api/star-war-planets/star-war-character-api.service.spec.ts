import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StarWarCharactersApiService } from './star-war-character-api.service';
import { ICharacterDto } from './dto/character.dto';

describe('StarWarCharactersApiService', () => {
  let service: StarWarCharactersApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StarWarCharactersApiService],
    });
    service = TestBed.inject(StarWarCharactersApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll$', () => {
    it('should return an Observable of ICharacterDto[]', () => {
      const mockCharacters: ICharacterDto[] = [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.dev/api/planets/1/',

          films: [],
          species: [],
          vehicles: [],
          starships: [],
          created: new Date(),
          edited: new Date(),
          url: 'https://swapi.dev/api/people/1/',
        },
      ];
      service.getAll$().subscribe((characters) => {
        expect(characters).toEqual(mockCharacters);
      });
      const req = httpTestingController.expectOne(`${service['basePath']}`);
      expect(req.request.method).toBe('GET');
      req.flush({
        results: mockCharacters,
        count: 1,
        next: null,
        previous: null,
      });
    });

    it('should accept query parameters', () => {
      const mockCharacters: ICharacterDto[] = [
        {
          name: 'Leia Organa',
          height: '150',
          mass: '49',
          hair_color: 'brown',
          skin_color: 'light',
          eye_color: 'brown',
          birth_year: '19BBY',
          gender: 'female',
          homeworld: 'https://swapi.dev/api/planets/2/',

          films: [],
          species: [],
          vehicles: [],
          starships: [],
          created: new Date(),
          edited: new Date(),
          url: 'https://swapi.dev/api/people/5/',
        },
      ];
      const queryParams = { search: 'leia' };
      service.getAll$(queryParams).subscribe((characters) => {
        expect(characters).toEqual(mockCharacters);
      });
      const req = httpTestingController.expectOne(
        `${service['basePath']}?search=leia`
      );
      expect(req.request.method).toBe('GET');
      req.flush({
        results: mockCharacters,
        count: 1,
        next: null,
        previous: null,
      });
    });
  });
});
