const mode = "prod"; // prod or dev
var frontend_base_url;
var backend_base_url;

if (mode === "dev") {
	frontend_base_url = "http://localhost:5173";
	backend_base_url = "http://localhost:4000";
} else {
	frontend_base_url = "https://image-background-remover-app.vercel.app/";
	backend_base_url = "https://bg-remover-backend-uaaf.onrender.com";
}

export { frontend_base_url, backend_base_url };
