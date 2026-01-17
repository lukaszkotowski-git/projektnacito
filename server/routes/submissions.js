const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../db');
const { upload } = require('../services/fileStorage');
const { sendToWebhook } = require('../services/webhook');
const { baseValidation, validateSubmission } = require('../middleware/validate');

const router = express.Router();

const dynamicValidation = (req, res, next) => {
    req.body = JSON.parse(req.body.data || '{}');
    next();
};

router.post('/',
    upload.single('attachment'),
    dynamicValidation,
    baseValidation,
    validateSubmission,
    async (req, res) => {
        try {
            const {
                packageType,
                userName,
                userPhone,
                estimatedPrice,
                rate,
                details,
            } = req.body;

            const attachmentPath = req.file ? req.file.path : null;
            const attachmentOriginalName = req.file ? req.file.originalname : null;

            const result = await query(
                `INSERT INTO submissions 
                (package_type, user_name, user_phone, estimated_price, rate, details, attachment_path, attachment_original_name)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id, created_at`,
                [
                    packageType,
                    userName,
                    userPhone,
                    estimatedPrice || null,
                    rate || null,
                    details ? JSON.stringify(details) : null,
                    attachmentPath,
                    attachmentOriginalName,
                ]
            );

            const submissionId = result.rows[0].id;
            const createdAt = result.rows[0].created_at;

            const webhookData = {
                submissionId,
                packageType,
                userName,
                userPhone,
                estimatedPrice,
                rate,
                details,
                hasAttachment: !!attachmentPath,
                attachmentName: attachmentOriginalName,
                createdAt,
            };

            const webhookResult = await sendToWebhook(webhookData);

            if (webhookResult.sent) {
                await query(
                    'UPDATE submissions SET webhook_sent = true, webhook_sent_at = NOW() WHERE id = $1',
                    [submissionId]
                );
            }

            res.status(201).json({
                success: true,
                message: 'Zgłoszenie zostało zapisane',
                submissionId,
            });
        } catch (error) {
            console.error('Submission error:', error);
            res.status(500).json({ error: 'Nie udało się zapisać zgłoszenia' });
        }
    }
);

module.exports = router;
