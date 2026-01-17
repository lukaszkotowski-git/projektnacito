const WEBHOOK_URL = process.env.WEBHOOK_URL;

async function sendToWebhook(data) {
    if (!WEBHOOK_URL) {
        console.log('WEBHOOK_URL not configured, skipping webhook');
        return { sent: false, reason: 'not_configured' };
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Webhook responded with status ${response.status}`);
        }

        return { sent: true };
    } catch (error) {
        console.error('Webhook error:', error.message);
        return { sent: false, reason: error.message };
    }
}

module.exports = {
    sendToWebhook,
};
