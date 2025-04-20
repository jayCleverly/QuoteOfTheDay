import { RequestService } from "@/request/RequestService";
import { SendService } from "@/send/SendService";

const handler = async (
    emailList: string[]):
    Promise<{statusCode: number, body: string}> => {
    try {
        const quoteOfTheDay: any = await RequestService.getData();
        await SendService.bulkSend(emailList, quoteOfTheDay);

        return {
            statusCode: 200,
            body: JSON.stringify(`Quote: ${quoteOfTheDay} sent out to ${emailList}`),
        }
    } catch (error) {
        console.error(`Error: ${error}.`)
        return {
            statusCode: 500,
            body: JSON.stringify("Internal Server Error!")
        }
    }
}

module.exports.handler = handler;