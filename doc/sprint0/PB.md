### User story 1: tool panel and tracking info
Regardless of being a basic or pro user, I need a small panel to pop up when I click on the extension in my browser with all the tools necesarry to begin tracking an item's price. Within the panel, I also need a link that opens a new tab with all my tracking information. I need the panel to act like a toolbox so that when I'm browsing a website like amazon or ebay, I can easily open the tool panel to select an item to track. I need the tracking info page to monitor all my tracked items for price changes, price history, and other analysis. 

**Acceptance Criteria**  
* When the user clicks our extension icon in their web browser, a small "toolbox" panel should come up
* In the panel, when a user clicks a button/icon link, it should open a new tab that displays all the items they're tracking and all their related data (seller name, price, etc.)
* The implementation of the features in the panel is not important here, just the link that opens a user's tracking info (could use static elements in the toolbox)


### User story 2: add an item to track  
As a basic user that is a general consumer, I want to <ins>begin</ins> tracking an item's price on any website so that I know when its price dips in order to save money. As a pro user that is a business owner, I want to <ins>begin</ins> tracking an item's price from my competitor's website so I am able to price match or offer better deals.

**Acceptance Criteria**  
* There should be a new item button that when clicked, a small UI form drops down with two text input fields ("item name" and "item price") and a "save item" button.
* The user should be able to manually input a name but not a price. When the user hits "save item", that item should appear in the user's tracking info page (see the local and server storage user stories). Under that item should appear a list of sellers and their prices for it. 

### User story 3: guest user (local storage)  
As a basic user and general consumer who uses the extension once in a while to lookout for sales, I should not be forced to go through the registration process to make an account (out of pure convenience) because I don't use the extension enough to care about my data. 

**Acceptance Criteria** 
* By default, users of the extension should be "signed in" as guests
* In the top of the toolbox panel, the user's given guest should be visible (user6, user5974, ...) 
* Guest data should be stored locally in the user's browser 

### User story 4: user registration (server side storage) 
As a basic user and general consumer that uses PriceHawk religiously who is pedantic about savings and is currently tracking a lot of items, or as a pro user and e-commerce student that is using PriceHawk to track multiple items to generate useful analysis for my assignments, I want to have an account on PriceHawk so that my data is securely stored on a server so I don't lose it.

**Acceptance Criteria** 
* The toolbox panel should have a register link if not signed in. Upon clicking the link, a small UI should come up in the panel that allows the user to register
* Within the sign-in UI, there should also be an SSO option (user story 6) 



### User story 5: user sign in (server side storage)

**Acceptance Criteria** 
* should have stay signed in option

login with a username and password (see user story 5 for "forgot password")




forgot password

migrate local storage to server storage (guest with data creates account)


user registration 

user authentication

user profile (when signed in)

**Extract Price**

As a generic user, I want to be able to be able to get the price of any item on any website.

‌

Acceptance Criteria:

Let the user right click on some DOM element and extract a the first currency value from within.
Persistently store the information somewhere.
Let the user view the stored price somewhere in the extension.



story: authentication. default is guest where data is stored locally. I want to register so my data is secured on the server so I don't accedentaly lose it locally (eaither by accidental deletion or other)
story: alert when stock is low?
