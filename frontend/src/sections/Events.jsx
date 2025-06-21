import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

// Sample events for demonstration if database is empty
const sampleEvents = [
        { 
            id: 1,
            name: "BFL Event proti ALMO - 21.12.2024", 
            date: "2024-12-21",
            type: "BFL",
            description: "Organized battle against ALMO regiment",
            teams: { 
                team1: ["Gefreiter : Jokser", "Fusknecht : Jokser", "Besschossenne Knecht : Jokser", "Besschossenne Knecht : Jokser", "Knecht : Jokser"], 
                team2: ["Gefreiter : Jokser", "Fusknecht : Jokser", "Besschossenne Knecht : Jokser", "Besschossenne Knecht : Jokser", "Knecht : Jokser", "Knecht : Jokser"] 
            } 
        },
        { 
            id: 2,
            name: "Povýšování členů Event - 21.12.2024", 
            date: "2024-12-21",
            type: "Promotion",
            description: "Member promotion ceremony",
            teams: { 
                team1: ["Gefreiter : Alice", "Fusknecht : Bob"], 
                team2: ["Besschossenne Knecht : Charlie", "Knecht : Dave"] 
            } 
        },
        { 
            id: 3,
            name: "[CI] Private Event - 26.12.2024", 
            date: "2024-12-26",
            type: "CI",
            description: "Private training session",
            teams: { 
                team1: ["Gefreiter : Eve"], 
                team2: ["Fusknecht : Frank"] 
            } 
        },
        { 
            id: 4,
            name: "[BRE] Sunday Event - 22.12.2024", 
            date: "2024-12-22",
            type: "BRE",
            description: "Weekend training and combat practice",
            teams: { 
                team1: ["Gefreiter : Grace"], 
                team2: ["Besschossenne Knecht : Henry"] 
            } 
        },
    ];

