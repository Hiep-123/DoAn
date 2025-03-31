// src/PageAdmin/components/ManageBooking.jsx
import React, { useState, useEffect } from 'react';
import { getBookings, createBooking, updateBooking, deleteBooking } from '@/apis/bookingService';

const ManageBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({
        userId: '',
        carId: '',
        pickupAddress: '',
        pickupDate: '',
        pickupTime: '',
        dropOffAddress: '',
        dropOffTime: '',
        dropOffDate: '',
        status: 'pending',
    });
    const [editBooking, setEditBooking] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await getBookings();
            setBookings(data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        }
    };

    const handleCreateBooking = async () => {
        try {
            const createdBooking = await createBooking(newBooking);
            setBookings([...bookings, createdBooking]);
            setNewBooking({
                userId: '',
                carId: '',
                pickupAddress: '',
                pickupDate: '',
                pickupTime: '',
                dropOffAddress: '',
                dropOffTime: '',
                dropOffDate: '',
                status: 'pending',
            });
        } catch (error) {
            console.error('Failed to create booking:', error);
        }
    };

    const handleUpdateBooking = async (id) => {
        try {
            const updatedBooking = await updateBooking(id, editBooking);
            setBookings(bookings.map(booking => booking._id === id ? updatedBooking : booking));
            setEditBooking(null);
        } catch (error) {
            console.error('Failed to update booking:', error);
        }
    };

    const handleDeleteBooking = async (id) => {
        try {
            await deleteBooking(id);
            setBookings(bookings.filter(booking => booking._id !== id));
        } catch (error) {
            console.error('Failed to delete booking:', error);
        }
    };

    return (
        <div>
            <h1>Manage Bookings</h1>
            <div>
                <h2>Create Booking</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={newBooking.userId}
                    onChange={(e) => setNewBooking({ ...newBooking, userId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Car ID"
                    value={newBooking.carId}
                    onChange={(e) => setNewBooking({ ...newBooking, carId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Pickup Address"
                    value={newBooking.pickupAddress}
                    onChange={(e) => setNewBooking({ ...newBooking, pickupAddress: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Pickup Date"
                    value={newBooking.pickupDate}
                    onChange={(e) => setNewBooking({ ...newBooking, pickupDate: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Pickup Time"
                    value={newBooking.pickupTime}
                    onChange={(e) => setNewBooking({ ...newBooking, pickupTime: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Drop Off Address"
                    value={newBooking.dropOffAddress}
                    onChange={(e) => setNewBooking({ ...newBooking, dropOffAddress: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Drop Off Time"
                    value={newBooking.dropOffTime}
                    onChange={(e) => setNewBooking({ ...newBooking, dropOffTime: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Drop Off Date"
                    value={newBooking.dropOffDate}
                    onChange={(e) => setNewBooking({ ...newBooking, dropOffDate: e.target.value })}
                />
                <select
                    value={newBooking.status}
                    onChange={(e) => setNewBooking({ ...newBooking, status: e.target.value })}
                >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <button onClick={handleCreateBooking}>Create</button>
            </div>
            <div>
                <h2>Bookings</h2>
                <ul>
                    {bookings.map(booking => (
                        <li key={booking._id}>
                            <span>{booking.pickupAddress} - {booking.dropOffAddress}</span>
                            <button onClick={() => setEditBooking(booking)}>Edit</button>
                            <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            {editBooking && (
                <div>
                    <h2>Edit Booking</h2>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={editBooking.userId}
                        onChange={(e) => setEditBooking({ ...editBooking, userId: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Car ID"
                        value={editBooking.carId}
                        onChange={(e) => setEditBooking({ ...editBooking, carId: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Pickup Address"
                        value={editBooking.pickupAddress}
                        onChange={(e) => setEditBooking({ ...editBooking, pickupAddress: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Pickup Date"
                        value={editBooking.pickupDate}
                        onChange={(e) => setEditBooking({ ...editBooking, pickupDate: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Pickup Time"
                        value={editBooking.pickupTime}
                        onChange={(e) => setEditBooking({ ...editBooking, pickupTime: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Drop Off Address"
                        value={editBooking.dropOffAddress}
                        onChange={(e) => setEditBooking({ ...editBooking, dropOffAddress: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Drop Off Time"
                        value={editBooking.dropOffTime}
                        onChange={(e) => setEditBooking({ ...editBooking, dropOffTime: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Drop Off Date"
                        value={editBooking.dropOffDate}
                        onChange={(e) => setEditBooking({ ...editBooking, dropOffDate: e.target.value })}
                    />
                    <select
                        value={editBooking.status}
                        onChange={(e) => setEditBooking({ ...editBooking, status: e.target.value })}
                    >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button onClick={() => handleUpdateBooking(editBooking._id)}>Update</button>
                </div>
            )}
        </div>
    );
};

export default ManageBooking;
