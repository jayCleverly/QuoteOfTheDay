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
        await SendService.bulkSend(fakeQuote);

        expect(sesClientMock.send).toHaveBeenCalledTimes(2);
    });

    it("should fail to send all emails", async () => {
        (sesClientMock.send as jest.Mock)
            .mockResolvedValueOnce("success")
            .mockRejectedValueOnce(new Error());

        await expect(SendService.bulkSend(fakeQuote)).rejects.toThrow(
            new Error("Email failed to send from verified.email1@example.com to verified.email2@example.com: {}."));

        expect(sesClientMock.send).toHaveBeenCalledTimes(2);
    });
});
