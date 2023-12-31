import Comments from '@/components/Comments'
import GetStarted from '@/components/GetStarted'
import MissionCom from './MissionCom'
import OurTeam from './OurTeam'
import React from 'react'
import LearnMore from './LearnMore'

const AboutUs = () => {
  return (
    <div>
    <section className="grid justify-items-center w-full">
      <div className="grid py-12 container">
        <div className="pt-10 flex flex-col text-center lg:text-left">
          <p className="text-xl md:text-2xl lg:text-3xl text-lightGreen font-bold pb-8 ">Who We Are</p>
          <p className="header-1">We are here to support all people and help each other as we can</p>
          <p className="sub-header pt-10 lg:w-3/5">
            OpenHanded is a community-powered fundraising platform. We believe that help is powerful, which is why we are committed to making it safe and easy for anyone to give and get help. Wallet Max is committed to empowering secure and inclusive financial access for everyone, especially the unbanked and the underbanked, and providing quality investment education globally through our proprietary rewards personalization and real-time predictions engine.
          </p>
        </div>
        <img className="scale-[0.6] mx-auto transition ease-in-out hover:scale-[0.8] hover:rotate-[5deg] duration-700"
          src="https://firebasestorage.googleapis.com/v0/b/crowdfunding-99b5a.appspot.com/o/hero.png?alt=media&token=f25e81a6-bb2e-4797-b4b0-a03d495988bb"
          alt="Writing smth"
        />
      </div>
      </section>
      <MissionCom />
      <OurTeam />
      <LearnMore />
      <GetStarted />
      <Comments />
      </div>
  )
}

export default AboutUs