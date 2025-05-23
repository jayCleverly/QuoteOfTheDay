import { SESClient, SendEmailCommand} from "@aws-sdk/client-ses";

export class SendService {
    private static readonly EMAIL_SUBJECT: string = "Quote of the day!";
    private static readonly SOURCE_ADDRESS: string =
        process.env.SOURCE_EMAIL_ADDRESS || "verified.email1@example.com";
    private static readonly DESTINATION_LIST: string[] =
        process.env.DESTINATION_EMAIL_LIST
            ? process.env.DESTINATION_EMAIL_LIST.split(",")
            : ["verified.email1@example.com", "verified.email2@example.com"];

    private static sesClient = new SESClient();

    /*
     * Sends the formatted quote to all addresses in the email list.
     */
    public static async bulkSend(quote: any): Promise<void> {
        for (const address of SendService.DESTINATION_LIST) {
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
                Source: SendService.SOURCE_ADDRESS,
            });

            try {
                await SendService.sesClient.send(command);
                console.log(
                    `Email successfully sent from ${SendService.SOURCE_ADDRESS} to ${address}.`);
            } catch (error) {
                throw new Error(
                    `Email failed to send from ${SendService.SOURCE_ADDRESS} to ${address}: ${JSON.stringify(error)}.`);
            }
        }
    }
}