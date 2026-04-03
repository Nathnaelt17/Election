import { Link, useParams } from "react-router-dom";

const partyCards = [
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

function PartyDetail() {
  const { partyId } = useParams();
  const party = partyCards.find((party) => party.id === partyId);

  if (!party) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#156064] via-[#00C49A] to-[#156064] flex items-center justify-center px-6">
        <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl text-center max-w-lg">
          <h1 className="text-2xl font-bold text-[#156064]">Party not found</h1>
          <p className="text-gray-600 mt-3">We couldn&apos;t find a details page for that party.</p>
          <Link
            to="/home"
            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-[#00C49A] to-[#156064] text-white font-semibold rounded-lg"
          >
            Back to Parties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#156064] via-[#00C49A] to-[#156064] relative overflow-hidden px-6 py-10">
      <div className="absolute w-[400px] h-[400px] bg-[#F8E16C] opacity-20 rounded-full -top-32 -left-32 blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#00C49A] opacity-20 rounded-full -bottom-40 -right-40 blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[#00C49A] font-semibold">Party Details</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#156064] mt-3">
          {party.detailPage.heading}
        </h1>
        {party.logoUrl && (
          <div className="mt-6 rounded-3xl bg-white border border-[#156064]/10 p-5 flex items-center justify-center">
            <img
              src={party.logoUrl}
              alt={`${party.name} logo`}
              className="max-h-36 w-auto object-contain"
            />
          </div>
        )}
        <p className="text-gray-600 mt-4 leading-7">{party.detailPage.intro}</p>

        <div className="mt-8 rounded-3xl bg-[#F4FBF8] border border-[#00C49A]/15 p-6">
          <h2 className="text-xl font-bold text-[#156064]">Overview</h2>
          <p className="text-gray-700 mt-4 leading-7">{party.detailPage.overview}</p>
        </div>

        <section className="mt-8 rounded-3xl bg-white border border-[#156064]/10 p-6">
          <h2 className="text-xl font-bold text-[#156064]">Additional information</h2>
          <div className="mt-4 grid gap-4">
            {party.detailPage.profile.map((item) => (
              <div key={item.title} className="rounded-2xl bg-[#F8FFFC] border border-[#156064]/10 p-5">
                <h3 className="text-lg font-semibold text-[#156064]">{item.title}</h3>
                <p className="text-gray-600 mt-3 leading-6">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white border border-[#156064]/10 p-6">
          <h2 className="text-xl font-bold text-[#156064]">About this party</h2>
          <ul className="mt-4 space-y-3 text-gray-700 leading-6">
            {party.detailPage.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#00C49A]"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 text-center">
          <Link
            to="/home"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#00C49A] to-[#156064] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00C49A]/40 transition"
          >
            Back to Parties
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PartyDetail;
