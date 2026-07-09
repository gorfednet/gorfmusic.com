/**
 * Live event rows — field names and filter values mirror gorfed.net/music.html
 * (data-show-type, data-sort-date, past-shows-filter-select options) so behaviour stays consistent.
 */

export type ShowType =
  | "venue"
  | "stream"
  | "rave"
  | "corporate"
  | "radio"
  | "house-party"
  | "installation"
  | "festival";

/** `<option value>` for the past-performance filter — must stay in sync with `ShowType` rows. */
export type PastShowFilterValue = "all" | ShowType;

export const PAST_SHOW_FILTER_OPTIONS: { value: PastShowFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "corporate", label: "Corporate" },
  { value: "festival", label: "Festival" },
  { value: "house-party", label: "House Party" },
  { value: "installation", label: "Installation" },
  { value: "radio", label: "Radio" },
  { value: "rave", label: "Rave" },
  { value: "stream", label: "Stream" },
  { value: "venue", label: "Venue" },
];

export interface UpcomingShow {
  event: string;
  location: string;
  date: string;
  /** ISO date string used for sorting (YYYY-MM-DD). */
  sortDateIso: string;
}

export interface PastPerformance {
  event: string;
  location: string;
  date: string;
  sortDateIso: string;
  showType: ShowType;
}

export const upcomingShows: UpcomingShow[] = [];

