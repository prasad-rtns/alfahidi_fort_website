export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

const asset = (name: string) => `/assets/home/${name}`;

export type HomeContent = ReturnType<typeof getHomeContent>;

const english = {
  announcement:
    "DUBAI FREE PORT EXHIBITION UNTIL 29TH JANUARY    OPEN TODAY: 10:30 AM - 6 PM    MORE EVENTS ON SUNDAY",
  hero: {
    eyebrow: "Dubai Museum",
    title: "Al Fahidi Fort",
    copy: "Walk through the story of Dubai, from coastal trade and craft to the living memory of the fort.",
    image: asset("8ab53a40f6f21db6e5a8469000a2cd38a9fe5cbe.png"),
    revealImage: asset("356eeb935f5a39de2e9ab67426a8bc8942bce0d9.png")
  },
  story: {
    title: "A living landmark at the edge of the creek",
    copy: "The fort anchors a layered journey through settlement, trade, ceremony, and conservation. Archival images and object-led stories pull the visitor from the early city into the museum experience.",
    image: asset("356eeb935f5a39de2e9ab67426a8bc8942bce0d9.png"),
    artifact: asset("ca9b0d43c0a9a3e9707c0ffbdcb128a1d40e4f45.png")
  },
  exhibitions: [
    {
      title: "Origins visions",
      date: "29 JAN",
      image: asset("a54ffe563d6773bc2f60c942869ba6f6d13be927.png")
    },
    {
      title: "Dubai fishing village",
      date: "29 JAN",
      image: asset("a414256e0f2e38adbace65848e8d7ac41adebc32.png")
    },
    {
      title: "Vernacular architecture",
      date: "29 JAN",
      image: asset("48674090da258a61c791cd00ca04f0ab5eae5098.png")
    }
  ],
  connectedPair: {
    left: {
      label: "Exhibition",
      title: "Power of ceremonials",
      copy: "A close view of ceremonial craft, material detail, and the symbolic objects carried through generations.",
      image: asset("ca9b0d43c0a9a3e9707c0ffbdcb128a1d40e4f45.png")
    },
    right: {
      label: "Guide Tour",
      title: "Conservation and care",
      copy: "Follow the mapping lines into the conservation story: how fragile objects are protected, repaired, and interpreted.",
      image: asset("e9323ff8ffb7ccb4f690c77098e1e1820215ab23.png")
    }
  },
  sequence: {
    title: "A place where history meets future",
    copy: "Scroll to move through a short image-sequence treatment built for future CMS-managed frame sets.",
    frames: [
      asset("d236e945a5044c14489b2e7ea53c5604cf70cc94.png"),
      asset("c7d7122132398baf8c2664cd0d16250039849475.png"),
      asset("356eeb935f5a39de2e9ab67426a8bc8942bce0d9.png"),
      asset("8ab53a40f6f21db6e5a8469000a2cd38a9fe5cbe.png")
    ]
  }
};

const arabic: typeof english = {
  ...english,
  announcement: "معرض ميناء دبي الحر حتى 29 يناير    مفتوح اليوم: 10:30 صباحا - 6 مساء",
  hero: {
    ...english.hero,
    eyebrow: "متحف دبي",
    title: "حصن الفهيدي",
    copy: "رحلة بصرية عبر ذاكرة دبي، من الحرف والتجارة إلى تجربة المتحف الحية."
  },
  story: {
    ...english.story,
    title: "معلم حي عند حافة الخور",
    copy: "يقود الحصن تجربة متدرجة عبر الاستقرار والتجارة والطقوس والعناية بالمقتنيات."
  }
};

export function getHomeContent(locale: Locale) {
  return locale === "ar" ? arabic : english;
}
