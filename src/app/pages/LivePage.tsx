import { useId, useMemo, useState } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { PAGE_HREF } from "../paths";
import { FeaturedRecordingsSection } from "../components/FeaturedRecordingsSection";
import { PageIntro } from "../components/PageIntro";
import { SectionHeading } from "../components/SectionHeading";
import { contentShellInnerClass } from "../styles/typography";
import {
  sectionFirstAfterIntroBordered,
  sectionStackedBand,
  stackAfterHeading,
  stackMarginBottom,
} from "../styles/layoutSections";
import { focusRing, textLinkPlain } from "../styles/uiPatterns";
import {
  type PastShowFilterValue,
  PAST_SHOW_FILTER_OPTIONS,
  type SortKey,
  nextSortDirection,
  pastPerformances,
  sortEventRows,
  upcomingShows,
} from "../data/livePerformances";

type ColumnSort = { key: SortKey; dir: "asc" | "desc" };
type EventRow = {
  event: string;
  location: string;
  date: string;
  sortDateIso: string;
  showType?: string;
};

const eventMobileCardClass = "rounded-xl border border-[rgba(255,0,102,0.14)] bg-[#0a0a16] p-4";
const eventTableWrapClass = "rounded-xl border border-[rgba(255,0,102,0.14)] overflow-hidden";
const eventRowClass = "border-b border-[rgba(255,0,102,0.1)] hover:bg-[#ff0066]/[0.04] transition-colors";

function ariaSortValue(active: ColumnSort, column: SortKey): "none" | "ascending" | "descending" {
  if (active.key !== column) return "none";
  return active.dir === "asc" ? "ascending" : "descending";
}

function filterLabel(value: PastShowFilterValue): string {
  const found = PAST_SHOW_FILTER_OPTIONS.find((o) => o.value === value);
  return found?.label ?? value;
}

function sortFieldLabel(column: SortKey): string {
  if (column === "name") return "event name";
  if (column === "location") return "location";
  return "date";
}

function sortAriaLabel(sort: ColumnSort, column: SortKey): string {
  const current = ariaSortValue(sort, column);
  const nextDirection = current === "ascending" ? "descending" : "ascending";
  const currentText = current === "none" ? "not currently sorted" : `currently sorted ${current}`;
  return `Sort by ${sortFieldLabel(column)}, ${currentText}; activate to sort ${nextDirection}.`;
}

function EventCards(props: { rows: EventRow[]; includeShowTypeAttr?: boolean }) {
  const { rows, includeShowTypeAttr = false } = props;
  return (
    <>
      {rows.map((show) => (
        <article
          key={show.sortDateIso + show.event}
          className={eventMobileCardClass}
          data-sort-date={show.sortDateIso}
          {...(includeShowTypeAttr && show.showType ? { "data-show-type": show.showType } : {})}
        >
          <h3 className="text-[0.95rem] text-white">{show.event}</h3>
          <p className="mt-2 text-[0.85rem] text-[#afafc4]">{show.location}</p>
          <p className="mt-2 text-[0.85rem] text-[#ddd]">{show.date}</p>
        </article>
      ))}
    </>
  );
}

