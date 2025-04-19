import axios from "axios";

export class RequestService {
    private static readonly API_PATH: string = "https://zenquotes.io/api/today";

    /*
     * Returns the formatted data for an api request
     * @return The data collected from the call in a standardised format
     */
    public static async getData(): Promise<string> {
        return RequestService.formatResponse(await RequestService.callApi());
    }

    private static async callApi(): Promise<string[]> {
        try {
            const response = await axios.get(RequestService.API_PATH);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to retrieve data from api: ${error}`);
        }
    }

    private static async formatResponse(apiResponse: any): Promise<string> {
        return "'" + apiResponse[0].q + "'\n" + apiResponse[0].a;
    }
}
