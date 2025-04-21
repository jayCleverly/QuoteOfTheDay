import Axios from "axios";
import { RequestService } from "@/request/RequestService";

jest.mock("axios");

describe("Api data collector unit tests", () => {
    it("should call the api", async () => {
        (Axios.get as jest.Mock).mockResolvedValue(
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

        const expectedResult = "'Mocked quote'\nMocked author";

        expect(await RequestService.getData()).toEqual(expectedResult);
    });

    it("should fail to call the api", async () => {
        (Axios.get as jest.Mock).mockRejectedValue(new Error());

        await expect(RequestService.getData()).rejects.toThrow(
            new Error("Failed to retrieve data from api: Error"));
    });
});
