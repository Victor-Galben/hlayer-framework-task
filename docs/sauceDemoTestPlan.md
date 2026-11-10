# Sauce Demo UI Test Plan

**Application:** [Sauce Demo](https://www.saucedemo.com)  
**Scope:** UI tests for authentication, product selection, cart, and checkout.

## Test 1: Complete checkout with multiple products

**Type:** End-to-end happy path

**Preconditions:**

- The login page is available.
- Use the accepted `standard user` account and the password shown on the login page.

**Steps:**

1. Log in with valid credentials.
2. Verify the inventory/products page is displayed.
3. Add two distinct products to the cart.
4. Open the cart and verify both selected products and their prices are shown.
5. Continue to checkout.
6. Enter valid first name, last name, and postal code.
7. Continue to the checkout overview.
8. Verify the selected products and displayed total are correct.
9. Finish checkout.

**Expected results:**

- Login succeeds and the inventory page is displayed.
- The cart contains exactly the two selected products.
- The checkout overview shows the expected products and total.
- Checkout completes and a confirmation page/message is displayed.

## Test 2: Locked-out user cannot log in

**Type:** Negative authentication test

**Preconditions:**

- The login page is available.
- Use the accepted `locked_out_user` account and the password shown on the login page.

**Steps:**

1. Enter the locked-out user's credentials.
2. Select **Login**.

**Expected results:**

- Login is rejected.
- An error message explains that the user has been locked out.
- The user remains on the login page and does not reach the inventory page.

## Test 3: Checkout validation when required customer details are missing

**Type:** Negative checkout validation test

**Preconditions:**

- Log in as `standard_user` and add at least one product to the cart.

**Steps:**

1. Open the cart and proceed to checkout.
2. Leave the required customer detail fields empty.
3. Select **Continue**.

**Expected results:**

- Checkout does not proceed to the overview page.
- An appropriate validation error identifies the missing required information.
