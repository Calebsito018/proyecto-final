
export const ErrorMessages = {
    PRODUCT_DATA_INCOMPLETE: 'Properties missing.',
    USER_DATA_INCOMPLETE: 'Properties missing.',
    CART_DATA_INCOMPLETE: 'Properties missing.',

    PRODUCT_DATA_NOT_FOUND_IN_DATABASE: 'Product not found in database.',
    USER_DATA_NOT_FOUND_IN_DATABASE: 'User not found in database.',
    CART_DATA_NOT_FOUND_IN_DATABASE: 'Cart not found in database.',

    PRODUCT_DATA_INCORRECT_ID: 'Invalid ID.',
    USER_DATA_INCORRECT_ID: 'Invalid ID.',
    CART_DATA_INCORRECT_ID: 'Invalid ID.',

    PRODUCT_DATA_ALREADY_IN_CART: 'Product already exists in cart.',

    PRODUCT_DATA_NOT_FOUND_IN_CART: 'Product does not exist in cart.',

    PRODUCT_DATA_CODE_ALREADY_EXISTS_IN_DATABASE: 'Product code already exists in database.',
    USER_DATA_EMAIL_ALREADY_EXISTS_IN_DATABASE: 'Email already exists in database.',

    PRODUCT_DATA_NOT_ENOUGH_STOCK: 'Not enough stock.'
};
export const ErrorCause = {
    PRODUCT_DATA_INCOMPLETE: 'Valid properties required. | title: String | description: String | price: Number | code: String | stock: Number | category: String | status: Boolean.',
    USER_DATA_INCOMPLETE: 'Request failed. Valid properties required.',
    CART_DATA_INCOMPLETE: 'Request failed. Valid properties required.',

    PRODUCT_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database.',
    USER_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database.',
    CART_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database.',

    PRODUCT_DATA_INCORRECT_ID: 'Request failed. ID must have 24 characters.',
    USER_DATA_INCORRECT_ID: 'Request failed. ID must have 24 characters.',
    CART_DATA_INCORRECT_ID: 'Request failed. ID must have 24 characters.',

    PRODUCT_DATA_ALREADY_IN_CART: 'Request failed. This product already exists in cart.',

    PRODUCT_DATA_NOT_FOUND_IN_CART: 'Request failed. This product does not exist in cart.',

    PRODUCT_DATA_CODE_ALREADY_EXISTS_IN_DATABASE: 'Request failed. This product already exists in database. Please change the product code.',
    USER_DATA_EMAIL_ALREADY_EXISTS_IN_DATABASE: 'Request failed. This email already exists in database. Please change the email.',

    PRODUCT_DATA_NOT_ENOUGH_STOCK: 'Request failed. This product has not enough stock.'
};