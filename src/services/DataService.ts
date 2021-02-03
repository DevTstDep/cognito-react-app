import { S3, config, AWSError, Credentials } from 'aws-sdk';
import * as appConfing from "../../config.json";


config.update({
    region: appConfing.cognito.REGION,
});

export class DataService {

    private s3Client = new S3();

    public async listBuckets(): Promise<S3.ListBucketsOutput | AWSError> {
        const listResult = await this.s3Client.listBuckets().promise();
        return listResult;
    }

    public async createBucket(): Promise<S3.CreateBucketOutput | AWSError> {
        const createResult = await this.s3Client.createBucket({
            Bucket:'aksdkj2342834owsfe2kjebsdkskdjsweiu345'
        }).promise();
        return createResult;
    }
}