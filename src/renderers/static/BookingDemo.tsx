import { useState } from "react";
import type { ResolvedComposition } from "../../engine/grammar/resolve";
import { OriginalLogo } from "../shared/GrammarArtwork";

/** Interaction prototype only. No network calls, patient records, or backend writes. */
export function BookingDemo({
  resolved: r,
}: {
  resolved: ResolvedComposition;
}) {
  const c = r.props.content;
  const [query, setQuery] = useState("");
  const [service, setService] = useState(false);
  const [slot, setSlot] = useState("");
  const [requested, setRequested] = useState(false);
  const [view, setView] = useState<"book" | "appointments">("book");
  const visible = `${c.service.name} ${c.doctor.name}`
    .toLowerCase()
    .includes(query.toLowerCase());
  function reset() {
    setService(false);
    setSlot("");
    setRequested(false);
    setQuery("");
  }
  return (
    <section
      className="booking-demo"
      style={
        {
          color: r.tokens.colors.ink,
          fontFamily: r.tokens.typography.body,
          "--card-radius": `${r.style.radius}px`,
          "--card-shadow": r.style.shadow,
          "--panel-gap": `${16 + r.axes.spacious * 16}px`,
        } as React.CSSProperties
      }
    >
      <header className="app-header">
        <OriginalLogo width={120} />
        <span className="demo-badge">Experimental UI · Demo data</span>
      </header>
      <div className="app-shell">
        <aside>
          <p className="eyebrow">PATIENT SERVICES</p>
          <button
            aria-pressed={view === "book"}
            onClick={() => setView("book")}
          >
            Book appointment
          </button>
          <button
            aria-pressed={view === "appointments"}
            onClick={() => setView("appointments")}
          >
            Appointments {requested ? "(1)" : "(0)"}
          </button>
          <p>
            Connected to
            <br />
            <strong>{c.practice.name}</strong>
          </p>
          <p className="muted">Fictional clinic for this preview.</p>
        </aside>
        <main className="app-main">
          <div className="app-title">
            <div>
              <p className="eyebrow">
                {view === "book" ? "NEW PATIENT BOOKING" : "YOUR APPOINTMENTS"}
              </p>
              <h2
                style={{
                  fontFamily: r.style.headingFamily,
                  letterSpacing: `${r.style.tracking}em`,
                }}
              >
                {view === "book"
                  ? "Plan your next visit."
                  : "Keep track of your request."}
              </h2>
            </div>
          </div>
          <p className="muted">
            {view === "book"
              ? "Choose a service and an example time. Your practice confirms your appointment after reviewing your request."
              : "This preview keeps one example request in memory while the page is open."}
          </p>
          {view === "book" ? (
            <>
              <label className="search-label">
                Find a service or practitioner
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search services or practitioners"
                />
              </label>
              <div className="booking-grid">
                <section className="app-card">
                  <p className="eyebrow">01 / SELECT A SERVICE</p>
                  {visible ? (
                    <>
                      <button
                        className="service-choice"
                        aria-pressed={service}
                        onClick={() => {
                          setService(!service);
                          setSlot("");
                          setRequested(false);
                        }}
                      >
                        <strong>{c.service.name}</strong>
                        <span>{c.service.description}</span>
                        <span className="muted">
                          {service ? "Selected ✓" : "Select service →"}
                        </span>
                      </button>
                      <div className="practitioner">
                        <span className="avatar" aria-hidden>
                          {c.doctor.name
                            .split(" ")
                            .filter((s) => s !== "Dr")
                            .map((s) => s[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div>
                          <strong>{c.doctor.name}</strong>
                          <p className="muted">{c.doctor.speciality}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p role="status">No example service matches “{query}”.</p>
                  )}
                </section>
                <section className="app-card">
                  <p className="eyebrow">02 / CHOOSE AN EXAMPLE TIME</p>
                  <h3>{c.availabilityLabel}</h3>
                  <p className="muted">
                    Illustrative times · No live availability
                  </p>
                  <div className="slot-options">
                    {c.availability.map((time) => (
                      <button
                        key={time}
                        disabled={!service || requested}
                        aria-pressed={slot === time}
                        onClick={() => setSlot(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <p className="muted">
                    {!service
                      ? "Select a service to see how time selection works."
                      : "Review your selection below."}
                  </p>
                </section>
                <section className="app-card booking-review">
                  <div>
                    <p className="eyebrow">03 / REVIEW YOUR REQUEST</p>
                    <h3>{service ? c.service.name : "Choose your service"}</h3>
                    <p>
                      {service
                        ? c.doctor.name
                        : "Your practitioner will appear here"}
                      {slot && ` · ${slot}`}
                    </p>
                  </div>
                  <button
                    className="primary-button"
                    disabled={!service || !slot || requested}
                    onClick={() => setRequested(true)}
                  >
                    {requested
                      ? "Example request created"
                      : "Preview booking request"}
                  </button>
                </section>
              </div>
              {requested && (
                <div role="status" className="request-status">
                  <strong>
                    Example request · Awaiting practice confirmation
                  </strong>
                  <p>
                    No appointment has been sent or booked. This is a local
                    interaction demo.
                  </p>
                  <button onClick={() => setView("appointments")}>
                    View example appointment →
                  </button>
                </div>
              )}
            </>
          ) : (
            <section className="app-card">
              {requested ? (
                <>
                  <span className="demo-badge">
                    Awaiting practice confirmation · Demo
                  </span>
                  <h3>{c.service.name}</h3>
                  <p>
                    {c.doctor.name} · {slot}
                  </p>
                  <button
                    onClick={() => {
                      setRequested(false);
                      setView("book");
                    }}
                  >
                    Change example time
                  </button>
                  <button onClick={reset}>Clear example request</button>
                </>
              ) : (
                <>
                  <h3>No example appointments yet.</h3>
                  <p className="muted">
                    Create an example booking request to explore this view.
                  </p>
                  <button onClick={() => setView("book")}>
                    Explore booking →
                  </button>
                </>
              )}
            </section>
          )}
          <p className="prototype-note">
            Experimental design translation. Existing patients use the app’s
            authenticated record access. This preview does not connect to a
            clinic or store personal details.
          </p>
        </main>
      </div>
    </section>
  );
}
