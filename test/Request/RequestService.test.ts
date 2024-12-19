import axios from "axios";
import { RequestService } from "../../src/Request/RequestService";

jest.mock("axios");

describe("Api data collector unit tests", () => {
    it("should call the api", async () => {
        (axios.get as jest.Mock).mockResolvedValue(
            {
                data: [
                    {
                        q: "Mocked quote",
                        a: "Mocked author",
                        h: "Mocked html"
                    }
                ]
            }

        );

        const expectedResult = {
            quote: 'Mocked quote',
            author: 'Mocked author',
        }

        expect(await RequestService.getData()).toEqual(expectedResult);
    });

    it("should fail to call the api", async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error());

        await expect(RequestService.getData()).rejects.toThrow(new Error("Failed to retrieve data from api: Error"));
    });
});
