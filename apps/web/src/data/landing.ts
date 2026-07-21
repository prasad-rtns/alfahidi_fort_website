import type { LandingPayload } from "@/types/landing";

const asset = (name: string) => `/assets/home/${name}.png`;

const thumbnail = {
  src: asset("817cfed82c580c1797e98cd2899a66a237a596c0"),
  alt: "Al Fahidi Fort emblem marker"
};

export function getMockLandingData(locale: "en" | "ar"): LandingPayload {
  return {
    locale,
    hero: {
      image: {
        src: asset("8ab53a40f6f21db6e5a8469000a2cd38a9fe5cbe"),
        alt: "Al Fahidi Fort courtyard at dusk"
      },
      ornament: {
        src: asset("c835b8583dd9faa532e167e3eea5630c2f4231fe"),
        alt: "Decorative fort motif"
      }
    },
    ticker: [
      "DUBAI FREE PORT EXHIBITION UNTIL 29TH JANUARY",
      "OPEN TODAY: 10:30 AM - 6 PM",
      "MORE EVENTS ON SUNDAY",
      "DUBAI FREE PORT"
    ],
    feature: {
      id: "history-meets-future",
      title: "A place where history meets future",
      until: "29 JAN",
      description:
        "Step inside the story of Dubai through architecture, trade, craft, and everyday life inside one of the city's most important historic landmarks.",
      image: {
        src: asset("356eeb935f5a39de2e9ab67426a8bc8942bce0d9"),
        alt: "Historic Al Fahidi exhibition installation"
      },
      thumbnail,
      shape: "wide"
    },
    exhibitions: [
      {
        id: "origins-visions",
        title: "Origins visions",
        until: "29 JAN",
        description:
          "Objects, maps, and voices trace the origins of the fort and its role in the city's changing civic life.",
        image: {
          src: asset("a54ffe563d6773bc2f60c942869ba6f6d13be927"),
          alt: "Exhibition object display"
        },
        thumbnail,
        shape: "circle"
      },
      {
        id: "fishing-village",
        title: "Dubai fishing village",
        until: "29 JAN",
        description:
          "A look at the creekside communities, boats, nets, and rhythms that shaped early coastal life in Dubai.",
        image: {
          src: asset("a414256e0f2e38adbace65848e8d7ac41adebc32"),
          alt: "Dubai fishing village scene"
        },
        thumbnail,
        shape: "circle"
      },
      {
        id: "vernacular-architecture",
        title: "Vernacular architecture",
        until: "29 JAN",
        description:
          "Explore palm frond houses, wind towers, courtyards, and the environmental intelligence of regional design.",
        image: {
          src: asset("48674090da258a61c791cd00ca04f0ab5eae5098"),
          alt: "Vernacular architecture detail"
        },
        thumbnail,
        shape: "circle"
      },
      {
        id: "ceremonials",
        title: "Power of ceremonials",
        until: "29 JAN",
        description:
          "Ritual objects and gathering spaces reveal how ceremony, welcome, and memory shaped public life.",
        image: {
          src: asset("ddf3929089901f919ccb5cec8bcef57269bad28d"),
          alt: "Ceremonial exhibition room"
        },
        thumbnail,
        shape: "portrait"
      },
      {
        id: "free-port",
        title: "Dubai free port",
        until: "29 JAN",
        description:
          "Trade routes, merchants, textiles, and archival details connect the fort to Dubai's expanding global networks.",
        image: {
          src: asset("d236e945a5044c14489b2e7ea53c5604cf70cc94"),
          alt: "Trade exhibition gallery"
        },
        thumbnail,
        shape: "wide"
      }
    ],
    tours: [
      {
        id: "guided-tour",
        title: "Exhibition guided tour",
        description:
          "Join a museum guide for a focused walk through the fort, its galleries, and the objects that define Dubai's early story.",
        image: {
          src: asset("e9323ff8ffb7ccb4f690c77098e1e1820215ab23"),
          alt: "Guided museum tour"
        }
      },
      {
        id: "family-trail",
        title: "Family discovery trail",
        description:
          "A slower-paced visit designed around discovery moments, tactile stations, and stories for younger visitors.",
        image: {
          src: asset("c7d7122132398baf8c2664cd0d16250039849475"),
          alt: "Family exhibition activity"
        }
      }
    ]
  };
}
