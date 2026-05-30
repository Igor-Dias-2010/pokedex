type AlturaProps = {
    height: number;
};

export default function Altura({ height }: AlturaProps) {
    return (
        <div>
            <p>height: {height / 10} m</p>
        </div>
    );
}
