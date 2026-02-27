// ---- 1) Mets tes infos Supabase ici ----
const SUPABASE_URL = "https://uwvmemfghbhfrhjkroqp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3dm1lbWZnaGJoZnJoamtyb3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNDQ1NTIsImV4cCI6MjA4NzcyMDU1Mn0.HxhxH6KhEoErp7oMbdkVXoB9iczFPRoxHlMCflo0Dpo";

// ---- 2) Init ----
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("loginForm");
const errBox = document.getElementById("err");
const btn = document.getElementById("btnLogin");

function setErr(msg) { errBox.textContent = msg || ""; }

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setErr("");

  btn.disabled = true;
  btn.textContent = "Connexion…";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  btn.disabled = false;
  btn.textContent = "Se connecter";

  if (error) return setErr(error.message);

  // Récupère le role depuis profiles
  const userId = data.user.id;
  const { data: profile, error: pErr } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (pErr) return setErr(pErr.message);

  if (profile.role === "admin") {
    window.location.href = "./admin.html";
  } else {
    window.location.href = "./driver.html";
  }
});