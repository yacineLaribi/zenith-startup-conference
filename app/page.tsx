"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitLabel, setSubmitLabel] = useState("Submit Registration")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [formData, setFormData] = useState({
    "team-name": "",
    email: "",
    "team-lead": "",
    "idea-title": "",
    "idea-description": "",
    "prototype-link": "",
    members: "",
    "phone-number": "",
  })

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2026-04-28T10:00:00").getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionHeight = scrollContainerRef.current.offsetHeight
      scrollContainerRef.current.scrollTo({
        top: sectionHeight * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (submitted) {
      setSubmitLabel("You are already registered!")
      return
    }

    setSubmitLabel("Submitting...")

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => data.append(key, value))

    fetch("https://script.google.com/macros/s/AKfycbzXS0_Plmeo7P0dPN3Y5X1o-dEKRvG8ZAy-R940nvQA1V_ExGsSR8nfQ6RXcfoCGHRg/exec", { method: "POST", body: data ,   mode: "no-cors",})
      .then((res) => res.text())
      .then((response) => {
        setSubmitted(true)
        setSubmitLabel("You are Registered Successfully!")
        console.log(response)
        setFormData({
          "team-name": "",
          email: "",
          "team-lead": "",
          "idea-title": "",
          "idea-description": "",
          "prototype-link": "",
          members: "",
          "phone-number": "",
        })
      })
      .catch(() => setSubmitLabel("Something went wrong. Try again."))
  }

  return (
    <main className="relative w-full bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#28DB95"
            colorB="#9466FF"
            speed={0.6}
            detail={0.7}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#7649F9"
            upColor="#A02EF7"
            downColor="#28DB95"
            leftColor="#9466FF"
            rightColor="#A02EF7"
            intensity={0.85}
            radius={2}
            momentum={20}
            maskType="alpha"
            opacity={0.95}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 backdrop-blur-md transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button onClick={() => scrollToSection(0)} className="flex items-center gap-2 transition-transform hover:scale-105">
          <img src="/logo.png" alt="Zenith logo" className="h-9 object-contain" />
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: "About", index: 0 },
            { label: "Register", index: 1 }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === item.index ? "text-secondary" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-secondary transition-all duration-300 ${
                  currentSection === item.index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <MagneticButton variant="secondary" onClick={() => scrollToSection(1)}>
          Register Now
        </MagneticButton>
      </nav>

      {/* Sections Container */}
      <div
        ref={scrollContainerRef}
        className={`relative z-10 h-screen w-full overflow-y-scroll transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* Hero Section */}
        <section className="flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12">
          <div className="max-w-4xl">
            <div className="mb-6 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-white font-semibold">2-DAY STARTUP CONFERENCE</p>
            </div>
            <h1 className="mb-8 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-foreground duration-1000">
              <span className="text-balance">
                Where Ideas Meet
                <br />
                Opportunity
              </span>
            </h1>
            <p className="mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-4 text-lg md:text-xl leading-relaxed text-foreground/90 duration-1000 delay-200">
              <span className="text-pretty">
                Zenith brings together the brightest startup founders, mentors, and investors for two days of learning,
                networking, and unforgettable pitches. Whether you&apos;re building your dream or looking to invest in
                the future, this is your stage.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">

              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(1)}>
                Register Your Team
              </MagneticButton>
            </div>
          </div>

          {/* Bottom Section with Countdown and Scroll Indicator */}
          <div className="absolute bottom-40 md:bottom-24 left-1/2 -translate-x-1/2 w-full flex flex-col items-center animate-in fade-in duration-1000 delay-500">
            {/* Countdown Timer */}
            <div className="mb-12 flex flex-col items-center">
              <p className="font-mono text-xs text-white mb-4 text-center">APRIL 27-28, 2026</p>
              <div className="flex justify-center gap-2 md:gap-4">
                <div className="flex flex-col items-center">
                  <div className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-3 md:px-7 py-2 md:py-5 mb-2">
                    <p className="font-sans text-xl md:text-2xl font-bold text-white">
                      {String(timeLeft.days).padStart(2, "0")}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-white/60">Days</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-3 md:px-7 py-2 md:py-5 mb-2">
                    <p className="font-sans text-xl md:text-2xl font-bold text-white">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-white/60">Hours</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-3 md:px-7 py-2 md:py-5 mb-2">
                    <p className="font-sans text-xl md:text-2xl font-bold text-white">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-white/60">Minutes</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-3 md:px-7 py-2 md:py-5 mb-2">
                    <p className="font-sans text-xl md:text-2xl font-bold text-white">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-white/60">Seconds</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Scroll to explore</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
              </div>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section className="flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12">
          <div className="max-w-2xl mx-auto w-full">
            <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="font-sans text-5xl md:text-6xl font-bold text-foreground mb-4">Register Your Team</h2>
              <p className="text-lg text-foreground/80">Submit your startup idea and join Zenith 2026</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10"
            >
              {/* Team Name */}
              <div>
                <label className="block font-sans text-sm font-semibold text-foreground mb-3">Team Name</label>
                <input
                  type="text"
                  name="team-name"
                  value={formData["team-name"]}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/30 transition-all"
                  placeholder="Your startup name"
                />
              </div>

              {/* Team Lead */}
              <div>
                <label className="block font-sans text-sm font-semibold text-foreground mb-3">Team Lead Name</label>
                <input
                  type="text"
                  name="team-lead"
                  value={formData["team-lead"]}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/30 transition-all"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-sans text-sm font-semibold text-foreground mb-3">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/30 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-sans text-sm font-semibold text-foreground mb-3">Phone Number</label>
                <input
                  type="tel"
                  name="phone-number"
                  value={formData["phone-number"]}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/30 transition-all"
                  placeholder="+213 000 000 000"
                />
              </div>

              {/* Team Members */}
              <div>
                <label className="block font-sans text-sm font-semibold text-foreground mb-3">
                  Team Members (comma separated)
                </label>
                <input
                  type="text"
                  name="members"
                  value={formData.members}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/30 transition-all"
                  placeholder="Name 1, Name 2, Name 3..."
                />
              </div>

              {/* Idea Title */}
              <div>
                <label className="block font-sans text-sm font-semibold text-foreground mb-3">
                  Startup Idea Title
                </label>
                <input
                  type="text"
                  name="idea-title"
                  value={formData["idea-title"]}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/30 transition-all"
                  placeholder="What's your startup's name/title?"
                />
              </div>

              {/* Idea Description */}
              <div>
                <label className="block font-sans text-sm font-semibold text-foreground mb-3">
                  Describe Your Idea
                </label>
                <textarea
                  name="idea-description"
                  value={formData["idea-description"]}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/30 transition-all resize-none"
                  placeholder="Tell us about your startup idea, what problem does it solve, and why it matters..."
                />
              </div>

              {/* Prototype Link */}
              <div>
                <label className="block font-sans text-sm font-semibold text-foreground mb-3">
                  Prototype Link{" "}
                  <span className="text-foreground/40 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  name="prototype-link"
                  value={formData["prototype-link"]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/30 transition-all"
                  placeholder="https://your-prototype.com"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <MagneticButton
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="w-full"
                  disabled={submitted}
                >
                  {submitLabel}
                </MagneticButton>
              </div>

              <p className="text-center text-sm text-foreground/60">
                By registering, you agree to our terms and conditions. We&apos;ll send you confirmation details soon.
              </p>
            </form>
          </div>
        </section>
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  )
}