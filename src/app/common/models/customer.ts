export interface CustomerResponse {
    message: string,
    isSuccess: boolean,
    custRec: any[]
};

export interface BulkCustomerResponse {
    message: string,
    isSuccess: boolean,
    invalidRecordAt: number
};

export interface ApplicantReqData {
    applicationId: string
};

export interface MILandRecord {
    cropType: string,
    miType: string,
    _id: string,
    cropLandType?: string
};

export interface PostMark {
    createdBy: string,
    createdAt: string,
    updatedBy?: string,
    updatedAt?: string
};