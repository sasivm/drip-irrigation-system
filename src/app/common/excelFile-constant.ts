export class ExcelFileConstants {
    public static readonly EXCEL_FILE_HEADERS: string[] = [
        "Srl No",
        "Year",
        "Application Id",
        "Farmer Name",
        "Father Name",
        "Caste",
        "Mobile",
        "Work Order Date",
        "Work Order No",
        "District",
        "Block",
        "Village",
        "Crop",
        "Spacing",
        "Survey No / Subdivision No",
        "Total Area (Ha)",
        "Applied Area (Ha)",
        "Department",
        "Irrigation Type",
        "Sprinkler Type",
        "Sprinkler Spacing",
        "Sugar Mill",
        "Sugar Drip Type",
        "Sugar Well Type",
        "MI Company",
        "MI Referrence No",
        "Dealer Name",
        "Farmer Type",
        "Quotation Subsidy Amount (Rs) 100%",
        "Farmer Contribution (Rs) 25%",
        "Invoice Date",
        "Invoice Amount (Rs) 100%",
        "State Restricted Amount (Rs) 100%",
        "First Fund Released (Lakhs)",
        "Proceeding No",
        "First Fund UTR No",
        "First Fund UTR Date",
        "AE Restricted Amount (Rs) 100%",
        "Bank Gaurantee Deducted (%)",
        "Bank Gaurantee Deducted Amount",
        "Second Fund Released (Lakhs)",
        "Second Fund UTR No",
        "Second Fund UTR Date",
        "Total Fund Released (Lakhs)",
        "Current Status",
        "Current Status Date",
        "Current Status Remarks"
    ];

    public static readonly EXCEL_HEADERS_FIELD_NAME: string[] = [ 
        // To map excel column(th) data to particular UI field name (index to field)
        "sNo",
        "year",
        "applicationId",
        "farmerName",
        "fatherName",
        "socialStatus",
        "mobileNo",
        "workOrderDate",
        "workOrderNo",
        "district",
        "block",
        "village",
        "crop",
        "spacing",
        "surveyNo",
        "totalArea",
        "appliedArea",
        "department",
        "irrigationType",
        "sprinklerType",
        "sprinklerSpacing",
        "sugarMill",
        "sugarDripType",
        "sugarWellType",
        "miCompany",
        "miReferrenceNo",
        "dealerName",
        "farmerType",
        "quotationSubsidyAmount",
        "farmerContribution",
        "invoiceDate",
        "invoiceAmount",
        "stateRestrictedAmount",
        "firstFundReleased",
        "proceedingNo",
        "firstFundUTRNo",
        "firstFundUTRDate",
        "aeRestrictedAmount",
        "bankGauranteeDeductedPercent",
        "bankGauranteeDeductedAmount",
        "secondFundReleased",
        "secondFundUTRNo",
        "secondFundUTRDate",
        "totalFundReleased",
        "currentStatus",
        "currentStatusDate",
        "currentStatusRemarks"
    ];

    public static readonly EXCEL_FILE_COL_AND_FIELD_MAP: any = {
        "Srl No": "sNo",
        "Year": "year",
        "Application Id": "applicationId",
        "Farmer Name": "farmerName",
        "Father Name": "fatherName",
        "Caste": "socialStatus",
        "Mobile": "mobileNo",
        "Work Order Date": "workOrderDate",
        "Work Order No": "workOrderNo",
        "District": "district",
        "Block": "block",
        "Village": "village",
        "Crop": "crop",
        "Spacing": "spacing",
        "Survey No / Subdivision No": "surveyNo",
        "Total Area (Ha)": "totalArea",
        "Applied Area (Ha)": "appliedArea",
        "Department": "department",
        "Irrigation Type": "irrigationType",
        "Sprinkler Type": "sprinklerType",
        "Sprinkler Spacing": "sprinklerSpacing",
        "Sugar Mill": "sugarMill",
        "Sugar Drip Type": "sugarDripType",
        "Sugar Well Type": "sugarWellType",
        "MI Company": "miCompany",
        "MI Referrence No": "miReferrenceNo",
        "Dealer Name": "dealerName",
        "Farmer Type": "farmerType",
        "Quotation Subsidy Amount (Rs) 100%": "quotationSubsidyAmount",
        "Farmer Contribution (Rs) 25%": "farmerContribution",
        "Invoice Date": "invoiceDate",
        "Invoice Amount (Rs) 100%": "invoiceAmount",
        "State Restricted Amount (Rs) 100%": "stateRestrictedAmount",
        "First Fund Released (Lakhs)": "firstFundReleased",
        "Proceeding No": "proceedingNo",
        "First Fund UTR No": "firstFundUTRNo",
        "First Fund UTR Date": "firstFundUTRDate",
        "AE Restricted Amount (Rs) 100%": "aeRestrictedAmount",
        "Bank Gaurantee Deducted (%)": "bankGauranteeDeductedPercent",
        "Bank Gaurantee Deducted Amount": "bankGauranteeDeductedAmount",
        "Second Fund Released (Lakhs)": "secondFundReleased",
        "Second Fund UTR No": "secondFundUTRNo",
        "Second Fund UTR Date": "secondFundUTRDate",
        "Total Fund Released (Lakhs)": "totalFundReleased",
        "Current Status": "currentStatus",
        "Current Status Date": "currentStatusDate",
        "Current Status Remarks": "currentStatusRemarks"
    };

    public static readonly CUST_TABLE_VISIBLE_HEADERS: string[] = [
        // below fields are related to Excel File columns as array
        // "action", show afer succesfull save
        "Srl No",
        "Year",
        "Application Id",
        "Farmer Name",
        "Father Name",
        "Caste",
        "Mobile",
        "Work Order Date",
        "District",
        "Block",
        "Village",
        "Crop",
        "Spacing",
        "Survey No / Subdivision No",
        "Total Area (Ha)",
        "Applied Area (Ha)",
        "Department",
        "Irrigation Type",
        "Sprinkler Type",
        "Sprinkler Spacing",
        "Sugar Mill",
        "Sugar Drip Type",
        "Sugar Well Type",
        "MI Company",
        "MI Referrence No",
        "Dealer Name",
        "Farmer Type",
        "Quotation Subsidy Amount (Rs) 100%",
        "Farmer Contribution (Rs) 25%",
        "Invoice Date",
        "Invoice Amount (Rs) 100%",
        "State Restricted Amount (Rs) 100%",
        "First Fund Released (Lakhs)",
        "Proceeding No",
        "Current Status",
        "Current Status Date",
        "Current Status Remarks"
    ];
}