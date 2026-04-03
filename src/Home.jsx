import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

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
    candidate: "Eyasu Elias Fantahun",
    regionalReps: [
      { name: "Lelise Neme Sori", region: "Addis Ababa" },
      { name: "Seid Ali Kemal", region: "Addis Ababa" },
      { name: "Debresina Muse Manaye", region: "Addis Ababa" }
    ],
    detailPage: {
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
    candidate: "Yohans Mekonnen Delelegn",
    regionalReps: [
      { name: "Elias Negasi Goytom", region: "Addis Ababa" },
      { name: "Kebede Worku Tadesse", region: "Addis Ababa" },
      { name: "Seble Dejene Zeleke", region: "Addis Ababa" }
    ],
    detailPage: {
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
    candidate: "Getaneh Balcha Beshah",
    regionalReps: [
      { name: "Getye Yalew Jemere", region: "Addis Ababa" },
      { name: "Misrak Moges Abate", region: "Addis Ababa" },
      { name: "Tessema Ayalew Asres", region: "Addis Ababa" }
    ],
    detailPage: {
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

const initialVotes = partyCards.reduce((accumulator, party) => {
  accumulator[party.id] = 0;
  return accumulator;
}, {});

function Home() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const [votes, setVotes] = useState(() => {
    const savedVotes = JSON.parse(localStorage.getItem("partyVotes") || "null");
    return savedVotes ? { ...initialVotes, ...savedVotes } : initialVotes;
  });
  const [selectedParty, setSelectedParty] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [voteReceipt, setVoteReceipt] = useState(null);
  const [selectedRegionalReps, setSelectedRegionalReps] = useState([]);
  const [selectedPartyIds, setSelectedPartyIds] = useState([]);

  const handlePartySelect = (partyId) => {
    if (selectedPartyIds.includes(partyId)) {
      setSelectedPartyIds(selectedPartyIds.filter(id => id !== partyId));
    } else {
      setSelectedPartyIds([...selectedPartyIds, partyId]);
    }
  };

  const handleRepToggle = (rep) => {
    if (selectedRegionalReps.find(r => r.name === rep.name && r.region === rep.region)) {
      setSelectedRegionalReps(selectedRegionalReps.filter(r => !(r.name === rep.name && r.region === rep.region)));
    } else if (selectedRegionalReps.length < 3) {
      setSelectedRegionalReps([...selectedRegionalReps, rep]);
    }
  };

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const registeredCount = users.length;
  const votedCount = users.filter((user) => user.hasVoted).length;

  const confirmVote = async () => {
    if (!selectedPartyIds.length || selectedRegionalReps.length !== 3) {
      alert("Please select at least one party and exactly 3 regional representatives.");
      return;
    }

    const firstPartyId = selectedPartyIds[0];
    const partyVoteNumber = votes[firstPartyId] + 1;
    const nextVotes = {
      ...votes,
      [firstPartyId]: partyVoteNumber,
    };

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user) =>
      user.fayda === currentUser.fayda
        ? { ...user, hasVoted: true, votedPartyIds: selectedPartyIds, votedRegionalReps: selectedRegionalReps }
        : user
    );
    const updatedCurrentUser = {
      ...currentUser,
      hasVoted: true,
      votedPartyIds: selectedPartyIds,
      votedRegionalReps: selectedRegionalReps,
    };

    const userId = currentUser?.id || currentUser?.fayda || "anonymous";
    const { data, error } = await supabase.from("votes").insert([
      {
        user_id: userId,
        party_ids: selectedPartyIds,
        regional_reps: selectedRegionalReps,
        created_at: new Date().toISOString(),
      },
    ]).select();

    console.log("Supabase insert response:", { data, error });

    if (error) {
      console.error("Supabase insert error:", error);
      alert(`Vote failed to send to server: ${error.message}`);
      return;
    }

    // persist locally only after successful DB write
    localStorage.setItem("partyVotes", JSON.stringify(nextVotes));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(updatedCurrentUser));
    setVotes(nextVotes);

    setVoteReceipt({
      partyNames: selectedPartyIds.map((id) => partyCards.find((p) => p.id === id).name).join(", "),
      regionalReps: selectedRegionalReps,
    });

    setSelectedPartyIds([]);
    setSelectedRegionalReps([]);

    window.setTimeout(() => {
      localStorage.removeItem("user");
      navigate("/login");
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#156064] via-[#00C49A] to-[#156064] relative overflow-hidden px-6 py-10">
      <div className="absolute w-[400px] h-[400px] bg-[#F8E16C] opacity-20 rounded-full -top-32 -left-32 blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#00C49A] opacity-20 rounded-full -bottom-40 -right-40 blur-3xl"></div>

      <div className="text-center text-white mb-10 relative z-10">
        <h1 className="text-4xl font-bold">Parties in Ethiopia&apos;s Election</h1>
        <p className="text-lg opacity-100 mt-3 max-w-3xl mx-auto">
          Registered: <span className="text-xl font-extrabold">{registeredCount}</span> • Voted: <span className="text-xl font-extrabold">{votedCount}</span>
        </p>
        <div className="w-20 h-1 bg-[#F8E16C] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {partyCards.map((party) => (
          <PartyCard 
            key={party.id} 
            {...party} 
            selectedPartyIds={selectedPartyIds}
            selectedRegionalReps={selectedRegionalReps}
            onPartySelect={handlePartySelect}
            onRepToggle={handleRepToggle}
          />
        ))}
      </div>

      <div className="text-center mt-8 relative z-10">
        <button
          onClick={confirmVote}
          disabled={!selectedPartyIds.length || selectedRegionalReps.length !== 3}
          className="px-8 py-3 bg-gradient-to-r from-[#00C49A] to-[#156064] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00C49A]/40 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Vote ({selectedPartyIds.length} parties, {selectedRegionalReps.length}/3 reps selected)
        </button>
      </div>

      {voteReceipt && (
        <ReceiptModal
          partyNames={voteReceipt.partyNames}
          regionalReps={voteReceipt.regionalReps}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

function PartyCard({ id, name, shortName, description, detail, symbol, logoUrl, candidate, regionalReps, selectedPartyIds, selectedRegionalReps, onPartySelect, onRepToggle }) {
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">
      <PartyLogo logoUrl={logoUrl} name={name} symbol={symbol} shortName={shortName} />

      <h2 className="text-xl font-bold text-[#156064] text-center mt-5">{name}</h2>
      <p className="text-xs uppercase tracking-[0.3em] text-center text-[#00C49A] mt-2">{shortName}</p>

      <p className="text-gray-700 text-sm text-center mt-4 leading-6">{description}</p>
      <p className="text-gray-500 text-sm text-center mt-2 leading-6">{detail}</p>

      <div className="mt-4 rounded-2xl bg-[#F4FBF8] border border-[#00C49A]/15 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#156064]/70">HoPR Candidate</p>
            <p className="text-lg font-bold text-[#156064] mt-2">{candidate}</p>
          </div>
          <input
            type="checkbox"
            checked={selectedPartyIds.includes(id)}
            onChange={() => onPartySelect(id)}
            className="form-checkbox h-5 w-5 text-[#00C49A]"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2">
        <p className="text-xs uppercase tracking-[0.25em] text-[#156064]/70 px-1">RC Candidates</p>
        {regionalReps.map((rep, index) => (
          <div key={index} className="rounded-xl bg-[#E8F5F0] border border-[#00C49A]/10 px-3 py-2 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#156064]/60">{rep.region} RC Candidate</p>
              <p className="text-sm font-semibold text-[#156064] mt-1">{rep.name}</p>
            </div>
            <input
              type="checkbox"
              checked={selectedRegionalReps.some(r => r.name === rep.name && r.region === rep.region)}
              onChange={() => onRepToggle(rep)}
              disabled={!selectedRegionalReps.some(r => r.name === rep.name && r.region === rep.region) && selectedRegionalReps.length >= 3}
              className="form-checkbox h-4 w-4 text-[#00C49A]"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <Link to={`/more_info/${id}`} className="text-center text-sm text-[#00C49A] hover:underline">
          More Details
        </Link>
      </div>
    </div>
  );
}

function PartyLogo({ logoUrl, name, symbol, shortName }) {
  if (logoUrl) {
    return (
      <div className="rounded-3xl bg-white border border-[#156064]/10 p-4 h-40 flex items-center justify-center">
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="max-h-28 w-auto object-contain"
        />
      </div>
    );
  }

  return <PartySymbol symbol={symbol} shortName={shortName} />;
}

function ReceiptModal({ partyNames, regionalReps }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl animate-fadeIn">
        <FaCheckCircle className="text-[#00C49A] text-4xl mx-auto mb-3" />
        <h2 className="text-xl font-bold text-[#156064] mb-2">Vote Recorded</h2>
        <p className="text-gray-600 text-sm leading-6">
          Your vote for <span className="font-semibold text-[#156064]">{partyNames}</span> has been saved.
        </p>
        <p className="text-gray-600 text-sm leading-6 mt-2">
          Regional representatives: {regionalReps.map(rep => `${rep.name} (${rep.region})`).join(', ')}
        </p>
        <p className="text-xs text-gray-500 mt-3">
          You&apos;ll be logged out and returned to the sign-in page shortly.
        </p>
      </div>
    </div>
  );
}

function formatOrdinal(value) {
  const remainderTen = value % 10;
  const remainderHundred = value % 100;

  if (remainderHundred >= 11 && remainderHundred <= 13) {
    return `${value}th`;
  }

  if (remainderTen === 1) {
    return `${value}st`;
  }

  if (remainderTen === 2) {
    return `${value}nd`;
  }

  if (remainderTen === 3) {
    return `${value}rd`;
  }

  return `${value}th`;
}

function PartySymbol({ symbol, shortName }) {
  if (symbol === "wheat") {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-[#F8E16C] via-[#FFF8D9] to-white p-4">
        <svg viewBox="0 0 220 140" className="w-full h-32" role="img" aria-label="Wheat stalk symbol illustration">
          <rect x="18" y="18" width="184" height="104" rx="22" fill="#156064" opacity="0.08" />
          <circle cx="110" cy="70" r="42" fill="#ffffff" stroke="#156064" strokeWidth="4" />
          <path d="M110 40v54" stroke="#156064" strokeWidth="5" strokeLinecap="round" />
          <path d="M110 48c-12 2-20 10-24 20 12 0 21-5 24-20Z" fill="#F4B400" />
          <path d="M110 58c12 2 20 10 24 20-12 0-21-5-24-20Z" fill="#F4B400" />
          <path d="M110 70c-12 2-18 9-22 18 11 0 18-4 22-18Z" fill="#F8E16C" stroke="#D4A62A" strokeWidth="1.5" />
          <path d="M110 78c12 2 18 9 22 18-11 0-18-4-22-18Z" fill="#F8E16C" stroke="#D4A62A" strokeWidth="1.5" />
          <text x="110" y="122" textAnchor="middle" fill="#156064" fontSize="13" fontWeight="700">
            {shortName}
          </text>
        </svg>
      </div>
    );
  }

  if (symbol === "scale") {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-[#E8FBF5] via-white to-[#F8E16C]/40 p-4">
        <svg viewBox="0 0 220 140" className="w-full h-32" role="img" aria-label="Balance scale symbol illustration">
          <rect x="18" y="18" width="184" height="104" rx="22" fill="#156064" opacity="0.08" />
          <circle cx="110" cy="70" r="42" fill="#ffffff" stroke="#156064" strokeWidth="4" />
          <path d="M110 42v42M82 56h56M110 56l-18 18M110 56l18 18" fill="none" stroke="#156064" strokeWidth="5" strokeLinecap="round" />
          <path d="M74 78h22c-1-8-6-13-11-18-5 5-10 10-11 18Z" fill="#00C49A" opacity="0.7" />
          <path d="M124 78h22c-1-8-6-13-11-18-5 5-10 10-11 18Z" fill="#00C49A" opacity="0.7" />
          <rect x="96" y="88" width="28" height="8" rx="4" fill="#F8E16C" stroke="#156064" strokeWidth="2" />
          <text x="110" y="122" textAnchor="middle" fill="#156064" fontSize="13" fontWeight="700">
            {shortName}
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white via-[#E8FBF5] to-[#DFF7EF] p-4">
      <svg viewBox="0 0 220 140" className="w-full h-32" role="img" aria-label="Clock symbol illustration">
        <rect x="18" y="18" width="184" height="104" rx="22" fill="#156064" opacity="0.08" />
        <circle cx="110" cy="70" r="42" fill="#ffffff" stroke="#156064" strokeWidth="4" />
        <circle cx="110" cy="70" r="5" fill="#00C49A" />
        <path d="M110 70V49" stroke="#156064" strokeWidth="5" strokeLinecap="round" />
        <path d="M110 70l18 10" stroke="#F4B400" strokeWidth="5" strokeLinecap="round" />
        <path d="M110 32v8M110 100v8M72 70h-8M148 70h8" stroke="#156064" strokeWidth="3" strokeLinecap="round" />
        <text x="110" y="122" textAnchor="middle" fill="#156064" fontSize="13" fontWeight="700">
          {shortName}
        </text>
      </svg>
    </div>
  );
}

export default Home;
