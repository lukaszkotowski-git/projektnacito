const { body, validationResult } = require('express-validator');

const phoneRegex = /^[\d\s\-+()]{9,20}$/;

const baseValidation = [
    body('userName')
        .trim()
        .notEmpty().withMessage('Imię i nazwisko jest wymagane')
        .isLength({ min: 2, max: 255 }).withMessage('Imię i nazwisko musi mieć od 2 do 255 znaków'),
    body('userPhone')
        .trim()
        .notEmpty().withMessage('Numer telefonu jest wymagany')
        .matches(phoneRegex).withMessage('Nieprawidłowy format numeru telefonu'),
    body('packageType')
        .trim()
        .notEmpty().withMessage('Typ pakietu jest wymagany')
        .isIn(['cito', 'premium', 'consult']).withMessage('Nieprawidłowy typ pakietu'),
];

const citoValidation = [
    body('estimatedPrice')
        .optional()
        .isFloat({ min: 0 }).withMessage('Cena musi być liczbą dodatnią'),
    body('details.rooms')
        .optional()
        .isObject().withMessage('Pokoje muszą być obiektem'),
    body('details.electricProject')
        .optional()
        .isBoolean().withMessage('electricProject musi być wartością boolean'),
    body('details.electricM2')
        .optional()
        .isFloat({ min: 0 }).withMessage('electricM2 musi być liczbą dodatnią'),
];

const premiumValidation = [
    body('estimatedPrice')
        .optional()
        .isFloat({ min: 0 }).withMessage('Cena musi być liczbą dodatnią'),
    body('details.totalM2')
        .optional()
        .isFloat({ min: 0 }).withMessage('Powierzchnia całkowita musi być liczbą dodatnią'),
    body('details.kitchenM2')
        .optional()
        .isFloat({ min: 0 }).withMessage('Powierzchnia kuchni musi być liczbą dodatnią'),
    body('details.bathM2')
        .optional()
        .isFloat({ min: 0 }).withMessage('Powierzchnia łazienki musi być liczbą dodatnią'),
];

const consultValidation = [
    body('rate')
        .optional()
        .isString().withMessage('Stawka musi być tekstem'),
];

function validateSubmission(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            error: 'Błędy walidacji',
            details: errors.array().map(e => e.msg)
        });
    }
    next();
}

function getValidationRules(packageType) {
    switch (packageType) {
        case 'cito':
            return [...baseValidation, ...citoValidation];
        case 'premium':
            return [...baseValidation, ...premiumValidation];
        case 'consult':
            return [...baseValidation, ...consultValidation];
        default:
            return baseValidation;
    }
}

module.exports = {
    baseValidation,
    citoValidation,
    premiumValidation,
    consultValidation,
    validateSubmission,
    getValidationRules,
};
