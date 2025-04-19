import { handler } from "../src/index";
import { RequestService } from "../src/request/RequestService";

describe("Handler tests", () => {
    const fakeEvent = ["test1@example.com", "test2@example.com"];

    afterEach(() => {
        jest.resetModules();
    })

    it("should return status code 200", async () => {
        const mockedRequestServiceResponse = {
            quote: "Mocked quote",
            author: "Mocked author"
        };

        RequestService.getData = jest.fn().mockResolvedValue(mockedRequestServiceResponse);

        const response = await handler(fakeEvent);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(JSON.stringify(mockedRequestServiceResponse));
    });

    it("should return status code 500", async () => {
        RequestService.getData = jest.fn().mockRejectedValue(new Error());

        const response = await handler(fakeEvent);
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual(JSON.stringify("Internal Server Error!"));
    });
});
