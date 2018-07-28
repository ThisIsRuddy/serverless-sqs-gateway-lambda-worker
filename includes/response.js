export const response = (code, payload) => {
    return {
        statusCode: code,
        headers: {
            'Content-Type': 'application/json',
            'Time-Stamp': new Date().toISOString()
        },
        body: JSON.stringify(payload)
    };
}
