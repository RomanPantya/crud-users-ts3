import { sign } from 'jsonwebtoken';

export function getTokens(a: object): object {
    const twoTokens = {
        access: sign(a, process.env.JWT_SECRET!, { expiresIn: '2h' }),
        refresh: sign(a, process.env.JWT_SECRET_REF!, { expiresIn: '2d' }),
    };
    return twoTokens;
}
