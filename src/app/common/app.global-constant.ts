import { CommonList, GenderList, OptionList } from "./models/common-types";

export class GlobalConstants {

    public static APPLICATION_FormerTypeList: OptionList[] = [
        { option: 'Select Farmer Type', value: '' },
        { option: 'SF / MF', value: 'SF / MF' },
        { option: 'Others', value: 'Others' },
    ];

    public static APPLICATION_RegisteredByList: OptionList[] = [
        { option: 'Self / Farmer', value: '' },
        { option: 'Department', value: 'Department' },
        { option: 'MI Company', value: 'MI Company' },
    ];

    public static APPLICATION_DepartmentList: OptionList[] = [
        { option: 'Select Department', value: '' },
        { option: 'Horticulture', value: 'Horticulture' },
        { option: 'Agriculture', value: 'Agriculture' },
    ];

    public static APPLICATION_MICompanyList: CommonList[] = [
        { option: 'Select MI Company', value: -1 },
        { option: 'Vedanta Irrigation system Pvt Ltd.', value: 1 },
    ];

    public static APPLICATION_GenderList: GenderList[] = [
        { option: 'Select Gender', value: '' },
        { option: 'Male', value: 'M' },
        { option: 'Female', value: 'F' },
        { option: 'Transgender', value: "O" }
    ];

    public static APPLICATION_SocialStatusList: CommonList[] = [
        { option: 'Select Caste', value: -1 },
        { option: 'Scheduled Caste', value: 1 },
        { option: 'Scheduled Tribe', value: 2 },
        { option: 'Other Caste', value: 3 }
    ];

    public static CROP_CropTypeList: OptionList[] = [
        { option: 'Select Crop Type', value: '' },
        { option: 'Agriculture / Private SugarMill', value: 'Agriculture' },
        { option: 'Horticulture', value: 'Horticulture' },
        { option: 'Sugarcane / Cooperative SugarMill', value: 'Sugarcane' }
    ];

    public static CROP_CropLandTypeList: OptionList[] = [
        { option: 'Select Crop / Land Type', value: '' },
        { option: 'One crop and one survey', value: 'One crop and one survey' },
        { option: 'Several crops and one survey', value: 'Several crops and one survey' },
        { option: 'One crop and several survey', value: 'One crop and several survey' }
    ];

    public static CROP_MITypeList: OptionList[] = [
        { option: 'Select MI Type', value: '' },
        { option: 'Drip', value: 'Drip' },
        { option: 'Sprinkler', value: 'Sprinkler' },
    ];

