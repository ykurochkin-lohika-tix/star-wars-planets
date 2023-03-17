import { HttpParams } from '@angular/common/http';

export function toHttpParams<
  TObject extends { [TMemberName in keyof TObject]: string | readonly string[] }
>(object: TObject) {
  return new HttpParams({
    fromObject: object,
  });
}

export function mergeHttpParams(...args: HttpParams[]): HttpParams {
  const fromObject = args.reduce((acc, httpParams) => {
    httpParams.keys().forEach((key) => (acc[key] = httpParams.get(key)));

    return acc;
  }, {} as Record<string, any>);

  return new HttpParams({ fromObject });
}
