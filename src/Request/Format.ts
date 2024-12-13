import crypto from "crypto";

export class Format {
    /*
     * Returns the formatted data for an api response
     * @param apiResponse The data returned from an api call
     * @return The data collected from the call in a standardised format
     */
    public static async formatResponse(apiResponse: any): Promise<{}>  {
        try {
            const formattedResponse = {
                id: "",
                joke: {
                    setup: "",
                    punchline: ""
                }
            }

            const { type, setup, punchline, id } = apiResponse[0];
            formattedResponse.joke.setup = setup;
            formattedResponse.joke.punchline = punchline;
            formattedResponse.id = await Format.createUniqueHash(setup, punchline);

            return formattedResponse;
        } catch (error) {
            throw new Error(`Failed to format api response: ${error}`)
        }
    }

    private static async createUniqueHash(setup: string, punchline: string): Promise<string> {
        return crypto.createHash("sha256").update(`${setup}|${punchline}`).digest("hex");
    }
}