    public static CROP_PrimaryCropList: CommonList[] = [
        { value: -1, option: 'Select Primary Crop' },
        { value: 1, option: 'Mango' },
        { value: 2, option: 'Jamun' },
        { value: 3, option: 'Sapota' },
        { value: 4, option: 'Coconut' },
        { value: 5, option: 'Jack' },
        { value: 6, option: 'Oilpalm' },
        { value: 7, option: 'cashew' },
        { value: 8, option: 'Silkcotton' },
        { value: 9, option: 'sweet Orange' },
        { value: 10, option: 'Ber' },
        { value: 11, option: 'PerannialMorungai' },
        { value: 12, option: 'Guava' },
        { value: 13, option: 'Aonla' },
        { value: 14, option: 'Acidlime' },
        { value: 15, option: 'Mandarin Orange' },
        { value: 16, option: 'Anona' },
        { value: 17, option: 'Mango(HD)' },
        { value: 18, option: 'Avocade' },
        { value: 19, option: 'Guava(HD)' },
        { value: 20, option: 'Grapes' },
        { value: 21, option: 'Cocoa' },
        { value: 22, option: 'Pomegramate' },
        { value: 23, option: 'Annual Moringa' },
        { value: 24, option: 'Gourds' },
        { value: 25, option: 'Papaya' },
        { value: 26, option: 'Pandalavari' },
        { value: 27, option: 'Nerium' },
        { value: 28, option: 'Banana(Nenthran,Red Banana)' },
        { value: 29, option: 'Banana (G.9)' },
        { value: 30, option: 'Pitichi' },
        { value: 31, option: 'Gloriosa' },
        { value: 32, option: 'Sugarcane' },
        { value: 33, option: 'Flowers' },
        { value: 34, option: 'Vegetables' },
        { value: 35, option: 'Cotton' },
        { value: 36, option: 'Chillies' },
        { value: 37, option: 'Brinjal' },
        { value: 38, option: 'Cabbage' },
        { value: 39, option: 'Tomato' },
        { value: 40, option: 'Bhendi' },
        { value: 41, option: 'Onion' },
        { value: 42, option: 'Cauliflower' },
        { value: 43, option: 'Crossandra' },
        { value: 44, option: 'Turmeric' },
        { value: 45, option: 'Tuberose' },
        { value: 46, option: 'Lemon' },
        { value: 47, option: 'Redgram' },
        { value: 48, option: 'Tapioca' },
        { value: 49, option: 'Areca Nut' },
        { value: 50, option: 'maize' },
        { value: 52, option: 'Greengram' },
        { value: 53, option: 'Blackgram' },
        { value: 54, option: 'Cowpea' },
        { value: 55, option: 'Groundnut' },
        { value: 56, option: 'Coconut (H)' },
        { value: 57, option: 'Rubber' },
        { value: 58, option: 'Black Pepper' },
        { value: 59, option: 'banana' },
        { value: 60, option: 'Watermelon' },
        { value: 61, option: 'Coleus' },
        { value: 62, option: 'Millets' },
        { value: 63, option: 'Oil Seeds' },
        { value: 64, option: 'Fodder Crops' },
        { value: 65, option: 'Korai' },
        { value: 66, option: 'Curry Leaf' },
        { value: 67, option: 'Tea' },
        { value: 68, option: 'Nutmeg' },
        { value: 69, option: 'Clove' },
        { value: 70, option: 'Red Sandal' },
        { value: 71, option: 'Coriander' },
        { value: 72, option: 'Drumstick' },
        { value: 73, option: 'Casuarina' },
        { value: 74, option: 'Vetiver' },
        { value: 75, option: 'Tamirind' },
        { value: 76, option: 'Kumizh' },
        { value: 77, option: 'Mochai' },
        { value: 78, option: 'medicinal plants' },
        { value: 79, option: 'ornamental plants' },
        { value: 80, option: 'Medicinal Plants' },
        { value: 81, option: 'FIG' },
        { value: 83, option: 'Cardamom' },
        { value: 84, option: 'datepalm' },
        { value: 85, option: 'Sugarcane (SM)' },
        { value: 86, option: 'Paddy and Pulses' },
        { value: 88, option: 'Horsegram' },
        { value: 89, option: 'Pineapple' },
        { value: 90, option: 'Malai vembu ' },
        { value: 92, option: 'Neem' },
        { value: 93, option: 'Passion Fruit' },
        { value: 94, option: 'Greens' },
        { value: 95, option: 'Manilla tamarind' },
        { value: 96, option: 'Coffee' },
        { value: 97, option: 'Sericulture (Mulberry)' },
        { value: 98, option: 'Fodder crops(Avin)' },
        { value: 99, option: 'Tree crops' }
    ];

