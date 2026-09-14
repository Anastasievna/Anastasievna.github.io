"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const TYPES = ["Hops", "Malts", "Yeast", "Adjuncts"];

export default function SideBar() {
  //Фильтрация реализована через searchParams, т.к. требование `ProductList` — Server Component
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getKeywords = () => {
    const params = new URLSearchParams(searchParams.toString());
    const curKeywords = params.getAll("type");

    return { params, curKeywords };
  };

  const setKeywords = (value: string) => {
    const { params, curKeywords } = getKeywords();

    if (curKeywords.includes(value)) {
      params.delete("type");
      curKeywords
        .filter((key) => key !== value)
        .forEach((key) => params.append("type", key));
    } else {
      params.append("type", value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const isChecked = (value: string) => {
    const curKeywords = searchParams.getAll("type");
    return curKeywords.includes(value);
  };

  return (
    <aside className="sidebar filter-menu">
      <div className="sidebar__section">
        <h3 className="section-title">Keywords</h3>
        <div className="keywords-list">
          {getKeywords().curKeywords.map((key, i) => (
            <span className="keyword-tag" key={i}>
              {key}
              <FontAwesomeIcon
                icon={faXmark}
                className="remove-keyword-icon"
                onClick={() => setKeywords(key)}
              />
            </span>
          ))}
        </div>
      </div>

      <div className="sidebar__section">
        <h3 className="section-title">Product Type</h3>
        <div className="checkbox-group">
          {TYPES.map((type, i) => (
            <label className="checkbox-container" key={i}>
              <input
                type="checkbox"
                checked={isChecked(type)}
                onChange={() => setKeywords(type)}
              />
              <span className="checkmark">
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
              </span>
              {type}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
