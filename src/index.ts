import { APIGatewayProxyResult } from "aws-lambda";
import { RequestService } from "./Request/RequestService";

export const handler = async (): Promise<APIGatewayProxyResult> => {
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
