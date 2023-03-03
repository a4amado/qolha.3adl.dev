"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
function validateYupSchema(schema, data) {
    try {
        schema.validateSync(data, { abortEarly: false });
        return {
            errors: [],
            data,
        };
    }
    catch (error) {
        if (error instanceof yup_1.ValidationError) {
            return {
                errors: error.errors,
                data,
            };
        }
        return {
            data: data,
            errors: ["INTERNAL_SERVER_ERROR"],
        };
    }
}
exports.default = validateYupSchema;
