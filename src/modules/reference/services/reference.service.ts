import { Injectable } from '@nestjs/common';
import { BannerLocations } from '@modules/banner/constants';

@Injectable()
export class ReferenceService {
  getAll() {
    return {
      banner_locations: [
        {
          key: BannerLocations.TOP,
          value: 'Top',
        },
        {
          key: BannerLocations.MIDDLE,
          value: 'Middle',
        },
        {
          key: BannerLocations.BOTTOM,
          value: 'Bottom',
        },
      ],
    };
  }
}
