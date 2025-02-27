import type { MetaFunction } from 'react-router';

export namespace Route {
  export type MetaArgs = Parameters<MetaFunction>[0];
  export type ActionArgs = {
    request: Request;
    params: Record<string, string>;
  };
  export type LoaderArgs = {
    request: Request;
    params: Record<string, string>;
  };
}
