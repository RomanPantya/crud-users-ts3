/* eslint-disable no-redeclare */
import { isMongoId } from 'class-validator';
import { NextFunction } from 'express';

export function validateId(maybeId: unknown, next?: NextFunction): boolean {
    const isCorrect = isMongoId(maybeId);

    if (!isCorrect && next) {
        next(new Error('Invalid id'));
    }

    return isCorrect;
}
