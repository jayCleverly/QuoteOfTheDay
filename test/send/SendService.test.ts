import { SendService } from "@/send/SendService";
import { SESClient } from '@aws-sdk/client-ses';

jest.mock('@aws-sdk/client-ses', () => {
    return {
        SESClient: jest.fn().mockImplementation(() => ({
            send: jest.fn(),
        })),
        SendEmailCommand: jest.fn(),
    };
});

describe("Email sender unit tests", () => {
    const fakeEmails = ["test1@example.com", "test2@example.com"];
    const fakeQuote = "'Test quote'\nTest author";

    let sesClientMock: jest.Mocked<SESClient>

    beforeEach(() => {
        jest.resetModules();
        sesClientMock = (SendService as any).sesClient;
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should send quotes to the email list", async () => {
        await SendService.bulkSend(fakeEmails, fakeQuote);

        expect(sesClientMock.send).toHaveBeenCalledTimes(fakeEmails.length);
    });

    it("should fail to send all emails", async () => {
        (sesClientMock.send as jest.Mock)
            .mockResolvedValueOnce("success")
            .mockRejectedValueOnce(new Error());

        await expect(SendService.bulkSend(fakeEmails, fakeQuote)).rejects.toThrow(
            new Error("Failed to send email to test2@example.com: Error."));

        expect(sesClientMock.send).toHaveBeenCalledTimes(2);
    });
});
