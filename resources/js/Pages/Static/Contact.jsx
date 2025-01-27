import { Head } from '@inertiajs/react';
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
export default function Contact() {
    return (
      <div className="min-h-screen bg-[#25324B]">
        <Head title="Contact Us | Skill Bridge" />
        <div className="p-4 xl:px-32 md:px-5">
          <NavBar />
          <div className="mt-10 text-white">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <div className="bg-white/10 rounded-lg p-8">
              <form className="max-w-lg">
                <div className="mb-4">
                  <label className="block mb-2">Name</label>
                  <input type="text" className="w-full p-2 rounded bg-white/5 border border-white/20" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Email</label>
                  <input type="email" className="w-full p-2 rounded bg-white/5 border border-white/20" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Message</label>
                  <textarea className="w-full p-2 rounded bg-white/5 border border-white/20" rows="4"></textarea>
                </div>
                <button className="bg-[#4640DE] px-6 py-2 rounded hover:bg-[#3530A8]">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }