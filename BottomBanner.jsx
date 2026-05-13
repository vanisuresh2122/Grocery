import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className="relative mt-24 rounded-2xl overflow-hidden bg-[#f3fbf7]">

      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="hidden md:block w-full"
      />

      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="md:hidden w-full"
      />

      <div
        className="
          md:absolute md:inset-0
          flex flex-col md:flex-row
          px-6 md:px-24
          py-10 md:py-0
        "
      >

        <div className="hidden md:block md:w-1/2"></div>

    
        <div className="w-full flex items-center  md:justify-center">
          <div className="max-w-">

            <h1 className="text-2xl md:text-4xl font-semibold text-primary mb-8">
              Why We Are the Best?
            </h1>

            <div className="flex flex-col gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-5">

                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-6"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default BottomBanner
