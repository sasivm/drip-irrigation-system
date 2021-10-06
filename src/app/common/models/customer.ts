export interface CustomerResponse {
    message: string,
    isSuccess: boolean,
    custRec: any[]
};

export interface ApplicantReqData {
    applicationId: string
};

export interface MILandRecord {
    cropType: string,
    miType: string,
    cropLandType?: string,
};