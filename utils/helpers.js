const mongoose = require("mongoose");
const { schema } = require("../models/User");

/**
 * Checks if an object contains all required keys and optionally checks for unknown keys.
 * @param {Object} object - The object to check.
 * @param {Array} requiredKeys - An array of keys that must be present in the object.
 * @param {Object} options - Optional parameters.
 * @param {boolean} options.strict - If true, also checks for unknown keys in the object.
 * @returns {Object} - An object containing the result of the key check.
 *   - success: A boolean indicating if all required keys are present and there are no unknown keys.
 *   - missing: An array containing the keys that are required but missing from the object.
 *   - unknown: An array containing the keys that are present in the object but not in the requiredKeys array.
 * @throws {TypeError} - If the input types are not valid (object and array expected).
 */
async function keysCheck(object, requiredKeys, { strict = false } = {}) {
    if (typeof object !== "object" || !Array.isArray(requiredKeys)) {
        throw new TypeError(
            "Invalid input types. Object and array are expected.",
        );
    }

    const presentKeys = new Set(Object.keys(object));
    const missingKeys = requiredKeys.filter((key) => !presentKeys.has(key));
    const unknownKeys = strict
        ? [...presentKeys].filter((key) => !requiredKeys.includes(key))
        : [];

    return {
        success: missingKeys.length === 0 && unknownKeys.length === 0,
        missing: missingKeys,
        unknown: unknownKeys,
    };
}

/**
 * Converts primitive values (string, number, or boolean) to their corresponding object wrapper.
 * @param {string|number|boolean} primitiveData - The primitive data to convert.
 * @returns {Object|string|number|boolean} - The converted object or the original primitive data.
 */
function toNonPrimitive(primitiveData) {
    if (
        typeof primitiveData === "string" ||
        typeof primitiveData === "number" ||
        typeof primitiveData === "boolean"
    ) {
        return Object(primitiveData);
    }
    return primitiveData;
}

/**
 * Checks if the types of values in an object match the specified types.
 * @param {Object} inputObject - The object to check.
 * @param {Object} expectedTypes - An object containing key-value pairs where the key is the property name
 *                                  and the value is the expected type (e.g., String, Number, Array, etc.).
 * @returns {Object} - An object containing the result of the type check.
 *   - success: A boolean indicating if all property values match the specified types.
 *   - invalid: An array containing the keys with values that have incorrect types.
 *   - missing: An array containing the keys that are required but missing from the object.
 */
function typeCheck(inputObject, expectedTypes) {
    const missingFields = [];
    const invalidFields = [];

    for (const [key, value] of Object.entries(inputObject)) {
        inputObject[key] = toNonPrimitive(value);

        if (!expectedTypes.hasOwnProperty(key)) {
            missingFields.push(key);
            continue;
        }

        const expected = expectedTypes[key].name;
        if (!(inputObject[key] instanceof expectedTypes[key])) {
            invalidFields.push({ [key]: { expected } });
        }
    }

    return {
        success:
            inputObject instanceof Object && expectedTypes instanceof Object
                ? invalidFields.length === 0 && missingFields.length === 0
                : false,
        invalid: invalidFields,
        missing: missingFields,
    };
}

/**
 * Retrieves fields from a Mongoose schema object based on specified options.
 * @param {object} mongooseSchema - The Mongoose schema object.
 * @param {object} options - Options for retrieving fields.
 *   - requiredOnly {boolean}: If true, returns only required fields.
 *   - typeOnly {boolean}: If true, returns only field types.
 *   - fieldOnly {boolean}: If true, returns only field names.
 * @returns {object|null|string[]} - An object containing fields or an array of field names,
 *                                   or null if the provided schema is invalid.
 */
function getSchemaField(
    mongooseSchema = {},
    options = { requiredOnly: false, typeOnly: false, fieldOnly: false },
) {
    // Check if the mongooseSchema is valid
    if (
        mongooseSchema.hasOwnProperty("schema") &&
        mongooseSchema.schema instanceof mongoose.Schema
    ) {
        // Extract the schema object
        const schema = mongooseSchema.schema.obj;
        const { requiredOnly, typeOnly, fieldOnly } = options;
        // Return field names if fieldOnly is true
        if (fieldOnly === true) {
            return Object.keys(schema);
        }
        // Filter and extract required fields if requiredOnly is true
        const fields = requiredOnly
            ? Object.fromEntries(
                  Object.entries(schema).filter(
                      ([_, attributes]) => attributes.required === true,
                  ),
              )
            : { ...schema };
        // Convert field types to type names if typeOnly is true
        if (typeOnly === true)
            Object.keys(fields).forEach(
                (attribute) => (fields[attribute] = fields[attribute].type),
            );
        // Return the resulting fields
        return fields;
    } else {
        // Return null if the provided schema is invalid
        return null;
    }
}

module.exports = {
    keysCheck,
    typeCheck,
    getSchemaField,
};
