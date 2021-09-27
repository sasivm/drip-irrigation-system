import { Component_A, Component_B } from "./models/table-models";

export class SubsCalcConstants {

    public static CONTROLUNIT_DATASOURCE: Component_A[] = [
        {
            "sno": 1,
            "component": "Screen filter 10 m3/hr",
            "unit": "No.",
            "unitRate": 1300
        },
        {
            "sno": 2,
            "component": "Screen filter 20/25 m3/hr",
            "unit": "No.",
            "unitRate": 2400
        },
        {
            "sno": 3,
            "component": "Screen filter 30 m3/ hr",
            "unit": "No.",
            "unitRate": 3400
        },
        {
            "sno": 4,
            "component": "Ventury & manifold (1 1/2\")",
            "unit": "No.",
            "unitRate": 2150
        },
        {
            "sno": 5,
            "component": "Venturi & manifold - 2\"",
            "unit": "No.",
            "unitRate": 2250
        },
        {
            "sno": 6,
            "component": "Ventury& manifold (2 1/2\")",
            "unit": "No.",
            "unitRate": 3500
        },
        {
            "sno": 7,
            "component": "Air release Valve 1\"",
            "unit": "No.",
            "unitRate": 110
        },
        {
            "sno": 8,
            "component": "Air release Valve 1.5\"",
            "unit": "No.",
            "unitRate": 220
        },
        {
            "sno": 9,
            "component": "Non Return Valve - 1.5\"",
            "unit": "No.",
            "unitRate": 600
        },
        {
            "sno": 10,
            "component": "Non Return Valve - 2\"",
            "unit": "No.",
            "unitRate": 800
        },
        {
            "sno": 11,
            "component": "Non Return Valve - 2.5\"",
            "unit": "No.",
            "unitRate": 1250
        },
        {
            "sno": 12,
            "component": "By-pass Assembly - 1.5\"x1.5\"",
            "unit": "No.",
            "unitRate": 650
        },
        {
            "sno": 13,
            "component": "By-pass Assembly - 2\"x1,5\"",
            "unit": "No.",
            "unitRate": 700
        },
        {
            "sno": 14,
            "component": "By-pass Assembly - 2.5\"x2\"",
            "unit": "No.",
            "unitRate": 750
        }
    ];

    public static FIELDUNIT_DATASOURCE: Component_B[] = [
        {
            "sno": 1,
            "fieldUnit": "PVC Pipe 50 mm, class-III; 6 kg/cm2",
            "unit": "Mtr",
            "unitRate": 41
        },
        {
            "sno": 2,
            "fieldUnit": "PVC Pipe 63 mm, class-II; 4 kg/cm2",
            "unit": "Mtr",
            "unitRate": 43
        },
        {
            "sno": 3,
            "fieldUnit": "PVC Pipe 75 mm, class-II; 4 kg/cm2",
            "unit": "Mtr",
            "unitRate": 63
        },
        {
            "sno": 4,
            "fieldUnit": "PVC Pipe 90 mm, class-II; 4 kg/cm2",
            "unit": "Mtr",
            "unitRate": 85
        },
        {
            "sno": 5,
            "fieldUnit": "Lateral 12 mm, Class II ; 2.5 kg/cm2",
            "unit": "Mtr",
            "unitRate": 5
        },
        {
            "sno": 6,
            "fieldUnit": "Lateral 16 mm, Class II; 2.5 kg/cm2",
            "unit": "Mtr",
            "unitRate": 7
        },
        {
            "sno": 7,
            "fieldUnit": "Emitting Pipe 12 mm; Class II: (0.6 m x 1 to 4 lph)",
            "unit": "Mtr",
            "unitRate": 7.73
        },
        {
            "sno": 8,
            "fieldUnit": "Emitting Pipe 16 mm;  Class II: (0.6 m x 1 to 4 lph)",
            "unit": "Mtr",
            "unitRate": 9.48
        },
        {
            "sno": 9,
            "fieldUnit": "Emitter/ Dripper  4/ 8 lph",
            "unit": "No.",
            "unitRate": 2.25
        },
        {
            "sno": 10,
            "fieldUnit": "Control Valve 50 mm",
            "unit": "No.",
            "unitRate": 240
        },
        {
            "sno": 11,
            "fieldUnit": "Control Valve 63 mm",
            "unit": "No.",
            "unitRate": 356
        },
        {
            "sno": 12,
            "fieldUnit": "Control Valve 75 mm",
            "unit": "No.",
            "unitRate": 515
        },
        {
            "sno": 13,
            "fieldUnit": "Control Valve 90 mm",
            "unit": "No.",
            "unitRate": 700
        },
        {
            "sno": 14,
            "fieldUnit": "Flush Valve 50 mm",
            "unit": "No.",
            "unitRate": 62
        },
        {
            "sno": 15,
            "fieldUnit": "Flush Valve 63 mm",
            "unit": "No.",
            "unitRate": 75
        },
        {
            "sno": 16,
            "fieldUnit": "Flush Valve 75 mm",
            "unit": "No.",
            "unitRate": 90
        },
        {
            "sno": 17,
            "fieldUnit": "Throttle Valve - 1.5\"",
            "unit": "No.",
            "unitRate": 600
        },
        {
            "sno": 18,
            "fieldUnit": "Throttle Valve - 2\"",
            "unit": "No.",
            "unitRate": 750
        },
        {
            "sno": 19,
            "fieldUnit": "Throttle Valve - 2.5\"",
            "unit": "No.",
            "unitRate": 1100
        }
    ];

    public static CONTROL_UNIT_FORMARRAY_FORM_NAME: string = 'unitItems';
    public static CONTROL_UNIT_FORMARRAY_FIELD_TOATL: string = 'total';
    public static CONTROL_UNIT_FORMARRAY_FIELD_QTY: string = 'qty';
    public static CONTROL_UNIT_TOTAL_AMT_FIELD: string = 'totalAmt';


    public static FIELD_UNIT_FORMARRAY_FORM_NAME: string = 'fieldItemArray';
    public static FIELD_UNIT_FORMARRAY_ITEM_QUANTITY: string = 'qty';
    public static FIELD_UNIT_FORMARRAY_ITEM_TOTAL: string = 'total';
    public static FIELD_UNIT_FORMGROUP_TOTAL: string = 'totalFrmAmount';

    public static DISPLAY_COLUMNS: string[] = [
        'sno', 'component', 'unit', 'rate', 'qty', 'total'
    ];
}