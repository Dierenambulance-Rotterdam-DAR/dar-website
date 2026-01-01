const SUPABASE_URL = "https://mytcqjqhquqxcqmechta.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15dGNxanFocXVxeGNxbWVjaHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNzgwMzYsImV4cCI6MjA4Mjg1NDAzNn0.l0-TONRsSd65UCYaTJXR8UBRMdZDD73e0WtxQFa9xo8";

const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const loginForm = document.getElementById("loginForm");
const adminPanel = document.getElementById("adminPanel");
const ridesEl = document.getElementById("rides");
const statusEl = document.getElementById("loginStatus");

// LOGIN
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  statusEl.textContent = "Inloggen…";

  const { error } = await sb.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  if (error) {
    statusEl.textContent = "❌ Inloggen mislukt";
    return;
  }

  loginForm.style.display = "none";
  adminPanel.style.display = "block";
  loadRides();
});

// LAAD RITTEN
async function loadRides() {
  const { data, error } = await sb
    .from("vet_rides")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    ridesEl.textContent = "Fout bij laden.";
    return;
  }

  ridesEl.innerHTML = data.map(r => `
    <div class="card" style="margin-top:10px;">
      <strong>${r.date} ${r.time_start}</strong><br>
      ${r.name} – ${r.phone}<br>
      Dier: ${r.animal}<br>
      Status: <strong>${r.status}</strong><br>
      <button onclick="updateStatus('${r.id}','approved')">✅ Goedkeuren</button>
      <button onclick="updateStatus('${r.id}','declined')">❌ Afwijzen</button>
    </div>
  `).join("");
}

// UPDATE STATUS
async function updateStatus(id, status) {
  await sb
    .from("vet_rides")
    .update({ status })
    .eq("id", id);

  loadRides();
}
