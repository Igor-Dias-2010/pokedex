import Image from "next/image";

export default function LoadingBusca() {
    return (
        <div className="loading-busca">
            <p>Buscando Pokémon...</p>
            <Image src="/imgs/pokebola-removebg-preview.png" className="bg-search" alt="Pesquisando..." width={60} height={37} />
        </div>
    );
}
