import { useState } from "react";
import Calendar from "./Calendar";
import calendar from "../../assets/images/calendar.png";
import "./DatesInputs.css";

interface IDaysProps {
  startDate: Date | null;
  setStartDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  endDateIsActive: boolean;
}

function DatesInputs({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  endDateIsActive,
}: IDaysProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = !!setStartDate && !!setEndDate;
  
  const openCalendar = () => {
    setIsOpen((prevState) => !prevState);
  };

  const displayDate = (date: Date | null): string => {
    if (!date) return "";
    return date.getDate() + " " + date.toLocaleDateString("en-US", {year: "numeric", month: "short"});
  }

  return (
    <div>
      <div className="dates">
        <p className="dates__text">Pick your lucky day</p>
        <div className="dates__block">
          <div className="dates__item">
            <div className="dates__item-input" onClick={openCalendar}>
              <img className="calendar-icon" style={{cursor: isActive ? "pointer" : "default"}} src={calendar} alt="calendar" />
              {!startDate && <span className="dates__placeholder">Depart</span>}
            </div>
            {startDate && <p>{displayDate(startDate)}</p>}
          </div>
          <div className="dates__item">
            <div className={`dates__item-input ${!endDateIsActive && "disabled"}`} onClick={openCalendar}>
              <img className="calendar-icon" style={{cursor: isActive && endDateIsActive ? "pointer" : "default"}} src={calendar} alt="calendar" />
              {!endDate && <span className="dates__placeholder">Return</span>}
            </div>
            {endDate && <p>{displayDate(endDate)}</p>}
          </div>
        </div>
      </div>

      {isActive && isOpen && (
        <Calendar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          isRangeCalendar={endDateIsActive}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}

export default DatesInputs;
