# Splitcoin Frontend Application
Welcome to the Splitcoin Frontend application! This React app is designed to work seamlessly with the Splitcoin Backend application, available on GitHub. The frontend allows users to manage expenses and split them equally among the members of a group.

# Live Demo
You can experience the application live on https://splitcoinapp.vercel.app/. 

# Getting Started
To run the application locally, follow these steps:

# Routes
/createUser
Register a new user to the application.

/userlogin
Log in to the application.

/logout
Log out from the application.
/retrieveGroups
Retrieve groups to which the user is tagged or created.

/retrieveExpense/:groupId
Retrieve expenses for a specific group.

/createGroup
Create a new group.

/createExpense/:groupId
Create an expense for a specific group.

/retrieveUserExpenses/:expenseId
Retrieve the user's expenditure for a given expense.

/SettleUp/:groupId
Settle the amount equally among all users in the group.
