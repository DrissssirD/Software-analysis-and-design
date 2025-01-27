import { Head } from '@inertiajs/react';
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
export default function Pricing() {
    const plans = [
      {
        name: "Basic",
        price: "Free",
        features: ["Basic job search", "Profile creation", "Apply to 10 jobs/month"]
      },
      {
        name: "Professional",
        price: "$29/month",
        features: ["Advanced search", "Priority applications", "Unlimited applications"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Custom solutions", "Dedicated support", "Advanced analytics"]
      }
    ];
  
    return (
      <div className="min-h-screen bg-[#25324B]">
        <Head title="Pricing | Skill Bridge" />
        <div className="p-4 xl:px-32 md:px-5">
          <NavBar />
          <div className="mt-10 text-white">
            <h1 className="text-4xl font-bold mb-6">Pricing Plans</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div key={plan.name} className="bg-white/10 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-3xl font-bold mb-4">{plan.price}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
  