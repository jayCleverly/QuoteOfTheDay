import axios from "axios";

export class RequestService {
    private static readonly apiPath: string = "https://zenquotes.io/api/today";

    /*
     * Returns the formatted data for an api request
     * @return The data collected from the call in a standardised format
     */
    public static async getData(): Promise<{}> {
        return RequestService.formatResponse(await RequestService.callApi());
    }

    private static async callApi(): Promise<string[]> {
        try {
            const response = await axios.get(RequestService.apiPath);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to retrieve data from api: ${error}`)
        }
    }

    private static async formatResponse(apiResponse: any): Promise<any> {
        const formattedResponse = {
            quote: "",
            author: ""
        };

        const { q, a, h } = apiResponse[0];
        formattedResponse.quote = q;
        formattedResponse.author = a;

        return formattedResponse;
    }
}
