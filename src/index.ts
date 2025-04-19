import { RequestService } from "./request/RequestService";

export const handler = async (
    event: string[]):
    Promise<{statusCode: number, body: string}> => {
    try {
        // RequestService data from quote of the day api
        const apiResponse: any = await RequestService.getData();

        return {
            statusCode: 200,
            body: JSON.stringify(apiResponse),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify("Internal Server Error!")
        }
    }
}
