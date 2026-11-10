# Bug Reports

## BUG-1

- **Title:** Documentation says the authorization token is optional, but it is required
- **Environment:** Restful-Booker public API (`https://restful-booker.herokuapp.com`)
- **Description:** The API documentation describes the authorization token as optional, but protected booking operations require a valid token.
- **Steps to reproduce:**
  1. Send a request to a protected booking operation without an authorization token.
  2. Repeat the request with a valid token.
- **Expected result:** The documentation accurately states that a valid token is required for protected booking operations.
- **Actual result:** The documentation says the token is optional, while the API rejects requests that do not include a valid token.

## BUG-2

- **Title:** Auth token security vulnerability
- **Environment:** Restful-Booker public API (`https://restful-booker.herokuapp.com`)
- **Description:** The test sends the authentication token in a `Cookie` request header, which may have security implications.
- **Steps to reproduce:**
  1. Authenticate and obtain a token.
  2. Send the token in a `Cookie` header when calling a protected booking operation.
- **Expected result:** Send the token using an `Authorization` header.
- **Actual result:** The token is sent in a `Cookie` header.

## BUG-3

- **Title:** Request status codes are not documented
- **Environment:** Restful-Booker API tests
- **Description:** The expected status codes for requests have not yet been documented.
- **Steps to reproduce:**
  1. Review the API request tests.
  2. Check whether each request's expected status code is documented.
- **Expected result:**
  - `GET ` — `200`
  - `POST ` — `201 Created`
  - `DELETE` — `204 No Content`
- **Actual result:**
  - `POST ` — `200 OK`
  - `DELETE` — `201 Created`
  - `GET ` — `201 Created` (/ping)

## BUG-4

- **Title:** Documentation description mismatch
- **Environment:** Restful-Booker API documentation
- **Description:** A mismatch exists in the documentation description.
- **Steps to reproduce:**
  1. Review the relevant API documentation description.
- **Expected result:**
  - The API documentation to be the source of truth
- **Actual result:**
  - The API documentation is outdated or or it need a deep. review.
  -

## BUG-5

- **Title:** `totalprice` truncates precision
- **Environment:** Restful-Booker public API (`https://restful-booker.herokuapp.com`)
- **Description:** The API truncates decimal precision for the booking's `totalprice`.
- **Steps to reproduce:**
  1. Create or update a booking with a decimal `totalprice`.
  2. Inspect the returned booking's `totalprice`.
- **Expected result:** The returned `totalprice` preserves the submitted decimal precision.(£11.12)
- **Actual result:** The returned `totalprice` has truncated precision.(£11)
