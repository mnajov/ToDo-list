export class ResData<TDtat> {
  meta: Record<string, string | number | object>;
  data: TDtat;
  constructor(
    status,
    message,
    data: TDtat,
    meta: Record<string, string | number | object | any> = {},
  ) {
    this.meta = { status, message, ...meta };
    this.data = data;
  }
}
