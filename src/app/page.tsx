'use client';

import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className="bg-gray-600 mx-48 p-5 mt-5">
            <Button
                className="text-black"
                onClick={() => {
                    alert('Something');
                }}>
                Something
            </Button>
        </div>
    );
}
