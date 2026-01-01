console.log("vet-rit.js geladen");

const SUPABASE_URL = "https://mytcqjqhquqxcqmechta.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15dGNxanFocXVxeGNxbWVjaHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNzgwMzYsImV4cCI6MjA4Mjg1NDAzNn0.l0-TONRsSd65UCYaTJXR8UBRMdZDD73e0WtxQFa9xo8";
const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===== Elements =====
const form = document.getElementById("vetRitForm");
const statusEl = document.getElementById("status");

if (!form) {
  console.error("Form niet gevonden (vetRitForm)");
}

// ===== Submit =====
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Bezig met reserveren...";

  try {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const animal = document.getElementById("animal").value.trim();
    const vet = document.getElementById("vet").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const notes = document.getElementById("notes").value.trim();

    if (!name || !phone || !animal || !date || !time) {
      statusEl.textContent = "❌ Vul alle verplichte velden in.";
      return;
    }

    const { error } = await sb
      .from("vet_ritten")
      .insert([{
        name,
        phone,
        animal,
        vet: vet || null,
        date,
        time_slot: time,
        notes: notes || null,
        status: "aanvraag"
      }]);

    if (error) throw error;

    statusEl.textContent = "✅ Aanvraag verzonden. We nemen contact op.";
    form.reset();

  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Er ging iets mis. Probeer later opnieuw.";
  }
});