    public static CROP_InterCropList: CommonList[] = [
        { value: -1, option: 'Select Inter Crop' },
        { value: 1, option: 'Mango' },
        { value: 2, option: 'Jamun' },
        { value: 3, option: 'Sapota' },
        { value: 4, option: 'Coconut' },
        { value: 5, option: 'Jack' },
        { value: 6, option: 'Oilpalm' },
        { value: 7, option: 'cashew' },
        { value: 8, option: 'Silkcotton' },
        { value: 9, option: 'sweet Orange' },
        { value: 10, option: 'Ber' },
        { value: 11, option: 'PerannialMorungai' },
        { value: 12, option: 'Guava' },
        { value: 13, option: 'Aonla' },
        { value: 14, option: 'Acidlime' },
        { value: 15, option: 'Mandarin Orange' },
        { value: 16, option: 'Anona' },
        { value: 17, option: 'Mango(HD)' },
        { value: 18, option: 'Avocade' },
        { value: 19, option: 'Guava(HD)' },
        { value: 20, option: 'Grapes' },
        { value: 21, option: 'Cocoa' },
        { value: 22, option: 'Pomegramate' },
        { value: 23, option: 'Annual Moringa' },
        { value: 24, option: 'Gourds' },
        { value: 25, option: 'Papaya' },
        { value: 26, option: 'Pandalavari' },
        { value: 27, option: 'Nerium' },
        { value: 28, option: 'Banana(Nenthran,Red Banana)' },
        { value: 29, option: 'Banana (G.9)' },
        { value: 30, option: 'Pitichi' },
        { value: 31, option: 'Gloriosa' },
        { value: 32, option: 'Sugarcane' },
        { value: 33, option: 'Flowers' },
        { value: 34, option: 'Vegetables' },
        { value: 35, option: 'Cotton' },
        { value: 36, option: 'Chillies' },
        { value: 37, option: 'Brinjal' },
        { value: 38, option: 'Cabbage' },
        { value: 39, option: 'Tomato' },
        { value: 40, option: 'Bhendi' },
        { value: 41, option: 'Onion' },
        { value: 42, option: 'Cauliflower' },
        { value: 43, option: 'Crossandra' },
        { value: 44, option: 'Turmeric' },
        { value: 45, option: 'Tuberose' },
        { value: 46, option: 'Lemon' },
        { value: 47, option: 'Redgram' },
        { value: 48, option: 'Tapioca' },
        { value: 49, option: 'Areca Nut' },
        { value: 50, option: 'maize' },
        { value: 52, option: 'Greengram' },
        { value: 53, option: 'Blackgram' },
        { value: 54, option: 'Cowpea' },
        { value: 55, option: 'Groundnut' },
        { value: 56, option: 'Coconut (H)' },
        { value: 57, option: 'Rubber' },
        { value: 58, option: 'Black Pepper' },
        { value: 59, option: 'banana' },
        { value: 60, option: 'Watermelon' },
        { value: 61, option: 'Coleus' },
        { value: 62, option: 'Millets' },
        { value: 63, option: 'Oil Seeds' },
        { value: 64, option: 'Fodder Crops' },
        { value: 65, option: 'Korai' },
        { value: 66, option: 'Curry Leaf' },
        { value: 67, option: 'Tea' },
        { value: 68, option: 'Nutmeg' },
        { value: 69, option: 'Clove' },
        { value: 70, option: 'Red Sandal' },
        { value: 71, option: 'Coriander' },
        { value: 72, option: 'Drumstick' },
        { value: 73, option: 'Casuarina' },
        { value: 74, option: 'Vetiver' },
        { value: 75, option: 'Tamirind' },
        { value: 76, option: 'Kumizh' },
        { value: 77, option: 'Mochai' },
        { value: 78, option: 'medicinal plants' },
        { value: 79, option: 'ornamental plants' },
        { value: 80, option: 'Medicinal Plants' },
        { value: 81, option: 'FIG' },
        { value: 83, option: 'Cardamom' },
        { value: 84, option: 'datepalm' },
        { value: 85, option: 'Sugarcane (SM)' },
        { value: 86, option: 'Paddy and Pulses' },
        { value: 88, option: 'Horsegram' },
        { value: 89, option: 'Pineapple' },
        { value: 90, option: 'Malai vembu ' },
        { value: 92, option: 'Neem' },
        { value: 93, option: 'Passion Fruit' },
        { value: 94, option: 'Greens' },
        { value: 95, option: 'Manilla tamarind' },
        { value: 96, option: 'Coffee' },
        { value: 97, option: 'Sericulture (Mulberry)' },
        { value: 98, option: 'Fodder crops(Avin)' },
        { value: 99, option: 'Tree crops' }
    ];

    public static CROP_MICropList: CommonList[] = [
        { value: -1, option: 'Mi Crop Type' },
        { value: 1, option: 'Primary Crop' },
        { value: 2, option: 'Inter Crop' }
    ];

    public static CROP_CropSpacingList: CommonList[] = [
        { value: -1, option: 'Select Crop Spacing' },
        { value: 1, option: '10m*10m' },
        { value: 2, option: '8m*8m' },
        { value: 5, option: '6m*6m' },
        { value: 6, option: '5m*5m' },
        { value: 7, option: '3m*3m' },
        { value: 8, option: '2.5m*2.5m' },
        { value: 9, option: '2m*2m' },
        { value: 12, option: '1.5m*1.5m' },
        { value: 13, option: '1.2m*0.6m' },
        { value: 17, option: '4m*4m' },
        { value: 20, option: '1.8m*0.6m' },
        { value: 21, option: '2.5m*0.6m' },
        { value: 22, option: '9m*9m' },
        { value: 23, option: '12m*12m' },
        { value: 25, option: '&lt;1.2m*0.6m' },
        { value: 26, option: '1.5m*0.6m' },
        { value: 27, option: '1.8m*1.8m' },
        { value: 28, option: '7m*7m' },
        { value: 29, option: '1.2m*0.6m(ONLINE)' }
    ];



    readonly baseAppUrl: string = 'http://localhost:57431/';
    readonly baseAPIUrl: string = 'https://api.github.com/';

    /* Excel File upload consts*/
    public static readonly FILE_UPLOAD_CANCEL_ERROR_MESSAGE: string = 'Please upload a file';
    public static readonly FILE_UPLOAD_SUCCESS_MESSAGE: string = 'File data exctacted successfully.';
    public static readonly FILE_UPLOAD_NO_DATA: string = 'Customer Details not present';

    /* Excel File upload - customer table consts*/
    public static readonly CUST_TABLE_EMPTY: string = 'customers data is not present.';

}