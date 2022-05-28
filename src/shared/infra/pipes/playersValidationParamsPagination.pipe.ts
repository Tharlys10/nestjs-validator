import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

class PlayersValidationParamsPagination implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.data === 'amount') {
      if (!value || +value <= 0 || +value > 100) {
        value = 10;
      }
    }

    if (metadata.data === 'page') {
      if (!value || +value <= 0) {
        value = 1;
      }
    }

    return +value;
  }
}

export { PlayersValidationParamsPagination };
