import { Biography } from '@prisma/client';

export default function BioInfo({
    selectedBio,
}: {
    selectedBio?: Omit<Biography, 'createdAt'>;
}) {
    if (selectedBio === undefined) return null;

    return (
        <div className="bg-white rounded-xl p-1">
            <p className="text-3xl">{selectedBio.name}</p>
            <p>Updated At: {selectedBio.updatedAt.toLocaleString()}</p>
            <p>Bio ID: {selectedBio.id}</p>
        </div>
    );
}
