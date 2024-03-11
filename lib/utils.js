import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

import { isEmail } from "validator";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Checks if the given string is a valid email address.
 *
 * @param {string} str - The string to check for validity.
 * @returns {boolean} - Returns true if the string is a valid email address, otherwise false.
 */
export function isCorrectEmail(str) {
    // Perform correction on the email string
    const strCorrection = isEmail(str, {
        allow_utf8_local_part: false,
    });
    // If correction fails, return false
    if (!strCorrection) return false;
    // Perform regex check for email format
    return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(str);
}
