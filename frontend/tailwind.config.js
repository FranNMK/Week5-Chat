/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: "#1E1E2F",       // dark navy-purple-ish
        sidebarHover: "#2A2A40",
        bubbleMe: "#4F46E5",       // indigo
        bubbleOther: "#E5E7EB"     // gray-100-ish
      },
      backgroundImage: {
        "chat-gradient":
          "linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(16,185,129,0.07) 100%)"
      }
    }
  },
  plugins: []
}
