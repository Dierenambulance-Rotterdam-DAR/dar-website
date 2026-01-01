const SUPABASE_URL = "https://mytcqjqhquqxcqmechta.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15dGNxanFocXVxeGNxbWVjaHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNzgwMzYsImV4cCI6MjA4Mjg1NDAzNn0.l0-TONRsSd65UCYaTJXR8UBRMdZDD73e0WtxQFa9xo8";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("vetRitForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  statusEl.textContent = "Bezig met reserveren...";

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const animal = document.getElementById("animal").value.trim();
  const vet = document.getElementById("vet").value.trim();
  const dateValue = document.getElementById("date").value;
  const timeSlot = document.getElementById("time").value;
  const notes = document.getElementById("notes").value.trim();

  if (!name || !phone || !animal || !dateValue || !timeSlot) {
    statusEl.textContent = "Vul alle verplichte velden in.";
    return;
  }

  try {
    const { error } = await supabase.from("vet_rides").insert([{
      name,
      phone,
      animal,
      veterinarian: vet || null,
      date: dateValue,
      time_slot: timeSlot,
      notes: notes || null,
      status: "aangevraagd"
    }]);

    if (error) throw error;

    statusEl.textContent = "✅ Aanvraag ontvangen. Wij nemen contact met u op.";
    form.reset();

  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Er ging iets mis. Probeer later opnieuw.";
  }
});

