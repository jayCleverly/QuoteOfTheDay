# Quote Of the Day

This project contains a lambda which emails out the 'Quote of the Day', sourced from a public API to addresses on an email list.
This lambda runs once a day at 8 in the morning (UTC).

In order to deploy this project to your own instance of AWS (assumes aws-cli and sam-cli pre configured):
1. Run 'npm run build' (downloads dependencies and runs tests)
2. Run 'sam build' (packages and converts source code ahead of deployment)
3. Run 'sam deploy --guided' (deploy to AWS, set ENV vars)
SOURCE_EMAIL_ADDRESS is a string value, eg valid.email1@example.com
DESTINATION_EMAIL_LIST is a list inside a string, eg valid.email1@example.com,valid.email2@example.com
Note - ensure the generated 'samconfig.toml' file has the capability of 'CAPABILITY_NAMED_IAM'.

Any email you wish to send from SOURCE_EMAIL_ADDRESS must be verified in AWS SES Identities.
All emails in DESTINATION_EMAIL_LIST must also be verified if SES is in sandbox mode.
