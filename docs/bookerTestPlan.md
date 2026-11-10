# Restful-Booker API Test Plan

## Objective

Validate the core booking lifecycle and its authorization boundary against the public Restful-Booker API.

## Scope

- Base URL: `https://restful-booker.herokuapp.com`
- Endpoints: `POST /booking`, `GET /booking/:id`, `POST /auth`, and `DELETE /booking/:id`
- Format: JSON requests and responses

## Preconditions

- The public API is available.
- Every test creates its own uniquely identifiable booking, so it can run alone or in any order.

## Test cases

| ID  | Scenario                                  | API calls                                                                     | Expected result                                                                                                                     |
| --- | ----------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Happy path: create and retrieve a booking | `POST /booking` then `GET /booking/:id`                                       | Creation returns `200`, a numeric `bookingid`, and the submitted booking. Retrieval returns `200` and exactly the saved booking.    |
| 2   | Authenticated deletion                    | `POST /booking`, `POST /auth`, `DELETE /booking/:id`, then `GET /booking/:id` | Authentication returns a non-empty token. Deletion with `Cookie: token=<token>` returns `201`; a follow-up retrieval returns `404`. |
| 3   | Negative: unauthenticated deletion        | `POST /booking` then `DELETE /booking/:id` without a token                    | The deletion is rejected with `403 Forbidden`. Cypress is configured to yield this expected non-2xx response for assertion.         |

## Automation approach

- Cypress `baseUrl` targets the API so tests use relative paths.
- `cy.request()` exercises the API directly; no browser UI or fixed waits are used.
- Assertions cover HTTP status, response shape, data persistence, authorization, and post-delete state.
- The negative request uses `failOnStatusCode: false`, allowing an explicit assertion on the expected `403` response.
