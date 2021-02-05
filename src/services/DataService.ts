import { S3, config, AWSError } from 'aws-sdk';
import * as appConfing from "../../config.json";
import { basename} from 'path';
import { createReadStream } from 'fs'


config.update({
    region: appConfing.cognito.REGION,
});

export class DataService {

    private s3Client = new S3();

    public async uploadProfilePicture(filePath: string): Promise<string> {
        const fileName = basename(filePath);
        const fileStream = createReadStream(filePath);
        await this.s3Client.upload({
            Bucket: appConfing.cognito.PICTURES_BUCKET,
            Key: fileName,
            Body: fileStream
        }).promise();
        return `https://${appConfing.cognito.PICTURES_BUCKET}.s3-
        ${appConfing.cognito.REGION}.amazonaws/${fileName}`;
    }

    public async listBuckets(): Promise<S3.ListBucketsOutput | AWSError> {
        const listResult = await this.s3Client.listBuckets().promise();
        return listResult;
    }

    public async createBucket(): Promise<S3.CreateBucketOutput | AWSError> {
        const createResult = await this.s3Client.createBucket({
            Bucket: 'aksdkj2342834owsfe2kjebsdkskdjsweiu345'
        }).promise();
        return createResult;
    }
}