import { MataPelajaranItemProps } from '@/hooks/schema/super-admins/guru/guru'

export function MataPelajaranItem({ item, onEdit, onDelete }: MataPelajaranItemProps) {
    return (
        <div className="border p-4 rounded shadow-sm">
            <h3 className="font-bold">{item.nama}</h3>
            <div className="mt-2 space-x-2">
                <button
                    onClick={() => onEdit(item)}
                    className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/80"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(item.id!)}
                    className="text-white px-3 py-1 rounded" style={{ backgroundColor: '#FF0000' }}
                >
                    Hapus
                </button>
            </div>
        </div>
    )
}