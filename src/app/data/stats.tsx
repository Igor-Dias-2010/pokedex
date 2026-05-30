type StatsProps = {
    stats: any[];
}

export default function Stats({stats}: StatsProps) {
    return (
        <div>
            {stats.map((stat) => (
                <p key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                </p>
            ))}
        </div>
    );
}
