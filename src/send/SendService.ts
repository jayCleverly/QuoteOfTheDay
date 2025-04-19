import { SESClient, SendEmailCommand} from "@aws-sdk/client-ses";

export class SendService {
    private static readonly EMAIL_SUBJECT: string = "Quote of the day!";

    private static sesClient = new SESClient({ region: "us-east-1" });

    /*
     * Sends the formatted quote to all addresses in the email list.
     */
    public static async bulkSend(toAddresses: string[], quote: any): Promise<void> {
        for (const address of toAddresses) {
            const command = new SendEmailCommand({
                Destination: {
                    ToAddresses: [address],
                },
                Message: {
                    Body: {
                        Text: {
                            Charset: "UTF-8",
                            Data: quote,
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: SendService.EMAIL_SUBJECT,
                    },
                },
                Source: "verified.email@example.com",
            });

            try {
                await SendService.sesClient.send(command);
                console.log(`Email sent to ${address}.`);
            } catch (error) {
                throw new Error(`Failed to send email to ${address}: ${error}.`);
            }
        }
    }
}