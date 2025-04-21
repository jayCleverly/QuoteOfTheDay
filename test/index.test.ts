import { handler } from '@/index';
import { RequestService } from '@/request/RequestService';
import { SendService } from '@/send/SendService';

describe('Handler tests', () => {
    const fakeEmailList = ['test1@example.com', 'test2@example.com'];

    afterEach(() => {
        jest.resetModules();
    });

    it('should return status code 200', async () => {
        const mockedRequestServiceResponse = "'Mocked quote'\nMocked author";
        const expectedResponseBody = `Quote: ${mockedRequestServiceResponse}.\nSent out to ${fakeEmailList}!`;

        RequestService.getData = jest.fn().mockResolvedValue(mockedRequestServiceResponse);
        SendService.bulkSend = jest.fn().mockResolvedValue('success');

        const response = await handler(fakeEmailList);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(JSON.stringify(expectedResponseBody));
    });

    it('should return status code 500', async () => {
        RequestService.getData = jest.fn().mockRejectedValue(new Error());

        const response = await handler(fakeEmailList);
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual(JSON.stringify('Internal Server Error!'));
    });
});