/** Past performances — content and typing aligned with gorfed.net/music.html (static export). */
export const pastPerformances: PastPerformance[] = [
  {
    event: "Bass & Unity Festival",
    location: "Hill Top Resort, Beaconia, Manitoba, Canada",
    date: "July 3 2026",
    sortDateIso: "2026-07-03",
    showType: "festival",
  },
  {
    event: "More Noise Please!",
    location: "BSMT254, Toronto, Ontario, Canada",
    date: "May 28 2026",
    sortDateIso: "2026-05-28",
    showType: "venue",
  },
  {
    event: "Circadian Aneurysm",
    location: "Penny's, Toronto, Ontario, Canada",
    date: "October 24 2025",
    sortDateIso: "2025-10-24",
    showType: "venue",
  },
  {
    event: "Jungle / DnB with guest Gorf",
    location: "Twitch host: dj_c64",
    date: "October 17 2025",
    sortDateIso: "2025-10-17",
    showType: "stream",
  },
  {
    event: "Gorf - Guest Live P.A.",
    location: "Mixlr host: Juncture Music",
    date: "March 19 2021",
    sortDateIso: "2021-03-19",
    showType: "stream",
  },
  {
    event: "Rave At Your Place #30",
    location: "Twitch host: psykloneGFZ",
    date: "October 22 2020",
    sortDateIso: "2020-10-22",
    showType: "stream",
  },
  {
    event: "Studio Direct Live PA",
    location: "Twitch host: gorfmusic (self)",
    date: "August 25 2020",
    sortDateIso: "2020-08-25",
    showType: "stream",
  },
  {
    event: "Rave At Your Place #21",
    location: "Twitch host: joeyrukkus",
    date: "August 20 2020",
    sortDateIso: "2020-08-20",
    showType: "stream",
  },
  {
    event: "Nuts+Volts",
    location: "Bassline Music Bar, Toronto, Ontario, Canada",
    date: "April 16 2015",
    sortDateIso: "2015-04-16",
    showType: "venue",
  },
  {
    event: "Fourth Friday Fuckabout",
    location: "Cloak & Dagger, Toronto, Ontario, Canada",
    date: "April 25 2014",
    sortDateIso: "2014-04-25",
    showType: "venue",
  },
  {
    event: "Time of the Month (July Edition)",
    location: "Tequila Bookworm, Toronto, Ontario, Canada",
    date: "July 11 2013",
    sortDateIso: "2013-07-11",
    showType: "venue",
  },
  {
    event: "Phoniq: The Nature of Sound #9",
    location: "Musideum, Toronto, Ontario, Canada",
    date: "March 16 2013",
    sortDateIso: "2013-03-16",
    showType: "venue",
  },
  {
    event: "IRQ 10 Year Thing",
    location: "The Gladstone Ballroom, Toronto, Ontario, Canada",
    date: "March 9 2013",
    sortDateIso: "2013-03-09",
    showType: "venue",
  },
  {
    event: "IRQ N:vmbr",
    location: "627 Queen West, Toronto, Ontario, Canada",
    date: "November 10 2012",
    sortDateIso: "2012-11-10",
    showType: "venue",
  },
  {
    event: "Bass:Driven",
    location: "Nocturne, Toronto, Ontario, Canada",
    date: "August 17 2012",
    sortDateIso: "2012-08-17",
    showType: "venue",
  },
  {
    event: "IRQ 42",
    location: "Fountain Enterprises, Toronto, Ontario, Canada",
    date: "July 7 2012",
    sortDateIso: "2012-07-07",
    showType: "venue",
  },
  {
    event: "Coresteppers",
    location: "Nocturne, Toronto, Ontario, Canada",
    date: "April 21 2012",
    sortDateIso: "2012-04-21",
    showType: "venue",
  },
  {
    event: "IRQ HMCR",
    location: "Fountain Enterprises, Toronto, Ontario, Canada",
    date: "February 25 2012",
    sortDateIso: "2012-02-25",
    showType: "venue",
  },
  {
    event: "MiR",
    location: "Under Gardiner Expressway at Humber, Toronto, Ontario, Canada",
    date: "June 3 2011",
    sortDateIso: "2011-06-03",
    showType: "rave",
  },
  {
    event: "FITC 2011 Closing Party",
    location: "Orange Room, Guvernment Complex, Toronto, Ontario, Canada",
    date: "May 4 2011",
    sortDateIso: "2011-05-04",
    showType: "corporate",
  },
  {
    event: "Regent Radio: Hot Jambalaya",
    location: "Radio host: gl.tch",
    date: "May 3 2011",
    sortDateIso: "2011-05-03",
    showType: "radio",
  },
  {
    event: "The Ambient Ping",
    location: "Supermarket, Toronto, Ontario, Canada",
    date: "February 15 2011",
    sortDateIso: "2011-02-15",
    showType: "venue",
  },
  {
    event: "Sherrie & Amber Birthday Magic",
    location: "01system, Toronto, Ontario, Canada",
    date: "February 12 2011",
    sortDateIso: "2011-02-12",
    showType: "house-party",
  },
  {
    event: "IRQ @ Fountain",
    location: "Fountain Enterprises, Toronto, Ontario, Canada",
    date: "November 6 2010",
    sortDateIso: "2010-11-06",
    showType: "venue",
  },
  {
    event: "FITC Google Party",
    location: "Hyde Lounge, Toronto, Ontario, Canada",
    date: "September 17 2010",
    sortDateIso: "2010-09-17",
    showType: "corporate",
  },
  {
    event: "Coresteppers",
    location: "Neutral, Toronto, Ontario, Canada",
    date: "August 25 2010",
    sortDateIso: "2010-08-25",
    showType: "venue",
  },
  {
    event: "IRQ @ InterLNK",
    location: "800 Richmond, Toronto, Ontario, Canada",
    date: "May 22 2010",
    sortDateIso: "2010-05-22",
    showType: "house-party",
  },
  {
    event: "Nuit Blanche: Twilight Orchestra",
    location: "Distillery District, Toronto, Ontario, Canada",
    date: "October 3 2009",
    sortDateIso: "2009-10-03",
    showType: "installation",
  },
  {
    event: "FITC Party",
    location: "424 Wellington, Toronto, Ontario, Canada",
    date: "~April 24 2009",
    sortDateIso: "2009-04-24",
    showType: "corporate",
  },
  {
    event: "Sensoria V5 feat. MRK1",
    location: "Burroughs Building, Toronto, Ontario, Canada",
    date: "March 28 2009",
    sortDateIso: "2009-03-28",
    showType: "venue",
  },
  {
    event: "Feedback Monitor",
    location: "Sublime Cafe, Toronto, Ontario, Canada",
    date: "October 18 2008",
    sortDateIso: "2008-10-18",
    showType: "venue",
  },
  {
    event: "Why? Festival 2008",
    location: "The Chelsea Room, Toronto, Ontario, Canada",
    date: "September 12 2008",
    sortDateIso: "2008-09-12",
    showType: "festival",
  },
  {
    event: "Sunrise DnB Jam",
    location: "El Mocambo, Toronto, Ontario, Canada",
    date: "June 14 2008",
    sortDateIso: "2008-06-14",
    showType: "venue",
  },
  {
    event: "Saturday Night Mashup",
    location: "Siesta Nouveaux, Toronto, Ontario, Canada",
    date: "May 2 2008",
    sortDateIso: "2008-05-02",
    showType: "venue",
  },
  {
    event: "A.I.R Vibrations",
    location: "The Gladstone Art Bar, Toronto, Ontario, Canada",
    date: "April 11 2008",
    sortDateIso: "2008-04-11",
    showType: "venue",
  },
  {
    event: "Broadcast 1.0",
    location: "Le Petit Dejeuner, Toronto, Ontario, Canada",
    date: "October 26 2006",
    sortDateIso: "2006-10-26",
    showType: "venue",
  },
  {
    event: "Hardcorn",
    location: "Smiling Buddha, Toronto, Ontario, Canada",
    date: "October 6 2007",
    sortDateIso: "2007-10-06",
    showType: "venue",
  },
  {
    event: "The Lab Sessions 2.0: Idol Love",
    location: "LabSpace Studio, Toronto, Ontario, Canada",
    date: "September 22 2007",
    sortDateIso: "2007-09-22",
    showType: "venue",
  },
  {
    event: "Unknown Event",
    location: "Unknown Location, Toronto, Ontario, Canada",
    date: "May 8 2005",
    sortDateIso: "2005-05-08",
    showType: "venue",
  },
  {
    event: "MiR & Association of Autonomous Astronauts",
    location: "Humber Bay Park West, Toronto, Ontario, Canada",
    date: "April 5 2005",
    sortDateIso: "2005-04-05",
    showType: "rave",
  },
  {
    event: "New Years Eve",
    location: "233 Carlaw, Toronto, Ontario, Canada",
    date: "December 31 2004",
    sortDateIso: "2004-12-31",
    showType: "rave",
  },
  {
    event: "PIN:KSOX Showcase",
    location: "Hart House, UofT, Toronto, Ontario, Canada",
    date: "December 1 2004",
    sortDateIso: "2004-12-01",
    showType: "venue",
  },
  {
    event: "IRQ (Back Room)",
    location: "Funhaus, Toronto, Ontario, Canada",
    date: "October 27 2004",
    sortDateIso: "2004-10-27",
    showType: "venue",
  },
  {
    event: "IRQ (HMCR Back Room)",
    location: "Funhaus, Toronto, Ontario, Canada",
    date: "October 13 2004",
    sortDateIso: "2004-10-13",
    showType: "venue",
  },
  {
    event: "Softkore 4",
    location: "Oasis, Toronto, Ontario, Canada",
    date: "August 5 2004",
    sortDateIso: "2004-08-05",
    showType: "venue",
  },
];

