export const sanitizeText = (text) => {
    return text
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/\u00A0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};
