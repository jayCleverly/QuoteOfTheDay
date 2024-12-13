import { Format } from "./Format";
import axios from "axios";

export class Fetch {
    /*
     * Returns the formatted data for an api request
     * @param apiPath The endpoint for api call
     * @return The data collected from the call in a standardised format
     */
    public static async getData(apiPath: string): Promise<{}> {
        return Format.formatResponse(await this.callApi(apiPath));
    }

    private static async callApi(apiPath: string): Promise<string[]> {
        try {
            const response = await axios.get(apiPath);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to retrieve data from api: ${apiPath}`)
        }
    }
}
