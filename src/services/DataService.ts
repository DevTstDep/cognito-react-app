import { S3, config, AWSError } from 'aws-sdk';
import * as appConfig from "../config.json";
import { basename } from 'path';
import { v4 } from 'uuid';
import { AuthService } from './AuthService';
import { CognitoUser } from '@aws-amplify/auth';
import { ICreateSpaceState } from "../components/spaces/CreateSpace";
import { createReadStream } from 'fs'
import { Space } from '../components/spaces/Spaces';



config.update({
    region: appConfig.cognito.REGION,
});

export class DataService {

    private authService: AuthService;
    private s3Client = new S3({ region: appConfig.cognito.REGION });

    constructor(authService: AuthService) {
        this.authService = authService
    }

    public async reserveSpace(spaceIdz: string) {
        const user = this.authService.getUser();
        if (user) {
            const requestBody = JSON.stringify({
                spaceId: spaceIdz
            })
            const requestURL = appConfig.api.invokeUrl + 'reservations';
            const requestOptions: RequestInit = {
                method: 'POST',
                body: requestBody,
                headers: {
                    'Authorization': user.getSignInUserSession()!.getIdToken().getJwtToken()
                }
            }
            const requestResult = await fetch(requestURL, requestOptions);
            const requestResultBody = await requestResult.json();
            console.log(requestResultBody)
        } else {
            throw new Error("No authorized user!");
        }
    }

    public async getSpaces(): Promise<Space[]> {
        const requestURL = appConfig.api.invokeUrl + 'spaces';
        const requestOptions: RequestInit = {
            method: 'GET'
        }
        const requestResult = await fetch(requestURL, requestOptions);
        const jsonResponse = await requestResult.json();
        if (jsonResponse.Items) {
            return jsonResponse.Items
        } else {
            return [];
        }

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
        const result = await this.uploadPublicFile(file, appConfig.cognito.PICTURES_BUCKET);
        return result;
    }

    public async createSpace(iCreateSpace: ICreateSpaceState): Promise<Response> {
        try {
            if (iCreateSpace.photo) {
                const photoURL = await this.uploadPublicFile(iCreateSpace.photo, appConfig.cognito.SPACES_PHOTOS_BUCKET);
                iCreateSpace.photoURL = photoURL;
                iCreateSpace.photo = undefined;
            }
            const requestURL = appConfig.api.invokeUrl + 'spaces';
            const requestOptions: RequestInit = {
                method: 'POST',
                body: JSON.stringify(iCreateSpace)
            }
            const requestResult = await fetch(requestURL, requestOptions);
            console.log(requestResult);
            return requestResult;
        } catch (error) {
            console.error(error);
            return {} as any
        }
    }


    private async uploadPublicFile(file: File, bucket: string): Promise<string> {
        const fileName = v4() + file.name;
        const uploadResult = await this.s3Client.upload({
            Bucket: bucket,
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