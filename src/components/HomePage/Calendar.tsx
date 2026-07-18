import React, { useCallback, useEffect, useState } from "react";
import "./Calendar.css";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS_NAMES = ["M", "T", "W", "T", "F", "S", "S"];

interface ICalendarProps {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  isRangeCalendar: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDay {
  day: number | null;
  date: Date | null;
  classList: string[];
}

function Calendar({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isRangeCalendar,
  isOpen,
  setIsOpen,
}: ICalendarProps) {
  const [curMonthDate, setCurMonthDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [nextMonthDate, setNextMonthDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [selectedDays, setSelectedDays] = useState([startDate, endDate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!!selectedDays[1] && !isRangeCalendar)
      setSelectedDays([selectedDays[0], null]);
  }, [isRangeCalendar]);

  const getMonth = useCallback(
    (date: { month: number; year: number }) => {
      const allDays: IDay[] = [];
      const firstDayOfMonth = new Date(date.year, date.month, 7).getDay();
      const daysOfMonth = new Date(date.year, date.month + 1, 0).getDate();
      const lastDayOfMonth = new Date(
        date.year,
        date.month,
        daysOfMonth,
      ).getDay();

      if (firstDayOfMonth) {
        for (let i = 0; i < firstDayOfMonth; i++) {
          allDays.push({
            classList: ["calendar__day-title", "calendar__day-title--disabled"],
            day: null,
            date: null,
          });
        }
      }

      for (let i = 1; i <= daysOfMonth; i++) {
        const d = new Date(date.year, date.month, i);
        const curDate = new Date();
        curDate.setHours(0, 0, 0, 0);
        const classList = ["calendar__day-title"];
        if (selectedDays.some((day) => day?.getTime() === d.getTime()))
          classList.push("active");
        if (d < curDate) classList.push("calendar__day-title--disabled");
        if (isRangeCalendar) {
          if (d.getTime() === selectedDays[0]?.getTime() && selectedDays[1])
            classList.push("right");
          if (d.getTime() === selectedDays[1]?.getTime())
            classList.push("left");
          if (
            selectedDays[0] &&
            selectedDays[1] &&
            d.getTime() > selectedDays[0].getTime() &&
            d.getTime() < selectedDays[1].getTime()
          )
            classList.push("between");
        }
        allDays.push({
          classList: classList,
          day: i,
          date: d,
        });
      }

      if (lastDayOfMonth < 7) {
        for (let i = lastDayOfMonth; i > 0; i--) {
          allDays.push({
            classList: ["calendar__day-title", "calendar__day-title--disabled"],
            day: null,
            date: null,
          });
        }
      }

      return allDays;
    },
    [endDate, isRangeCalendar, selectedDays],
  );

  const selectedDay = (day: IDay) => {
    if (!day.date || day.classList.includes("calendar__day-title--disabled"))
      return;
    if (
      (isRangeCalendar && selectedDays[0] && selectedDays[1]) ||
      (!isRangeCalendar && selectedDays[0])
    ) {
      setSelectedDays(() => [day.date, null]);
      return;
    }

    if (isRangeCalendar && selectedDays[0] && day.date < selectedDays[0])
      return;

    if (isRangeCalendar && selectedDays[0])
      setSelectedDays([selectedDays[0], day.date]);
    else setSelectedDays(() => [day.date, null]);
  };

  const showNextMonth = () => {
    if (curMonthDate.month === 11) {
      setCurMonthDate({
        year: curMonthDate.year + 1,
        month: 0,
      });
    } else {
      setCurMonthDate({
        year: curMonthDate.year,
        month: curMonthDate.month + 1,
      });
    }

    if (nextMonthDate.month === 11) {
      setNextMonthDate({
        year: nextMonthDate.year + 1,
        month: 0,
      });
    } else {
      setNextMonthDate({
        year: nextMonthDate.year,
        month: nextMonthDate.month + 1,
      });
    }
  };

  const showPrevMonth = () => {
    if (curMonthDate.month === 0) {
      setCurMonthDate({
        year: curMonthDate.year - 1,
        month: 11,
      });
    } else {
      setCurMonthDate({
        year: curMonthDate.year,
        month: curMonthDate.month - 1,
      });
    }

    if (nextMonthDate.month === 0) {
      setNextMonthDate({
        year: nextMonthDate.year - 1,
        month: 11,
      });
    } else {
      setNextMonthDate({
        year: nextMonthDate.year,
        month: nextMonthDate.month - 1,
      });
    }
  };

  const handleReset = () => {
    setSelectedDays([null, null]);
    setStartDate(null);
    setEndDate(null);
  };

  const handleApply = () => {
    if (
      !(
        (!isRangeCalendar && !!selectedDays.length) ||
        (isRangeCalendar && selectedDays.length == 2)
      )
    )
      return;

    if (!isRangeCalendar || selectedDays[0]) setStartDate(selectedDays[0]);
    if (isRangeCalendar && selectedDays[1]) setEndDate(selectedDays[1]);
    setIsOpen(false);
  };

  useEffect(() => {
    const toggleCalendar = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen &&
        !selectedDays.some((day) => !!day) &&
        ![...target.classList].some((className) =>
          className.includes("calendar"),
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", toggleCalendar);
    return () => document.removeEventListener("click", toggleCalendar);
  }, [isOpen, setIsOpen, selectedDays]);

  return (
    <div className="calendar__block">
      <div id="calendar" className="calendar">
        <div className="calendar__month-box" id="month-box">
          {[curMonthDate, nextMonthDate].map((date, i) => (
            <div key={i} className="calendar__month">
              <div className="calendar__month-title">
                {i === 0 && (
                  <button
                    className="calendar__month-title-btn prev"
                    onClick={showPrevMonth}
                  ></button>
                )}
                <p>{`${MONTH_NAMES[date.month]} ${date.year}`}</p>
                {i === 1 && (
                  <button
                    className="calendar__month-title-btn next"
                    onClick={showNextMonth}
                  ></button>
                )}
              </div>
              <div className="calendar__month-title">
                {DAYS_NAMES.map((day, i) => (
                  <div key={i} className="calendar__day-title">
                    {day}
                  </div>
                ))}
              </div>
              <div className="calendar__days">
                {getMonth(date).map((day, index) => (
                  <div
                    key={`${index}_${day.day}`}
                    className={day.classList.join(" ")}
                    onClick={() => selectedDay(day)}
                  >
                    <span className="calendar__day-span">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="calendar__btns">
          <button
            className="calendar__btn"
            type="button"
            id="reset"
            onClick={handleReset}
          >
            reset
          </button>
          <button
            className="calendar__btn active"
            type="button"
            id="apply"
            onClick={handleApply}
          >
            apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calendar;