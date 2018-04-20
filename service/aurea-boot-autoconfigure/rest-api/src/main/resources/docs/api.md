# REST Integration API for Sample Zero Based project

We design our interface following common expected behavior that we will just document once and follow all across the
API without exception.

We follow the [REST API naming best practices](http://www.restapitutorial.com/lessons/restfulresourcenaming.html), the [HTTP method definition best practices](http://www.restapitutorial.com/lessons/httpmethods.html) according to the [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) definition.

The following is brief extract of particular pattern used:

HTTP Verb | CRUD           | Entire Collection (e.g. /customers)
--------- | -------------- | ------------------------------------------------------------------------------------------
POST	  | Create         | 201 (Created), 'Location' header with link to /customers/{id} containing new ID.
GET	      | Read           | 200 (OK), list of customers. Use pagination, sorting and filtering to navigate big lists.
PUT	      | Update/Replace | 405 (Method Not Allowed).
PATCH	  | Update/Modify  | 405 (Method Not Allowed).
DELETE	  | Delete         | 405 (Method Not Allowed).

----------------

HTTP Verb | CRUD                     | Specific Item (e.g. /customers/{id})
--------- | ------------------------ | --------------------------------------------------------------------------
POST	  | Create                   | 404 (Not Found), 409 (Conflict) if resource already exists.
GET	      | Read                     | 200 (OK), single customer. 404 (Not Found), if ID not found or invalid.
PUT	      | Update (entire resource) | 200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.
PATCH	  | Modify (resource fields) | 200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.
DELETE	  | Delete                   | 200 (OK). 404 (Not Found), if ID not found or invalid.

## Error Responses
All our error responses are in JSON format and including the following data:
* timestamp {epoch time}: The timestamp for the moment that the error occurs.
* status {number}: Indicating the HTTP Status code corresponding to the exception (also matching the returned status code).
* error {string}: The summary of the error occurred, normally description of the status associated to the error.
* exception {string} (optional): The class name of the exception associated if any.
* message {string}: The custom message associated to the exception describing the error condition.
* path {string}: The path of the endpoint where the error occurs.

## Data Pagination
To be completed (following Spring Data Rest structure).

## Common Error Responses
* 401 (Unauthorized): All the endpoints raise this error if the provided authorization is not valid or missing.
* 403 (Forbidden): If the given credentials do not satisfy the required access rights for the operation.
* 404 (Not Found): If the required resource is not found.

## Security
To be completed.
