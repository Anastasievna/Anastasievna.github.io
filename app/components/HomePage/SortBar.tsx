"use client";
import { useEffect, useState } from "react";
import "./SortBar.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SortBar() {
  //Фильтрация реализована через searchParams, т.к. требование `ProductList` — Server Component
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set("search", search);
    else params.delete("search");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const setSort = (element: EventTarget) => {
    const sort = (element as HTMLElement).id;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const btns = document.querySelectorAll(".sort-button");
    btns.forEach((btn) => btn.classList.remove("active-sort"));
    const btn = document.querySelector(`#${params.get("sort")}`);
    if (btn) btn.classList.add("active-sort");
    else {
      const btn = document.querySelector(`#new`);
      btn?.classList.add("active-sort");
    }

    setSearch(params.get("search") ?? "");
  }, [searchParams]);

  return (
    <div className="search-sort-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") toSearch();
          }}
        />
        <button
          className="search-button"
          aria-label="Search"
          onClick={toSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="sort-options">
        <button
          id="new"
          className="sort-button active-sort"
          onClick={(e) => setSort(e.target)}
        >
          New
        </button>
        <button
          id="price_asc"
          className="sort-button"
          onClick={(e) => setSort(e.target)}
        >
          Price ascending
        </button>
        <button
          id="price_desc"
          className="sort-button"
          onClick={(e) => setSort(e.target)}
        >
          Price descending
        </button>
        <button
          id="rating"
          className="sort-button"
          onClick={(e) => setSort(e.target)}
        >
          Rating
        </button>
      </div>
    </div>
  );
}
