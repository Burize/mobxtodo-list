export interface ICommunication<E = string> {
  isRequesting: boolean;
  error: E;
}
