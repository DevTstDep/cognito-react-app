import { S3, config, AWSError } from 'aws-sdk';
import * as appConfing from "../../config.json";
import { basename } from 'path';
import { createReadStream } from 'fs'
import { v4 } from 'uuid';



config.update({
    region: appConfing.cognito.REGION,
});

export class DataService {

    private s3Client = new S3();

    public async uploadProfilePicture(filePath: string): Promise<string> {
        const fileName = v4() + basename(filePath);
        const fileStream = createReadStream(filePath);
        const uploadResult = await this.s3Client.upload({
            Bucket: appConfing.cognito.PICTURES_BUCKET,
            Key: fileName,
            Body: fileStream,
            ACL: 'public-read'
        }).promise();
        return uploadResult.Location;
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