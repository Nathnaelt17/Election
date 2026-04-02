export const partyCards = [
  {
    id: "pp",
    name: "Prosperity Party",
    shortName: "Belsegena",
    logoUrl: "https://en.wikipedia.org/wiki/Special:FilePath/Prosperity%20Party%20logo.svg",
    description:
      "A nationally registered Ethiopian political party featured in the current election cycle.",
    detail:
      "Open the details page to read more about its identity and how it appears in election materials.",
    symbol: "wheat",
    detailPage: {
      heading: "Prosperity Party",
      intro:
        "Prosperity Party is one of the nationally registered parties shown in Ethiopia's current election materials. For users of this app, it can be understood as a party with a broad national profile and a clear ballot identity.",
      overview:
        "The party was formally recognized by NEBE in 2019 and is commonly presented as a nationwide party rather than a region-specific one. On this platform, the goal is not to persuade the voter, but to help the voter recognize the party by name, category, and symbol before making a decision.",
      profile: [
        {
          title: "What the party represents in this app",
          text:
            "Here, Prosperity Party is presented as a nationally participating party in the federal election context. The information focuses on recognition and clarity rather than campaign messaging.",
        },
        {
          title: "How voters can recognize it",
          text:
            "The wheat stalk symbol is the clearest visual marker for Prosperity Party in the official contesting-party list. That is why the card and party page both use that symbol as the main identifier.",
        },
      ],
      highlights: [
        "NEBE includes Prosperity Party in its national political parties list.",
        "The official contesting-party symbol list identifies the party with a wheat stalk.",
        "The page content is kept separate so the selected card leads to party-specific information only.",
      ],
    },
  },
  {
    id: "ezema",
    name: "Ethiopian Citizens for Social Justice",
    shortName: "EZEMA",
    logoUrl: "https://en.wikipedia.org/wiki/Special:FilePath/Ethiopian%20Citizens%20for%20Social%20Justice%20logo.png",
    description:
      "A nationally listed Ethiopian political party known by the short name EZEMA.",
    detail:
      "Open the details page to see a fuller description and how voters can recognize it.",
    symbol: "scale",
    detailPage: {
      heading: "Ethiopian Citizens for Social Justice (EZEMA)",
      intro:
        "Ethiopian Citizens for Social Justice, commonly referred to as EZEMA, is one of the national political parties presented in Ethiopia's 7th General Election materials.",
      overview:
        "The party's full name emphasizes citizenship and social justice, which helps users understand the identity it presents in public political life. In this app, EZEMA is described in a neutral way so users can recognize it by name, symbol, and election status without being pushed toward a particular view.",
      profile: [
        {
          title: "What the party represents in this app",
          text:
            "EZEMA is shown here as a nationally listed party with a distinct civic-sounding identity. The app treats it as one of the parties users may want to compare before voting.",
        },
        {
          title: "How voters can recognize it",
          text:
            "The balance scale is the symbol attached to EZEMA in the official contesting-party list. That symbol gives voters a simple visual way to identify the party.",
        },
      ],
      highlights: [
        "NEBE lists EZEMA among Ethiopia's national political parties.",
        "The official symbol assigned to EZEMA in the contesting-party list is a balance scale.",
        "The detail page is specific to EZEMA so the information matches the selected card.",
      ],
    },
  },
  {
    id: "balderas",
    name: "Balderas for Genuine Democracy",
    shortName: "Balderas",
    logoUrl: "https://en.wikipedia.org/wiki/Special:FilePath/Balderas%20Paarty.png",
    description:
      "An Ethiopian political party presented here under the short name Balderas.",
    detail:
      "Open the details page to learn more about the party's background and how users can recognize it.",
    symbol: "clock",
    detailPage: {
      heading: "Balderas for Genuine Democracy",
      intro:
        "Balderas for Genuine Democracy is an Ethiopian political party that emerged in Addis Ababa's political space and later became known nationally through opposition activism and public debate.",
      overview:
        "Public reporting describes Balderas as a party founded in 2019 and associated with political activist Eskinder Nega. In this app, the party is presented in a neutral way so users can understand its name, background, and visual identity before deciding whether to explore it further.",
      profile: [
        {
          title: "What the party represents in this app",
          text:
            "Balderas is shown here as a distinct Ethiopian political party with its own profile, separate from the other parties on the home page, so users can read about it on its own terms.",
        },
        {
          title: "How voters can recognize it",
          text:
            "The party is identified in this interface by its name and logo, helping users distinguish it from the other parties displayed on the home screen.",
        },
      ],
      highlights: [
        "Balderas for Genuine Democracy is widely described as a party founded in 2019.",
        "Public reporting has associated the party with Addis Ababa politics and with opposition figure Eskinder Nega.",
        "The detail page is limited to Balderas so the information stays tied to the selected card.",
      ],
    },
  },
];

export function getPartyById(partyId) {
  return partyCards.find((party) => party.id === partyId);
}
