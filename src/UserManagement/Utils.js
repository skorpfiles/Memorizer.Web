export const PasswordValidations = {
    required: {
        value: true,
        message: 'Password is required.'
    },
    minLength: {
        value: 6,
        message: 'Password must be at least 6 characters.'
    },
    pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).*$/,
        message: 'Password must have at least one non alphanumeric character, one lowercase (a-z), and one uppercase (A-Z).'
    }
};