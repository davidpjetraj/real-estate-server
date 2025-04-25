import type { Dayjs } from 'dayjs';
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const dayOfYear = require('dayjs/plugin/dayOfYear');
const duration = require('dayjs/plugin/duration');
const isBetween = require('dayjs/plugin/isBetween');
const isoWeek = require('dayjs/plugin/isoWeek');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const isToday = require('dayjs/plugin/isToday');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const relativeTime = require('dayjs/plugin/relativeTime');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
const weekday = require('dayjs/plugin/weekday');
const weekOfYear = require('dayjs/plugin/weekOfYear');
import { FiltersInput } from '../common/GetAll';

// Most used dayjs extensions
dayjs.extend(isToday);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.tz.setDefault('UTC');

export function dayjsFromNow(value: string | Date | Dayjs): string {
  return dayjs(value).utc().fromNow();
}

/**
 * Alway use this export when importing dayjs so that you get all the needed plugins loaded
 */

export { dayjs };
export type { Dayjs };

export const getRandomColor = () => {
  const randomColors = [
    '#D94519',
    '#D87B1D',
    '#C4A700',
    '#5C9E52',
    '#1B7F79',
    '#2972A5',
    '#5953B3',
    '#C7436C',
    '#8B68A3',
  ];

  return randomColors[Math.floor(Math.random() * randomColors.length)];
};

type FilterType = {
  field: string;
  isMultiple: boolean;
};

export const getFormatValue = (activity_key: string) => {
  switch (activity_key) {
    case 'requested_by':
      return 'user';

    case 'member':
      return 'user';

    case 'assignee':
      return 'user';

    case 'assignees':
      return 'users';

    case 'members':
      return 'users';

    case 'purchased_at':
      return 'date';

    case 'due_date':
      return 'date';

    case 'birthday':
      return 'date';

    case 'date':
      return 'date';

    case 'start_date':
      return 'date';

    case 'end_date':
      return 'date';

    case 'value':
      return 'number';

    case 'value':
      return 'expected_salary';

    default:
      return 'none';
  }
};

export const extractFilters = (
  currentQuery: any,
  filters: FiltersInput[],
  relationFilters: FilterType[],
) => {
  const filter: { [key: string]: any } = {
    ...currentQuery,
  };

  if (!filters) return filter;

  filters.forEach((f) => {
    if (f.type === 'search') {
      if (f.search?.length > 0) {
        filter[f.id] = {
          contains: f.search.trim(),
          mode: 'insensitive',
        };
      }
    }

    if (f.type === 'multiselect') {
      if (f.multiselect?.length > 0) {
        filter[f.id] = {
          in: f.multiselect,
        };
      }
    }

    if (f.type === 'users') {
      if (f.users?.length > 0) {
        const isMultiple = relationFilters.find(
          (uf) => uf.field === f.id,
        )?.isMultiple;

        if (isMultiple) {
          filter[f.id] = {
            some: {
              id: {
                in: f.users,
              },
            },
          };
        } else {
          filter[f.id] = {
            id: {
              in: f.users,
            },
          };
        }
      }
    }

    if (f.type === 'jobs') {
      if (f.jobs?.length > 0) {
        const isMultiple = relationFilters.find(
          (uf) => uf.field === f.id,
        )?.isMultiple;

        if (isMultiple) {
          filter[f.id] = {
            some: {
              id: {
                in: f.jobs,
              },
            },
          };
        } else {
          filter[f.id] = {
            id: {
              in: f.jobs,
            },
          };
        }
      }
    }

    if (f.type === 'date-range') {
      if (f.date_range?.length > 1) {
        filter[f.id] = {
          gte: dayjs(f.date_range[0]).startOf('day').toDate(),
          lte: dayjs(f.date_range[1]).endOf('day').toDate(),
        };
      }
    }

    if (f.type === 'number-range') {
      if (f.number_range?.length > 1) {
        const toFilter = {};

        if (f.number_range[0] !== '') {
          toFilter['gte'] = +f.number_range[0];
        }

        if (f.number_range[1] !== '') {
          toFilter['lte'] = +f.number_range[1];
        }

        filter[f.id] = toFilter;
      }
    }

    if (f.type === 'switch') {
      filter[f.id] = f.switch;
    }
  });

  return filter;
};
