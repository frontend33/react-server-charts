import React, { FC } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
// import './datePicker.css';
import './index.css';
import 'react-day-picker/lib/style.css';
import { WEEKDAYS_LONG, MONTHS, WEEKDAYS_SHORT } from './constants';

export const DatePicker: FC<any> = ({ startDate, setStartDate }) => {
  const changeDate = (value: Date) => {
    setStartDate(value);
  };

  const modifiers = { start: startDate };

  return (
    <div className="StoriesPickerFromTo">
      <DayPickerInput
        // formatDate={MomentLocaleUtils.formatDate}
        // parseDate={MomentLocaleUtils.parseDate}
        value={startDate}
        placeholder="От"
        format="DD.MM.YYYY"
        dayPickerProps={{
          selectedDays: [startDate, { startDate }],
          modifiers,
          numberOfMonths: 1,
          // custom zh
          weekdaysLong: WEEKDAYS_LONG,
          weekdaysShort: WEEKDAYS_SHORT,
          months: MONTHS,
          firstDayOfWeek: 1,
        }}
        onDayChange={changeDate}
      />
    </div>
  );
};
