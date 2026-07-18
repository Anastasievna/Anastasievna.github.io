import { useState } from "react";
import type { IStation } from "../../types/index";
import { STATIONS } from "../../constans/stations";
import "./StationInput.css";

interface IStationProps {
  name: string;
  placeholder?: string;
  station: IStation | null;
  setStation?: React.Dispatch<React.SetStateAction<IStation | null>>;
}

function StationInput({
  name,
  placeholder,
  station,
  setStation,
}: IStationProps) {
  const [visibleList, setVisibleList] = useState(false);
  const [findStations, setFindStations] = useState<IStation[]>([]);
  const isActive = !!setStation;

  const changeInput = (text: string) => {
    if (!isActive) return;
    const stations =
      STATIONS.filter(
        (station) =>
          !!text && station.name.toLowerCase().startsWith(text?.toLowerCase()),
      ) ?? [];
    setFindStations(stations);
    setStation({ name: text, code: text });
    setVisibleList(!!text && !!stations.length);
  };

  const selectStation = (selectedStation: IStation) => {
    if (!isActive) return;
    setFindStations([]);
    setStation(selectedStation);
    setVisibleList(false);
  };

  return (
    <div className="station">
      <label className="station__item-label" htmlFor={name.toLowerCase()}>
        {name}
      </label>
      <div className="station__item">
        <input
          type="text"
          id={name.toLowerCase()}
          placeholder={placeholder ?? ""}
          value={`${station?.code === station?.name ? (station?.name ?? "") : station?.name + " - " + station?.code}`}
          className="station__item-input"
          autoComplete="off"
          onChange={(e) => isActive && changeInput(e.target.value)}
          disabled={!isActive}
        />
        {visibleList && (
          <ul className="station__list">
            {findStations.map((station: IStation) => (
              <li key={station.code} onClick={() => selectStation(station)}>
                {station.name} - {station.code}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StationInput;
