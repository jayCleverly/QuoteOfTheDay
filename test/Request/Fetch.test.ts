import axios from "axios";
import {Fetch} from "../../src/Request/Fetch";

jest.mock("axios");

describe("Api data fetcher unit tests", () => {
    it("should call the api", async () => {
        (axios.get as jest.Mock).mockResolvedValue(
            {
                data: [
                    {
                        type: 'Mocked type',
                        setup: 'Mocked setup',
                        punchline: "Mocked punchline",
                        id: 0
                    }
                ]
            }
        );

        const expectedResult = {
            id: '9ada9150e37b1b14fabad3b157c0e4d167d0133aebd431a6b080a12632e8484c',
            joke: {
                setup: 'Mocked setup',
                punchline: 'Mocked punchline'
            }
        }

        expect(await Fetch.getData("https://mocked-api.com")).toEqual(expectedResult);
    });

    it("should fail to call an api response", async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error());

        await expect(Fetch.getData("https://mocked-api.com")).rejects.toThrow();
    });
});
