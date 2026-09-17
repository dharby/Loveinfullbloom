"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RSVP_CATEGORIES, rsvpCategoryLabel, isRSVPCategory, type RSVPCategory } from "@/lib/types";
import Confetti from "@/components/Confetti";

interface Guest {
  id: string;
  guest_name: string;
  invitation_token: string;
  rsvp_status: string;
  rsvp_category: string | null;
  rsvp_id: string | null;
}

interface Form {
  name: string;
  contact: string;
  attending: "" | "yes" | "no";
  category: "" | RSVPCategory;
  notes: string;
}

interface Errors {
  name?: string;
  contact?: string;
  attending?: string;
  category?: string;
}

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function RSVP() {
  const [step, setStep] = useState<"search" | "form" | "result">("search");
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isNewGuest, setIsNewGuest] = useState(false);
  const [form, setForm] = useState<Form>({ name: "", contact: "", attending: "", category: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"accepted" | "declined" | null>(null);
  const [refNum, setRefNum] = useState("");
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Check for rsvp=new hash on mount to open new guest form directly
  useEffect(() => {
    if (window.location.hash === "#rsvp=new") {
      continueAsNewGuest();
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  const searchGuests = async () => {
    if (searchName.trim().length < 2) {
      setError("Please enter at least 2 characters");
      return;
    }
    setSearching(true);
    setError("");
    setSearchResults([]);

    try {
      const response = await fetch(`/api/guests/search?name=${encodeURIComponent(searchName.trim())}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      if (data.guests.length === 0) {
        setError("No guest found with that name. Please contact the couple.");
      } else {
        setSearchResults(data.guests);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setSearching(false);
    }
  };

  const selectGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsNewGuest(false);
    setForm((p) => ({ ...p, category: isRSVPCategory(guest.rsvp_category) ? guest.rsvp_category : "" }));
    setStep("form");
    setError("");
  };

  const continueAsNewGuest = () => {
    setSelectedGuest(null);
    setIsNewGuest(true);
    setForm((p) => ({ ...p, category: "" }));
    setStep("form");
    setError("");
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (isNewGuest && !form.name.trim()) e.name = "Please enter your full name";
    if (!form.category) e.category = "Please choose who you are registering under";
    if (!form.contact.trim()) e.contact = "Please enter your email or phone number";
    if (!form.attending) e.attending = "Please let us know if you can make it";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || (!selectedGuest && !isNewGuest)) return;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitation_id: selectedGuest ? selectedGuest.id : null,
          guest_name: isNewGuest ? form.name.trim() : selectedGuest?.guest_name,
          guest_contact: form.contact,
          attendance: form.attending,
          rsvp_category: form.category,
          guest_count: 1,
          meal_preference: null,
          message: form.notes || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit RSVP");
      }

      setRefNum(data.reference_number);
      setResult(form.attending === "yes" ? "accepted" : "declined");
      setStep("result");
      if (form.attending === "yes") {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: keyof Form, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field as keyof Errors]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `I've confirmed my attendance at Oreoluwa & Daberechukwu's wedding! 🎉💒\n\nDate: Friday, March 20th, 2026\nVenue: The Charis Center, Ikeja, Lagos\n\n#LoveInFullBloom26`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <>
      <Confetti active={showConfetti} />
      <section id="rsvp" className="py-16 md:py-24 bg-cream">
        <div className="max-w-2xl mx-auto px-5">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            className="text-center mb-10 md:mb-14"
          >
            <p className="text-[0.85rem] sm:text-[0.9rem] font-script text-lavender/70 tracking-wide mb-3">
              We would love to have you
            </p>
            <h2 className="text-[2rem] sm:text-[2.2rem] font-serif font-light text-mint mb-2">
              Will you celebrate with us?
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-10 h-px bg-lavender/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-lavender/40" />
              <span className="w-10 h-px bg-lavender/30" />
            </div>
            <p className="text-[0.85rem] sm:text-[0.9rem] text-ink-muted font-sans max-w-md mx-auto leading-relaxed">
              Search for your name — or RSVP as a new guest if you&apos;re not listed.
            </p>
            <div className="mt-4 max-w-md mx-auto p-3 bg-lavender/10 border border-lavender/40 rounded-[2px]">
              <p className="text-[0.7rem] sm:text-[0.75rem] text-ink-soft font-sans leading-relaxed">
                🔒 This website is a private invitation for intended guests only. Please do not share or forward it to anyone.
              </p>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === "search" && (
              <motion.div
                key="search"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="rsvp-search" className="block text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.18em] font-sans text-ink-muted mb-1.5">
                    Search Your Name *
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="rsvp-search"
                      type="text"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && searchGuests()}
                      placeholder="Enter your full name"
                      className="flex-1 h-12 px-4 bg-white border border-sage/60 rounded-[2px] text-[0.95rem] font-sans text-ink placeholder:text-ink-muted/40 transition-colors"
                      aria-describedby={error ? "search-error" : undefined}
                    />
                    <button
                      type="button"
                      onClick={searchGuests}
                      disabled={searching}
                      className="h-12 px-6 bg-mint text-cream text-[0.8rem] uppercase tracking-[0.15em] font-sans font-medium border border-lavender/30 rounded-[2px] transition-all duration-300 hover:bg-mint-dark disabled:opacity-50"
                    >
                      {searching ? "Searching..." : "Search"}
                    </button>
                  </div>
                </div>

                {error && (
                  <div id="search-error" role="alert" className="p-4 bg-red-50 border border-red-200 rounded-[2px] text-center">
                    <p className="text-[0.85rem] text-red-600 font-sans">{error}</p>
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="button"
                    onClick={continueAsNewGuest}
                    className="text-[0.75rem] text-lavender/80 font-sans underline hover:text-lavender"
                  >
                    Can&apos;t find your name? RSVP as a new guest
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.15em] text-ink-muted/60 font-sans">
                      Select your name:
                    </p>
                    {searchResults.map((guest) => (
                      <button
                        key={guest.id}
                        type="button"
                        onClick={() => selectGuest(guest)}
                        className="w-full p-4 bg-white border border-sage/60 rounded-[2px] text-left transition-all duration-300 hover:border-mint hover:bg-mint/5"
                      >
                        <p className="text-[0.95rem] font-serif text-mint font-medium">
                          {guest.guest_name}
                        </p>
                        <p className="text-[0.65rem] uppercase tracking-[0.15em] text-lavender/80 font-sans mt-1">
                          {rsvpCategoryLabel(guest.rsvp_category)}
                        </p>
                        {guest.rsvp_status !== "pending" && (
                          <p className="text-[0.7rem] text-lavender/70 font-sans mt-1">
                            Already RSVP&apos;d: {guest.rsvp_status}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {step === "form" && (selectedGuest || isNewGuest) && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6 p-4 bg-mint/5 border border-mint/20 rounded-[2px] text-center">
                  <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.15em] text-ink-muted/60 font-sans mb-1">
                    {isNewGuest ? "New Guest RSVP" : "Guest Found"}
                  </p>
                  {!isNewGuest && selectedGuest && (
                    <p className="text-[1.1rem] font-serif text-mint font-medium">
                      {selectedGuest.guest_name}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => { setStep("search"); setSelectedGuest(null); setIsNewGuest(false); setSearchResults([]); setForm((p) => ({ ...p, category: "" })); }}
                    className="mt-2 text-[0.7rem] text-lavender/70 font-sans underline hover:text-lavender"
                  >
                    Not you? Search again
                  </button>
                </div>

                {error && (
                  <div role="alert" className="mb-4 p-4 bg-red-50 border border-red-200 rounded-[2px] text-center">
                    <p className="text-[0.85rem] text-red-600 font-sans">{error}</p>
                  </div>
                )}

                <form onSubmit={submit} className="space-y-5" noValidate>
                  <div>
                    <fieldset>
                      <legend className="block text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.18em] font-sans text-ink-muted mb-2">
                        Who are you registering under? *
                      </legend>
                      <div className="space-y-2">
                        {RSVP_CATEGORIES.map((cat) => (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => update("category", cat.value)}
                            className={`w-full p-3 rounded-[2px] text-left border transition-all duration-300 ${
                              form.category === cat.value
                                ? "bg-mint text-cream border-lavender/40"
                                : "bg-white text-ink-soft border-sage/60 hover:border-mint-light/40"
                            }`}
                            aria-pressed={form.category === cat.value}
                          >
                            <p className={`text-[0.85rem] font-sans font-semibold tracking-wide ${form.category === cat.value ? "text-cream" : "text-mint"}`}>
                              {cat.label}
                            </p>
                            <p className={`text-[0.7rem] font-sans mt-0.5 ${form.category === cat.value ? "text-cream/70" : "text-ink-muted/70"}`}>
                              {cat.detail}
                            </p>
                          </button>
                        ))}
                      </div>
                      {errors.category && <p className="mt-1 text-[0.7rem] text-red-500 font-sans" role="alert">{errors.category}</p>}
                    </fieldset>
                  </div>
                  {isNewGuest && (
                    <div>
                      <label htmlFor="rsvp-name" className="block text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.18em] font-sans text-ink-muted mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        id="rsvp-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Enter your full name"
                        className={`w-full h-12 px-4 bg-white border ${errors.name ? "border-red-400" : "border-sage/60"} rounded-[2px] text-[0.95rem] font-sans text-ink placeholder:text-ink-muted/40 transition-colors`}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && <p id="name-error" className="mt-1 text-[0.7rem] text-red-500 font-sans" role="alert">{errors.name}</p>}
                    </div>
                  )}
                  <div>
                    <label htmlFor="rsvp-contact" className="block text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.18em] font-sans text-ink-muted mb-1.5">
                      Email or Phone Number *
                    </label>
                    <input
                      id="rsvp-contact"
                      type="text"
                      value={form.contact}
                      onChange={(e) => update("contact", e.target.value)}
                      placeholder="your@email.com or 0801 234 5678"
                      className={`w-full h-12 px-4 bg-white border ${errors.contact ? "border-red-400" : "border-sage/60"} rounded-[2px] text-[0.95rem] font-sans text-ink placeholder:text-ink-muted/40 transition-colors`}
                      aria-describedby={errors.contact ? "contact-error" : undefined}
                    />
                    {errors.contact && <p id="contact-error" className="mt-1 text-[0.7rem] text-red-500 font-sans" role="alert">{errors.contact}</p>}
                  </div>

                  <div>
                    <fieldset>
                      <legend className="block text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.18em] font-sans text-ink-muted mb-2">
                        Will you be attending? *
                      </legend>
                      <div className="flex gap-3">
                        {[
                          { val: "yes", label: "Yes, I'll Be There" },
                          { val: "no", label: "No, Unfortunately I Can't" },
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => update("attending", opt.val)}
                            className={`flex-1 h-12 rounded-[2px] text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.12em] font-sans font-medium border transition-all duration-400 ${
                              form.attending === opt.val
                                ? "bg-mint text-cream border-lavender/30"
                                : "bg-white text-ink-soft/70 border-sage/60 hover:border-mint-light/40"
                            }`}
                            aria-pressed={form.attending === opt.val}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      {errors.attending && <p className="mt-1 text-[0.7rem] text-red-500 font-sans" role="alert">{errors.attending}</p>}
                    </fieldset>
                  </div>

                  <div>
                    <label htmlFor="rsvp-notes" className="block text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.18em] font-sans text-ink-muted mb-1.5">
                      Optional Message
                    </label>
                    <textarea
                      id="rsvp-notes"
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      rows={3}
                      placeholder="Leave a message for the couple..."
                      className="w-full px-4 py-3 bg-white border border-sage/60 rounded-[2px] text-[0.95rem] font-sans text-ink placeholder:text-ink-muted/40 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-mint text-cream text-[0.8rem] sm:text-[0.85rem] uppercase tracking-[0.2em] font-sans font-medium border border-lavender/30 rounded-[3px] transition-all duration-300 hover:bg-mint-dark hover:border-lavender/50 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : "Send RSVP"}
                  </button>
                </form>
              </motion.div>
            )}

            {step === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-mint flex items-center justify-center">
                  <span className="text-cream text-xl">{result === "accepted" ? "✓" : "♥"}</span>
                </div>
                <h3 className="text-[1.5rem] sm:text-[1.5rem] font-serif text-mint mb-2">
                  Thank you, {(isNewGuest ? form.name.trim().split(" ")[0] : selectedGuest?.guest_name.split(" ")[0])} ❤️
                </h3>
                <p className="text-[0.95rem] sm:text-[1.05rem] text-ink-soft font-sans mb-4 leading-relaxed">
                  {result === "accepted"
                    ? "We cannot wait to celebrate with you."
                    : "You will be dearly missed, but we are grateful for your love and warm wishes."}
                </p>
                <div className="bg-white border border-sage/40 rounded-[2px] py-4 px-6 mb-4 inline-block">
                  <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.2em] text-ink-muted/60 font-sans mb-1">
                    Registered Under
                  </p>
                  <p className="text-[0.95rem] sm:text-[1.05rem] font-serif text-mint font-medium mb-3">
                    {rsvpCategoryLabel(form.category)}
                  </p>
                  <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.2em] text-ink-muted/60 font-sans mb-1">
                    Your Reference Number
                  </p>
                  <p className="text-[1rem] sm:text-[1.25rem] font-serif text-mint font-medium tracking-wide">
                    {refNum}
                  </p>
                </div>
                <p className="text-[0.7rem] sm:text-[0.75rem] text-ink-muted/60 font-sans mb-4">
                  Please present this reference number at the entrance.
                </p>
                <p className="text-[0.7rem] sm:text-[0.75rem] text-ink-muted/50 font-sans mb-6">
                  This invitation admits one guest only. Plus-ones are not permitted.
                </p>

                {result === "accepted" && (
                  <button
                    type="button"
                    onClick={shareOnWhatsApp}
                    className="inline-flex items-center gap-2 h-10 px-6 bg-[#25D366] text-white text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.15em] font-sans font-medium rounded-[3px] transition-all duration-300 hover:bg-[#1DA851] hover:-translate-y-0.5 active:scale-[0.98] mb-6"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Share on WhatsApp
                  </button>
                )}

                <div>
                  <button
                    type="button"
                    onClick={() => { setStep("search"); setSearchName(""); setSearchResults([]); setSelectedGuest(null); setIsNewGuest(false); setResult(null); setForm({ name: "", contact: "", attending: "", category: "", notes: "" }); }}
                    className="text-[0.75rem] text-lavender/70 font-sans underline hover:text-lavender"
                  >
                    RSVP for another guest
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
