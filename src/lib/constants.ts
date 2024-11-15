export const EmailregEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const PassRegEx =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&=',"(+\-_)`~:;"',./<>])[\s\S]{8,}$/i;
export const MAILING_EMAIL = process.env.MAILING_EMAIL!;
export const BASE_URL = process.env.NEXT_PUBLIC_NEXT_API_URL!;
export const AUTH_SECRET = process.env.NEXTAUTH_SECRET!;
export const JWT_EXPIRES = process.env.JWT_EXPIRES!;
