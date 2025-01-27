import { Head } from '@inertiajs/react';
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";

export default function Company() {
  return (
    <div className="min-h-screen bg-[#25324B]">
      <Head title="Company | Skill Bridge" />
      <div className="p-4 xl:px-32 md:px-5">
        <NavBar />
        <div className="mt-10 text-white">
          <h1 className="text-4xl font-bold mb-6">About Our Company</h1>
          <div className="bg-white/10 rounded-lg p-8">
            <p className="text-lg mb-4">
              Skill Bridge connects talented professionals with innovative companies. 
              We're building the future of recruitment, making job searching and hiring 
              more efficient and enjoyable.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p>To bridge the gap between talent and opportunity.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                <p>Creating a world where every career journey is meaningful.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                <p>Innovation, Integrity, and Excellence in all we do.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
