import { ICommunication } from 'shared/types/communication';

export const initialCommunicationField: ICommunication = { isRequesting: false, error: '' };
export const loadingCommunicationField: ICommunication = { isRequesting: true, error: '' };
export const makeFailedCommunicationField = (error: string): ICommunication => ({ isRequesting: false, error });
