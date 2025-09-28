import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

const FloatingQuoteButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const buttonRef = useRef(null)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)

  // Button entrance animation
  useGSAP(() => {
    gsap.fromTo(buttonRef.current,
      {
        opacity: 0,
        scale: 0,
        y: 100
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 2
      }
    )

    // Floating animation
    gsap.to(buttonRef.current, {
      y: -5,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    })
  }, [])

  // Modal animations
  useGSAP(() => {
    if (isModalOpen) {
      // Overlay fade in
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      )

      // Modal scale in
      gsap.fromTo(modalRef.current,
        { 
          opacity: 0,
          scale: 0.8,
          y: 50
        },
        { 
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)"
        }
      )
    }
  }, [isModalOpen])

  const openModal = () => {
    setIsModalOpen(true)
    // Lock body scroll
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    // Animate out
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.3,
      ease: "power2.in"
    })
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsModalOpen(false)
        // Unlock body scroll
        document.body.style.overflow = ''
      }
    })
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const plans = [
    {
      name: 'Essential',
      price: '€299',
      features: [
        'Basic video editing',
        '2-3 minute highlight reel',
        'Standard color correction',
        '1 revision included'
      ]
    },
    {
      name: 'Premium',
      price: '€599',
      features: [
        'Professional editing',
        '5-8 minute cinematic film',
        'Advanced color grading',
        'Custom music selection',
        '3 revisions included'
      ],
      popular: true
    },
    {
      name: 'Luxury',
      price: '€999',
      features: [
        'Premium cinematic editing',
        '10-15 minute feature film',
        'Professional color grading',
        'Custom soundtrack',
        'Motion graphics',
        'Unlimited revisions'
      ]
    }
  ]

  return (
    <>
      {/* Floating Button */}
      <div 
        ref={buttonRef}
        className="fixed bottom-6 right-6 z-40 cursor-pointer group"
        onClick={openModal}
        style={{ opacity: 0 }}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#D3FD50] to-[#b8e03e] rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"></div>
          
          {/* Main button */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#D3FD50] to-[#b8e03e] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 border-2 border-white/20">
            <span className="font-[font2] text-black text-lg sm:text-xl font-bold">€</span>
          </div>

          {/* Sparkle effects */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full opacity-80 animate-ping"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#D3FD50] rounded-full opacity-60 animate-pulse"></div>
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap backdrop-blur-sm">
          Get a Quote
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={handleOverlayClick}
          style={{ opacity: 0 }}
        >
          <div 
            ref={modalRef}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
            style={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white hover:text-[#D3FD50] transition-colors duration-200 rounded-full hover:bg-white/10 z-10"
            >
              <span className="text-2xl">×</span>
            </button>

            {/* Modal content */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="font-[font2] text-2xl sm:text-3xl lg:text-4xl uppercase text-[#D3FD50] mb-4 text-glow">
                  Choose Your Package
                </h2>
                <p className="font-[font1] text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
                  Select the perfect editing package for your wedding video. All packages include professional editing and timely delivery.
                </p>
              </div>

              {/* Plans grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
                {plans.map((plan, index) => (
                  <div 
                    key={index}
                    className={`relative p-6 sm:p-8 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      plan.popular 
                        ? 'border-[#D3FD50] bg-gradient-to-b from-[#D3FD50]/10 to-transparent' 
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-[#D3FD50] text-black text-sm font-[font2] uppercase rounded-full">
                        Most Popular
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="font-[font2] text-xl sm:text-2xl uppercase text-white mb-2">
                        {plan.name}
                      </h3>
                      <div className="text-3xl sm:text-4xl font-[font2] text-[#D3FD50] mb-4">
                        {plan.price}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-[#D3FD50] rounded-full mt-2 flex-shrink-0"></span>
                          <span className="font-[font1] text-sm sm:text-base text-white/80">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      onClick={closeModal}
                      className={`w-full py-3 px-6 rounded-lg font-[font2] text-sm sm:text-base uppercase transition-all duration-300 block text-center ${
                        plan.popular
                          ? 'bg-[#D3FD50] text-black hover:bg-[#b8e03e]'
                          : 'border border-white/20 text-white hover:border-[#D3FD50] hover:text-[#D3FD50]'
                      }`}
                    >
                      Select {plan.name}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Custom quote option */}
              <div className="text-center p-6 sm:p-8 border border-white/20 rounded-xl bg-white/5">
                <h3 className="font-[font2] text-lg sm:text-xl uppercase text-white mb-3">
                  Need Something Custom?
                </h3>
                <p className="font-[font1] text-sm sm:text-base text-white/80 mb-4">
                  Every wedding is unique. Let's discuss your specific needs and create a custom package just for you.
                </p>
                <Link
                  to="/contact"
                  onClick={closeModal}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#D3FD50] to-[#b8e03e] text-black font-[font2] text-sm sm:text-base uppercase rounded-lg hover:scale-105 transition-all duration-300"
                >
                  Request Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingQuoteButton