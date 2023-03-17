import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStandardCollectionApiResponse } from '../common/models/standard-collection.api-response';
import { IQueryParams } from '../common/models/query-params.interface';
import { IStandardFieldsDto } from '../common/dto/standard-fields.dto';
import { toHttpParams } from '../common/helpers/angular-http.helpers';
import { API_URL_PREFIX } from '../common/star-war-planets-api.constant';

@Injectable({ providedIn: 'root' })
export class StarWarPlanetsApiService {
  private readonly basePath = `${API_URL_PREFIX}/planets`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all Planets
   *
   * @param queryParams - query params
   */
  getAll$(
    queryParams: IQueryParams = {}
  ): Observable<IStandardCollectionApiResponse<IStandardFieldsDto>> {
    return this.http.get<IStandardCollectionApiResponse<IStandardFieldsDto>>(
      `${this.basePath}`,
      {
        params: toHttpParams({ ...queryParams }),
      }
    );
  }

  /**
   * Get single planet by ID
   *
   * @param id - planet id
   * @param queryParams - query params
   */
  get$(
    id: string,
    queryParams: IQueryParams = {}
  ): Observable<IStandardFieldsDto> {
    return this.http.get<IStandardFieldsDto>(`${this.basePath}/${id}`, {
      params: toHttpParams({ ...queryParams }),
    });
  }
}
