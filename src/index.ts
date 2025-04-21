import { RequestService } from '@/request/RequestService';
import { SendService } from '@/send/SendService';

export const handler = async (): Promise<{ statusCode: number; body: string }> => {
    try {
        const quoteOfTheDay: any = await RequestService.getData();
        await SendService.bulkSend(quoteOfTheDay);

        return {
            statusCode: 200,
            body: JSON.stringify(`Quote: ${quoteOfTheDay}.\nSent out to email list!`),
        };
    } catch (error) {
        console.error(`Error: ${error}.`);
        return {
            statusCode: 500,
            body: JSON.stringify('Internal Server Error!'),
        };
    }
};
