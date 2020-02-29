import { LOGIN } from './index';
import httpClient from '@/plugins/axios';

export function postLogin(credential) {
    return httpClient.post(LOGIN, credential);
}