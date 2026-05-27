interface Props {
    status: string;
}

export default function StatusBadge({ status }: Props) {
    const statusStyle = {
        Planning: "bg-blue-100 text-blue-700",
        "In Progress": "bg-yellow-100 text-yellow-700",
        Completed: "bg-green-100 text-green-700",
        "On Hold": "bg-red-100 text-red-700",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[status as keyof typeof statusStyle]}`}
        >
            {status}
        </span>
    );
}