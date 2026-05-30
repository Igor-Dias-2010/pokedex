import Image from "next/image";

type SpritesProps = {
    data: any;
}

export default function Sprites({data}: SpritesProps) {
    return (
        <div>
            <Image
                src={data.sprites.other["official-artwork"].front_default}
                alt={data.name}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "300px", height: "auto" }}
            />
        </div>
    );
}
