import { LOGIN, VERIFY_OTP, RESEND_OTP } from './index';
import httpClient from '@/plugins/axios';

export function postLogin(credential) {
    return httpClient.post(LOGIN, credential);
}

export function postVerifyOtp(token, payload = {}) {
    return httpClient.post(`${VERIFY_OTP}?token=${token}`, payload);
}

export function getResendOtp(token) {
    return httpClient.get(`${RESEND_OTP}?token=${token}`);
}