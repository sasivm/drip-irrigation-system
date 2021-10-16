import { StyleDictionary } from "pdfmake/interfaces";

export class PDFMakeConstants {

    public static TABLE_CELL_NO_BORDER: boolean[] = [false, false, false, false];
    public static TABLE_CELL_BOTTOM_BORDER: boolean[] = [false, false, false, true];
    public static TABLE_CELL_FULL_BORDER: boolean[] = [true, true, true, true];

    public static readonly DOC_STYLES: StyleDictionary = {
        docHeadTitle: {
            fontSize: 16,
            alignment: 'center',
            decoration: 'underline',
            bold: true,
            margin: [0, 0, 0, 0] // R T L B
        },
        firstLineContent: {
            alignment: 'right',
        },
        fillTextContent: {
            alignment: 'center',
            bold: true
        },
        rowLineContent: {
            margin: [0, 5]
        },
        subLineBefore: {
            margin: [0, 0, 0, 50]
        },
        textCenter: {
            alignment: 'center'
        },
        textJustify: {
            alignment: 'justify'
        },
        boldText: {
            bold: true
        },
        footerSignature: {
            alignment: 'center',
            bold: true,
            fontSize: 16,
            margin: [0, 140]
        }
    }
}