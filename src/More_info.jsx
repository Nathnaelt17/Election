import React from "react";
import { Link } from "react-router-dom";
import candidatePhoto from "./assets/download.png"; 

const CandidateProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#156064] via-[#00C49A] to-[#156064] relative overflow-hidden px-6 py-10">

      {/* Background blobs */}
      <div className="absolute w-[400px] h-[400px] bg-[#F8E16C] opacity-20 rounded-full -top-32 -left-32 blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#00C49A] opacity-20 rounded-full -bottom-40 -right-40 blur-3xl"></div>

      {/* Card Container */}
      <div className="relative z-10 max-w-3xl mx-auto bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#156064]">Candidate</h1>
          <p className="text-gray-600 mt-1"><strong>Party:</strong> National Progress Party</p>
          <p className="text-gray-600"><strong>Running for:</strong> President</p>

          {/* Candidate Image */}
          <img
            src={candidatePhoto}
            alt="Candidate"
            className="w-32 h-32 mx-auto mt-4 rounded-full object-cover border-4 border-[#00C49A]"
          />
        </div>

        {/* About */}
        <h2 className="text-xl font-bold text-[#00C49A] mt-6 mb-2">About the Candidate</h2>
        <p className="text-gray-700">
          This candidate is a dedicated public servant with over 15 years of experience in leadership,
          governance, and community development. She believes in transparency, equality, and
          sustainable growth.
        </p>

        {/* Key Policies */}
        <h2 className="text-xl font-bold text-[#00C49A] mt-6 mb-2">Key Policies</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Improving access to quality education</li>
          <li>Strengthening the national economy</li>
          <li>Expanding healthcare services</li>
          <li>Creating more job opportunities</li>
        </ul>

        {/* Experience */}
        <h2 className="text-xl font-bold text-[#00C49A] mt-6 mb-2">Experience</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Minister of Education (2015-2019)</li>
          <li>Member of Parliament (2010-2015)</li>
          <li>Community Development Leader</li>
        </ul>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            to="/home"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#00C49A] to-[#156064] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00C49A]/40 transition"
          >
            Back to Candidates
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;