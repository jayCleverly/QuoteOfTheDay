import { Format } from "../../src/Request/Format";

describe("Api data formatter unit tests", () => {
    it("should format an api response", async () => {
        const mockApiResponse = [
            {
                type: 'Mocked type',
                setup: 'Mocked setup',
                punchline: 'Mocked punchline',
                id: 0
            }
        ]

        const expectedResult = {
            id: '9ada9150e37b1b14fabad3b157c0e4d167d0133aebd431a6b080a12632e8484c',
            joke: {
                setup: 'Mocked setup',
                punchline: 'Mocked punchline'
            }
        }

        expect(await Format.formatResponse(mockApiResponse)).toEqual(expectedResult);
    });

    it("should fail to format an api response", async () => {
        const mockApiResponse = {};

        await expect(Format.formatResponse(mockApiResponse)).rejects.toThrow();
    });
});
