export default function NavBar() {
  return (
    <nav className="fixed z-20 w-full bg-marino ">
      <div className="flex h-nav items-center justify-between px-8">
        <p className="font-regular font-archivo text-2xl text-white">
          Panorama City
        </p>
        <div className="flex gap-4 font-barlow text-sm text-white">
          <button>Iniciar Sesión</button>
          <button className="rounded border border-oliva p-2 text-oliva">
            Registrarse
          </button>
        </div>
      </div>
    </nav>
  );
}
