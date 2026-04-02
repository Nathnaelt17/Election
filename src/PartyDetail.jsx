import { Link, useParams } from "react-router-dom";
import { getPartyById } from "./partyData";

function PartyDetail() {
  const { partyId } = useParams();
  const party = getPartyById(partyId);

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
