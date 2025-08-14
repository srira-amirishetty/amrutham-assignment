import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format, addMonths, startOfMonth, isSameMonth } from "date-fns";
import { fetchAppointments, createAppointment } from "../../store/API/Appointment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TimeSlots from "./Slots";

export default function BookingPage() {
  const { id } = useParams();

  const doctorId = id
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const appointmentsData = useSelector((state) => state.AppointmentAPI);
  const bookedSlots =
    appointmentsData?.getAppointments?.[0] || [];

    console.log(bookedSlots)

  const userId = useSelector((state) => state.LoginAPI?.data?.[0]?.user?._id) || []
  const predefinedSlots = ["10-12", "12-2", "2-4", "4-6"];

  useEffect(() => {
    if (selectedDate && doctorId) {
      setLoading(true);
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      dispatch(fetchAppointments({ doctorId, date: dateStr }))
        .finally(() => setLoading(false));
      // Clear previous selection when date changes
      setSelectedSlot(null);
    }
  }, [selectedDate, doctorId, dispatch]);

  // Submit handler — send userId, doctorId, date, and selectedSlot
  const handleSubmit = async () => {
    if (!selectedDate || !selectedSlot || !doctorId || !userId) return;

    const payload = {
      userId,
      doctorId,
      date: format(selectedDate, "yyyy-MM-dd"),
      timeSlot: selectedSlot,
    };

    try {
      // If your thunk is createAsyncThunk, unwrap() throws on reject
      await dispatch(createAppointment(payload)).unwrap?.();
      alert(
        `Appointment booked for ${format(selectedDate, "PPP")} at ${selectedSlot}`
      );
      // Refresh booked slots for that day
      await dispatch(fetchAppointments({ doctorId, date: payload.date }));
      setSelectedSlot(null);
    } catch (err) {
      console.error(err);
      alert(typeof err === "string" ? err : "Failed to book appointment");
    }
  };

  const canSubmit = Boolean(selectedDate && selectedSlot && userId && doctorId);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Book Appointment</h1>

      {/* Calendar (forward-only navigation) */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            Next Month
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date && isSameMonth(date, currentMonth)) setSelectedDate(date);
          }}
          fromDate={today}
          className="rounded-lg border p-2"
        />
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Time slots for {format(selectedDate, "PPP")}
          </h2>

          {loading ? (
            <p>Loading slots...</p>
          ) : (
            <TimeSlots predefinedSlots={predefinedSlots} bookedSlots={bookedSlots} selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot} selectedDate={selectedDate} doctorId={doctorId}  />
          )}

          {/* Summary + Submit */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              {selectedSlot ? (
                <span>
                  Selected:{" "}
                  <strong>
                    {format(selectedDate, "PPP")} • {selectedSlot}
                  </strong>
                </span>
              ) : (
                <span>Select a time slot</span>
              )}
            </div>
            <Button onClick={handleSubmit} disabled={!canSubmit}>
              Book appointment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