const Events = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: '',
        date: '',
        description: '',
        type: 'BFL'
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);
            
            // Always use sample events for now since database might not be set up
            setEvents(sampleEvents);
            setSelectedEvent(sampleEvents[0]);
            
            // Try to fetch from database but don't block the UI if it fails
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .order('date', { ascending: false });

                if (data && data.length > 0 && !error) {
                    setEvents(data);
                    setSelectedEvent(data[0]);
                }
            } catch (dbError) {
                console.log('Database not available, using sample data:', dbError.message);
            }
        } catch (err) {
            console.error('Error:', err);
            setEvents(sampleEvents);
            setSelectedEvent(sampleEvents[0]);
        } finally {
            setLoading(false);
        }
    }, []);

    const createEvent = async () => {
        if (!user) {
            setError('You must be logged in to create events');
            return;
        }

        try {
            // Create new event locally for demo purposes
            const newEventData = {
                id: Date.now(), // Simple ID generation
                ...newEvent,
                teams: { team1: [], team2: [] },
                created_by: user?.id || 'demo-user'
            };

            // Try to save to database, but don't fail if it doesn't work
            try {
                const { data, error } = await supabase
                    .from('events')
                    .insert([newEventData])
                    .select();

                if (data && data[0] && !error) {
                    setEvents([data[0], ...events]);
                } else {
                    // Add locally if database fails
                    setEvents([newEventData, ...events]);
                }
            } catch (dbError) {
                console.log('Database not available, adding event locally:', dbError.message);
                setEvents([newEventData, ...events]);
            }

            setNewEvent({ name: '', date: '', description: '', type: 'BFL' });
            setIsCreating(false);
            setError('');
        } catch (err) {
            setError('Failed to create event: ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-cover bg-center"
                style={{ backgroundImage: "url('/backgrounds/Media.png')" }}>
                <div className="text-white text-2xl font-unifraktur">Loading events...</div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{ backgroundImage: "url('/backgrounds/Media.png')" }}
        >
            <div className="absolute inset-0 bg-black/60"></div>
            
            <div className="relative z-10 container mx-auto px-4 py-8">
                <h1 className="text-5xl font-bold text-white text-center mb-8 font-unifraktur">
                    SVCI Events
                </h1>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6 text-center">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Events List */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white font-unifraktur">
                                    Upcoming Events
                                </h2>
                                {user && (
                                    <button
                                        onClick={() => setIsCreating(true)}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-unifraktur text-sm"
                                    >
                                        + New Event
                                    </button>
                                )}
                            </div>
                            
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className={`p-4 rounded-lg cursor-pointer transition-all border ${
                                            selectedEvent?.id === event.id
                                                ? "bg-yellow-600/30 border-yellow-500 text-white"
                                                : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
                                        }`}
                                        onClick={() => setSelectedEvent(event)}
                                    >
                                        <h3 className="font-bold font-unifraktur text-sm mb-1">{event.name}</h3>
                                        <p className="text-xs opacity-80 font-unifraktur">{event.date}</p>
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-unifraktur mt-2 ${
                                            event.type === 'BFL' ? 'bg-red-600' :
                                            event.type === 'CI' ? 'bg-blue-600' :
                                            event.type === 'BRE' ? 'bg-green-600' :
                                            'bg-purple-600'
                                        }`}>
                                            {event.type}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Event Details */}
                    {selectedEvent && (
                        <div className="lg:col-span-2">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2 font-unifraktur">
                                            {selectedEvent.name}
                                        </h2>
                                        <p className="text-yellow-400 font-unifraktur">
                                            {selectedEvent.date} • {selectedEvent.type}
                                        </p>
                                    </div>
                                </div>

                                {selectedEvent.description && (
                                    <p className="text-white/80 mb-6 font-unifraktur">
                                        {selectedEvent.description}
                                    </p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Team 1 */}
                                    <div className="bg-black/30 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-red-400 mb-4 font-unifraktur text-center">
                                            Team 1
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedEvent.teams?.team1?.map((member, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <img
                                                        src="/profiles/13.png"
                                                        alt="Avatar"
                                                        className="w-8 h-8 rounded-full border-2 border-red-500"
                                                    />
                                                    <span className="text-white font-unifraktur">{member}</span>
                                                </div>
                                            )) || <p className="text-white/60 text-center font-unifraktur">No members assigned</p>}
                                        </div>
                                    </div>

                                    {/* Team 2 */}
                                    <div className="bg-black/30 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-blue-400 mb-4 font-unifraktur text-center">
                                            Team 2
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedEvent.teams?.team2?.map((member, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <img
                                                        src="/profiles/13.png"
                                                        alt="Avatar"
                                                        className="w-8 h-8 rounded-full border-2 border-blue-500"
                                                    />
                                                    <span className="text-white font-unifraktur">{member}</span>
                                                </div>
                                            )) || <p className="text-white/60 text-center font-unifraktur">No members assigned</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Create Event Modal */}
                {isCreating && (
                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md w-full border border-white/20">
                            <h3 className="text-2xl font-bold text-white mb-6 font-unifraktur">Create New Event</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-white font-unifraktur mb-2">Event Name</label>
                                    <input
                                        type="text"
                                        value={newEvent.name}
                                        onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-white/30 focus:border-yellow-500 focus:outline-none font-unifraktur"
                                        placeholder="Enter event name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-white font-unifraktur mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={newEvent.date}
                                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-white/30 focus:border-yellow-500 focus:outline-none font-unifraktur"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-white font-unifraktur mb-2">Type</label>
                                    <select
                                        value={newEvent.type}
                                        onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-white/30 focus:border-yellow-500 focus:outline-none font-unifraktur"
                                    >
                                        <option value="BFL">BFL</option>
                                        <option value="CI">CI</option>
                                        <option value="BRE">BRE</option>
                                        <option value="Training">Training</option>
                                        <option value="Promotion">Promotion</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-white font-unifraktur mb-2">Description</label>
                                    <textarea
                                        value={newEvent.description}
                                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-white/30 focus:border-yellow-500 focus:outline-none font-unifraktur"
                                        rows={3}
                                        placeholder="Event description"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={createEvent}
                                    className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-unifraktur rounded-lg"
                                >
                                    Create Event
                                </button>
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-unifraktur rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;