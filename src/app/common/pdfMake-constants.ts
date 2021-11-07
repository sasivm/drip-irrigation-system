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
        docHeadTitle_Normal: {
            fontSize: 16,
            alignment: 'center',
            bold: true,
            margin: [0, 0, 0, 0] // R T L B
        },
        bottom_margin: {
            margin: [0, 0, 0, -8] // R T L B
        },
        firstLineContent: {
            alignment: 'right',
        },
        fillTextContent: {
            alignment: 'center',
            bold: true
        },
        populatedTextEng: { // for english words in tamil doc
            alignment: 'center',
            bold: true,
            fontSize: 10
        },
        rowLineContent: {
            margin: [0, 5]
        },
        rowLineContentTamilDoc: {
            margin: [0, 2]
        },
        subLineBefore: {
            margin: [0, 0, 0, 50]
        },
        textCenter: {
            alignment: 'center'
        },
        textRight: {
            alignment: 'right'
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
        },
        footerSignWorkComp: {
            bold: true,
            fontSize: 16,
            margin: [0, 120]
        },
        pmksyFooter: {
            alignment: 'center',
            bold: true,
            fontSize: 12,
            margin: [0, 100]
        },
        componyNameMarker: {
            bold: true,
            fontSize: 10
        },
        newParaghraph: {
            margin: [0, 20, 0, 0]
        },
        preFooter: {
            margin: [0, 50]
        },
        redText: {
            color: 'red'
        },
        blueText: {
            color: 'blue'
        },
        AbstractCol3: {
            alignment: 'center'
        },
        docTamil: {
            font: 'Baloo2'
        },
        docTamil2: {
            // font: 'Baamini'
            font: 'Baloo2',
            fontSize: 9
        },
        companyMarker: {
            bold: true,
            fontSize: 10
        }
    }
}