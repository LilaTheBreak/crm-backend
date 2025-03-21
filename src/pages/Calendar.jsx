import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script"; // Import Google API
import "../styles/Calendar.css";
import { FaPlus, FaSync } from "react-icons/fa";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const API_KEY = "YOUR_GOOGLE_API_KEY";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: "", date: "", color: "event-blue" });

    // ✅ Load Google Calendar API
    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            });
        }
        gapi.load("client:auth2", start);
    }, []);

    // ✅ Fetch Events from Google Calendar
    const fetchGoogleEvents = async () => {
        try {
            await gapi.auth2.getAuthInstance().signIn();
            const response = await gapi.client.calendar.events.list({
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                maxResults: 20,
                singleEvents: true,
                orderBy: "startTime",
            });
            const googleEvents = response.result.items.map(event => ({
                id: event.id,
                title: event.summary,
                date: event.start.date || event.start.dateTime.split("T")[0],
                color: "event-purple",
                link: event.htmlLink,
            }));
            setEvents(googleEvents);
        } catch (error) {
            console.error("Error fetching Google Calendar events:", error);
        }
    };

    // ✅ Handle New Event Creation
    const handleAddEvent = async () => {
        const newEventEntry = {
            summary: newEvent.title,
            start: { date: newEvent.date },
            end: { date: newEvent.date },
        };

        try {
            await gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: newEventEntry,
            });
            setEvents([...events, { ...newEvent, id: Date.now() }]);
            setShowEventModal(false);
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <div className="calendar-container">
            {/* ✅ Header */}
            <div className="calendar-header">
                <h1>Calendar</h1>
                <div className="calendar-controls">
                    <button className="google-sync-btn" onClick={fetchGoogleEvents}>
                        <FaSync /> Sync with Google Calendar
                    </button>
                    <button className="google-sync-btn" onClick={() => setShowEventModal(true)}>
                        <FaPlus /> Add Event
                    </button>
                </div>
            </div>

            {/* ✅ Calendar Grid */}
            <div className="calendar-grid">
                {Array.from({ length: 31 }, (_, i) => (
                    <div key={i} className="calendar-day">
                        <span className="day-number">{i + 1}</span>
                        {events
                            .filter(event => new Date(event.date).getDate() === i + 1)
                            .map(event => (
                                <div
                                    key={event.id}
                                    className={`event ${event.color}`}
                                    onClick={() => window.open(event.link, "_blank")}
                                >
                                    {event.title}
                                </div>
                            ))}
                    </div>
                ))}
            </div>

            {/* ✅ Calendar Coding */}
            <div className="calendar-coding">
                <span className="coding-label coding-purple">The Break</span>
                <span className="coding-label coding-blue">Lewis Events</span>
                <span className="coding-label coding-green">Platform B</span>
                <span className="coding-label coding-orange">Platform D</span>
                <span className="coding-label coding-pink">Hidden</span>
                <button className="google-sync-btn" onClick={() => setShowEventModal(true)}>Add New</button>
            </div>

            {/* ✅ Add Event Modal */}
            {showEventModal && (
                <div className="event-edit-modal">
                    <h2>Add New Event</h2>
                    <input
                        type="text"
                        placeholder="Event Title"
                        value={newEvent.title}
                        onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                    <input
                        type="date"
                        value={newEvent.date}
                        onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                    <button onClick={handleAddEvent}>Save</button>
                    <button onClick={() => setShowEventModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Calendar;




