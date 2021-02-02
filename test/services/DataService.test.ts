import { DataService } from "../../src/services/DataService";
import * as config from "../../config.json";



describe('LoginService test suite', () => {
    let dataService: DataService;

    beforeEach(() => {
        dataService = new DataService();
    });

    test('login user', async () => {
        const s3Result = await dataService.listBuckets();
        console.log(123);
    });


})