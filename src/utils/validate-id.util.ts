/* eslint-disable no-redeclare */
import { isMongoId } from 'class-validator';
import { NextFunction } from 'express';

export function validateId(maybeId: unknown, next?: NextFunction) {
    const isCorrect = isMongoId(maybeId);

    if (!isCorrect && next) {
        return next(new Error('Invalid id'));
    }

    return isCorrect;
}
