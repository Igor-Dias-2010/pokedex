type PesoProps = {
    weight: number;
}

export default function Peso({weight}: PesoProps) {
    return (
        <div>
            <p>weigth: {weight / 10} kg</p>
        </div>
    );
}