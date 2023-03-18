import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { IStandardCollectionApiResponse } from '../common/models/standard-collection.api-response';
import { IQueryParams } from '../common/models/query-params.interface';
import { toHttpParams } from '../common/helpers/angular-http.helpers';
import { API_URL_PREFIX } from '../common/star-war-planets-api.constant';
import { ICharacterDto } from './dto/character.dto';

@Injectable({ providedIn: 'root' })
export class StarWarCharactersApiService {
  private readonly basePath = `${API_URL_PREFIX}/people`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all Characters
   *
   * @param queryParams - query params
   */
  public getAll$(queryParams: IQueryParams = {}): Observable<ICharacterDto[]> {
    return this.http
      .get<IStandardCollectionApiResponse<ICharacterDto>>(`${this.basePath}`, {
        params: toHttpParams({ ...queryParams }),
      })
      .pipe(map((response) => response.results));
  }

  /**
   * Get single Characters by url
   *
   * @param id - planet id
   * @param queryParams - query params
   */
  public get$(
    url: string,
    queryParams: IQueryParams = {}
  ): Observable<ICharacterDto> {
    return this.http.get<ICharacterDto>(`${url}`, {
      params: toHttpParams({ ...queryParams }),
    });
  }
}
