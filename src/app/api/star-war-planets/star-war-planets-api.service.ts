import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { IStandardCollectionApiResponse } from '../common/models/standard-collection.api-response';
import { IQueryParams } from '../common/models/query-params.interface';
import { toHttpParams } from '../common/helpers/angular-http.helpers';
import { API_URL_PREFIX } from '../common/star-war-planets-api.constant';
import { IPlanetDto } from './dto/planet.dto';

@Injectable({ providedIn: 'root' })
export class StarWarPlanetsApiService {
  private readonly basePath = `${API_URL_PREFIX}/planets`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all Planets
   *
   * @param queryParams - query params
   */
  public getAll$(queryParams: IQueryParams = {}): Observable<IPlanetDto[]> {
    return this.http
      .get<IStandardCollectionApiResponse<IPlanetDto>>(`${this.basePath}`, {
        params: toHttpParams({ ...queryParams }),
      })
      .pipe(map((response) => response.results));
  }

  /**
   * Get single planet by url
   *
   * @param id - planet url
   * @param queryParams - query params
   */
  public get$(
    url: string,
    queryParams: IQueryParams = {}
  ): Observable<IPlanetDto> {
    return this.http.get<IPlanetDto>(`${url}`, {
      params: toHttpParams({ ...queryParams }),
    });
  }
}
