export default function NavBar() {
  return (
    <nav className=" bg-gradient-to-b from-sky-700 to-sky-900 ">
      <div className="flex h-nav items-center justify-between px-8">
        <p className="font-regular font-archivo text-2xl text-white">
          Panorama City
        </p>
        <div className="flex gap-4 font-barlow text-white">
          <button>Iniciar Sesión</button>
          <button>Registrarse</button>
        </div>
      </div>
    </nav>
  );
}
