import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { CommonList } from 'src/app/common/models/common-types';

@Component({
  selector: 'app-mi-land-details',
  templateUrl: './mi-land-details.component.html',
  styleUrls: ['./mi-land-details.component.scss']
})
export class MiLandDetailsComponent implements OnInit {

  cropTypeList: CommonList[] = GlobalConstants.CROP_CropTypeList;

  cropLandTypeList: CommonList[] = GlobalConstants.CROP_CropLandTypeList;

  miTypeList: CommonList[] = GlobalConstants.CROP_MITypeList;

  constructor() { }

  ngOnInit(): void {
  }

}
