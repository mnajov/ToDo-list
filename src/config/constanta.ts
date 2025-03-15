interface aktoken {
  secret: string;
  time: string;
}
export const ROLE_DEC = 'roles';
interface Ireftoken {
  secret: string;
  time: string;
}
export const ACC_TOKEN: aktoken = {
  secret: 'ok',
  time: '1h',
};
export const REF_TOKEN: Ireftoken = {
  secret: 'okrref',
  time: '7H',
};
