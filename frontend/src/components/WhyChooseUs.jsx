import React from "react";
import Title from "./Title";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import {assets} from "../assets/assets.js"

const WhyChooseUs = () => {
  const stats = [
    {
      number: "10K+",
      title: "Happy Customers",
      text: "Trusted by thousands of travelers worldwide",
      subtext:
        "With a strong reputation for excellence, our customers return to us again and again for seamless experiences, competitive pricing you can count on.",
      icon: <AttachMoneyIcon className="text-accent text-5xl md:text-6xl" />,
      photo:assets.happyCustomer
    },
    {
      number: "500+",
      title: "Cars Available",
      text: "A wide range of vehicles tailored to your needs",
      subtext:
        "From compact cars for city trips to premium SUVs for family adventures, we make sure you always have the perfect ride for every journey you take.",
      icon: <DirectionsCarFilledIcon className="text-accent text-5xl md:text-6xl" />,
      photo:assets.carsAvailable
    },
    {
      number: "24/7",
      title: "Customer Support",
      text: "Always ready to assist, anytime, anywhere, anyone",
      subtext:
        "Our dedicated support team is available around the clock, ensuring that help is just a call or message away whenever you need it most.",
      icon: <SupportAgentIcon className="text-accent text-5xl md:text-6xl" />,
      photo:assets.customerSupport
    },
  ];

  return (
    <div className="pt-16 px-6 max-w-[90%] mx-auto mb-4">
      
      <div>
        <Title
          title="Why Choose Us"
          subtitle="Your Journey, Our Priority"
          text="Discover the key reasons drivers choose us every day"
          direction="center"
          color="background"
        />
      </div>

      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12   ">
        {stats.map((item, index) => (
          <div key={index} className="">
              <div className="flex   justify-start items-center">
                  <p className="font-semibold pr-4 text-3xl border-r">{item.number}</p>
                  <p className="pl-4 text-lg ">{item.title}</p>
              </div>
              <hr className="w-full  border-t border-gray-950 mt-4" />
              <p className="mt-7 font-medium">{item.text}</p>
              <p className="mt-1 text-xs text-textSecondary">{item.subtext}... <a className="text-accent font-medium underline hover:text-accent/80" href="">read more</a></p>
              <div className="mt-7 rounded-xl overflow-hidden h-48">
                <img className="w-full h-full object-cover" src={item.photo} alt="" />
              </div>
              
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
