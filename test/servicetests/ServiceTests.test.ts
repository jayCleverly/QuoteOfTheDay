import MockAdaptor from "axios-mock-adapter"
import sinon, { SinonStub } from "sinon";
import { SESClient } from "@aws-sdk/client-ses";
import Axios from "axios";
import { handler } from "@/index";

describe("Quote of the day service", () => {
    const sandbox = sinon.createSandbox();
    const emailList = ["verified_email@example.com"]
    const mockedQuote = "Mocked quote"
    const mockedAuthor = "Mocked author"
    const mockedApiResponse =
        [
            {
                q: mockedQuote,
                a: mockedAuthor,
            }
        ];

    let sesSendOperationStub: SinonStub;
    let mockAxios: MockAdaptor;

    const mockCallToPublicApi = () => {
        mockAxios.onGet("https://zenquotes.io/api/today").reply(200, mockedApiResponse);
    }

    beforeEach(() => {
       sesSendOperationStub = sandbox.stub(SESClient.prototype, "send");
       mockAxios = new MockAdaptor(Axios);
    });

    afterEach(() => {
       sandbox.restore();
       mockAxios.restore();
    });

    it("should get a response from the api and send out emails", async () => {
        mockCallToPublicApi();
        sesSendOperationStub.resolves(200);

        const response = await handler(emailList);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(JSON.stringify(
            "Quote: 'Mocked quote'\nMocked author.\nSent out to verified_email@example.com!"));
    });

    it("should get a response from the api and fail to send out emails", async () => {
        mockCallToPublicApi();
        sesSendOperationStub.rejects(new Error());

        const response = await handler(emailList);
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual(JSON.stringify("Internal Server Error!"));
    });
});