function EventsTable(props: {
  rows: EventRow[];
  sort: ColumnSort;
  onSort: (key: SortKey) => void;
  includeShowTypeAttr?: boolean;
}) {
  const { rows, sort, onSort, includeShowTypeAttr = false } = props;
  return (
    <div className={eventTableWrapClass}>
      <table className="w-full">
        <thead>
          <tr className="bg-[#0b0b14] border-b border-[rgba(255,0,102,0.14)]">
            <SortableTh column="name" label="Event Name" sort={sort} onSort={onSort} />
            <SortableTh column="location" label="Location" sort={sort} onSort={onSort} />
            <SortableTh column="date" label="Date" sort={sort} onSort={onSort} align="right" />
          </tr>
        </thead>
        <tbody>
          {rows.map((show) => (
            <tr
              key={show.sortDateIso + show.event}
              className={eventRowClass}
              data-sort-date={show.sortDateIso}
              {...(includeShowTypeAttr && show.showType ? { "data-show-type": show.showType } : {})}
            >
              <td className="px-5 py-3.5" data-label="Name">
                <span className="text-white text-[0.87rem]">{show.event}</span>
                <span className="block sm:hidden text-[#8e8ea3] text-[0.75rem] mt-0.5">{show.location}</span>
              </td>
              <td className="px-5 py-3.5 text-[#a9a9be] text-[0.85rem] hidden sm:table-cell" data-label="Location">
                {show.location}
              </td>
              <td className="px-5 py-3.5 text-right text-[#b3b3c8] text-[0.82rem] whitespace-nowrap" data-label="Date">
                {show.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Sortable `<th>` with a button — mirrors gorfed.net `past-shows-sort-btn` + `aria-sort` behaviour.
 */
function SortableTh(props: {
  column: SortKey;
  label: string;
  sort: ColumnSort;
  onSort: (key: SortKey) => void;
  align?: "left" | "right";
}) {
  const { column, label, sort, onSort, align = "left" } = props;
  const aria = ariaSortValue(sort, column);
  const alignClass = align === "right" ? "text-right" : "text-left";
  const btnAlign = align === "right" ? "justify-end w-full" : "justify-start";

  return (
    <th scope="col" className={`px-5 py-3.5 ${alignClass}`} aria-sort={aria}>
      <button
        type="button"
        className={`past-shows-sort-btn group/sort inline-flex items-center gap-1.5 ${btnAlign} text-[0.7rem] uppercase tracking-wider text-[#9a9ab1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0066] rounded-sm cursor-pointer bg-transparent border-0 p-0 font-inherit`}
        data-sort-key={column}
        aria-label={sortAriaLabel(sort, column)}
        onClick={() => onSort(column)}
      >
        <ChevronDown
          size={14}
          className={`shrink-0 text-[#00e5ff]/60 transition-transform group-hover/sort:text-[#00e5ff] ${aria === "ascending" ? "-rotate-180" : ""} ${aria === "none" ? "opacity-40" : "opacity-100"}`}
          aria-hidden="true"
        />
        <span className="transition-colors group-hover/sort:text-[#ff0066]">{label}</span>
      </button>
    </th>
  );
}

/** Hero, upcoming table, featured sets, then sortable performance history. */
export function LivePage() {
  const uid = useId();
  const filterId = `${uid}-past-shows-filter`;
  const statusId = `${uid}-past-shows-status`;

  const [upcomingSort, setUpcomingSort] = useState<ColumnSort>({ key: "date", dir: "asc" });
  const [pastSort, setPastSort] = useState<ColumnSort>({ key: "date", dir: "desc" });
  const [typeFilter, setTypeFilter] = useState<PastShowFilterValue>("all");

  const sortedUpcoming = useMemo(
    () => sortEventRows(upcomingShows, upcomingSort.key, upcomingSort.dir),
    [upcomingSort],
  );

  const filteredPast = useMemo(() => {
    if (typeFilter === "all") return pastPerformances;
    return pastPerformances.filter((row) => row.showType === typeFilter);
  }, [typeFilter]);

  const sortedPast = useMemo(
    () => sortEventRows(filteredPast, pastSort.key, pastSort.dir),
    [filteredPast, pastSort],
  );

  const filterStatusText = useMemo(() => {
    const visible = filteredPast.length;
    const total = pastPerformances.length;
    return `Showing ${visible} of ${total} past performances. ${filterLabel(typeFilter)} filter selected.`;
  }, [filteredPast.length, typeFilter]);

  const handleUpcomingSort = (clickedKey: SortKey) => {
    setUpcomingSort((prev) => {
      const same = prev.key === clickedKey;
      const dir = nextSortDirection(clickedKey, prev.dir, same);
      return { key: clickedKey, dir };
    });
  };

  const handlePastSort = (clickedKey: SortKey) => {
    setPastSort((prev) => {
      const same = prev.key === clickedKey;
      const dir = nextSortDirection(clickedKey, prev.dir, same);
      return { key: clickedKey, dir };
    });
  };

  return (
    <div className="min-h-screen">
      <PageIntro
        eyebrow="Upcoming Shows"
        title="Live Dates"
        titleId="live-page-title"
        lead="Current listings for billed performances."
      />

      <section className={sectionFirstAfterIntroBordered} aria-labelledby="upcoming-table-heading">
        <div className={contentShellInnerClass}>
          <h2 id="upcoming-table-heading" className="sr-only">
            Upcoming performances
          </h2>
          {sortedUpcoming.length === 0 ? (
            <div
              className={`${stackAfterHeading} rounded-xl border border-[rgba(255,0,102,0.14)] bg-[#0a0a16] px-5 py-4 sm:px-6 sm:py-5`}
              role="status"
            >
              <p className="text-[#a9a9be] text-[0.9rem]">No upcoming shows at the moment.</p>
              <Link
                to={PAGE_HREF.contact}
                className={`mt-2.5 inline-block text-[0.87rem] ${textLinkPlain} ${focusRing} rounded-sm`}
              >
                Get in touch to book
              </Link>
            </div>
          ) : (
            <>
              <div className={`${stackAfterHeading} space-y-4 sm:hidden`}>
                <EventCards rows={sortedUpcoming} />
              </div>

              <div className={`${stackAfterHeading} hidden sm:block`}>
                <EventsTable rows={sortedUpcoming} sort={upcomingSort} onSort={handleUpcomingSort} />
              </div>
            </>
          )}
        </div>
      </section>

      <FeaturedRecordingsSection />

      <section className={sectionStackedBand} aria-labelledby="history-heading">
        <div className={contentShellInnerClass}>
          <div className={`flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-end lg:justify-between ${stackMarginBottom}`}>
            <SectionHeading
              tag="Performance History"
              title="40+ Shows Since 2004"
              description="A long, mostly complete list of past performances."
              id="history-heading"
            />
            <div className="group/filter relative w-full max-w-xs flex-shrink-0" role="group" aria-label="Filter past performances by type">
              <label htmlFor={filterId} className="sr-only">
                Filter past performances by type
              </label>
              <select
                id={filterId}
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value as PastShowFilterValue);
                }}
                className="appearance-none w-full h-12 bg-[#0a0a16] border border-[rgba(255,0,102,0.14)] rounded-lg px-4 pr-10 text-white text-[0.85rem] cursor-pointer focus:outline-none focus:border-[#ff0066] focus:ring-1 focus:ring-[#ff0066] transition-colors"
                autoComplete="off"
              >
                {PAST_SHOW_FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#00e5ff]/55 transition-colors group-hover/filter:text-[#00e5ff]"
                aria-hidden="true"
              />
            </div>
          </div>

          <p id={statusId} className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {filterStatusText}
          </p>

          <div className="space-y-4 sm:hidden">
            <EventCards rows={sortedPast} includeShowTypeAttr />
          </div>

          <div className="hidden sm:block">
            <EventsTable rows={sortedPast} sort={pastSort} onSort={handlePastSort} includeShowTypeAttr />
          </div>
        </div>
      </section>
    </div>
  );
}
