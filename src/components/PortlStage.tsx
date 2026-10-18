const VENUES = [
  { name: 'Surf Club', meta: 'Open until 02:00 · 0.5km', tag: 'Guestlist' },
  { name: 'Pacha', meta: 'High-energy night · Dubai', tag: 'Tables' },
  { name: 'FIVE Social Pool', meta: 'Day to sunset plans', tag: 'Busy' },
]

export default function PortlStage() {
  return (
    <div className="phone" aria-hidden="true">
      <div className="notch" />
      <div className="status">
        <span>9:41</span>
        <span>Portl</span>
      </div>
      <h4>
        What are we doing <span className="tonight">tonight?</span>
      </h4>
      <p className="bio">
        Find the places, plans and people worth going out for. Join guestlists,
        book tables and see who’s going.
      </p>
      {VENUES.map((venue) => (
        <div className="venue" key={venue.name}>
          <div>
            <strong>{venue.name}</strong>
            <small>{venue.meta}</small>
          </div>
          <span className="pill">{venue.tag}</span>
        </div>
      ))}
    </div>
  )
}