export type SortKey = "name" | "location" | "date";

/** Mirrors gorfed.net `cmpStr` + date tie-breakers in `initSortableDataTable`. */
export function sortEventRows<T extends { event: string; location: string; sortDateIso: string }>(
  rows: T[],
  key: SortKey,
  dir: "asc" | "desc",
): T[] {
  const mul = dir === "asc" ? 1 : -1;
  const cmpStr = (a: string, b: string) => a.localeCompare(b, undefined, { sensitivity: "base" });

  return [...rows].sort((a, b) => {
    const da = a.sortDateIso;
    const db = b.sortDateIso;
    let cmp = 0;
    if (key === "date") {
      cmp = da < db ? -1 : da > db ? 1 : 0;
      if (cmp === 0) cmp = cmpStr(a.event, b.event);
    } else if (key === "name") {
      cmp = cmpStr(a.event, b.event);
      if (cmp === 0) cmp = da < db ? -1 : da > db ? 1 : 0;
    } else {
      cmp = cmpStr(a.location, b.location);
      if (cmp === 0) cmp = da < db ? -1 : da > db ? 1 : 0;
    }
    return mul * cmp;
  });
}

/**
 * Next sort direction when a column header is activated — matches `initSortableDataTable` click handler
 * on gorfed.net (toggle when same column; otherwise date defaults to desc, others to asc).
 */
export function nextSortDirection(
  clickedKey: SortKey,
  activeDir: "asc" | "desc",
  sameColumn: boolean,
): "asc" | "desc" {
  if (!sameColumn) {
    return clickedKey === "date" ? "desc" : "asc";
  }
  if (activeDir === "asc") return "desc";
  if (activeDir === "desc") return "asc";
  return clickedKey === "date" ? "desc" : "asc";
}
