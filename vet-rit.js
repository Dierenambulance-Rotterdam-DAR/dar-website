const SUPABASE_URL = "https://mytcqjqhquqxcqmechta.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15dGNxanFocXVxeGNxbWVjaHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNzgwMzYsImV4cCI6MjA4Mjg1NDAzNn0.l0-TONRsSd65UCYaTJXR8UBRMdZDD73e0WtxQFa9xo8";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("vetForm");
const statusEl = document.getElementById("status");

function addMinutes(time, mins) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(0, 0, 0, h, m + mins);
  return d.toTimeString().slice(0, 5);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Bezig met reserveren…";

  const date = date.value;
  const start = time.value;
  const end = addMinutes(start, 30);

  const { error } = await sb.from("vet_rides").insert([{
    date,
    time_start: start,
    time_end: end,
    name: name.value,
    phone: phone.value,
    animal: animal.value,
    vet_name: vet.value || null,
    notes: notes.value || null
  }]);

  if (error) {
    if (error.code === "23505") {
      statusEl.textContent = "❌ Dit tijdslot is net gereserveerd. Kies een ander moment.";
    } else {
      statusEl.textContent = "❌ Er ging iets mis. Probeer opnieuw.";
    }
    return;
  }

  form.reset();
  statusEl.textContent = "✅ Aanvraag ontvangen. Wij nemen contact met u op.";
});
