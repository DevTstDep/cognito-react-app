import { S3, config, AWSError, CostExplorer } from 'aws-sdk';
import * as appConfig from "../config.json";
import { basename } from 'path';
import { createReadStream } from 'fs'
import { v4 } from 'uuid';
import { AuthService } from './AuthService';
import { CognitoUser } from '@aws-amplify/auth';



config.update({
    region: appConfig.cognito.REGION,
});

export class DataService {

    private authService: AuthService;
    private s3Client = new S3({ region: appConfig.cognito.REGION });

    constructor(authService: AuthService) {
        this.authService = authService
    }

    public async updateUserPicture(user: CognitoUser, pictureUrl: string) {
        await this.authService.updateUserAttribute(
            user, {
            'picture': pictureUrl
        }
        )
    }


    public async uploadProfilePicture(filePath: string): Promise<string> {
        const fileName = v4() + basename(filePath);
        const fileStream = createReadStream(filePath);
        const uploadResult = await this.s3Client.upload({
            Bucket: appConfig.cognito.PICTURES_BUCKET,
            Key: fileName,
            Body: fileStream,
            ACL: 'public-read'
        }).promise();
        return uploadResult.Location;
    }

    public async uploadProfileFromFile(file: File): Promise<string> {
        const fileName = v4() + file.name;
        const uploadResult = await this.s3Client.upload({
            Bucket: appConfig.cognito.PICTURES_BUCKET,
            Key: fileName,
            Body: file,
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