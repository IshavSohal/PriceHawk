### Standup details
- <ins>Time</ins>: ~10 pm EST (after release meeting)
- <ins>Date</ins>: February 3rd, 2023
- <ins>Location</ins>: Online via Discord

### Participants
| Member | Attended |
| ----------- | ----------- |
| Taha | Yes |
| Ishav | Yes |
|Ethan |Yes|
|Mustafa|Yes|
|Justin|Yes|
|Ovidiu|Yes|
|Ryan|Yes|

### Sprint Goal
Given the short time span of the sprint and the time required for the team to learn and experiment with the new technology, we aim to focus on having developed user registration, sign in, and manually adding items for tracking. 

### Team Capacity
Each team member should contribute to at least 1 User Story.

|Member|Task|
|---|---|
|Taha|Backend & Frontend User Story 2|
|Ishav|Frontend User Story 2|
|Ethan |SSO login frontend |
|Mustafa|Frontend User Story 1, 4, 5|
|Justin|Backend User Story 4, 5|
|Ovidiu|Backend User Story 1|
|Ryan|User Story 7 Backend, Frontend connection/logic|

### User Story Decisions
|User Story|Story Acceptance Criteria|Story Points|
|---|---|---|
|Account Registration|<ul><li>The toolbox panel should have a register link if not signed in. Upon clicking the link, a small UI should come up in the panel that allows the user to register.</li><li>Registration form: username, email, password, re-type password, captcha for bots</li><li>Form should have proper validation and email confirmation</li></ul>|3|
|Account Sign In|<ul><li>In the toolbox panel I should see a sign in option that when clicked, a small UI login comes up with username, password</li><li>The login form should also have a stay signed in / remember me checkbox for the user's convenience (keeps users logged in)</li></ul>|2|
|Create/Add an Item to Track|<ul><li>There should be a new item button that, when clicked, a small UI form drops down with two text input fields ("name", "price", “url”) and a "save item" button.</li><li>The user should be able to manually input these fields. When the user hits "save item", that item should appear in the user's tracking info page </li><li>Each item in the item list should have: item name, item price, vendor name + link to vendor’s website</li><li>Multiple items can be added</li></ul>|5|
|Extension Tool Panel and Tracking Info Page|<ul><li>When the user clicks our extension icon in their web browser, a small "toolbox" panel should come up</li><li>In the panel, when a user clicks a button/icon link, it should open a new tab that displays all the items they're tracking and all their related data (seller name, price, etc.)</li><li>The tracking page should show all the data (in an item list) that the user is tracking.</li></ul>|3|
|SSO Login with Google|<ul><li>Give the user the option to login with their Google account</li><li>This option should be in the sign in form at the bottom labeled by "sign in with google” UI</li></ul>|3|

### User Story Task Breakdown
#### Account Registration
|Subtask|Description|
|---|---|
|Backend - Basic Functionality|<ul><li>An API route for creating a user with a given username + email + password.</li><li>Send an email to the given email address to confirm user registration.</li></ul>|
|Frontend - Email Validation|Form which lets a user type in a username + password, and then sends a POST request to the API.|

#### Account Sign In
|Subtask|Description|
|---|---|
|Backend|Save and return a session token when an API route is sent a user’s correct login info.|
|Frontend|<ul><li>Form for logging in.</li><li>Save the session token after signing in.</li><li>Send the token on subsequent requests.</li></ul>|

#### Create/Add an Item to Track
|Subtask|Description|
|---|---|
|Implement Backend|<ul><li>Django ORM Model for Items (name, price, url fields)</li><li>API route POST /api/items/create for storing new item and its info</li><li>For registered users, Item object should have user attribute that maps to the users account</li><li>For a guest user, an item should have a guest attribute that maps to the user's unique guest id (browser fingerprint, ip address, etc.)</li><li>Decided not to use guest user’s local storage because the Item information will not be queryable when updating item prices</li></ul>|
|Implement Frontend|<ul><li>Button on home page to navigate to Add Item Menu Page</li><li>Add Item Menu should have fields name, price, url.</li><li>Add/Submit button</li><li>A unique identifier for guest users should be sent in the payload along with the above fields to the create item endpoint upon submit</li></ul>|

#### Extension Tool Panel and Tracking Info Page
|Subtask|Description|
|---|---|
|Tool panel front end|The main popup panel when a user clicks on our extension's icon|
|Tracking page frontend|<ul><li>When a user clicks the “my tracking info” link in the tool panel / popup, a new tab should open with the tracking webpage </li><li>The tracking page should have a list of all the items the user is tracking</li><li>Each item in the list should show that item’s name, price, and the vendor’s url</li><li>The list would be inside of a context that would request the data from backend</li><li>Upon response, context is updated with list items</li></ul>|
|Tracking page backend|Takes the frontend’s get request and sends a response with a list of items (name, price, url)|

#### SSO Login with Google
|Subtask|Description|
|---|---|
|Backend|Create a new user or get users with REST API|
|Frontend Logic|Have a function that gets the signed in user’s account information. With that information, send a request to the backend to register or login in the user|
|Frontend UI|Create a button that when clicked would login the user in with Google.|