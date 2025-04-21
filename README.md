# Quote Of the Day

This project contains a lambda which emails out the 'Quote of the Day', sourced from a public API to addresses on an email list.

In order to deploy this project to your own instance of AWS (assumes aws-cli and sam-cli pre configured):
1. Run 'npm run build' (downloads dependencies and runs tests)
2. Run 'sam build' (packages and converts source code ahead of deployment)
3. Run 'sam deploy --guided' (deploy to AWS, set ENV vars)

To invoke the project pass a list of emails to send a quote of the day to - these must all be verified in SES however if using sandbox mode.
Eg - in event.json paste: 
[
    "email1@example.com",
    "email2@example.com"
]
